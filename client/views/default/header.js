Template.header.helpers({
	user: function () {
		return Meteor.user().emails[0].address;
	}
});
Template.header.events({
    'click #logout': function(event){
        event.preventDefault();
        Meteor.logout();      
        Router.go('home'); 
    }
});