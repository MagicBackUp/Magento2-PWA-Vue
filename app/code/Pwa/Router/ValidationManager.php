<?php
namespace Pwa\Router;

use Magento\Framework\App\RequestInterface;
use Magento\Framework\ObjectManagerInterface;
use Pwa\Router\ValidationManagerException;
use Pwa\Router\ValidationManagerInterface;
use Pwa\Router\ValidatorInterface;

class ValidationManager implements ValidationManagerInterface
{
    private $validators = [];
    private $objectManager;

    public function __construct(
        ObjectManagerInterface $objectManager,
        array $validators
    )
    {
        $this->objectManager = $objectManager;
        $this->validators = $validators;
    }

    /**
     * @param RequestInterface $request
     * @return bool
     * @throws ValidationManagerException
     */
    public function validate(RequestInterface $request): bool
    {
        $frontName = $this->getFrontName($request);

        if ($frontName === '') { // Root
            return true;
        }
        if (!array_key_exists($frontName, $this->validators)) {
            return false;
        }

        return $this->getValidatorInstance($frontName)->validateRequest($request);
    }
    
    /**
     * @param RequestInterface $request
     * @return mixed
     */
    protected function getFrontName(RequestInterface $request)
    {
        $path = trim($request->getPathInfo(), '/');
        $params = explode('/', $path);
        return reset($params);
    }

    /**
     * @param string $frontName
     * @return ValidatorInterface
     */
    protected function getValidatorInstance(string $frontName): ValidatorInterface
    {
        $validator = $this->validators[$frontName];

        return $this->getValidator($validator);
    }
    
    /**
     * @param string $validator
     * @return mixed
     */
    protected function getValidator(string $validator)
    {
        return $this->objectManager->get($validator);
    }
}
