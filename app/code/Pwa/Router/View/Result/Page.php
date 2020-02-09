<?php
namespace Pwa\Router\View\Result;

use Magento\Framework;
use Magento\Framework\View;
use Magento\Framework\View\Result\Page as ExtendedPage;

class Page extends ExtendedPage
{
    protected $pageLayout;
    protected $pageConfig;
    protected $pageConfigRenderer;
    protected $pageConfigRendererFactory;
    protected $pageLayoutReader;
    protected $viewFileSystem;
    protected $viewVars;
    protected $template;
    protected $request;
    protected $assetRepo;
    protected $logger;
    protected $urlBuilder;
    private $entitySpecificHandlesList;
    private $action;

    public function __construct(
        View\Element\Template\Context $context,
        View\LayoutFactory $layoutFactory,
        View\Layout\ReaderPool $layoutReaderPool,
        Framework\Translate\InlineInterface $translateInline,
        View\Layout\BuilderFactory $layoutBuilderFactory,
        View\Layout\GeneratorPool $generatorPool,
        View\Page\Config\RendererFactory $pageConfigRendererFactory,
        View\Page\Layout\Reader $pageLayoutReader,
        $template,
        $isIsolated = false,
        View\EntitySpecificHandlesList $entitySpecificHandlesList = null,
        $action = null
    ) {
        parent::__construct(
            $context,
            $layoutFactory,
            $layoutReaderPool,
            $translateInline,
            $layoutBuilderFactory,
            $generatorPool,
            $pageConfigRendererFactory,
            $pageLayoutReader,
            $template,
            $isIsolated,
            $entitySpecificHandlesList
        );
        $this->action = $action;
    }

    /**
     * Set action type
     *
     * @param string
     * @return \Magento\Framework\View\Result\Page
     */
    public function setAction(string $actionType)
    {
        if($this->action === null) {
            $this->action = $actionType;
            return $this;
        }

        return null;
    }

    /**
     * Retrieve action type
     *
     * @return  string
     */
    public function getAction()
    {
        return $this->action;
    }

}
