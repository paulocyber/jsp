//teste git alteraçoes
Meteor.subscribe('Funcionarios');

//Função comuns 
function atribuirFuncionario(){
		var func = new Funcionario();

		func.codFunc = $('#codFunc').val().toUpperCase();
		func.nomFunc = $('#nomFunc').val().toUpperCase();
		func.funcaoFunc = $('#funcaoFunc').val().toUpperCase();
		func.atiFunc = true;

		return func;
}
function zeraCamposFunc(){
		$('#codFunc').val('');
		$('#nomFunc').val('');
		$('#funcaoFunc').val('');
}

//Helpers e Events do template addFuncionario
Template.addFuncionario.onRendered(function(){
	$('#codFunc').focus();
});
Template.addFuncionario.helpers({
	
});

Template.addFuncionario.events({
	'submit form': function (event) {
		event.preventDefault();
	
		Meteor.call('adicionarFuncionario', atribuirFuncionario(), function(error, result){
			mensagem(result);
		});

		zeraCamposFunc();
		$('#codFunc').focus();
    }
});

//Helpers e Events do template listfuncuto
Template.listFuncionarios.helpers({
	'listFuncionarios': function () {
		return Funcionarios.find({atiFunc: true},{sort: {codFunc: 1}});
	}
});
Template.listFuncionarios.events({
	'click #btnDesativar': function (event) {
		event.preventDefault();
		var idFunc = this._id;
		var confirm = window.confirm('Tem certeza que deseja DELETAR?');
		if(confirm){
			Meteor.call('desativarFuncionario', idFunc);
		}
	}
});

