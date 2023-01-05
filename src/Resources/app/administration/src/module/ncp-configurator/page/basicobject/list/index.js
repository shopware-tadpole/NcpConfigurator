import template from './index.html.twig';

const {Component} = Shopware;
const {Criteria} = Shopware.Data;

Component.register('ncp-configurator-basic-object-list', {
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
                    property: 'class',
                    label: 'Class',
                    dataIndex: 'class.name',
                    routerLink: 'ncp.configurator.basicclass.detail'
                },
                {
                    property: 'name',
                    dataIndex: 'name',
                    label: 'Name',
                },
                {
                    property: 'title',
                    dataIndex: 'title',
                    label: 'Name',
                },
            ];
        },

        repository() {
            return this.repositoryFactory.create('ncp_configurator_object');
        }
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.criteria = new Criteria();
            this.criteria.addAssociation('class');
            this.criteria.addSorting(Criteria.sort('class.name', 'ASC'));

            if (this.term) {
                this.criteria.setTerm(this.term);
            }

            this.isLoading = true;

            this.repository
                .search(this.criteria, Shopware.Context.api)
                .then((results) => {
                    this.items = results;
                    this.isLoading = false;
                });
        },

        onSearch(term) {
            this.criteria.setTerm(term);
            this.$route.query.term = term;
            this.$refs.listing.doSearch();
        }
    }
});
