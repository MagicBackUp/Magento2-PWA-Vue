<?php
namespace Pwa\Router;

use Magento\Framework\App\RequestInterface;

interface ValidationManagerInterface
{
    public function validate(RequestInterface $request): bool;
}
