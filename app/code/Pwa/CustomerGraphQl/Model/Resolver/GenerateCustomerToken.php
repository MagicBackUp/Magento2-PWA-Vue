<?php
declare(strict_types=1);

namespace Pwa\CustomerGraphQl\Model\Resolver;

use Magento\Framework\Exception\AuthenticationException;
use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Exception\GraphQlAuthenticationException;
use Magento\Framework\GraphQl\Exception\GraphQlInputException;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Magento\Integration\Api\CustomerTokenServiceInterface;
use Magento\Framework\Event\ManagerInterface as EventManager;

/**
 * Customers Token resolver, used for GraphQL request processing.
 */
class GenerateCustomerToken implements ResolverInterface
{
    /**
     * @var CustomerTokenServiceInterface
     */
    private $customerTokenService;

    /**
     * @var EventManager
     */
    private $eventManager;

    /**
     * @param CustomerTokenServiceInterface $customerTokenService
     */
    public function __construct(
        CustomerTokenServiceInterface $customerTokenService,
        EventManager $eventManager
    ) {
        $this->customerTokenService = $customerTokenService;
        $this->eventManager = $eventManager;
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
    ) {
        if (empty($args['email'])) {
            throw new GraphQlInputException(__('Specify the "email" value.'));
        }

        if (empty($args['password'])) {
            throw new GraphQlInputException(__('Specify the "password" value.'));
        }

        try {
            $customerToken = $this->customerTokenService->createCustomerAccessToken($args['email'], $args['password']);
        } catch (AuthenticationException $e) {
            throw new GraphQlAuthenticationException(__($e->getMessage()), $e);
        }

        if (isset($args['guest_quote_id'])) {
            $guestToken = $args['guest_quote_id'];

            $this->eventManager->dispatch('generate_customer_token_after', [
                'guest_quote_id' => $guestToken,
                'customer_token' => $customerToken
            ]);
        }

        return ['token' => $customerToken];
    }
}
