import Backbone from 'backbone';
import { JobPostingsCollection } from './job-postings-collection.js';
import { JobPostingModel } from './job-posting-model.js';
import template from './job-postings-view-template.pug';

export class JobPostingsView extends Backbone.View {
    initialize() {
        this.model = new JobPostingsCollection();

        this.model.on('add', () => this.render());
        this.model.on('remove', () => this.render());

        this.model.loadData();
    }

    get events() {
        return {
            'click .post-job-button': 'onAddJobPost',
        };
    }

    render() {
        this.$el.html(template({
            jobPostings: this.model.models,
        }));
    }

    onAddJobPost() {
        const jobTitleValue = this.$('.job-title-input')[0].value;
        const jobIndustryValue = this.$('.job-industry-input')[0].value;
        const jobDescriptionValue = this.$('.job-description-input')[0].value;
        
        const newJobPosting = new JobPostingModel();
        newJobPosting.set('title', jobTitleValue);
        newJobPosting.set('industry', jobIndustryValue);
        newJobPosting.set('jobDescription', jobDescriptionValue);

        this.model.insertNewJobPosting(newJobPosting);
    }
}

