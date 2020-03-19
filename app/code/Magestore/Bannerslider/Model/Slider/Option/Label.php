<?php
namespace Magestore\Bannerslider\Model\Slider\Option;

class Label implements \Magento\Framework\Option\ArrayInterface
{
    protected $_labelsCollection;

    private $_sliderOption;

    public function __construct(
        \Magestore\Bannerslider\Model\ResourceModel\Slider\Collection $bannerCollectionFactory
    )
    {
        $this->_labelsCollection = $bannerCollectionFactory;
    }

    public function getLabelsCollection($label = false)
    {

    }

    /**
     * Return labels collection for backend system configuration with empty value "No Slider"
     *
     * @return array
     */
    public function getLabelsCollectionForSystemConfiguration()
    {
        return $this->toOptionArray();
    }

    /**
     * {@inheritdoc}
     */
    public function toOptionArray()
    {
        if(!$this->_sliderOption){
            $bannerCollection = $this->_labelsCollection->addFieldToFilter('status', \Magestore\Bannerslider\Model\Status::STATUS_ENABLED);
            $options[] = ['value' => '', 'label' => '-- No Slider --'];
            foreach ($bannerCollection as $banner){
                $options[] = ['value' => $banner->getSliderId(), 'label' => $banner->getTitle()];
            }
            $this->_sliderOption = $options;
        }
        return $this->_sliderOption;
    }
}
