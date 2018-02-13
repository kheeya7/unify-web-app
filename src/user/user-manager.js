import Promise from 'bluebird';

export class UserManager {
    constructor() {
        this.currentUserProfile = null;
    }

    get currentUser() {
        return this.currentUserProfile;
    }

    signInAsync() {
        const client = window.unifyApp.client;

        return this.authenticateAsync().then((currentUser) => {
            const table = client.getTable('User');

            return table
                .where({ id: currentUser.userId })
                .read()
                .then((fetchedUsers) => {
                    if (fetchedUsers.length == 0) {
                        this.currentUserProfile = ({
                            id: currentUser.userId,
                            isProfileSaved: false,
                        });

                        return table.insert(this.currentUserProfile).then((data) => {
                            console.log(data);

                            return this.currentUserProfile;
                        });
                    } else {
                        this.currentUserProfile = fetchedUsers[0];

                        return this.currentUserProfile;
                    }
                });
        });
    }

    authenticateAsync() {
        const client = window.unifyApp.client;

        if (client.currentUser !== null && client.currentUser !== undefined) {
            return Promise.resolve(client.currentUser);
        }        
        
        return client.login("google").then((result) => {
            client.currentUser = result;

            return client.currentUser;
        });
    }

    updateUserAsync(userObj) {
        const client = window.unifyApp.client;

        const table = client.getTable('User');

        return table.update(userObj).then((savedCurrentUser) => {
           this.currentUserProfile = savedCurrentUser;

           return this.currentUserProfile;
        });
    }
}