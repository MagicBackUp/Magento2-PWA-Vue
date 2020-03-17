<?php
/**
 * @category    Pwa
 * @package     Pwa_Performance
 * @author      Alfreds Genkins <info@scandiweb.com>
 * @copyright   Copyright (c) 2019 Scandiweb, Ltd (https://scandiweb.com)
 */

namespace Pwa\Performance\Api;

use Magento\Catalog\Model\ResourceModel\Product\Collection;

interface ProductsCollectionPostProcessorInterface
{
    /**
     * @param Collection $collection
     * @param array $attributeNames
     * @return Collection
     */
    public function process(
        Collection $collection,
        array $attributeNames
    ): Collection;
}
