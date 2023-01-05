<?php declare(strict_types=1);

namespace ncp\Configurator\Core\Content\Entities\Object;

use ncp\Configurator\Core\Content\Entities\Class\ConfiguratorClassDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToOneAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\StringField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;

class ConfiguratorObjectDefinition extends EntityDefinition
{
    public const ENTITY_NAME = 'ncp_configurator_object';

    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new IdField('id', 'id'))->addFlags(new Required(), new PrimaryKey()),
            (new StringField('name', 'name'))->addFlags(new Required()),
            (new StringField('title', 'title'))->addFlags(new Required()),

            (new FkField('id_cls', 'idCls', ConfiguratorClassDefinition::class))->addFlags(new Required()),
            new ManyToOneAssociationField('class', 'id_cls', ConfiguratorClassDefinition::class, 'id', false),
        ]);
    }

    /**
     * @return string
     */
    public function getEntityClass(): string
    {
        return ConfiguratorObjectEntity::class;
    }

    /**
     * @return string
     */
    public function getCollectionClass(): string
    {
        return ConfiguratorObjectCollection::class;
    }
}
