import Backbone from 'backbone';
import $ from 'jquery';
import { ImportsMapper } from './imports-mapper';
import template from './imports-view.pug';

export class ImportsView extends Backbone.View {
    initialize() {
        this.importedData = [];

        const client = new WindowsAzure.MobileServiceClient('https://unify-app.azurewebsites.net');
        this.table = client.getTable('JobPosting');
    }

    get events() {
        return {
            'click .import-button': ()=> this.fetchJobPostings(),
            'click .upload-button': ()=> this.startUploadingData(),
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

    startUploadingData() {
        if (this.importedData.length < 1) {
            return;
        }

        const itemToUpload = this.importedData.shift();
        const convertedItem = ImportsMapper.getJobPostingModelFromGitHubJob(itemToUpload);

        this.table.insert(convertedItem)
            .done(
                savedItem => this.onItemSaved(savedItem),
                error => this.onFailure(error, itemToUpload));
    }

    onItemSaved(savedItem) {
        const cellId = '#postingid-' + savedItem.id;

        this.$(cellId).append('Success');

        this.startUploadingData();
    }

    onFailure(error, itemToUpload) {
        const cellId = '#postingid-' + itemToUpload.id;

        this.$(cellId).append(error.request.statusText);        

        this.startUploadingData();
    }

    render() {
        this.$el.html(template({
            jobData: this.importedData,
        }));
    }
}