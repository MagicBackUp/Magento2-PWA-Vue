<?php
namespace Pwa\Router\Validator;

use Magento\Framework\App\RequestInterface;
use Pwa\Router\ValidatorInterface;

/**
 * Class Cms
 * @package Pwa\Router\Validator
 */
class Cart implements ValidatorInterface
{
    /**
     * @inheritdoc
     */
    public function validateRequest(RequestInterface $request): bool
    {
        return true;
    }
}
