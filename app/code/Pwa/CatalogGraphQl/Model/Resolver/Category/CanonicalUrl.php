<?php
declare(strict_types=1);

namespace Pwa\CatalogGraphQl\Model\Resolver\Category;

use Magento\Catalog\Model\Category;
use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\UrlInterface;

/**
 * Retrieves category canonical url
 */
class CanonicalUrl implements ResolverInterface
{
    /**
     * URL Model instance
     *
     * @var UrlInterface
     */
    protected $_url;

    /**
     * CanonicalUrl constructor.
     * @param UrlInterface $url
     */
    public function __construct(
        UrlInterface $url
    ) {
        $this->_url = $url;
    }

    /**
     * @inheritdoc
     */
    public function resolve(
        Field $field,
        $context,
        ResolveInfo $info,
        array $value = null,
        array $args = null
    )
    {
        if (!isset($value['model'])) {
            throw new LocalizedException(__('"model" value should be specified'));
        }

        /* @var $category Category */
        $category = $value['model'];
        return $this->_url->getUrl('category/') . $category->getDataByKey('url_path');
    }
}
