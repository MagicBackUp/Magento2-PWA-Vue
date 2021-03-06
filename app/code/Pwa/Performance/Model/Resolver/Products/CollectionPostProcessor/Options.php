<?php
/**
 * @category    Pwa
 * @package     Pwa_Performance
 * @author      Alfreds Genkins <info@scandiweb.com>
 * @copyright   Copyright (c) 2019 Scandiweb, Ltd (https://scandiweb.com)
 */

declare(strict_types=1);

namespace Pwa\Performance\Model\Resolver\Products\CollectionPostProcessor;

use GraphQL\Language\AST\FieldNode;
use Magento\Catalog\Model\ResourceModel\Product\Collection;
use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Pwa\Performance\Api\ProductsCollectionPostProcessorInterface;
use Pwa\Performance\Model\Resolver\ResolveInfoFieldsTrait;

class Options implements ProductsCollectionPostProcessorInterface
{
    const OPTIONS_FIELD = 'options';

    /**
     * @inheritDoc
     */
    public function process(
        Collection $collection,
        array $attributeNames
    ): Collection {
        if (in_array(self::OPTIONS_FIELD, $attributeNames)) {
            $collection->addOptionsToResult();
        }

        return $collection;
    }
}
