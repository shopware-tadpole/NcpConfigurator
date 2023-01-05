// src/Resources/app/storefront/src/main.js
// import all necessary storefront plugins
import ConfiguratorTabFixPlugin from "./js/ncp-configurator-tab-fix.plugin";
import AddConfiguratorToCartPlugin from "./js/ncp-configurator-add-to-cart.plugin";

// register them via the existing PluginManager
const PluginManager = window.PluginManager;
// Register Plugin
PluginManager.override('CrossSelling', ConfiguratorTabFixPlugin, '[data-cross-selling]');
PluginManager.register('AddConfiguratorToCart', AddConfiguratorToCartPlugin, '[data-add-configurator-to-cart]');

// Necessary for the webpack hot module reloading server
if (module.hot) {
    module.hot.accept();
}
