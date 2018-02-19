import Backbone from 'backbone';
import template from './main-page-template.pug';

export class MainPage extends Backbone.View {
    initialize() {
        this.currentUser = window.unifyApp.currentUser;
    }
    render() {
        this.$el.html(template({
            currentUser: this.currentUser,
        }));
    }
}