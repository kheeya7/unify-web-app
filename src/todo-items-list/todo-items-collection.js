import Backbone from 'backbone';
import _ from 'underscore';
import { TodoItemModel } from './todo-item-model.js';

export class TodoItemsCollection extends Backbone.Collection {
    initialize() {
        this.model = TodoItemModel;
    }

    loadData() {
        const client = new WindowsAzure.MobileServiceClient('https://unify-app.azurewebsites.net');
        this.table = client.getTable('TodoItem');

        this.table
            .read()
            .then(results => this.onSuccess(results),
                error => this.onFailure(error));
    }

    onSuccess(results) {
        const todoItemModels = _.map(results, (item) => {
            return new TodoItemModel(item);
        });

        this.add(todoItemModels);
    }

    onFailure(error) {
        throw new Error('Error loading data: ', error);
    }
}