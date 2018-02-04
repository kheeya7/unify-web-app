export class ImportsMapper {
    static getJobPostingModelFromGitHubJob(gitHubJobPosting) {
        const jobPosting = {};

        jobPosting.id = gitHubJobPosting.id;        
        jobPosting.title = gitHubJobPosting.title;
        jobPosting.location = gitHubJobPosting.location;
        jobPosting.type = gitHubJobPosting.type;
        jobPosting.jobDescription = gitHubJobPosting.description;
        jobPosting.howToApply = gitHubJobPosting.how_to_apply;
        jobPosting.company = gitHubJobPosting.company;
        jobPosting.companyUrl = gitHubJobPosting.company_url;
        jobPosting.companyLogo = gitHubJobPosting.company_logo;
        jobPosting.originUrl = gitHubJobPosting.url;
        jobPosting.originCreatedAt = gitHubJobPosting.created_at;

        return jobPosting;
    }
}