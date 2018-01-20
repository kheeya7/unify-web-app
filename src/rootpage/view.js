import Backbone from 'backbone';
import template from './template.pug';
import { TodoItemsView } from './../todo-items-list/todo-items-view.js';

export class Rootpage extends Backbone.View {
    initialize() {
        this.todoItemsView = new TodoItemsView({
            
        });
    }

    render() {
        this.$el.html(template());
        this.todoItemsView.render();
        this.$('.todo-items-container').html(this.todoItemsView.el);

        return this;
    }
}
