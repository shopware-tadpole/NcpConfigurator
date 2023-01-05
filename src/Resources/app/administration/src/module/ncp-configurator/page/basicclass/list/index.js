import template from './index.html.twig';

const {Component} = Shopware;
const {Criteria} = Shopware.Data;

Component.register('ncp-configurator-basic-class-list', {
    template,

    inject: ['repositoryFactory'],

    snippets: {
        'de-DE': '../snippet/de-DE'
    },

    data() {
        return {
            isLoading: false,
            criteria: null,
            items: null,
            term: this.$route.query ? this.$route.query.term : null
        };
    },

    computed: {
        columns() {
            return [
                {
                    property: 'name',
                    dataIndex: 'name',
                    label: 'Name',
                },
            ];
        },

        repository() {
            return this.repositoryFactory.create('ncp_configurator_class');
        }
    },

    created() {
        this.isLoading = true;

        this.criteria = new Criteria();
        this.criteria.addSorting(Criteria.sort('name', 'ASC'));

        if (this.term) {
            this.criteria.setTerm(this.term);
        }

        this.repository
            .search(this.criteria, Shopware.Context.api)
            .then((results) => {
                this.items = results;
                this.isLoading = false;
            });
    },

    methods: {
        onSearch(term) {
            this.criteria.setTerm(term);
            this.$route.query.term = term;
            this.$refs.listing.doSearch();
        }
    }
});
