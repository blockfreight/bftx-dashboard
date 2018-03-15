Meteor.publish('Transactions', () => {

    return Transactions.find({},{sort:{Date:1}});
});