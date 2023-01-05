-- -------------------
-- Classes
-- -------------------
set @clsId_ProjectGroup = (select UNHEX(REPLACE(uuid(), '-', '')));
set @clsId_dimension = (select UNHEX(REPLACE(uuid(), '-', '')));
set @clsId_Product = (select UNHEX(REPLACE(uuid(), '-', '')));

insert into ncp_configurator_class (id, name, created_at, updated_at)
    value (@clsId_ProjectGroup, 'ProjectGroup', now(), null);
insert into ncp_configurator_class (id, name, created_at, updated_at)
    value (@clsId_dimension, 'Dimension', now(), null);
insert into ncp_configurator_class (id, name, created_at, updated_at)
    value (@clsId_Product, 'Product', now(), null);

-- -------------------
-- ClassesConnections
-- -------------------
set @clsconId_ProjectGroup_dimension = (select UNHEX(REPLACE(uuid(), '-', '')));
set @clsconId_ProjectGroup_Product = (select UNHEX(REPLACE(uuid(), '-', '')));

insert into ncp_configurator_classcon (id, name, id_cls_from, id_cls_to, created_at, updated_at)
    value (@clsconId_ProjectGroup_dimension, 'ProjectGroup contains dimensions', @clsId_ProjectGroup,
           @clsId_dimension, now(), null);
insert into ncp_configurator_classcon (id, name, id_cls_from, id_cls_to, created_at, updated_at)
    value (@clsconId_ProjectGroup_Product, 'ProjectGroup contains products', @clsId_ProjectGroup, @clsId_Product,
           now(), null);

-- -------------------
-- Objects
-- -------------------

-- projectgroup
set @objId_ProjectGroup_Balcony = (select UNHEX(REPLACE(uuid(), '-', '')));
set @objId_ProjectGroup_WindowGrid = (select UNHEX(REPLACE(uuid(), '-', '')));

insert into ncp_configurator_object (id, id_cls, name, title, created_at, updated_at)
values (@objId_ProjectGroup_Balcony, @clsId_ProjectGroup, 'Balcony railings', 'Balcony railings', now(), null),
       (@objId_ProjectGroup_windowGrid, @clsId_ProjectGroup, 'window grid', 'Window grid', now(), null);

-- dimensionen
set @objId_dimension_Length = (select UNHEX(REPLACE(uuid(), '-', '')));
set @objId_dimension_Height = (select UNHEX(REPLACE(uuid(), '-', '')));
set @objId_dimension_Width = (select UNHEX(REPLACE(uuid(), '-', '')));

insert into ncp_configurator_object (id, id_cls, name, title, created_at, updated_at)
values (@objId_dimension_Length, @clsId_dimension, 'Length', 'Length', now(), null),
       (@objId_dimension_Height, @clsId_dimension, 'Height', 'Height', now(), null),
       (@objId_dimension_Width, @clsId_dimension, 'Width', 'Width', now(), null);

-- -------------------
-- Object connections
-- -------------------
set @objId_ProjectGroup_balcony_to_dimension_Length = (select UNHEX(REPLACE(uuid(), '-', '')));
set @objId_ProjectGroup_balcony_to_dimension_Height = (select UNHEX(REPLACE(uuid(), '-', '')));
set @objId_ProjectGroup_balcony_to_dimension_Width = (select UNHEX(REPLACE(uuid(), '-', '')));

set @objId_ProjectGroup_windowgrid_to_dimension_Length = (select UNHEX(REPLACE(uuid(), '-', '')));
set @objId_ProjectGroup_windowgrid_to_dimension_Height = (select UNHEX(REPLACE(uuid(), '-', '')));
set @objId_ProjectGroup_windowgrid_to_dimension_Width = (select UNHEX(REPLACE(uuid(), '-', '')));

insert into ncp_configurator_objectcon (id, id_cls_con, name, id_obj_from, id_obj_to,
                                        -- Values for projecgroup to dimension (abbr. pg_dm)
                                        pg_dm_value_min, pg_dm_value_max,
                                        created_at, updated_at)
values
    -- balcony
    (@objId_ProjectGroup_balcony_to_dimension_Length, @clsconId_ProjectGroup_dimension, '', @objId_ProjectGroup_Balcony,
     @objId_dimension_Length, 1, 10, now(), null),
    (@objId_ProjectGroup_balcony_to_dimension_Height, @clsconId_ProjectGroup_dimension, '', @objId_ProjectGroup_Balcony,
     @objId_dimension_Height, 2, 11, now(), null),
    (@objId_ProjectGroup_balcony_to_dimension_Width, @clsconId_ProjectGroup_dimension, '', @objId_ProjectGroup_Balcony,
     @objId_dimension_Width, 3, 12, now(), null),

    -- window grid
    (@objId_ProjectGroup_windowgrid_to_dimension_Length, @clsconId_ProjectGroup_dimension, '', @objId_ProjectGroup_WindowGrid,
     @objId_dimension_Length, 20, 30, now(), null),
    (@objId_ProjectGroup_windowgrid_to_dimension_Height, @clsconId_ProjectGroup_dimension, '', @objId_ProjectGroup_WindowGrid,
     @objId_dimension_Height, 30, 40, now(), null),
    (@objId_ProjectGroup_windowgrid_to_dimension_Width, @clsconId_ProjectGroup_dimension, '', @objId_ProjectGroup_WindowGrid,
     @objId_dimension_Width, 20, 50, now(), null);
