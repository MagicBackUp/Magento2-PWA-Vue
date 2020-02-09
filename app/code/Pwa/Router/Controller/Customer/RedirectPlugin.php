<?php
namespace Pwa\Router\Controller\Customer;

use Magento\Customer\Controller\Account\Confirm;
use \Magento\Framework\Controller\Result\Redirect;
use Magento\Framework\UrlInterface;


class RedirectPlugin
{
    /**
     * @var UrlInterface
     */
    protected $urlModel;
    
    /**
     * ValidateRedirect constructor.
     * @param UrlInterface $urlModel
     */
    public function __construct(UrlInterface $urlModel)
    {
        $this->urlModel = $urlModel;
    }
    
    /**
     * @param Confirm  $subject
     * @param Redirect $result
     * @return Redirect
     */
    public function afterExecute(Confirm $subject, $result)
    {
        return $result->setPath($this->urlModel->getBaseUrl());
    }
}