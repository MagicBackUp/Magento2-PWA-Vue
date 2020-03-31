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
        \Magento\Framework\View\Element\Js\Cookie $cookie
    )
    {
        $this->cookie = $cookie;
    }

    public function resolve(Field $field, $context, ResolveInfo $info, array $value = null, array $args = null)
    {
        return $this->cookie->getDomain();
    }
}
