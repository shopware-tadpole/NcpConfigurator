<?php declare(strict_types=1);

namespace ncp\Configurator\Core\Content\Entities\Class;

use Shopware\Core\Framework\DataAbstractionLayer\Entity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityIdTrait;

class ConfiguratorClassEntity extends Entity
{
    //<editor-fold desc="Classesvariablen">
    /**
     * @var string
     */
    protected string $name;
    //</editor-fold>

    //<editor-fold desc="Methoden">
    use EntityIdTrait;

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }
    //</editor-fold>
}
