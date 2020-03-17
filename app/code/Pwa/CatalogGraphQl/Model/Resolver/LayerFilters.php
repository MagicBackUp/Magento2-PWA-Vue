<?php
declare (strict_types=1);

namespace Pwa\CatalogGraphQl\Model\Resolver;

use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;

/**
 * Layered navigation filters resolver, used for GraphQL request processing.
 */
class LayerFilters extends \Magento\CatalogGraphQl\Model\Resolver\LayerFilters implements ResolverInterface
{
    /**
     * @var Layer\DataProvider\Filters
     */
    private $filtersDataProvider;

    /**
     * @param \Pwa\CatalogGraphQl\Model\Resolver\Layer\DataProvider\Filters $filtersDataProvider
     */
    public function __construct(
        \Pwa\CatalogGraphQl\Model\Resolver\Layer\DataProvider\Filters $filtersDataProvider
    ) {
        $this->filtersDataProvider = $filtersDataProvider;
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
        if (!isset($value['layer_type'])) {
            return null;
        }

        $this->filtersDataProvider->setRequiredAttributesFromItems($value['items'] ?? []);

        return $this->filtersDataProvider->getData($value['layer_type']);
    }
}
