/**
 * Created by corrie on 4/1/15.
 */
Template.header.helpers({

        showSubmitProperty: function() {
            return checkAdmin() || checkOwner();
        },

        showAdmin: function() {

            return checkAdmin();
        }
    }



);

Template.layout.events({

    'click #goBack': function (e) {
        window.history.back();
    }


});