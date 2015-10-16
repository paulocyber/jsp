Template.configuracao.events({
	'submit #btn-salvar-config': function(event){

		event.preventDefault();
		var password = $('#senha-cancelamento').val();

		Meteor.call('encrypMessage', password, function (error, result) {

		});
	}
});