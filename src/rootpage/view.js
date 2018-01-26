import Backbone from 'backbone';
import template from './template.pug';
import { JobPostingsView } from '../job-postings-list/job-postings-view.js';
import rp from 'request-promise';
import $ from 'jquery';

export class Rootpage extends Backbone.View {
    initialize() {
        this.jobPostingsView = new JobPostingsView();
    }

    render() {
        this.$el.html(template());

        this.jobPostingsView.render();
        this.$('.job-postings-container').html(this.jobPostingsView.el);

        $.getJSON('https://jobs.github.com/positions.json?callback=?').then((data) => {
            console.log(data);
        });

        return this;
    }
}
