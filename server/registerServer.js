Meteor.methods({
	'hasUser': function () {
		var temUsuario = Meteor.users.find().count();
		return temUsuario;
	}
});