<?php
namespace Pwa\Router\Validator;

use Magento\Framework\App\RequestInterface;
use Pwa\Router\ValidatorInterface;

/**
 * @package Pwa\Router\Validator
 */
class AlwaysPass implements ValidatorInterface
{
    /**
     * @inheritdoc
     */
    public function validateRequest(RequestInterface $request): bool
    {
        return true;
    }
}
