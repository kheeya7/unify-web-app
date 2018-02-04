import Backbone from 'backbone';

const UnifyWebAppRouter = Backbone.Router.extend({
    routes: {
        '': 'index',
        'imports': 'imports',
        'jobPostings': 'jobPostings',
    },
});

export { UnifyWebAppRouter };
