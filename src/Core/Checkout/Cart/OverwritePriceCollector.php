<?php declare(strict_types=1);

namespace ncp\Configurator\Core\Checkout\Cart;

use Shopware\Core\Checkout\Cart\Cart;
use Shopware\Core\Checkout\Cart\CartBehavior;
use Shopware\Core\Checkout\Cart\CartDataCollectorInterface;
use Shopware\Core\Checkout\Cart\CartProcessorInterface;
use Shopware\Core\Checkout\Cart\LineItem\CartDataCollection;
use Shopware\Core\Checkout\Cart\LineItem\LineItem;
use Shopware\Core\Checkout\Cart\Price\QuantityPriceCalculator;
use Shopware\Core\Checkout\Cart\Price\Struct\QuantityPriceDefinition;
use Shopware\Core\System\SalesChannel\SalesChannelContext;

class OverwritePriceCollector implements CartDataCollectorInterface, CartProcessorInterface
{
    private QuantityPriceCalculator $calculator;

    public function __construct(QuantityPriceCalculator $calculator)
    {
        $this->calculator = $calculator;
    }

    public function collect(CartDataCollection $data, Cart $original, SalesChannelContext $context, CartBehavior $behavior): void
    {
        // get all product ids of current cart
        $productIds = $original->getLineItems()->filterType(LineItem::PRODUCT_LINE_ITEM_TYPE)->getReferenceIds();

        // remove all product ids which are already fetched from the database
        $filtered = $this->filterAlreadyFetchedPrices($productIds, $data);

        // Skip execution if there are no prices to be saved
        if (empty($filtered)) {
            return;
        }

        $elements = $original->getLineItems()->getElements();
        foreach ($elements as $element) {
            $elementId = $element->getId();
            $referencedId = $element->getReferencedId();
            $key = $this->buildKey($referencedId);
            $newPrice = floatval($element->getPayloadValue('Configuration_Total'));
            // if new price from Configuration_Total we have to set a value for each product id to prevent duplicate queries in next calculation
            if ($newPrice) {
                $data->set($key, $newPrice);
            }
        }
    }

    public function process(CartDataCollection $data, Cart $original, Cart $toCalculate, SalesChannelContext $context, CartBehavior $behavior): void
    {
        // get all product line items
        $products = $toCalculate->getLineItems()->filterType(LineItem::PRODUCT_LINE_ITEM_TYPE);

        foreach ($products as $product) {
            $key = $this->buildKey($product->getReferencedId());

            // no overwritten price? continue with next product
            if (!$data->has($key) || $data->get($key) === null) {
                continue;
            }
            $newPrice = floatval($product->getPayloadValue('Configuration_Total'));

            // build new price definition
            $definition = new QuantityPriceDefinition(
                $newPrice,
                $product->getPrice()->getTaxRules(),
                $product->getPrice()->getQuantity()
            );

            // build CalculatedPrice over calculator class for overwritten price
            $calculated = $this->calculator->calculate($definition, $context);

            // set new price into line item
            $product->setPrice($calculated);
            $product->setPriceDefinition($definition);
        }
    }

    private function filterAlreadyFetchedPrices(array $productIds, CartDataCollection $data): array
    {
        $filtered = [];

        foreach ($productIds as $id) {
            $key = $this->buildKey($id);

            // already fetched from database?
            if ($data->has($key)) {
                continue;
            }

            $filtered[] = $id;
        }

        return $filtered;
    }

    private function buildKey(string $id): string
    {
        return 'price-overwrite-' . $id;
    }
}
