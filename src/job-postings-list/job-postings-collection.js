import Backbone from 'backbone';
import _ from 'underscore';
import { JobPostingModel } from './job-posting-model.js';

export class JobPostingsCollection extends Backbone.Collection {
    loadData() {
        const client = new WindowsAzure.MobileServiceClient('https://unify-app.azurewebsites.net');
        this.table = client.getTable('JobPosting');

        this.table
            .read()
            .then(results => this.onSuccess(results),
                error => this.onFailure(error));
    }

    insertNewJobPosting(jobPostingModel) {
        this.table.insert(jobPostingModel)
            .done(savedItem => this.onItemSaved(savedItem),
            error => this.onFailure(error));
    }

    onItemSaved(item) {
        this.add(item, {at: 0});
    }

    onSuccess(results) {
        const jobPostingModels = _.map(results, (item) => {
            return new JobPostingModel(item);
        });

        this.add(jobPostingModels);
    }

    onFailure(error) {
        throw new Error('Error loading data: ', error);
    }
}