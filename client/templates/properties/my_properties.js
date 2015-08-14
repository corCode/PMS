Template.myProperties.created = function () {

    console.log("My properties created...");

}

Template.myProperties.helpers({

    myProps: function () {



        return Properties.find({ownerId: Meteor.userId()});
   },

    propCount: function () {
        return Properties.find({ownerId: Meteor.userId()}).count();

    }
});