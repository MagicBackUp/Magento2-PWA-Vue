<?php
namespace Pwa\Router\Validator;


use Magento\Framework\App\RequestInterface;
use Pwa\Router\PathTrait;
use Pwa\Router\ValidatorInterface;
use Magento\Catalog\Model\ResourceModel\Category\Collection;

class Category implements ValidatorInterface
{
    use PathTrait;
    protected $categoryCollection;

    /**
     * Category constructor.
     * @param Collection $categoryCollection
     */
    public function __construct(Collection $categoryCollection)
    {
        $this->categoryCollection = $categoryCollection;
    }

    /**
     * @inheritdoc
     * @throws \Magento\Framework\Exception\LocalizedException
     */
    public function validateRequest(RequestInterface $request): bool
    {
        $urlPath = $this->getPathFrontName($request);
        /**
         * @var $category \Magento\Catalog\Model\Category
         */
        $category = $this->categoryCollection
            ->addAttributeToFilter('url_path', $urlPath)
            ->addAttributeToSelect(['entity_id'])
            ->getFirstItem();
        $categoryId = $category->getEntityId();

        return !!$categoryId;
    }
}
