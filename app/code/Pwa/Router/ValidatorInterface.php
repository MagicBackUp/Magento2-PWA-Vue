<?php
namespace Pwa\Router;

use Magento\Framework\App\RequestInterface;

/**
 * Interface ValidatorInterface
 * @package Pwa\Router
 */
interface ValidatorInterface
{
    /**
     * @param RequestInterface $request
     * @return bool
     */
    public function validateRequest(RequestInterface $request): bool;
}
