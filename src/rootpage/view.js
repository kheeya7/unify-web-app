import Backbone from 'backbone';
import template from './template.pug';
import { JobPostingsView } from '../job-postings-list/job-postings-view.js';
import { ImportsView } from '../imports/imports-view.js';
import { LoginPage } from '../login-page/login-page.js';
import { MainPage } from '../main-page/main-page.js';
import { UserManager } from '../user/user-manager.js';
import { UserProfileEditView } from '../user/user-profile-edit.js';
import { UnifyWebAppRouter } from '../router.js';

window.unifyApp = {
    router: new UnifyWebAppRouter(),
    client: new WindowsAzure.MobileServiceClient('https://unify-proto.azurewebsites.net'),
    userManager: new UserManager(),
};

export class Rootpage extends Backbone.View {
    initialize() {
        Backbone.history.start({pushState: true});

        this.pageContent = new LoginPage();

        window.unifyApp.router.on('route:index', route => this.onRouteChanged('index'));
        window.unifyApp.router.on('route:imports', route => this.onRouteChanged('imports'));
        window.unifyApp.router.on('route:jobPostings', route => this.onRouteChanged('jobPostings'));
        window.unifyApp.router.on('route:profile-setup', route => this.onRouteChanged('profile-setup'));
        window.unifyApp.router.on('route:main', route => this.onRouteChanged('main'));
    }

    onRouteChanged(route) {
        switch(route) {
            case 'index':
                this.pageContent = new LoginPage();
                break;

            case 'imports':
                this.pageContent = new ImportsView();
                break;

            case 'jobPostings':
                this.pageContent = new JobPostingsView();
                break;

            case 'profile-setup':
                this.pageContent = new UserProfileEditView();
                break;

            case 'main':
                this.pageContent = new MainPage();
                break;

            default:
            break;
        }

        this.render();
    }

    render() {
        this.$el.html(template());

        this.pageContent.render();
        this.$('.body-content-container').html(this.pageContent.el);

        return this;
    }
}
