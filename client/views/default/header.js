
Template.header.helpers({
	user: function () {
		return Meteor.user().emails[0].address;
	},
	categorias:function(){
		return Categorias.find();
	}
});

Template.header.events({
    'click #logout': function(event){
        event.preventDefault();
        Meteor.logout();      
        Router.go('home'); 
    }
});