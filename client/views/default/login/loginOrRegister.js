
Template.loginOrRegister.helpers({
	getTemplate: function () {		
		Meteor.call('hasUser', function (error, result) {
            if(result)
            	Session.set('loginOrRegister', 'login');
            else 
            	Session.set('loginOrRegister', 'register');
        });		
		return Session.get('loginOrRegister');
	}
});