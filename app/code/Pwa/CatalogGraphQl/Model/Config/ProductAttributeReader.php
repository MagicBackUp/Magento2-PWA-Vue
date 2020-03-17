<?php
declare(strict_types=1);

namespace Pwa\CatalogGraphQl\Model\Config;

use Magento\Framework\Config\ReaderInterface;
use Magento\Store\Model\StoreManagerInterface;
use Magento\Catalog\Model\ResourceModel\Product\Attribute\CollectionFactory;


class ProductAttributeReader implements ReaderInterface
{
    /**
     * @var CollectionFactory
     */
    protected $collectionFactory;

    /**
     * @var StoreManagerInterface
     */
    protected $storeManager;

    public function __construct(
        CollectionFactory $collectionFactory,
        StoreManagerInterface $storeManager
    ) {
        $this->collectionFactory = $collectionFactory;
        $this->storeManager = $storeManager;
    }

    protected function getAttributesVisibleOnFrontend() {
        $collection = $this->collectionFactory->create();
        $collection->setItemObjectClass(\Magento\Catalog\Model\ResourceModel\Eav\Attribute::class)
            ->addStoreLabel($this->storeManager->getStore()->getId())
            ->setOrder('position', 'ASC');

        // Add filter by storefront visibility
        $collection->addFieldToFilter('additional_table.is_filterable', ['gt' => 0]);
        return $collection->load();
    }

    public function read($scope = null): array
    {
        $data = [];
        $config = [];

        $attributesVisibleOnFront = $this->getAttributesVisibleOnFrontend();
        foreach ($attributesVisibleOnFront->getItems() as $attribute) {
            $attributeCode = $attribute->getAttributeCode();
            $data['fields'][$attributeCode]['name'] = $attributeCode;
            $data['fields'][$attributeCode]['type'] = 'FilterTypeInput';
            $data['fields'][$attributeCode]['arguments'] = [];
        }

        $config['ProductFilterInput'] = $data;

        return $config;
    }

}
