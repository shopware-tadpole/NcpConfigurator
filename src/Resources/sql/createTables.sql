-- ------------------
-- tables
-- ------------------
CREATE TABLE IF NOT EXISTS `ncp_configurator_class`
(
    `id`            BINARY(16)   NOT NULL,
    `name`          VARCHAR(255) NOT NULL,
    `created_at`    DATETIME(3)  NOT NULL,
    `updated_at`    DATETIME(3)  NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `ncp_configurator_classcon`
(
    `id`            BINARY(16)   NOT NULL,
    `name`          VARCHAR(255) NOT NULL,
    `id_cls_from`   BINARY(16)   NOT NULL,
    `id_cls_to`     BINARY(16)   NOT NULL,
    `created_at`    DATETIME(3)  NOT NULL,
    `updated_at`    DATETIME(3)  NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk.ncp_configurator_classcon.id_cls_from` FOREIGN KEY (`id_cls_from`) REFERENCES `ncp_configurator_class` (`id`),
    CONSTRAINT `fk.ncp_configurator_classcon.id_cls_to` FOREIGN KEY (`id_cls_to`) REFERENCES `ncp_configurator_class` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `ncp_configurator_object`
(
    `id`            BINARY(16)   NOT NULL,
    `id_cls`        BINARY(16)   NOT NULL,
    `name`          VARCHAR(255) NOT NULL, -- key
    `title`         VARCHAR(255) NOT NULL,
    `created_at`    DATETIME(3)  NOT NULL,
    `updated_at`    DATETIME(3)  NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk.ncp_configurator_object.id_cls` FOREIGN KEY (`id_cls`) REFERENCES `ncp_configurator_class` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `ncp_configurator_objectcon`
(
    `id`            BINARY(16)    NOT NULL,
    `id_cls_con`    BINARY(16)    NOT NULL,
    `name`          VARCHAR(255)  NOT NULL,
    `id_obj_from`   BINARY(16)    NOT NULL,
    `id_obj_to`     BINARY(16)    NOT NULL,

     -- Values for projecgroup to dimension (abbr. pg_dm)
    `pg_dm_value_min`     DECIMAL(7, 2) NULL, -- 12345.67
    `pg_dm_value_max`     DECIMAL(7, 2) NULL,

    `created_at`    DATETIME(3)   NOT NULL,
    `updated_at`    DATETIME(3)   NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk.ncp_configurator_objectcon.id_cls_con` FOREIGN KEY (`id_cls_con`) REFERENCES `ncp_configurator_classcon` (`id`),
    CONSTRAINT `fk.ncp_configurator_objectcon.id_obj_from` FOREIGN KEY (`id_obj_from`) REFERENCES `ncp_configurator_object` (`id`),
    CONSTRAINT `fk.ncp_configurator_objectcon.id_obj_to` FOREIGN KEY (`id_obj_to`) REFERENCES `ncp_configurator_object` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

-- ------------------
-- VIEWS
-- ------------------
create view ncpv_configurator_clscon as
select classCon.id    as cls_con_id,
       classCon.name  as cls_con_name,

       classFrom.id   as cls_from_id,
       classFrom.name as cls_from_name,

       classTo.id     as cls_to_id,
       classTo.name   as cls_to_name,

       classCon.created_at,
       classCon.updated_at

from ncp_configurator_classcon as classCon
         left join ncp_configurator_class as classFrom on classFrom.id = classCon.id_cls_from
         left join ncp_configurator_class as classTo on classTo.id = classCon.id_cls_to;

create view ncpv_configurator_objcon as
select classCon.id     as cls_con_id,
       classCon.name   as cls_con_name,

       objectCon.id    as obj_con_id,
       objectCon.name  as Obj_con_name,

       classFrom.id    as cls_from_id,
       classFrom.name  as cls_from_name,

       objectFrom.id   as obj_from_id,
       objectFrom.name as obj_from_name,

       classTo.id      as cls_to_id,
       classTo.name    as cls_to_name,

       objectTo.id     as obj_to_id,
       objectTo.name   as obj_to_name,

       # fields for projectgroupt to dimension
       pg_dm_value_min,
       pg_dm_value_max,

       classCon.created_at,
       classCon.updated_at

from ncp_configurator_objectcon as objectCon
         left join ncp_configurator_classcon as classCon on classCon.id = objectCon.id_cls_con
         left join ncp_configurator_object as objectFrom on objectFrom.id = objectCon.id_obj_from
         left join ncp_configurator_object as objectTo on objectTo.id = objectCon.id_obj_to
         left join ncp_configurator_class as classFrom on classFrom.id = objectFrom.id_cls
         left join ncp_configurator_class as classTo on classTo.id = objectTo.id_cls;
