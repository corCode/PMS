Notifications = new Mongo.Collection('notifications');

Notifications.allow({
    update: function(userId, doc, fieldNames) {
        return ownsDocument(userId, doc) &&
            fieldNames.length === 1 && fieldNames[0] === 'read';
    } });

createReviewNotification = function(review) {
    var property = Properties.findOne(review.propertyId);
    if (review.userId !== property.ownerId) {
        Notifications.insert({
            userId: property.ownerId,
            propertyId: property._id,
            reviewId: review._id,
            reviewerName: review.author,
            read: false
        }); }
};


createBookingNotification = function(booking) {
    var property = Properties.findOne(booking.propertyId);
    if (booking.userId !== property.ownerId) {
        Notifications.insert({
            userId: property.ownerId,
            propertyId: property._id,
            bookingId: booking._id,
            bookedBy: booking.bookedBy,
            read: false
        }); }
};

createMessageNotification = function(msg) {

        Notifications.insert({
            userId: msg.recipientId,

            conversationId: msg.conversaionId,
            sender: msg.sender,
            read: false
        });
};