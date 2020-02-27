<?php
declare(strict_types=1);

namespace Pwa\ReviewsGraphQl\Model\Resolver\Product;

use Magento\Catalog\Model\Product;
use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;

/**
 * Class GetProductReviews
 *
 * @package Pwa\ReviewsGraphQl\Model\Resolver
 */
class ReviewSummary implements ResolverInterface
{
    /**
     * @inheritdoc
     */
    public function resolve(
        Field $field,
        $context,
        ResolveInfo $info,
        array $value = null,
        array $args = null
    ) {
        if (!isset($value['model'])) {
            throw new LocalizedException(__('"model" value should be specified'));
        }

        /** @var Product $product */
        $product = $value['model'];
        $ratingSummary = $product->getRatingSummary();

        if (!$ratingSummary) {
            return [];
        }

        return [
            'rating_summary' => $ratingSummary->getRatingSummary(),
            'review_count' => $ratingSummary->getReviewsCount()
        ];
    }
}
