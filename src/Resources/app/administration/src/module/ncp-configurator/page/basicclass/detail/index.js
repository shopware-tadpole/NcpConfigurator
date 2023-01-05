import template from './index.html.twig';

const {Component, Mixin, Data: {Criteria}} = Shopware;
const {warn} = Shopware.Utils.debug;

Component.register('ncp-configurator-basic-class-detail', {
    template,

    inject: ['repositoryFactory'],

    mixins: [
        Mixin.getByName('notification')
    ],

    data() {
        return {
            item: null,
            isLoading: false
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
            return this.repositoryFactory.create('ncp_configurator_class');
        },
    },

    methods: {
        createdComponent() {
            this.getItem();
        },

        getItem() {
            this.isLoading = true;
            const criteria = new Criteria();

            this.repository.get(this.$route.params.id, Shopware.Context.api, criteria)
                .then((item) => {
                    this.item = item;
                    this.isLoading = false;
                });
        },

        onBack() {
            history.back(); // defined in index.js > router: meta: { parentPath: 'ncp.configurator.basicclasslist' }
        },

        onSave() {
            this.repository.save(this.item, Shopware.Context.api).then(() => {
                this.getItem();
                this.createNotificationSuccess({
                    title: this.$tc('Info'),
                    message: this.$tc('gespeichert')
                });
            }).catch((exception) => {
                this.createNotificationError({
                    title: this.$tc('Fehler'),
                    message: this.$tc('beim Speichern')
                });
                warn(this._name, exception.message, exception.response);
                throw exception;
            });
        },
    }
});
