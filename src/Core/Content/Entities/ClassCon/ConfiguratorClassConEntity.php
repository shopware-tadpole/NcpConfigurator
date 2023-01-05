<?php declare(strict_types=1);

namespace ncp\Configurator\Core\Content\Entities\ClassCon;

use ncp\Configurator\Core\Content\Entities\Class\ConfiguratorClassEntity;
use Shopware\Core\Framework\DataAbstractionLayer\Entity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityIdTrait;

class ConfiguratorClassConEntity extends Entity
{
    //<editor-fold desc="Classesvariablen">
    /**
     * @var string
     */
    protected string $name;

    /**
     * @var string
     */
    protected string $idClsFrom;

    /**
     * @var string
     */
    protected string $idClsTo;

    /**
     * @var ConfiguratorClassEntity|null
     */
    protected ?ConfiguratorClassEntity $clsFrom;

    /**
     * @var ConfiguratorClassEntity|null
     */
    protected ?ConfiguratorClassEntity $clsTo;
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

    public function getIdClsFrom(): string
    {
        return $this->idClsFrom;
    }

    public function setIdClsFrom(string $idClsFrom): void
    {
        $this->idClsFrom = $idClsFrom;
    }

    public function getIdClsTo(): string
    {
        return $this->idClsTo;
    }

    public function setIdClsTo(string $idClsTo): void
    {
        $this->idClsTo = $idClsTo;
    }

    /**
     * @return ConfiguratorClassEntity|null
     */
    public function getClsFrom(): ?ConfiguratorClassEntity
    {
        return $this->clsFrom;
    }

    /**
     * @param ConfiguratorClassEntity|null $clsFrom
     * @return void
     */
    public function setClsFrom(?ConfiguratorClassEntity $clsFrom): void
    {
        $this->clsFrom = $clsFrom;
    }

    /**
     * @return ConfiguratorClassEntity|null
     */
    public function getClsTo(): ?ConfiguratorClassEntity
    {
        return $this->clsTo;
    }

    /**
     * @param ConfiguratorClassEntity|null $clsTo
     * @return void
     */
    public function setClsTo(?ConfiguratorClassEntity $clsTo): void
    {
        $this->clsTo = $clsTo;
    }
    //</editor-fold>
}
