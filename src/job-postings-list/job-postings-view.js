import Backbone from 'backbone';
import { JobPostingsCollection } from './job-postings-collection.js';
import template from './job-postings-view-template.pug';

export class JobPostingsView extends Backbone.View {
    initialize() {
        this.jobPostingCollection = new JobPostingsCollection();

        this.jobPostingCollection.on('add', () => this.render());

        this.jobPostingCollection.loadData();
    }

    render() {
        this.$el.html(template({
            jobPostings: this.jobPostingCollection.models,
        }));
    }
}

