import Backbone from 'backbone';
import _ from 'underscore';

export class JobPostingsCollection extends Backbone.Collection {
    loadData() {
        const client = new WindowsAzure.MobileServiceClient('https://unify-app.azurewebsites.net');
        this.table = client.getTable('JobPosting');

        this.table
            .read()
            .then(results => this.onSuccess(results),
                error => this.onFailure(error));
    }

    onItemSaved(item) {
        this.add(item, {at: 0});
    }

    onSuccess(results) {
        this.add(results);
    }

    onFailure(error) {
        throw new Error('Error loading data: ', error);
    }
}