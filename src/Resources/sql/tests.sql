select * from ncp_configurator_class;
select * from ncp_configurator_classcon;
select * from ncp_configurator_object;
select * from ncp_configurator_objectcon;
# select * from product;

-- class connections
select classCon.name, classFrom.name, classTo.name
from ncp_configurator_classcon as classCon
         left join ncp_configurator_class as classFrom on classFrom.id = classCon.id_cls_from
         left join ncp_configurator_class as classTo on classTo.id = classCon.id_cls_to;

-- objects
select class.name, object.name
from ncp_configurator_object as object
         left join ncp_configurator_class as class on class.id = object.id_cls
order by class.name, object.name;

-- object connections
select classCon.name, objectCon.name, classFrom.name, objectFrom.name, classTo.name, objectTo.name
from ncp_configurator_objectcon as objectCon
         left join ncp_configurator_classcon as classCon on classCon.id = objectCon.id_cls_con
         left join ncp_configurator_object as objectFrom on objectFrom.id = objectCon.id_obj_from
         left join ncp_configurator_object as objectTo on objectTo.id = objectCon.id_obj_to
         left join ncp_configurator_class as classFrom on classFrom.id = objectFrom.id_cls
         left join ncp_configurator_class as classTo on classTo.id = objectTo.id_cls
order by classFrom.id, classTo.id;


-- VIA VIEWS
select cls_from_name, cls_to_name from ncpv_configurator_clscon;
select cls_from_name, obj_from_name, cls_to_name, obj_to_name from ncpv_configurator_objcon;

select cls_from_name, obj_from_name, cls_to_name, obj_to_name,
       -- fields for projectgroup to dimension
       pg_dm_value_min, pg_dm_value_max
from ncpv_configurator_objcon
where cls_from_name = 'ProjectGroup' and cls_to_name = 'Dimension';

