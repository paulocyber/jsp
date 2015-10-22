
Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('#email').val();
        var password = $('#senha').val();
        Meteor.loginWithPassword(email, password, function(error){
    		if(error){
                    mensagem(new Mensage('atencao',error.reason)); // Output error if registration fails
                } else {
                    Router.go("home"); // Redirect user if registration succeeds
                }
		});
    }
});