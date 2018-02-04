import Backbone from 'backbone';
import template from './template.pug';
import { JobPostingsView } from '../job-postings-list/job-postings-view.js';
import { ImportsView } from '../imports/imports-view.js';
import { UnifyWebAppRouter } from '../router.js';

export class Rootpage extends Backbone.View {
    initialize() {
        this.router = new UnifyWebAppRouter();
        Backbone.history.start();

        this.currentRoute = '';
        this.router.on('route:index', route => this.onRouteChanged('index'));
        this.router.on('route:imports', route => this.onRouteChanged('imports'));
        this.router.on('route:jobPostings', route => this.onRouteChanged('jobPostings'));
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

        this.currentRoute = route;
    }

    getCurrentRoute() {
        // href contains full path including url(www.example.com/#hello)
        // origin contains path without parameter(www.example.com)
        // +2 is there to exclude / and #
        const currentPath = window.location.href.substring(window.location.origin.length + 2);

        return currentPath;
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

        // When render is called and if current route from url is different
        // from what the route this rootview knows, call onRouteChanged
        if (this.currentRoute !== this.getCurrentRoute()) {
            this.onRouteChanged(this.getCurrentRoute());
        }

        return this;
    }
}
