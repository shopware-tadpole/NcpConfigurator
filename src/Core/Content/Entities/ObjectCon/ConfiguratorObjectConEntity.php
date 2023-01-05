<?php declare(strict_types=1);

namespace ncp\Configurator\Core\Content\Entities\ObjectCon;

use ncp\Configurator\Core\Content\Entities\ClassCon\ConfiguratorClassConEntity;
use ncp\Configurator\Core\Content\Entities\Object\ConfiguratorObjectEntity;
use Shopware\Core\Framework\DataAbstractionLayer\Entity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityIdTrait;

class ConfiguratorObjectConEntity extends Entity
{
    //<editor-fold desc="Classesvariablen">
    /**
     * @var string
     */
    protected string $idClsCon;

    /**
     * @var string
     */
    protected string $name;

    /**
     * @var string
     */
    protected string $idObjFrom;

    /**
     * @var string
     */
    protected string $idObjTo;

    protected float $valueMin;
    protected float $valueMax;
    protected float $valueDelta;
    protected float $valueVariant;

    /**
     * @var ConfiguratorClassConEntity|null
     */
    protected ?ConfiguratorClassConEntity $classCon;

    /**
     * @var ConfiguratorObjectEntity|null
     */
    protected ?ConfiguratorObjectEntity $objFrom;

    /**
     * @var ConfiguratorObjectEntity|null
     */
    protected ?ConfiguratorObjectEntity $objTo;
    //</editor-fold>

    //<editor-fold desc="Methoden">
    use EntityIdTrait;

    public function getIdClsCon(): string
    {
        return $this->idClsCon;
    }

    public function setIdClsCon(string $idClsCon): void
    {
        $this->idClsCon = $idClsCon;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getIdObjFrom(): string
    {
        return $this->idObjFrom;
    }

    public function setIdObjFrom(string $idObjFrom): void
    {
        $this->idObjFrom = $idObjFrom;
    }

    public function getIdObjTo(): string
    {
        return $this->idObjTo;
    }

    public function setIdObjTo(string $idObjTo): void
    {
        $this->idObjTo = $idObjTo;
    }

    public function setValueMin(float $valueMin): void
    {
        $this->valueMin = $valueMin;
    }

    public function getValueMax(): float
    {
        return $this->valueMax;
    }

    public function setValueMax(float $valueMax): void
    {
        $this->valueMax = $valueMax;
    }

    public function getValueDelta(): float
    {
        return $this->valueDelta;
    }

    public function setValueDelta(float $valueDelta): void
    {
        $this->valueDelta = $valueDelta;
    }

    public function getValueVariant(): float
    {
        return $this->valueVariant;
    }

    public function setValueVariant(float $valueVariant): void
    {
        $this->valueVariant = $valueVariant;
    }

    /**
     * @return ConfiguratorClassConEntity|null
     */
    public function getClassCon(): ?ConfiguratorClassConEntity
    {
        return $this->classCon;
    }

    /**
     * @param ConfiguratorClassConEntity|null $classCon
     * @return void
     */
    public function setClassCon(?ConfiguratorClassConEntity $classCon): void
    {
        $this->classCon = $classCon;
    }

    /**
     * @return ConfiguratorObjectEntity|null
     */
    public function getObjFrom(): ?ConfiguratorObjectEntity
    {
        return $this->objFrom;
    }

    /**
     * @param ConfiguratorObjectEntity|null $objFrom
     * @return void
     */
    public function setObjFrom(?ConfiguratorObjectEntity $objFrom): void
    {
        $this->objFrom = $objFrom;
    }

    /**
     * @return ConfiguratorObjectEntity|null
     */
    public function getObjTo(): ?ConfiguratorObjectEntity
    {
        return $this->objTo;
    }

    /**
     * @param ConfiguratorObjectEntity|null $objTo
     * @return void
     */
    public function setObjTo(?ConfiguratorObjectEntity $objTo): void
    {
        $this->objTo = $objTo;
    }
    //</editor-fold>
}
