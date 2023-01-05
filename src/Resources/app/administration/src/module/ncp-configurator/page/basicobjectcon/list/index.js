import template from './index.html.twig';

const {Component} = Shopware;
const {Criteria} = Shopware.Data;

Component.register('ncp-configurator-basic-objectcon-list', {
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
                    property: 'classConName',
                    dataIndex: 'classCon.name',
                    label: 'Classesverbindung',
                    routerLink: 'ncp.configurator.basicclasscon.detail'
                },
                {
                    property: 'clsFromName',
                    dataIndex: 'objFrom.class.name',
                    label: 'von Class',
                    routerLink: 'ncp.configurator.basicclassdetail'
                },
                {
                    property: 'objFromName',
                    dataIndex: 'objFrom.name',
                    label: 'von Objekt',
                    routerLink: 'ncp.configurator.basicobjectdetail'
                },
                {
                    property: 'clsToName',
                    dataIndex: 'objTo.class.name',
                    label: 'nach Class',
                    routerLink: 'ncp.configurator.basicclassdetail'
                },
                {
                    property: 'objToName',
                    dataIndex: 'objTo.name',
                    label: 'nach Objekt',
                    routerLink: 'ncp.configurator.basicobjectdetail'
                },
            ];
        },

        repository() {
            return this.repositoryFactory.create('ncp_configurator_objectcon');
        }
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.criteria = new Criteria();
            this.criteria.addAssociation('classCon');
            this.criteria.addAssociation('objFrom');
            this.criteria.addAssociation('objFrom.class');
            this.criteria.addAssociation('objTo');
            this.criteria.addAssociation('objTo.class');
            this.criteria.addSorting(Criteria.sort('id', 'ASC'));

            if (this.term) {
                this.criteria.setTerm(this.term);
            }

            this.isLoading = true;

            this.repository
                .search(this.criteria, Shopware.Context.api)
                .then((results) => {
                    this.total = results.total;
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
