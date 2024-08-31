<?php

declare(strict_types=1);

namespace Application;

use Laminas\EventManager\EventInterface;
use Laminas\ModuleManager\Feature\BootstrapListenerInterface;
use Laminas\ModuleManager\Feature\ConfigProviderInterface;

class Module implements BootstrapListenerInterface, ConfigProviderInterface
{
    /**
     * {@inheritdoc}
     */
    public function getConfig(): array
    {
        /** @var array $config */
        $config = include __DIR__ . '/../config/module.config.php';
        return $config;
    }

    /**
     * {@inheritdoc}
     * 
     * @param \Laminas\Mvc\MvcEvent $e
     */
    public function onBootstrap(EventInterface $e)
    {
    }
}