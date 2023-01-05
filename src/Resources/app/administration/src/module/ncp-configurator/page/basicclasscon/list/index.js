import template from './index.html.twig';

const {Component} = Shopware;
const {Criteria} = Shopware.Data;

Component.register('ncp-configurator-basic-classcon-list', {
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
                {
                    property: 'clsFromName',
                    dataIndex: 'clsCon.clsFrom.name',
                    label: 'von Class',
                    routerLink: 'ncp.configurator.basicclass.detail'
                },
                {
                    property: 'clsToName',
                    dataIndex: 'clsCon.clsTo.name',
                    label: 'nach Class',
                    routerLink: 'ncp.configurator.basicclass.detail'
                },
            ];
        },

        repository() {
            return this.repositoryFactory.create('ncp_configurator_classcon');
        }
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.isLoading = true;

            this.criteria = new Criteria();
            this.criteria.addAssociation('clsFrom');
            this.criteria.addAssociation('clsTo');
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

        onSearch(term) {
            this.criteria.setTerm(term);
            this.$route.query.term = term;
            this.$refs.listing.doSearch();
        }
    }
});
