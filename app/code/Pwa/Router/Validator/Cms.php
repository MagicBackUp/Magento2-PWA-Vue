<?php
namespace Pwa\Router\Validator;

use Magento\Cms\Model\GetPageByIdentifier;
use Magento\Framework\App\RequestInterface;
use Pwa\Router\PathTrait;
use Pwa\Router\ValidatorInterface;
use Magento\Framework\Exception\NoSuchEntityException;

/**
 * Class Cms
 * @package Pwa\Router\Validator
 */
class Cms implements ValidatorInterface
{
    use PathTrait;
    protected $getPageById;

    /**
     * Cms constructor.
     * @param GetPageByIdentifier $getPageByIdentifier
     */
    public function __construct(GetPageByIdentifier $getPageByIdentifier)
    {
        $this->getPageById = $getPageByIdentifier;
    }

    /**
     * @inheritdoc
     */
    public function validateRequest(RequestInterface $request): bool
    {
        $cmsPageId = $this->getPathFrontName($request);

        try {
            $this->getPageById->execute($cmsPageId, 0);
        } catch (NoSuchEntityException $e) {
            return false;
        }
        return true;
    }
}
