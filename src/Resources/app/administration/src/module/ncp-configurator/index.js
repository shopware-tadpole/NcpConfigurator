import './page/basicclass/list';
import './page/basicclass/detail';
import './page/basicclass/create';

import './page/basicclasscon/list';
import './page/basicclasscon/detail';
import './page/basicclasscon/create';

import './page/basicobject/list';
import './page/basicobject/detail';
import './page/basicobject/create';

import './page/basicobjectcon/list';
import './page/basicobjectcon/detail';
import './page/basicobjectcon/create';

import deDE from './snippet/de-DE.json';

Shopware.Module.register('ncp-configurator', {
    type: 'plugin',
    name: 'Configurator',
    title: 'ncp-configurator.general.moduleTitle',
    description: 'ncp-configurator.general.moduleDescription',
    color: '#ff3d58',
    icon: 'default-shopping-paper-bag-product',

    snippets: {
        'de-DE': deDE
    },

    routes: {
        basicclasslist: {
            component: 'ncp-configurator-basic-class-list',
            path: 'basicclasslist'
        },
        basicclassdetail: {
            component: 'ncp-configurator-basic-class-detail',
            path: 'basicclassdetail/:id',
            meta: {
                parentPath: 'ncp.configurator.basicclasslist'
            }
        },
        basicclasscreate: {
            component: 'ncp-configurator-basic-class-create',
            path: 'basicclasscreate',
            meta: {
                parentPath: 'ncp.configurator.basicclasslist'
            }
        },

        basicclassconlist: {
            component: 'ncp-configurator-basic-classcon-list',
            path: 'basicclassconlist'
        },
        basicclasscondetail: {
            component: 'ncp-configurator-basic-classcon-detail',
            path: 'basicclasscondetail/:id',
            meta: {
                parentPath: 'ncp.configurator.basicclassconlist'
            }
        },
        basicclassconcreate: {
            component: 'ncp-configurator-basic-classcon-create',
            path: 'basicclassconcreate',
            meta: {
                parentPath: 'ncp.configurator.basicclassconlist'
            }
        },

        basicobjectlist: {
            component: 'ncp-configurator-basic-object-list',
            path: 'basicobjectlist'
        },
        basicobjectdetail: {
            component: 'ncp-configurator-basic-object-detail',
            path: 'basicobjectdetail/:id',
            meta: {
                parentPath: 'ncp.configurator.basicobjectlist'
            }
        },
        basicobjectcreate: {
            component: 'ncp-configurator-basic-object-create',
            path: 'basicobjectcreate',
            meta: {
                parentPath: 'ncp.configurator.basicobjectlist'
            }
        },

        basicobjectconlist: {
            component: 'ncp-configurator-basic-objectcon-list',
            path: 'basicobjectconlist'
        },
        basicobjectcondetail: {
            component: 'ncp-configurator-basic-objectcon-detail',
            path: 'basicobjectcondetail/:id',
            meta: {
                parentPath: 'ncp.configurator.basicobjectconlist'
            }
        },
        basicobjectconcreate: {
            component: 'ncp-configurator-basic-objectcon-create',
            path: 'basicobjectconcreate',
            meta: {
                parentPath: 'ncp.configurator.basicobjectconlist'
            }
        },
    },

    navigation: [
        {
            label: 'Konfigurator',
            color: '#62ff80',
            path: '',
            icon: '',
            position: 800,
            parent: 'sw-catalogue',
        },
        {
            label: 'Klassen',
            color: '#62ff80',
            path: 'ncp.configurator.basicclasslist',
            icon: 'default-shopping-paper-bag-product',
            position: 801,
            parent: 'sw-catalogue',
        },
        {
            label: 'Klassenverbindungen',
            color: '#62ff80',
            path: 'ncp.configurator.basicclassconlist',
            icon: 'default-shopping-paper-bag-product',
            position: 802,
            parent: 'sw-catalogue',
        },
        {
            label: 'Objekte',
            color: '#62ff80',
            path: 'ncp.configurator.basicobjectlist',
            icon: 'default-shopping-paper-bag-product',
            position: 803,
            parent: 'sw-catalogue',
        },
        {
            label: 'Objektverbindungen',
            color: '#62ff80',
            path: 'ncp.configurator.basicobjectconlist',
            icon: 'default-shopping-paper-bag-product',
            position: 804,
            parent: 'sw-catalogue',
        }
    ]
});
