/**
 * Created by corrie on 3/29/15.
 */

Template.propertyEdit.created = function () {

    Session.set('propertyFormErrors', {});
}

Template.propertyEdit.events({

    'submit form': function(e) {
        e.preventDefault();

        var currentPropertyId = this._id;

        /***
        var propertyFields = {
            title: $(e.target).find('[name=title]').val(),
            description: $(e.target).find('[name=title]').val()
        }
***/
        var propertyFields = setPropertyObj($(event.target));
        if (Object.getOwnPropertyNames(Session.get('propertyFormErrors')).length > 0)
            return throwError("Please correct the errors.");

        Properties.update(currentPropertyId, {$set: propertyFields}, function (error) {

            if (error) {
                //alert(error.reason);
                throwError(error.reason)
            }
            else {
                Router.go('propertyPage', {_id: currentPropertyId});
            }
        });
    },

    'click .delete': function(e) {
        e.preventDefault();

        if (confirm("Delete this property?")) {
            var currentPropertyId = this._id;
            //delete images

            Properties.remove(currentPropertyId);


            Router.go('propertyList');
        }
    }

});