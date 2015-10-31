Meteor.subscribe('Configuracoes');

Template.configuracao.events({
	'submit #form-salvar-config-senha-cancel': function(event){

		event.preventDefault();
		var password = $('#senha-cancelamento').val();

		if(password.length<3){
			mensagem(new Mensage('aviso','Sua tem que ser de 3 a 6 caracteres'));
		}else{
			Meteor.call('encrypMessage', password, function (error, result) {
				mensagem(result);
			});
		}

		$('#senha-cancelamento').val('');
	},
	'submit #form-salvar-config-titulo': function(event){

		event.preventDefault();
		var title = $('#textHeader').val();
		
		Meteor.call('salvarTitulo', title, function (error, result) {
				mensagem(result);
		});
		

		$('#textHeader').val('');
	},
	'submit #form-salvar-config-rodape': function(event){

		event.preventDefault();
		var footer = $('#textFooter').val();

		Meteor.call('salvarRodape', footer, function (error, result) {
			mensagem(result);
		});

		$('#textFooter').val('');
	}
});