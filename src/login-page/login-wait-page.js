import Backbone from 'backbone';

export class LoginWaitPage extends Backbone.View {
    render() {
        this.$el.html('<div>Wait for login status change</div>');
    }
}