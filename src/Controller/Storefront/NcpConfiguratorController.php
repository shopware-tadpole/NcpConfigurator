<?php declare(strict_types=1);

namespace ncp\Configurator\Controller\Storefront;

use Shopware\Core\Checkout\Cart\Cart;
use Shopware\Core\Checkout\Cart\LineItem\LineItem;
use Shopware\Core\Checkout\Cart\LineItemFactoryRegistry;
use Shopware\Core\Checkout\Cart\SalesChannel\CartService;
use Shopware\Core\Framework\Validation\DataBag\RequestDataBag;
use Shopware\Core\System\SalesChannel\SalesChannelContext;
use Shopware\Storefront\Controller\StorefrontController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Shopware\Core\Framework\Routing\Annotation\RouteScope;


/**
 * @RouteScope(scopes={"storefront"})
 */
class NcpConfiguratorController extends StorefrontController
{

    private LineItemFactoryRegistry $factory;

    private CartService $cartService;

    public function __construct(LineItemFactoryRegistry $factory, CartService $cartService)
    {
        $this->factory = $factory;
        $this->cartService = $cartService;
    }

    /**
     * @Route("/ncp/configurator/save/{productId}", name="frontend.detail.save", methods={"POST"}, defaults={"XmlHttpRequest"=true})
     *
     * @param Cart $cart
     * @param RequestDataBag $requestDataBag
     * @param SalesChannelContext $salesChannelContext
     * @return Response
     */
    public function addLineItem(Cart $cart, RequestDataBag $requestDataBag, SalesChannelContext $context): Response
    {
        $lineItem = $this->factory->create([
            'type' => LineItem::PRODUCT_LINE_ITEM_TYPE,
            'referencedId' => $requestDataBag->get('productId'),
            'quantity' => intval($requestDataBag->get('configuratedQuantity')),
            'payload' => [
                'Configuration_ProjectGroup' => $requestDataBag->get('submitProjectGroup'),
                'Configuration_Dimension' => [
                    'Height' => $requestDataBag->get('submitDimension_Height'),
                    'Width' => $requestDataBag->get('submitDimension_Width'),
                    'Length' => $requestDataBag->get('submitDimension_Length')
                ],
                'Configuration_TotalLength' => $requestDataBag->get('submitTotalLength'),
                'Configuration_Total' => $requestDataBag->get('submitTotal')
            ]
        ], $context);

        $this->cartService->add($cart, $lineItem, $context);

        return new Response('Added to shopping cart');
        // TODO Added to shopping cart then show cart
        // return $this->createActionResponse();
    }

    /**
     * @param Request $request
     * @return Response
     */
    protected function createActionResponse(Request $request): Response
    {
        if ($request->get('redirectTo') || $request->get('redirectTo') === '') {
            $params = $this->decodeParam($request, 'redirectParameters');

            $redirectTo = $request->get('redirectTo');

            if ($redirectTo) {
                return $this->redirectToRoute($redirectTo, $params);
            }

            return $this->redirectToRoute('frontend.home.page', $params);
        }

        if ($request->get('forwardTo')) {
            $params = $this->decodeParam($request, 'forwardParameters');

            return $this->forwardToRoute($request->get('forwardTo'), [], $params);
        }

        return new Response();
    }

    /**
     * @Route("/ncp/configurator/finish", name="frontend.detail.configure.finish", methods={"GET"}, defaults={"XmlHttpRequest"=true})
     *
     */
    public function configuratorFinish(): Response
    {
        return $this->render('storefront/page/product-detail/ncp_configurator/finish.html.twig');
    }
}
