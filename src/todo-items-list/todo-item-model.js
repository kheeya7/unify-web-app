import Backbone from 'backbone';

export class TodoItemModel extends Backbone.Model {
    initialize(savedObj) {
        this.id = savedObj.id;
        this.complete = savedObj.complete;
        this.createdAt = savedObj.createdAt;
        this.deleted = savedObj.deleted;
        this.text = savedObj.text;
        this.updatedAt = savedObj.updatedAt;
        this.version = savedObj.version;
    }
}