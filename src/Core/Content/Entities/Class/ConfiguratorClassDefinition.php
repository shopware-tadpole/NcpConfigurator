<?php declare(strict_types=1);

namespace ncp\Configurator\Core\Content\Entities\Class;

use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\ApiAware;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\StringField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;

class ConfiguratorClassDefinition extends EntityDefinition
{
    public const ENTITY_NAME = 'ncp_configurator_class';

    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new IdField('id', 'id'))
                ->addFlags(new Required(), new PrimaryKey()),
            (new StringField('name', 'name'))
                ->addFlags(new ApiAware(), new Required()),
        ]);
    }

    /**
     * @return string
     */
    public function getEntityClass(): string
    {
        return ConfiguratorClassEntity::class;
    }

    /**
     * @return string
     */
    public function getCollectionClass(): string
    {
        return ConfiguratorClassCollection::class;
    }
}
