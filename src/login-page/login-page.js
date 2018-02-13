import Backbone from 'backbone';
import template from './login-page-template.pug';

export class LoginPage extends Backbone.View {
    get events() {
        return {
            'click .login-button': 'onLoginClicked',
        };
    }

    render() {
        this.$el.html(template());
    }

    onLoginClicked() {
        window.unifyApp.userManager.signInAsync().then((user) => {
            if(user.isProfileSaved) {
                window.unifyApp.router.navigate('main', true);
            } else {
                window.unifyApp.router.navigate('profile-setup', true);
            }
        }); 
    }
}