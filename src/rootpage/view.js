import Backbone from 'backbone';
import template from './template.pug';
import { TodoItemsView } from './../todo-items-list/todo-items-view.js';
import { JobPostingsView } from '../job-postings-list/job-postings-view.js';

export class Rootpage extends Backbone.View {
    initialize() {
        this.todoItemsView = new TodoItemsView({
            
        });
        this.jobPostingsView = new JobPostingsView();
    }

    render() {
        this.$el.html(template());
        this.todoItemsView.render();
        this.$('.todo-items-container').html(this.todoItemsView.el);

        this.jobPostingsView.render();
        this.$('.job-postings-container').html(this.jobPostingsView.el);

        return this;
    }
}
