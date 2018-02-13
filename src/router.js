import Backbone from 'backbone';

const UnifyWebAppRouter = Backbone.Router.extend({
    routes: {
        '': 'index',
        'imports': 'imports',
        'jobPostings': 'jobPostings',
        'profile-setup': 'profile-setup',
        'main': 'main',
    },
});

export { UnifyWebAppRouter };
