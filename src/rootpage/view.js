import Backbone from 'backbone';
import template from './template.pug';
import { JobPostingsView } from '../job-postings-list/job-postings-view.js';

export class Rootpage extends Backbone.View {
    initialize() {
        this.jobPostingsView = new JobPostingsView();
    }

    render() {
        this.$el.html(template());

        this.jobPostingsView.render();
        this.$('.job-postings-container').html(this.jobPostingsView.el);

        return this;
    }
}
