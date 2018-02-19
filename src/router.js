import Backbone from 'backbone';

const UnifyWebAppRouter = Backbone.Router.extend({
    routes: {
        '': 'login',
        'login': 'login',
        'imports': 'imports',
        'jobPostings': 'jobPostings',
        'profile-setup': 'profile-setup',
        'main': 'main',
    },
});

export { UnifyWebAppRouter };
