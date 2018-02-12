import Backbone from 'backbone';
import template from './user-profile-edit.pug';

export class UserProfileEditView extends Backbone.View {
    initialize() {
        this.currentUser = window.unifyApp.userManager.currentUser;
    }

    get events() {
        return {
            'click .save-button': 'onSaveButtonClicked',
        };
    }

    render() {
        this.$el.html(template({
            currentUser: this.currentUser,
        }));
    }

    onSaveButtonClicked() {
        const userNameInput = this.$('#username')[0].value;
        const userEmailInput = this.$('#email')[0].value;

        this.currentUser.userName = userNameInput;
        this.currentUser.email = userEmailInput;
        this.currentUser.isProfileSaved = true;

        window.unifyApp.userManager.updateUserAsync(this.currentUser).then(() => {
            window.unifyApp.router.navigate('main', true);
        });
    }
}