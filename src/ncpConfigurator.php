<?php declare(strict_types=1);

namespace ncp\Configurator;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Plugin;
use Shopware\Core\Framework\Plugin\Context\InstallContext;
use Shopware\Core\Framework\Plugin\Context\UninstallContext;

class ncpConfigurator extends Plugin
{
    public function install(InstallContext $installContext): void
    {
        parent::install($installContext);

        $connection = $this->container->get(Connection::class);

        $sql = file_get_contents($this->getPath() . '/Resources/sql/createTables.sql');
        $connection->executeStatement($sql);

        $sql = file_get_contents($this->getPath() . '/Resources/sql/insertData.sql');
        $connection->executeStatement($sql);
    }

    public function uninstall(UninstallContext $context): void
    {
        parent::uninstall($context);

        if ($context->keepUserData()) {
            return;
        }

        $connection = $this->container->get(Connection::class);
        $sql = file_get_contents($this->getPath() . '/Resources/sql/deleteTables.sql');
        $connection->executeStatement($sql);
    }

}