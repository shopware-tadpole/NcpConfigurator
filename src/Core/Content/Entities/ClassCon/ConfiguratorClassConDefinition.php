<?php declare(strict_types=1);

namespace ncp\Configurator\Core\Content\Entities\ClassCon;

use ncp\Configurator\Core\Content\Entities\Class\ConfiguratorClassDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\ApiAware;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToOneAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\StringField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;

class ConfiguratorClassConDefinition extends EntityDefinition
{
    public const ENTITY_NAME = 'ncp_configurator_classcon';

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

            (new FkField('id_cls_from', 'idClsFrom', ConfiguratorClassDefinition::class))->addFlags(new Required()),
            new ManyToOneAssociationField('clsFrom', 'id_cls_from', ConfiguratorClassDefinition::class, 'id', false),

            (new FkField('id_cls_to', 'idClsTo', ConfiguratorClassDefinition::class))->addFlags(new Required()),
            new ManyToOneAssociationField('clsTo', 'id_cls_to', ConfiguratorClassDefinition::class, 'id', false),

        ]);
    }

    /**
     * @return string
     */
    public function getEntityClass(): string
    {
        return ConfiguratorClassConEntity::class;
    }

    /**
     * @return string
     */
    public function getCollectionClass(): string
    {
        return ConfiguratorClassConCollection::class;
    }
}
