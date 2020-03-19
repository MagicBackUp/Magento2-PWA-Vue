<?php
declare(strict_types=1);

namespace Magestore\BannerGraphQl\Model\Resolver;

use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Query\Resolver\ValueFactory;
use Magento\Framework\GraphQl\Query\ResolverInterface;

class Slider implements ResolverInterface
{
    private $valueFactory;
    protected $bannerCollectionFactory;
    private $stdTimezone;
    private $scopeConfig;

    public function __construct(
        \Magestore\Bannerslider\Model\ResourceModel\Banner\Collection $bannerCollectionFactory,
        \Magento\Framework\Stdlib\DateTime\Timezone $stdTimezone,
        \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig,
        ValueFactory $valueFactory
    ) {
        $this->bannerCollectionFactory = $bannerCollectionFactory;
        $this->stdTimezone = $stdTimezone;
        $this->scopeConfig = $scopeConfig;
        $this->valueFactory = $valueFactory;
    }

    public function resolve(Field $field, $context, ResolveInfo $info, array $value = null, array $args = null) {
        $silderId = $this->scopeConfig->getValue ( 'bannerslider/general/graphql_slider_id' , \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
        $silderEnable = $this->scopeConfig->getValue ( 'bannerslider/general/enable_frontend' , \Magento\Store\Model\ScopeInterface::SCOPE_STORE);

        if ($silderEnable && $silderId) {
            $storeViewId = (int)$context->getExtensionAttributes()->getStore()->getId();
            $dateTimeNow = $this->stdTimezone->date()->format('Y-m-d H:i:s');

            $bannerCollection = $this->bannerCollectionFactory
                ->setStoreViewId($storeViewId)
                ->addFieldToFilter('main_table.slider_id', $silderId)
                ->addFieldToFilter('status', \Magestore\Bannerslider\Model\Status::STATUS_ENABLED)
                ->addFieldToFilter('start_time', ['lteq' => $dateTimeNow])
                ->addFieldToFilter('end_time', ['gteq' => $dateTimeNow])
                ->setOrder('order_banner', 'ASC');

            foreach ($bannerCollection as $slider) {
                $result['banner'][] = [
                    'slider_id' => $slider->getData('slider_id'),
                    'banner_id' => $slider->getData('banner_id'),
                    'title' => $slider->getData('name'),
                    'order_banner' => $slider->getData('order_banner'),
                    'status' => $slider->getData('status'),
                    'url' => $slider->getData('click_url'),
                    'image' => $slider->getData('image'),
                    'image_alt' => $slider->getData('image_alt'),
                    'width' => $slider->getData('width'),
                    'height' => $slider->getData('height'),
                    'start_time' => $slider->getData('start_time'),
                    'end_time' => $slider->getData('end_time'),
                    'slider_type' => $slider->getData('slider_type'),
                ];
            }
        }else{
            $result = null;
        }

        return $result;
    }
}