import './module/ncp-configurator';
import template from './extension/sw-product-settings-form/sw-product-settings-form.html.twig';

const {Component, Mixin} = Shopware;
const {Criteria} = Shopware.Data;
const {warn} = Shopware.Utils.debug;

Shopware.Component.override('sw-product-settings-form', {
    template,

    inject: ['repositoryFactory'],

    mixins: [
        Mixin.getByName('placeholder'),
        Mixin.getByName('notification')
    ],

    model: {
        prop: 'ids',
        event: 'change',
    },

    data() {
        return {
            isLoading: true,

            idClsConProjectGroupToProduct: null,   // ID der Classesbeziehung zw. ProjectGroup und Product
            idClsProjectGroup: null,               // ID der Class ProjectGroup
            idObjProjectGroup: null,               // ID der zugeschlüsselten oder akt. ausgewählte ProjectGroup

            idClsProduct: null,                     // ID der Class Product
            idObjProduct: this.$route.params.id,    // product.id = objects.id
            nameProduct: "",                        // product.product_number wird als Name des Objekts benutzt

            ProjectGroups: [],                     // ProjectGroups für die ComboBox, selektiertes Item ist idObjProjectGroup

            // value_min: null,
            // value_max: null,
        };
    },

    created() {
        this.getNameProduct(this.idObjProduct)
            .then((value) => {
                this.nameProduct = value;
                console.log("nameProduct: " + this.nameProduct);
            })

        this.getIdCls("ProjectGroup")
            .then((value) => {
                this.idClsProjectGroup = value;
                console.log("idClsProjectGroup: " + this.idClsProjectGroup);
            });

        this.getIdCls("Product")
            .then((value) => {
                this.idClsProduct = value;
                console.log("idClsProduct: " + this.idClsProduct);
            });

        this.getIdClsCon("ProjectGroup contains products")
            .then((value) => {
                this.idClsConProjectGroupToProduct = value;
                console.log("idClsConProjectGroupToProduct: " + this.idClsConProjectGroupToProduct);

                this.getItemObjFrom(this.idClsConProjectGroupToProduct, this.idObjProduct)
                    .then((item) => {
                        if (item !== undefined) {
                            this.idObjProjectGroup = item.idObjFrom;
                            this.value_min = item.valueMin;
                            this.value_max = item.valueMax;
                            this.value_delta = item.valueDelta;

                            console.log("idObjProjectGroup: " + this.idObjProjectGroup);
                        }
                    })
            });


        this.idObjProjectGroup = '0'
        this.ProjectGroups = [];
        this.ProjectGroups.push({
            id: this.idObjProjectGroup,
            name: 'keine Projektgruppe',
            title: 'keine Projektgruppe'
        });

        const criteriaProjectGroup = new Criteria();
        criteriaProjectGroup.addAssociation('class');
        criteriaProjectGroup.addFilter(Criteria.equals('class.name', 'ProjectGroup'));
        this.repositoryObject.search(criteriaProjectGroup, Shopware.Context.api)
            .then((items) => {
                items.forEach((item) => {
                    this.ProjectGroups.push({id: item.id, name: item.name, title: item.title});
                })
                this.isLoading = false;
            });
    },

    watch: {
        '$route.params.id'() {
            this.createdComponent();
        }
    },

    computed: {
        repositoryClass() {
            return this.repositoryFactory.create('ncp_configurator_class');
        },
        repositoryClassCon() {
            return this.repositoryFactory.create('ncp_configurator_classcon');
        },
        repositoryObject() {
            return this.repositoryFactory.create('ncp_configurator_object');
        },
        repositoryObjectCon() {
            return this.repositoryFactory.create('ncp_configurator_objectcon');
        },
        repositoryProduct() {
            return this.repositoryFactory.create('product');
        },
    },

    methods: {
        createdComponent() {
        },

        getTimestamp() {
            return new Date().toISOString().slice(0, 19).replace('T', ' ');
        },

        getIdCls(ClassName) {
            const criteria = new Criteria();
            criteria.addFilter(Criteria.equals('name', ClassName));
            return this.repositoryClass.search(criteria, Shopware.Context.api)
                .then((item) => {
                    return item[0].id;
                })
                .catch((exception) => {
                    warn(this._name, exception.message, exception.response);
                    throw exception;
                });
        },

        getIdClsCon(classConName) {
            const criteria = new Criteria();
            criteria.addFilter(Criteria.equals('name', classConName));
            return this.repositoryClassCon.search(criteria, Shopware.Context.api)
                .then((item) => {
                    return item[0].id;
                })
                .catch((exception) => {
                    warn(this._name, exception.message, exception.response);
                    throw exception;
                });
        },

        getIdObj(idCls, id) {
            const criteria = new Criteria();
            criteria.addFilter(Criteria.equals('idCls', idCls));
            criteria.addFilter(Criteria.equals('id', id));
            return this.repositoryObject.search(criteria, Shopware.Context.api)
                .then((item) => {
                    return item[0].id;
                })
                .catch((exception) => {
                    warn(this._name, exception.message, exception.response);
                    throw exception;
                });
        },

        getIdObjFrom(idClsCon, idObjTo) {
            const criteria = new Criteria();
            criteria.addFilter(Criteria.equals('idClsCon', idClsCon));
            criteria.addFilter(Criteria.equals('idObjTo', idObjTo));
            return this.repositoryObjectCon.search(criteria, Shopware.Context.api)
                .then((item) => {
                    if (item[0] === undefined)
                        return "";
                    else
                        return item[0].idObjFrom;
                })
                .catch((exception) => {
                    warn(this._name, exception.message, exception.response);
                    throw exception;
                });
        },

        getItemObjFrom(idClsCon, idObjTo) {
            const criteria = new Criteria();
            criteria.addFilter(Criteria.equals('idClsCon', idClsCon));
            criteria.addFilter(Criteria.equals('idObjTo', idObjTo));
            return this.repositoryObjectCon.search(criteria, Shopware.Context.api)
                .then((item) => {
                    return item[0];
                })
                .catch((exception) => {
                    warn(this._name, exception.message, exception.response);
                    throw exception;
                });
        },


        getNameProduct(id) {
            const criteria = new Criteria();
            criteria.addFilter(Criteria.equals('id', id));
            return this.repositoryProduct.search(criteria, Shopware.Context.api)
                .then((items) => {
                    if (items.total === 0) {
                        return "";
                    } else {
                        return items[0].translated.name;
                    }
                })
                .catch((exception) => {
                    warn(this._name, exception.message, exception.response);
                    throw exception;
                });
        },

        deleteObjects(idCls, idObj) {
            const criteria = new Criteria();
            criteria.addFilter(Criteria.equals('idCls', idCls));
            criteria.addFilter(Criteria.equals('id', idObj));
            return this.repositoryObject.search(criteria, Shopware.Context.api)
                .then((items) => {
                    items.forEach((item) => {
                        this.repositoryObject.delete(item.id, Shopware.Context.api)
                    });
                })
                .catch((exception) => {
                    warn(this._name, exception.message, exception.response);
                    throw exception;
                });
        },

        deleteObjectConnections(idClsCon, idObj) {
            let criteriaFrom = new Criteria();
            criteriaFrom.addFilter(Criteria.equals('idClsCon', idClsCon));
            criteriaFrom.addFilter(Criteria.equals('idObjFrom', idObj));
            this.repositoryObjectCon.search(criteriaFrom, Shopware.Context.api)
                .then((items) => {
                    items.forEach((item) => {
                        this.repositoryObjectCon.delete(item.id, Shopware.Context.api)
                    });
                })
                .catch((exception) => {
                    warn(this._name, exception.message, exception.response);
                    throw exception;
                });


            const criteriaTo = new Criteria();
            criteriaTo.addFilter(Criteria.equals('idClsCon', idClsCon));
            criteriaTo.addFilter(Criteria.equals('idObjTo', idObj));
            this.repositoryObjectCon.search(criteriaTo, Shopware.Context.api)
                .then((items) => {
                    items.forEach((item) => {
                        this.repositoryObjectCon.delete(item.id, Shopware.Context.api)
                    });
                })
                .catch((exception) => {
                    warn(this._name, exception.message, exception.response);
                    throw exception;
                });
        },

        insertObject(idCls, idObj, name, title) {
            const item = this.repositoryObject.create(Shopware.Context.api);
            item.idCls = idCls;
            item.id = idObj;
            item.name = name;
            item.title = title;
            item.createdAt = this.getTimestamp();
            this.repositoryObject.save(item, Shopware.Context.api)
                .then(() => {
                })
                .catch((exception) => {
                    warn(this._name, exception.message, exception.response);
                    throw exception;
                });
        },

        insertObjectConnection(idClsCon, idObjFrom, idObjTo) {
            const item = this.repositoryObjectCon.create(Shopware.Context.api);
            item.idClsCon = idClsCon;
            item.name = "";
            item.idObjFrom = idObjFrom;
            item.idObjTo = idObjTo;
            item.createdAt = this.getTimestamp();
            this.repositoryObjectCon.save(item, Shopware.Context.api)
                .then(() => {
                })
                .catch((exception) => {
                    warn(this._name, exception.message, exception.response);
                    throw exception;
                });
        },

        updateObjConProjectGroupProducts() {
            const criteriaObjCon = new Criteria();
            criteriaObjCon.addAssociation('classCon');
            criteriaObjCon.addAssociation('objFrom');
            criteriaObjCon.addAssociation('objTo');

            criteriaObjCon.addFilter(Criteria.equals('classCon.name', 'ProjectGroup contains products'));
            criteriaObjCon.addFilter(Criteria.equals('objFrom.id', this.idObjProjectGroup));
            criteriaObjCon.addFilter(Criteria.equals('objTo.id', this.idObjProduct));

            this.repositoryObjectCon.search(criteriaObjCon, Shopware.Context.api)
                .then((items) => {

                    // if (items.count() > 0) {
                    let item = items[0];
                    item.valueMin = this.value_min;
                    item.valueMax = this.value_max;
                    item.valueDelta = this.value_delta;

                    this.repositoryObjectCon.save(item, Shopware.Context.api).then(() => {
                        // this.getItem();
                        this.createNotificationSuccess({
                            title: 'Info',
                            message: 'gespeichert'
                        });
                    }).catch((exception) => {
                        this.createNotificationError({
                            title: 'Fehler',
                            message: 'beim speichern'
                        });
                        warn(this._name, exception.message, exception.response);
                        throw exception;
                    });
                });
        },

        onChangeProjectGroup(id, item) {

            if (this.idObjProjectGroup !== '0') {
                this.deleteObjectConnections(this.idClsConProductToVariant, this.idObjProduct);
                this.deleteObjectConnections(this.idClsConProjectGroupToProduct, this.idObjProduct);
                this.deleteObjects(this.idClsProduct, this.idObjProduct);
            }

            this.idObjProjectGroup = id;
            console.log("onchange ", this.idObjProjectGroup);

            if (this.idObjProjectGroup !== '0') {
                this.insertObject(this.idClsProduct, this.idObjProduct, this.nameProduct, this.nameProduct);
                this.insertObjectConnection(this.idClsConProjectGroupToProduct, this.idObjProjectGroup, this.idObjProduct);
            }
        },

        updateIds(collection) {
            this.idsSelectedVariants = collection;
            this.deleteObjectConnections(this.idClsConProductToVariant, this.idObjProduct);
            collection.forEach((item) => {
                this.insertObjectConnection(this.idClsConProductToVariant, this.idObjProduct, item);
            })
        },

        // updateDimensionMin(id) {
        //     console.log("updateDimensionMin: " + id);
        //     this.updateObjConProjectGroupProducts();
        // },
        // updateDimensionMax(id) {
        //     console.log("updateDimensionMax: " + id);
        //     this.updateObjConProjectGroupProducts();
        // },
        // updateDimensionDelta(id) {
        //     console.log("updateDimensionDelta: " + id);
        //     this.updateObjConProjectGroupProducts();
        // },
        //
        // deleteDimensions() {
        //     this.value_min = null;
        //     this.value_max = null;
        //     this.value_delta = null;
        //     this.updateObjConProjectGroupProducts();
        // }
    }
});