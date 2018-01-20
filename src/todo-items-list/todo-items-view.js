import Backbone from 'backbone';
import { TodoItemsCollection } from './todo-items-collection.js';
import template from './todo-items-view-template.pug';

export class TodoItemsView extends Backbone.View {
    initialize() {
        this.model = new TodoItemsCollection();

        this.model.on('add', () => this.render());
        this.model.on('remove', () => this.render());

        this.model.loadData();
    }

    render() {
        this.$el.html(template({
            items: this.model.models,
        }));
    }
}

