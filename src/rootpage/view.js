import Backbone from 'backbone';
import { WindowsAzure } from 'azure-mobile-apps-client';
import template from './template.pug';

export class Rootpage extends Backbone.View {
    initialize() {
        const client = WindowsAzure.MobileServiceClient(appUrl);
        this.table = client.getTable('TodoItem');

        this.table
            .read()
            .then(this.onSuccess, this.onFailure);
    }

    onSuccess(results) {
        var numItemsRead = results.length;

        for (var i = 0 ; i < results.length ; i++) {
            var row = results[i];

            console.log(row);
            // Each row is an object - the properties are the columns
        }
    }

    onFailure(error) {
        throw new Error('Error loading data: ', error);
    }

    render() {
        this.$el.html(template());

        return this;
    }
}
