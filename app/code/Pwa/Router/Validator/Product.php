<?php
namespace Pwa\Router\Validator;


use Magento\Framework\App\RequestInterface;
use Pwa\Router\PathTrait;
use Pwa\Router\ValidatorInterface;
use \Magento\Catalog\Model\ResourceModel\Product\Collection;

class Product implements ValidatorInterface
{
    use PathTrait;
    protected $productCollection;

    /**
     * Product constructor.
     * @param Collection $productCollection
     */
    public function __construct(Collection $productCollection)
    {
        $this->productCollection = $productCollection;
    }

    /**
     * @inheritdoc
     */
    public function validateRequest(RequestInterface $request): bool
    {
        $urlKey = $this->getPathFrontName($request);
        $productCollection = $this->productCollection->clear();
        $productCollection->addAttributeToFilter('url_key', $urlKey);
        $ids = $productCollection->getAllIds();
        $productId = reset($ids);

        return !!$productId;
    }
}
