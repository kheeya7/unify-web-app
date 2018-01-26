import Backbone from 'backbone';

export class JobPostingModel extends Backbone.Model {
    initialize(savedObj) {
        if (savedObj) {
            this.loadWithSavedItem(savedObj);
        }
    }

    loadWithSavedItem(savedObj) {
        this.set('id', savedObj.id);
        this.set('createdAt', savedObj.createdAt);
        this.set('updatedAt', savedObj.updatedAt);
        this.set('deleted', savedObj.deleted);
        this.set('title', savedObj.title);
        this.set('jobDescription',savedObj.jobDescription);
        this.set('industry', savedObj.industry);
    }
}