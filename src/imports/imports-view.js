import Backbone from 'backbone';
import template from './imports-view.pug';

export class ImportsView extends Backbone.View {
    initialize() {
    }

    render() {
        this.$el.html(template());
    }
}