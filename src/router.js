import Backbone from 'backbone';

const UnifyWebAppRouter = Backbone.Router.extend({
    routes: {
        '': 'index',
        'imports': 'imports',
        'jobPostings': 'jobPostings',
    },

    index: function() {
        this.trigger('onRouteChange', 'index');
    },

    imports: function() {
        this.trigger('onRouteChange', 'imports')
    },

    jobPostings: function() {
        this.trigger('onRouteChange', 'jobPostings');
    }
});

export { UnifyWebAppRouter };
