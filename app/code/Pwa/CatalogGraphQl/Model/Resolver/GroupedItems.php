<?php
declare(strict_types=1);

namespace Pwa\CatalogGraphQl\Model\Resolver;

use Magento\Framework\Api\SearchCriteriaBuilder;
use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Pwa\Performance\Model\Resolver\ResolveInfoFieldsTrait;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\GroupedProduct\Model\Product\Initialization\Helper\ProductLinks\Plugin\Grouped;
use Magento\Catalog\Api\Data\ProductLinkInterface;
use Pwa\Performance\Model\Resolver\Products\DataPostProcessor;
use Pwa\CatalogGraphQl\Model\Resolver\Products\DataProvider\Product as ProductDataProvider;

/**
 * Class ConfigurableVariant
 *
 * @package Pwa\CatalogGraphQl\Model\Resolver
 */
class GroupedItems implements ResolverInterface
{
    use ResolveInfoFieldsTrait;

    /**
     * @var SearchCriteriaBuilder
     */
    protected $searchCriteriaBuilder;

    /**
     * @var DataPostProcessor
     */
    protected $postProcessor;

    /**
     * @var ProductDataProvider
     */
    protected $productDataProvider;

    public function __construct(
        SearchCriteriaBuilder $searchCriteriaBuilder,
        DataPostProcessor $postProcessor,
        ProductDataProvider $productDataProvider
    ) {
        $this->searchCriteriaBuilder = $searchCriteriaBuilder;
        $this->postProcessor = $postProcessor;
        $this->productDataProvider = $productDataProvider;
    }

    /**
     * @inheritdoc
     */
    public function resolve(
        Field $field,
        $context,
        ResolveInfo $info,
        array $value = null,
        array $args = null
    ) {
        if (!isset($value['model'])) {
            throw new LocalizedException(__('"model" value should be specified'));
        }

        $itemData = [];
        $productSKUs = [];
        $productModel = $value['model'];
        $links = $productModel->getProductLinks();

        foreach ($links as $link) {
            /** @var ProductLinkInterface $link */
            if ($link->getLinkType() !== Grouped::TYPE_NAME) {
                continue;
            }

            $productSKU = $link->getLinkedProductSku();

            $itemData[$productSKU] = [
                'position' => (int) $link->getPosition(),
                'qty' => $link->getExtensionAttributes()->getQty(),
                'sku' => $productSKU
            ];

            $productSKUs[] = $productSKU;
        }

        $attributeCodes = $this->getFieldsFromProductInfo($info, 'items/product');

        $searchCriteria = $this->searchCriteriaBuilder
            ->addFilter('sku', $productSKUs, 'in')
            ->create();

        $products = $this->productDataProvider
            ->getList(
                $searchCriteria,
                $attributeCodes,
                false,
                true
            )
            ->getItems();

        $productsData = $this->postProcessor->process(
            $products,
            'items/product',
            $info
        );

        foreach ($productsData as $productData) {
            if (!isset($itemData[$productData['sku']])) {
                continue;
            }

            $itemData[$productData['sku']]['product'] = $productData;
        }

        return $itemData;
    }
}
