import Backbone from 'backbone';
import template from './main-page-template.pug';

export class MainPage extends Backbone.View {
    initialize() {
        this.currentUser = window.unifyApp.currentUser;
    }

    get events() {
        return {
            'click .go-to-import': 'onGoToImport',
            'click .go-to-job-postings': 'onGoToJobPostings',
        };
    }

    render() {
        this.$el.html(template({
            currentUser: this.currentUser,
        }));
    }

    onGoToImport() {
        window.unifyApp.router.navigate('imports', true);
    }

    onGoToJobPostings() {
        window.unifyApp.router.navigate('jobPostings', true);
    }
}