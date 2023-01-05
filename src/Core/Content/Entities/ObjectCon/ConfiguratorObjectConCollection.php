<?php declare(strict_types=1);

namespace ncp\Configurator\Core\Content\Entities\ObjectCon;

use Shopware\Core\Framework\DataAbstractionLayer\EntityCollection;

/**
 * @method void                         add(ConfiguratorObjectConEntity $entity)
 * @method void                         set(string $key, ConfiguratorObjectConEntity $entity)
 * @method ConfiguratorObjectConEntity[]    getIterator()
 * @method ConfiguratorObjectConEntity[]    getElements()
 * @method ConfiguratorObjectConEntity|null get(string $key)
 * @method ConfiguratorObjectConEntity|null first()
 * @method ConfiguratorObjectConEntity|null last()
 */
class ConfiguratorObjectConCollection extends EntityCollection
{
    protected function getExpectedClass(): string
    {
        return ConfiguratorObjectConEntity::class;
    }
}
