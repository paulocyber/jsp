
Meteor.methods({
	'hasUser': function () {
		var temUsuario = Meteor.users.find().count();
		return temUsuario;
	},
	'desativarCreateUser':function(){
		Accounts.config({forbidClientAccountCreation : true});
		return 'desativou';
	}
});