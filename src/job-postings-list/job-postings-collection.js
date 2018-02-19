import Backbone from 'backbone';
import _ from 'underscore';

export class JobPostingsCollection extends Backbone.Model {
    initialize() {
        this.jobPostings = {};
    }

    loadData() {
        this.jobPostingDBRef = window.unifyApp.database.ref('jobPostings');
        this.jobPostingDBRef.on('value', (snapshot) => {
            this.jobPostings = snapshot.val();
            this.trigger('jobPostingsUpdated', this.jobPostings);
        });
    }

    getJobPostings() {
        return this.jobPostings;
    }
}