<?php
namespace Pwa\Router;

use Magento\Framework\App\RequestInterface;

trait PathTrait
{
    /**
     * @param RequestInterface $request
     * @return string
     */
    protected function getPathFrontName(RequestInterface $request): string
    {
        $path = trim($request->getPathInfo(), '/');
        $params = explode('/', $path);

        if (count($params) >= 2) {
            return $params[1];
        }

        return null;
    }
}
