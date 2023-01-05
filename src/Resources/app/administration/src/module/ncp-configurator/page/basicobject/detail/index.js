import template from './index.html.twig';

const {Component, Mixin} = Shopware;
const {Criteria} = Shopware.Data;
const {warn} = Shopware.Utils.debug;

Component.register('ncp-configurator-basic-object-detail', {
    template,

    inject: [
        'repositoryFactory',
        // 'filterFactory'
    ],

    mixins: [
        Mixin.getByName('notification')
        // Mixin.getByName('placeholder'),
    ],

    data() {
        return {
            isLoading: null,
            // itemId: null,
            item: {}
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
            return this.repositoryFactory.create('ncp_configurator_object');
        },

        // listCriteria() {
        //     let criteria = new Criteria();
        //     criteria.addFilter(Criteria.equals('idCls', this.item.idCls));
        //
        //     return criteria;
        // }
    },

    methods: {
        createdComponent() {
            this.getItem();
        },

        getItem() {
            this.isLoading = true;
            const criteria = new Criteria();
            criteria.addAssociation('class');

            this.repository.get(this.$route.params.id, Shopware.Context.api, criteria)
                .then((item) => {
                    this.item = item;
                    this.isLoading = false;
                });
        },

        onBack() {
            history.back();
        },

        onSave() {
            this.repository.save(this.item, Shopware.Context.api).then(() => {
                this.getItem();
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
        },
    }
});

