import $ from 'jquery';
import Backbone from 'backbone';
import template from './template.pug';
import { JobPostingsView } from '../job-postings-list/job-postings-view.js';
import { ImportsView } from '../imports/imports-view.js';
import { UnifyWebAppRouter } from '../router.js';

export class Rootpage extends Backbone.View {
    initialize() {
        this.router = new UnifyWebAppRouter();
        Backbone.history.start();
        this.router.on('onRouteChange', route => this.onRouteChanged(route));
    }

    onRouteChanged(route) {
        switch(route) {
            case 'index':
            break;

            case 'imports':
                this.onNavigateToImports();
                break;
            break;

            case 'jobPostings':
                this.onNavigateToJobPostings();
                break;

            default:
            break;
        }
    }

    onNavigateToImports() {
        this.importsView = new ImportsView();

        this.importsView.render();
        this.$('.body-content-container').html(this.importsView.el);
    }

    onNavigateToJobPostings() {
        this.jobPostingsView = new JobPostingsView();

        this.jobPostingsView.render();
        this.$('.body-content-container').html(this.jobPostingsView.el);
    }

    render() {
        this.$el.html(template());        

        // $.getJSON('https://jobs.github.com/positions.json?callback=?').then((data) => {
        //     console.log(data);
        // });

        return this;
    }
}
