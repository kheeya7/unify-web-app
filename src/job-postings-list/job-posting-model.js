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

    static getJobPostingModelFromGitHubJob(gitHubJobPosting) {
        const jobPostingModel = new JobPostingModel();

        this.set('postOrigin', 'github');
        this.set('id', gitHubJobPosting.id);
        this.set('createdAt', gitHubJobPosting.created_at);
        this.set('title', gitHubJobPosting.title);
        this.set('location', gitHubJobPosting.location);
        this.set('type', gitHubJobPosting.type);
        this.set('jobDescription', gitHubJobPosting.description);
        this.set('howToApply', gitHubJobPosting.how_to_apply);
        this.set('company', gitHubJobPosting.company);
        this.set('companyUrl', gitHubJobPosting.company_url);
        this.set('companyLogo', gitHubJobPosting.company_logo);
        this.set('remoteUrl', gitHubJobPosting.url);
    }
}