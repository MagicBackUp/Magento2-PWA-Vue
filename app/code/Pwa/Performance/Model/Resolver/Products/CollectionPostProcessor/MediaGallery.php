<?php
/**
 * @category    Pwa
 * @package     Pwa_Performance
 * @author      Alfreds Genkins <info@scandiweb.com>
 * @copyright   Copyright (c) 2019 Scandiweb, Ltd (https://scandiweb.com)
 */

declare(strict_types=1);

namespace Pwa\Performance\Model\Resolver\Products\CollectionPostProcessor;

use Magento\Catalog\Model\ResourceModel\Product\Collection;
use Pwa\Performance\Api\ProductsCollectionPostProcessorInterface;

class MediaGallery implements ProductsCollectionPostProcessorInterface
{
    const MEDIA_FIELDS = ['media_gallery_entries', 'media_gallery'];

    /**
     * @inheritDoc
     */
    public function process(
        Collection $collection,
        array $attributeNames
    ): Collection {
        if (array_intersect(self::MEDIA_FIELDS, $attributeNames)) {
            $collection->addMediaGalleryData();
        }

        return $collection;
    }
}
