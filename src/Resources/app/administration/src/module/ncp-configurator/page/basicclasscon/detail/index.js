import template from './index.html.twig';

const {Component, Mixin, Data: {Criteria}} = Shopware;
const {warn} = Shopware.Utils.debug;

Component.register('ncp-configurator-basic-classcon-detail', {
    template,

    inject: ['repositoryFactory'],

    mixins: [
        Mixin.getByName('notification'),
    ],

    data() {
        return {
            idItem: null,
            item: null,
            isLoading: null
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
            return this.repositoryFactory.create('ncp_configurator_classcon');
        },

    },

    methods: {
        createdComponent() {
            if (this.$route.params.id) {
                this.idItem = this.$route.params.id;
            }
            this.getItem();
        },

        getItem() {
            this.isLoading = true;
            const criteria = new Criteria();

            this.repository.get(this.idItem, Shopware.Context.api, criteria)
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
