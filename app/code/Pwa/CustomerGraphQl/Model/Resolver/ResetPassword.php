<?php
declare(strict_types=1);

namespace Pwa\CustomerGraphQl\Model\Resolver;

use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Exception\GraphQlInputException;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Magento\Customer\Model\Session;
use Magento\Customer\Api\AccountManagementInterface;

class ResetPassword implements ResolverInterface {
    const STATUS_PASSWORDS_MISS_MATCH = 'passwords_miss_match';
    const STATUS_PASSWORD_MISSING = 'missing_password';
    const STATUS_PASSWORD_UPDATED = 'password_updated';

    /**
     * @var AccountManagementInterface
     */
    protected $accountManagement;

    /**
     * @var Session
     */
    protected $session;

    public function __construct(
        Session $customerSession,
        AccountManagementInterface $accountManagement
    ) {
        $this->session = $customerSession;
        $this->accountManagement = $accountManagement;
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
        $resetPasswordToken = $args['token'];
        $password = $args['password'];
        $passwordConfirmation = $args['password_confirmation'];

        if ($password !== $passwordConfirmation) {
            return [
                'token' => $resetPasswordToken,
                'status' => self::STATUS_PASSWORDS_MISS_MATCH
            ];
        }

        if (iconv_strlen($password) <= 0) {
            return [
                'token' => $resetPasswordToken,
                'status' => self::STATUS_PASSWORD_MISSING
            ];
        }

        try {
            $this->accountManagement->resetPassword(null, $resetPasswordToken, $password);
            $this->session->unsRpToken();
            return [ 'status' => self::STATUS_PASSWORD_UPDATED ];
        } catch (InputException $e) {
            throw new GraphQlInputException(__($e->getMessage()));
        } catch (\Exception $exception) {
            throw new GraphQlInputException(__('Something went wrong while saving the new password.'));
        }
    }
}