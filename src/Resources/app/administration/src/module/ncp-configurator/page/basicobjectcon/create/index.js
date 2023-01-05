import template from './index.html.twig';

const {Component, Mixin} = Shopware;
const {Criteria} = Shopware.Data;
const {warn} = Shopware.Utils.debug;

Component.register('ncp-configurator-basic-objectcon-create', {
    template,

    inject: ['repositoryFactory'],

    mixins: [
        Mixin.getByName('placeholder'),
        Mixin.getByName('notification')
    ],

    data() {
        return {
            // Flags zur Steuerung der Sichtbarkeit der Komponenten
            isLoading: false,
            isClassConSelected: false,
            isObjFromSelected: false,
            isObjToSelected: false,

            // Filter
            criteriaObjFrom: null,
            criteriaObjTo: null,
            criteriaObjCon: null,

            // // Parameter für Single Select Komponenten
            // idClsCon: 0,                // v-model / sw-entity-single-select
            // idObjFrom: 0,               // v-model / sw-entity-single-select
            // idObjTo: 0,                 // v-model / sw-entity-single-select
            item: {},

            // // Parameter für Multi Select Komponente
            // idToObjectsSelectedOld: [],    // ursprüngliche KindObjekte
            // idToObjectsSelectedNew: [],    // v-model / sw-entity-multi-id-select

            // Parameter aus onChange
            itemClassCon: null,         // onChangeClassCon()
            itemObjFrom: null,          // onChangeObjFrom()
        };
    },

    created() {
        this.createdComponent();
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
    },

    methods: {
        createdComponent() {
            if (this.$route.params.id) {
                this.itemId = this.$route.params.id;
            }
            this.getItem();
        },


        onChangeClassCon(idClassCon, itemClassCon) {
            this.isObjFromSelected = false;
            this.isObjToSelected = false;

            this.itemClassCon = itemClassCon;

            this.criteriaObjFrom = new Criteria();
            this.criteriaObjFrom.addFilter(Criteria.equals('idCls', itemClassCon.idClsFrom));

            this.criteriaObjTo = new Criteria();
            this.criteriaObjTo.addFilter(Criteria.equals('idCls', itemClassCon.idClsTo));

            this.isClassConSelected = true;
        },

        // onChangeObjFrom(idObjFrom, itemObjFrom) {
        //     this.isObjToSelected = false;
        //
        //     this.itemObjFrom = itemObjFrom;
        //
        //     this.criteriaObjCon = new Criteria();
        //     this.criteriaObjCon.addFilter(
        //         Criteria.multi(
        //             'AND', [
        //                 Criteria.equals('idClsCon', this.itemClassCon.id),
        //                 Criteria.equals('idObjFrom', this.itemObjFrom.id),
        //             ]));
        //
        //     this.idToObjectsSelectedNew = [];
        //     this.idToObjectsSelectedOld = [];
        //     try {
        //         this.repositoryObjectCon.search(this.criteriaObjCon).then((items) => {
        //             items.forEach((item) => {
        //                 this.idToObjectsSelectedNew.push(item.idObjTo)
        //                 this.idToObjectsSelectedOld.push(item.idObjTo)
        //             })
        //         })
        //     } catch (e) {
        //         throw new Error(e);
        //     } finally {
        //         this.isObjFromSelected = true;
        //     }
        //
        //
        //     // // Bei productsn nur die Anzeigen, die nicht bereits als KindObjekte verwendet werden
        //     // this.criteriaObjTo = new Criteria();
        //     // this.criteriaObjTo.addFilter(Criteria.equals('idCls', this.itemClassCon.idClsTo));
        // },

        onBack() {
            history.back();
        },


        getItem() {
            this.item = this.repositoryObjectCon.create(Shopware.Context.api);
        },

        onSave() {
            this.isLoading = true;
            debugger;
            this.repositoryObjectCon
                .save(this.item, Shopware.Context.api)
                .then(() => {
                    this.isLoading = false;
                    this.$router.push({name: 'ncp.configurator.basicobjectcondetail', params: {id: this.item.id}});
                }).catch((exception) => {
                this.isLoading = false;

                let messageSaveError = '';
                let errorStack = exception.response.data.errors;
                errorStack.forEach(error => {
                    messageSaveError = messageSaveError + '<br>' + error.detail
                });

                this.createNotificationError({
                    title: 'Fehler',
                    message: messageSaveError
                });
            });
        }

        // onSave() {
        //     // this.isLoading = false;
        //     // this.isSaveSuccessful = true;
        //
        //     // Gelöschte KindObjekte aus der Datenbank entfernen
        //     this.idToObjectsSelectedOld.forEach((item) => {
        //         if (!this.idToObjectsSelectedNew.includes(item)) {
        //             let criteria = new Criteria();
        //             criteria.addFilter(
        //                 Criteria.multi(
        //                     'AND', [
        //                         Criteria.equals('idClsCon', this.itemClassCon.id),
        //                         Criteria.equals('idObjFrom', this.itemObjFrom.id),
        //                         Criteria.equals('idObjTo', item),
        //                     ]));
        //
        //             this.repositoryObjectCon.search(criteria).then((items) => {
        //                 items.forEach((item) => {
        //                     this.repositoryObjectCon.delete(item.id)
        //                         .then(() => {
        //                             // this.isLoading = false;
        //                             // this.isSaveSuccessful = true;
        //                         })
        //                         .catch(() => {
        //                             // this.isLoading = false;
        //                         });
        //                 })
        //             })
        //         }
        //     });
        //
        //     // Hinzugefügte KindObjekte in die Datenbank einfügen
        //     this.idToObjectsSelectedNew.forEach((item) => {
        //         if (!this.idToObjectsSelectedOld.includes(item)) {
        //             const newObjectCon = this.repositoryObjectCon.create();
        //             newObjectCon.idClsCon = this.itemClassCon.id;
        //             newObjectCon.idObjFrom = this.itemObjFrom.id;
        //             newObjectCon.idObjTo = item;
        //             // console.log("insert " + JSON.stringify(newObjectCon));
        //
        //             this.repositoryObjectCon.save(newObjectCon)
        //                 .then(() => {
        //                     // this.isLoading = false;
        //                     // this.isSaveSuccessful = true;
        //                 })
        //                 .catch(() => {
        //                     // this.isLoading = false;
        //                 });
        //         }
        //     });
        // },
    }
});

