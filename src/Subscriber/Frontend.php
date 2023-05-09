<?php declare(strict_types=1);

namespace ncp\Configurator\Subscriber;

use Doctrine\DBAL\Exception;
use ncp\Configurator\Struct\StructConfigurator;
use Doctrine\DBAL\Connection;
use Shopware\Core\Content\Product\Aggregate\ProductMedia\ProductMediaCollection;
use Shopware\Core\Content\Product\Events\ProductListingResultEvent;
use Shopware\Core\Content\Product\ProductEvents;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepositoryInterface;
use Shopware\Core\Framework\DataAbstractionLayer\Event\EntityLoadedEvent;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
use Shopware\Storefront\Page\Product\ProductPageLoadedEvent;
use Shopware\Storefront\Pagelet\Footer\FooterPageletLoadedEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Shopware\Core\System\SystemConfig\SystemConfigService;

class Frontend implements EventSubscriberInterface
{
    /**
     * @var Connection
     */
    private Connection $connection;

    /**
     * @var SystemConfigService
     */
    private SystemConfigService $systemConfigService;

    /**
     * @var EntityRepositoryInterface
     */
    private EntityRepositoryInterface $repositoryClassCon;

    /**
     * @var EntityRepositoryInterface
     */
    private EntityRepositoryInterface $repositoryObjCon;

    /**
     * @var EntityRepositoryInterface
     */
    private EntityRepositoryInterface $repositoryProductMedia;

    /**
     * @var ProductMediaCollection
     */
    private ProductMediaCollection $media;

    /**
     * @param Connection $connection
     * @param SystemConfigService $systemConfigService
     * @param EntityRepositoryInterface $repositoryClassCon
     * @param EntityRepositoryInterface $repositoryObjCon
     * @param EntityRepositoryInterface $repositoryProductMedia
     */
    public function __construct(
        Connection                $connection,
        SystemConfigService       $systemConfigService,
        EntityRepositoryInterface $repositoryClassCon,
        EntityRepositoryInterface $repositoryObjCon,
        EntityRepositoryInterface $repositoryProductMedia
    )
    {
        $this->connection = $connection;
        $this->systemConfigService = $systemConfigService;
        $this->repositoryClassCon = $repositoryClassCon;
        $this->repositoryObjCon = $repositoryObjCon;
        $this->repositoryProductMedia = $repositoryProductMedia;
    }

    /**
     * @return string[]
     */
    public static function getSubscribedEvents(): array
    {
        return [
            ProductPageLoadedEvent::class => 'onProductPageLoaded',
            ProductEvents::PRODUCT_LOADED_EVENT => 'onProductLoaded',
        ];
    }

    /**
     * @param ProductPageLoadedEvent $event
     *
     * @return void
     * @throws Exception
     */
    public function onProductPageLoaded(ProductPageLoadedEvent $event)
    {
        $productId = $event->getPage()->getProduct()->getId();
        if ($productId == '') {
            return;
        }

//        // if no configurator product return (handle as default product)
//        $productGroupId = $this->getProductGroupIdOfProduct($productId, $event->getContext());
//        if ($productGroupId == '') {
//            return;
//        }
//        $this->getObjConnections($productGroupId, $event->getContext());
//
        $event->getPage()->getProduct()->addExtension('ncp_configurator_data', $this->ncp_configurator);
//
//        $this->media = $event->getPage()->getProduct()->getMedia();
//        $mediaCoverTitle = $event->getPage()->getProduct()->getCover()->getMedia()->getTitle();
//        if ($mediaCoverTitle) {
//            // $mediaCoverTitleFirstSeperatorPos = strpos($mediaCoverTitle, '_', 0);
//            // if ($mediaCoverTitleFirstSeperatorPos <> false)
//            //      $mediaCoverTitle = strtolower(substr($mediaCoverTitle, 0, $mediaCoverTitleFirstSeperatorPos));
//
//            $this->getMediaFileNames($mediaCoverTitle);
//            $this->ncp_configurator->arrMounting optionMedia["cover"] = $event->getPage()->getProduct()->getCover()->getMedia()->getUrl();
//        }
    }


    /**
     * @param EntityLoadedEvent $event
     * @return void
     */
    public function onProductLoaded(EntityLoadedEvent $event): void
    {
        $productsntities = $event->getEntities();
        foreach ($productsntities as $listingProduct) {
            $productId = $listingProduct->getId();
            if ($productId == '') {
                continue;
            }

            // if no configurator product return (handle as default product)
            $productGroupId = $this->getProductGroupIdOfProduct($productId, $event->getContext());
            if ($productGroupId == '') {
                return;
            } else {
                $listingProduct->addExtension('ncp_configurator', $this->ncp_configurator);
            }

        }
    }

    private function getProductGroupIdOfProduct($productId, $context): string
    {
        $criteria = new Criteria();
        $criteria->addFilter(new EqualsFilter('idObjTo', $productId));
        $results = $this->repositoryObjCon->search($criteria, $context);
        if ($results->count() == 0) {
            return '';
        } elseif ($results->count() == 1) {
            foreach ($results as $result) {
                return $result->getIdObjFrom();
            }
        }

        return '';
    }

    private function getObjConnections($idObjFrom, $context): void
    {
        $criteria = new Criteria();
        $criteria->addAssociation('classCon');
        $criteria->addAssociation('objFrom');
        $criteria->addAssociation('objTo');
        $criteria->addAssociation('objFrom.class');
        $criteria->addAssociation('objTo.class');
        $criteria->addFilter(new EqualsFilter('idObjFrom', $idObjFrom));

        $result = $this->repositoryObjCon->search($criteria, $context);
        if ($result->getTotal() > 0) {
            foreach ($result as $item) {
                switch ($item->objFrom->class->name) {
                    case 'ProjectGroup':
                        $this->ncp_configurator->ProjectGroupsame = $item->objFrom->name;

                        $key = $item->objFrom->class->name . ':' . $item->objFrom->name;
                        $this->ncp_configurator->arrDimensionMinMaxValues[$key] = $this->getDimensionMinMaxValues($item->objFrom->idCls, $item->objFrom->id);
                        // $this->ncp_configurator->arrPriceFactorsArea[$key] = $this->getPriceFactorsArea($item->objFrom->idCls, $item->objFrom->id);
                        break;
                }

                switch ($item->objTo->class->name) {
                    case 'Dimension':
                        if (!in_array($item->objTo->name, $this->ncp_configurator->arrDimension)) {
                            $this->ncp_configurator->arrDimension[] = $item->objTo->name;
                            $this->ncp_configurator->arrDimensionTitle[] = $item->objTo->title;
                        }
                        break;
                    case 'Product':
                        $this->ncp_configurator->ProductName = $item->objTo->name;
                        break;
                }


                $this->getObjConnections($item->getIdObjTo(), $context);
            }
        }
    }

//    private function getMediaUrlOfFilename($fileName): string
//    {
//        foreach ($this->media as $media) {
//            if ($media->getMedia()->getFileName() === $fileName) {
//                return $media->getMediaId();
//                //return $media->getMedia()->getUrl();
//            }
//        }
//
//        return "";
//    }

    public function onFooterPageletLoaded(FooterPageletLoadedEvent $event): void
    {
        if (!$this->systemConfigService->get('NcpConfigurator.config.showInStorefront')) {
            return;
        }

        $event->getPagelet()->addExtension('showInStorefront', true);
    }
}
