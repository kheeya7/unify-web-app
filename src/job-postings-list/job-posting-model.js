import Backbone from 'backbone';

export class JobPostingModel extends Backbone.Model {
    initialize(savedObj) {
        if (savedObj) {
            this.loadWithSavedItem(savedObj);
        }
    }

    loadWithSavedItem(savedObj) {
        this.id = savedObj.id;
        this.createdAt = savedObj.createdAt;
        this.updatedAt = savedObj.updatedAt;
        this.deleted = savedObj.deleted;
        this.title = savedObj.title;
        this.jobDescription = savedObj.jobDescription;
        this.industry = savedObj.industry;
    }
}