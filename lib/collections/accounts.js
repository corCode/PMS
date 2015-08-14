UserAccounts = new Mongo.Collection('accounts');

//currentAccount = UserAccounts.findOne({userId: Meteor.user()._id});

/*
var getLoggedInAccount = function() {

    return UserAccounts.findOne({userId: this.userId});
}

currentAccount = getLoggedInAccount();
*/

/***
UserAccounts.allow({
    insert: function(userId, doc) {

        return !! userId;
    },

    update: function(userId, account) {
        return ownsDocument(userId, account);
    },

    remove: function(userId, account   ) {
        return ownsDocument (userId, account);
    }

});

 ***/

Meteor.methods({

    usersInsert: function(userObj) {

        if (Meteor.users.find({username: userObj.username}).count() === 0) {
            var newUserId = Meteor.users.insert({
                username: userObj.username,
                emails: [{
                    address: userObj.email,
                    verified: false
                }],
                profile: {
                    userType: userObj.userType,
                    createdBy: Meteor.user().username
                }
            });

            var newUser = Meteor.users.findOne(newUserId);
            Accounts.setPassword(newUser._id, userObj.password);

            return newUserId;
        }
        else
        return -1;

    }


});

findUserById = function (usrId) {

    console.log(usrId);
    return Meteor.users.findOne(usrId);
}