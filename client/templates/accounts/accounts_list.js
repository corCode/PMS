
Template.accountsList.helpers({

    userAccounts: function() {
        return UserAccounts.find({}, {sort: {submitted: -1}});
    }

});