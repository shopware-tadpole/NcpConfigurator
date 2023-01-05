<?php declare(strict_types=1);

namespace ncp\Configurator\Core\Content\Entities\ObjectCon;

use ncp\Configurator\Core\Content\Entities\ClassCon\ConfiguratorClassConDefinition;
use ncp\Configurator\Core\Content\Entities\Object\ConfiguratorObjectDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToOneAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\StringField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FloatField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;

class ConfiguratorObjectConDefinition extends EntityDefinition
{
    public const ENTITY_NAME = 'ncp_configurator_objectcon';

    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new IdField('id', 'id'))->addFlags(new Required(), new PrimaryKey()),

            new StringField('name', 'name'),

            (new FloatField('pg_dm_value_min', 'pg_dm_valueMin')),
            (new FloatField('pg_dm_value_max', 'pg_dm_valueMax')),

            (new FkField('id_cls_con', 'idClsCon', ConfiguratorClassConDefinition::class))->addFlags(new Required()),
            new ManyToOneAssociationField('classCon', 'id_cls_con', ConfiguratorClassConDefinition::class, 'id', false),

            (new FkField('id_obj_from', 'idObjFrom', ConfiguratorObjectDefinition::class))->addFlags(new Required()),
            new ManyToOneAssociationField('objFrom', 'id_obj_from', ConfiguratorObjectDefinition::class, 'id'),

            (new FkField('id_obj_to', 'idObjTo', ConfiguratorObjectDefinition::class))->addFlags(new Required()),
            new ManyToOneAssociationField('objTo', 'id_obj_to', ConfiguratorObjectDefinition::class, 'id'),
        ]);
    }

    /**
     * @return string
     */
    public function getEntityClass(): string
    {
        return ConfiguratorObjectConEntity::class;
    }

    /**
     * @return string
     */
    public function getCollectionClass(): string
    {
        return ConfiguratorObjectConCollection::class;
    }
}
