-- =======================================
-- ncp configurator Tabellen und Views
-- =======================================

SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0;

truncate ncp_configurator_objectcon;
truncate ncp_configurator_object;
truncate ncp_configurator_classcon;
truncate ncp_configurator_class;

SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;