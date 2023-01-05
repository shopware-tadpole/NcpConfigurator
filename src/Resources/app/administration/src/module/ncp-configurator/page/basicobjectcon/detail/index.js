import template from './index.html.twig';

const {Component, Mixin} = Shopware;
const {Criteria} = Shopware.Data;
const {warn} = Shopware.Utils.debug;

Component.register('ncp-configurator-basic-objectcon-detail', {
    template,

    inject: ['repositoryFactory'],

    mixins: [
        Mixin.getByName('placeholder'),
        Mixin.getByName('notification')
    ],

    data() {
        return {
            isLoading: false,
            itemId: null,
            item: {},

            // itemClassCon: null,

            // Filter
            criteriaObjFrom: null,
            criteriaObjTo: null,

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
        repository() {
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

        getItem() {
            this.isLoading = true;
            const criteria = new Criteria();
            criteria.addAssociation('classCon');
            criteria.addAssociation('objFrom');
            criteria.addAssociation('objTo');

            this.repository.get(this.itemId, Shopware.Context.api, criteria)
                .then((item) => {
                    this.item = item;

                    // debugger;
                    let itemClassCon = item.classCon;

                    this.criteriaObjFrom = new Criteria();
                    this.criteriaObjFrom.addFilter(Criteria.equals('idCls', itemClassCon.idClsFrom));

                    this.criteriaObjTo = new Criteria();
                    this.criteriaObjTo.addFilter(Criteria.equals('idCls', itemClassCon.idClsTo));


                    this.isLoading = false;
                });
        },

        onBack() {
            history.back();
        },

        onSave() {
            this.repository.save(this.item, Shopware.Context.api).then(() => {

                this.createNotificationSuccess({
                    title: 'Info',
                    message: 'gespeichert'
                });
            }).catch((exception) => {
                this.createNotificationError({
                    title: 'Fehler',
                    message: 'beim Speichern'
                });
                warn(this._name, exception.message, exception.response);
                throw exception;
            });
        },
    }
});

