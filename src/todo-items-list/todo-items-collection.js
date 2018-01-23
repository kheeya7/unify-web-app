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
    
    addNewItem(itemText) {
        const newItem = new TodoItemModel();
        newItem.set('text', itemText);

        this.table.insert(newItem)
            .done(insertedItem => this.onItemInserted(insertedItem),
                error => this.onFailure(error));
    }

    onItemInserted(item) {
        this.add(item, {at: 0});
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