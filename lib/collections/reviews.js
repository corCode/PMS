Reviews = new Mongo.Collection('reviews');

Meteor.methods({
    reviewInsert: function(reviewAttributes) {

        var user = Meteor.user();
        var property = Properties.findOne(reviewAttributes.propertyId);
        if (!property)
            throw new Meteor.Error('invalid-review', 'You must review on a post');
        var review = _.extend(reviewAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date()
        });

        // create the comment, save the id
        review._id = Reviews.insert(review);

        // now create a notification, informing the user that there's been a comment
        createReviewNotification(review);

        return review._id;

    }
});