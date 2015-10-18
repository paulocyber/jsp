//teste git alteraçoes
Meteor.subscribe('Funcionarios');

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

//Helpers e Events do template listfunc
Template.tableListFunc_desktop.helpers({
	'listFuncionarios': function () {
		return Funcionarios.find({atiFunc: true},{sort: {codFunc: 1}});
	}
});

Template.tableListFunc_phone.helpers({
	'listFuncionarios': function () {
		return Funcionarios.find({atiFunc: true},{sort: {codFunc: 1}});
	}
});

/*No caso do template dinamico para diversos 
dispositivos não faz necessários criar events para 
os template, só template pai*/
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

