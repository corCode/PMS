/**
 * Created by corrie on 3/29/15.
 */
Template.propertyItem.helpers({
    ownProperty: function(){
        return this.ownerId === Meteor.userId();
    },

    titleImage: function() {
        if (this.images && this.images.length > 0)
        {
            return this.images[0];
        }
        else
        return null
    }


});

Template.propertyItem.events({

});