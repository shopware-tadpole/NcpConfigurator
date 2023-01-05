<?php declare(strict_types=1);

namespace ncp\Configurator\Core\Content\Entities\Object;

use Shopware\Core\Framework\DataAbstractionLayer\EntityCollection;

/**
 * @method void                         add(ConfiguratorObjectEntity $entity)
 * @method void                         set(string $key, ConfiguratorObjectEntity $entity)
 * @method ConfiguratorObjectEntity[]    getIterator()
 * @method ConfiguratorObjectEntity[]    getElements()
 * @method ConfiguratorObjectEntity|null get(string $key)
 * @method ConfiguratorObjectEntity|null first()
 * @method ConfiguratorObjectEntity|null last()
 */
class ConfiguratorObjectCollection extends EntityCollection
{
    protected function getExpectedClass(): string
    {
        return ConfiguratorObjectEntity::class;
    }
}
