import Backbone from 'backbone';
import $ from 'jquery';
import { ImportsMapper } from './imports-mapper';
import template from './imports-view.pug';

export class ImportsView extends Backbone.View {
    initialize() {
        this.importedData = [];

        this.jobPostingDBRef = window.unifyApp.database.ref('jobPostings');
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

        const objToUpload = {};

        for (let i = 0; i < this.importedData.length; i++) {
            const convertedItem = ImportsMapper.getJobPostingModelFromGitHubJob(this.importedData[i]);
            objToUpload[convertedItem.id] = convertedItem;
        }

        this.jobPostingDBRef.set(objToUpload, (error) => {
            if (error) {
                console.log(error);
            } else {
                console.log('success');
            }

            this.importedData = [];
        });
    }

    render() {
        this.$el.html(template({
            jobData: this.importedData,
        }));
    }
}