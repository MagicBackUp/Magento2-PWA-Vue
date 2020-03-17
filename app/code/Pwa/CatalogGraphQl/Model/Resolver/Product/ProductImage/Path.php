<?php
namespace Pwa\CatalogGraphQl\Model\Resolver\Product\ProductImage;

use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;

/**
 * Class Path
 * @package Pwa\CatalogGraphQl\Model\Resolver\Product\ProductImage
 * @deprecated
 */
class Path implements ResolverInterface
{
    public function resolve(
        Field $field,
        $context,
        ResolveInfo $info,
        array $value = null,
        array $args = null
    ) {
        if (!isset($value['image_type'])) {
            throw new LocalizedException(__('"image_type" value should be specified'));
        }
    
        if (!isset($value['model'])) {
            throw new LocalizedException(__('"model" value should be specified'));
        }
    
        $product = $value['model'];
        
        return $product->getData($value['image_type']);
    }
}
