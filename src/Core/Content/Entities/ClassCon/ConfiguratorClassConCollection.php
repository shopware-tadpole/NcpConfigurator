<?php declare(strict_types=1);

namespace ncp\Configurator\Core\Content\Entities\ClassCon;

use Shopware\Core\Framework\DataAbstractionLayer\EntityCollection;

/**
 * @method void                         add(ConfiguratorClassConEntity $entity)
 * @method void                         set(string $key, ConfiguratorClassConEntity $entity)
 * @method ConfiguratorClassConEntity[]    getIterator()
 * @method ConfiguratorClassConEntity[]    getElements()
 * @method ConfiguratorClassConEntity|null get(string $key)
 * @method ConfiguratorClassConEntity|null first()
 * @method ConfiguratorClassConEntity|null last()
 */
class ConfiguratorClassConCollection extends EntityCollection
{
    protected function getExpectedClass(): string
    {
        return ConfiguratorClassConEntity::class;
    }
}
