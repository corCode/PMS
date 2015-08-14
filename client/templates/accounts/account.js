//Meteor.subscribe('accounts');



Template.accountPage.helpers({


    loggedInUserId: function() {
        return Meteor.user()._id;
    },

    userAccount : function() {

        /***
        var currentAccount = UserAccounts.findOne({userId: Meteor.user()._id});
        var currentAccountType = Meteor.user().profile.userType;




        if (typeof currentAccount === 'undefined') {

            alert(Meteor.user()._id);

            UserAccounts.insert({
                userId: Meteor.user()._id,
                username: Meteor.user().username,
                role: currentAccountType,
                submitted: new Date(),
                modified: new Date()
            });

            currentAccount = UserAccounts.findOne({userId: Meteor.user()._id});
        }
         ***/

        //return currentAccount;

        return Meteor.user();

        //return Accounts.findOne({userId: Meteor.user()._id});
        //return Accounts.findOne('5moYrAXi7uu5hzdJZ');
        //return Accounts.findOne(Meteor.user()._id);
        //alert(Account.findOne({userId:'000'}));
        //return Account.findOne({userId:'000'});
            //alert(Accounts.findOne());
        //alert(Accounts.find().count());
        //return Accounts.findOne();


    },

    isAdmin: function() {

        //var currentAcct = UserAccounts.findOne({userId: Meteor.user()._id});

        //return currentAcct.role === 'Admin'  ;

        //var userType = Meteor.user().profile.userType;
        //return (userType === 'manager' || userType === 'Admin');

        return checkAdmin();


    },

    myBookings: function() {

        return Bookings.find({userId: Meteor.user()._id})
    }



});