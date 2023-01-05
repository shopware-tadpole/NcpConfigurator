-- =======================================
-- ncp configurator Tabellen und Views
-- =======================================

SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0;

drop view if exists ncpv_configurator_clscon;
drop view if exists ncpv_configurator_objcon;

drop table if exists ncp_configurator_objectcon;
drop table if exists ncp_configurator_object;
drop table if exists ncp_configurator_classcon;
drop table if exists ncp_configurator_class;


SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;