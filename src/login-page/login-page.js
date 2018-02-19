import Backbone from 'backbone';
import * as firebase from "firebase";
import * as firebaseui from 'firebaseui';
import template from './login-page-template.pug';

export class LoginPage extends Backbone.View {
    initialize() {
        // Initialize the FirebaseUI Widget using Firebase.
        this.ui = new firebaseui.auth.AuthUI(firebase.auth());
        this.uiConfig = {
            callbacks: {
                signInSuccess: function(currentUser, credential, redirectUrl) {
                    // User successfully signed in.
                    // Return type determines whether we continue the redirect automatically
                    // or whether we leave that to developer to handle.
                    console.log('signinsuccess' + currentUser);
                    return false;
                },
                uiShown: function() {
                // The widget is rendered.
                // Hide the loader.
                document.getElementById('loader').style.display = 'none';
                }
            },
            // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
            signInFlow: 'popup',
            signInSuccessUrl: '/profile-setup',
            signInOptions: [
                // Leave the lines as is for the providers you want to offer your users.
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
                // firebase.auth.GithubAuthProvider.PROVIDER_ID,
                // firebase.auth.EmailAuthProvider.PROVIDER_ID,
                // firebase.auth.PhoneAuthProvider.PROVIDER_ID
            ],
            // Terms of service url.
            tosUrl: '<your-tos-url>'
        };
    }
    get events() {
        return {
            'click .login-button': 'onLoginClicked',
            'click .logout-button': 'onLogoutClicked',
        };
    }

    render() {
        this.$el.html(template());

        // The start method will wait until the DOM is loaded.
        this.ui.start('#firebaseui-auth-container', this.uiConfig);
    }

    onLogoutClicked() {
        firebase.auth().signOut();
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