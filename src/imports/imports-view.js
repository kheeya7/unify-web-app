import Backbone from 'backbone';
import template from './imports-view.pug';
import $ from 'jquery';

export class ImportsView extends Backbone.View {
    initialize() {
        this.importedData = [];

        const client = new WindowsAzure.MobileServiceClient('https://unify-app.azurewebsites.net');
        this.table = client.getTable('JobPostingsTable');
    }

    get events() {
        return {
            'click .import-button': ()=> this.fetchJobPostings(),
        }
    }

    fetchJobPostings() {
        this.$('.status-message').empty().append('Fetching job postings from github');
        $.getJSON('https://jobs.github.com/positions.json?callback=?').then((data) => {
            this.importedData = data;
            this.$('.status-message').empty().append(data.length + ' job postings fetched');
            this.render();
        });
    }

    render() {
        this.$el.html(template({
            jobData: this.importedData,
        }));
    }
}