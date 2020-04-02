<?php
declare(strict_types=1);

namespace Pwa\CatalogGraphQl\Model\Resolver\StoreConfig;

use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;

/**
 * Cookie Domain field resolver, used for GraphQL request processing.
 */
class Cookie implements ResolverInterface
{

    /**
     * @var \Magento\Framework\View\Element\Js\Cookie
     */
    private $cookie;

    /**
     * Cookie constructor.
     * @param \Magento\Framework\View\Element\Js\Cookie $cookie
     */
    public function __construct(
        \Magento\Framework\View\Element\Js\Cookie $cookie,
        \Magento\Store\Model\StoreManagerInterface $storeManager
    )
    {
        $this->cookie = $cookie;
        $this->_storeManager = $storeManager;
    }

    public function isCurrentlySecure()
    {
        return $this->_storeManager->getStore()->isCurrentlySecure();
    }

    public function resolve(Field $field, $context, ResolveInfo $info, array $value = null, array $args = null)
    {
        $cookieConfig = [
            'cookie_lifetime' => $this->cookie->getLifetime(),
            'cookie_path' => $this->cookie->getDomain(),
            'cookie_domain' => $this->cookie->getPath(),
            'cookie_secure' => $this->isCurrentlySecure()
        ];

        return $cookieConfig;
    }  
}
