const {Component} = Shopware;

Component.extend('ncp-configurator-basic-classcon-create', 'ncp-configurator-basic-classcon-detail', {

    methods: {
        getItem() {
            this.item = this.repository.create(Shopware.Context.api);
        },

        onSave() {
            this.isLoading = true;
            this.repository
                .save(this.item, Shopware.Context.api)
                .then(() => {
                    this.isLoading = false;
                    this.$router.push({
                        name: 'ncp.configurator.basicclasscondetail',
                        params: {id: this.item.id}
                    });
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
    }
});
