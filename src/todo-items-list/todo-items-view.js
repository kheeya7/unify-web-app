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

    get events() {
        return {
            'click .add-todo-button': 'onAddTodoItem',
        };
    }

    render() {
        this.$el.html(template({
            items: this.model.models,
        }));
    }

    onAddTodoItem() {
        const inputValue = this.$('.todo-item-input')[0].value;

        this.model.addNewItem(inputValue);
    }
}

