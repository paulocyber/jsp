
var estadoLivre = "btn-success";
var estadoOcupado = "btn-primary";
var estadoBoqueado = "btn-danger";
ultimoObs ='';

Meteor.subscribe('MapaMesas');
Meteor.subscribe('Observacoes');
Meteor.subscribe('Vendas');
Meteor.subscribe('Funcionarios');
Meteor.subscribe('Produtos');
Meteor.subscribe('Itens');

//Helpers e Events do template mapaMesas
Template.mapaMesas.helpers({
	'geraMapaMesas': function() {
		return MapaMesas.find();
	},
	'icon':function(){
		if (this.estado == estadoLivre) {
			return "glyphicon-cutlery";
		}else if (this.estado == estadoOcupado) {
            return "glyphicon-cutlery";
		}else{
            return "glyphicon-ban-circle";
		}
	}
});

Template.mapaMesas.rendered = function() {
};



Template.mapaMesas.events({
	'click .mesa': function() {	
		var mesa = new Mesa();	
		mesa._id = 	this._id;
		mesa.estado = this.estado;
		mesa.numero = this.numero;
		Session.set('selectedMesa', mesa);
		
		if (mesa.estado == estadoLivre) {
			$('#codGarcomAtend').val('');
			$('#qtdPessoas').val('');
			$('#nomeGarcom').text('');

	
			modalShow('#aberturaMesa');
			Session.set('selectedVenda', '');

		} else if (mesa.estado == estadoOcupado) {
			Session.set('selectedVenda', Vendas.findOne({numeroMesa:mesa.numero}));
			Meteor.call('horaServe', function (error, result) {
				Session.set('horaServe', result);
			});
			modalShow('#incluirProduto');
		}
		else{
			Session.set('selectedVenda', Vendas.findOne({numeroMesa:mesa.numero}));
			modalShow('#bloqueioMesa');
		}
	},
	//submit dos formularios 
	'submit #abrir': function(event) {
		event.preventDefault();
		var mesa = Session.get('selectedMesa');
		var codGarcomAtend = $('#codGarcomAtend').val();
		var qtdPessoas = parseInt($('#qtdPessoas').val());
		var isCodGarcomAtend = Funcionarios.findOne({codFunc: codGarcomAtend});

		if(isCodGarcomAtend){
			var venda = new Venda();

			venda.numeroMesa = mesa.numero;
			venda.codGarcomAtend = codGarcomAtend;
			venda.qtdPessoas = qtdPessoas;

			modalHide('#aberturaMesa');

			Meteor.call('editarEstadoMesa', mesa._id, estadoOcupado);
			Meteor.call('iniciarVenda',venda, function (error, result){
				mensagem(result);
			});	
		}else{
			exibirMessage('atencao','Garçom NÃO EXISTE');
		}				
	},
	'submit #incluir': function(event) {
		event.preventDefault();
		var venda = Session.get('selectedVenda');

		var codProd = $('#codProd').val();
		var produto = Produtos.findOne({codProd:codProd});

		var obsItem = $('#obsItem').val();
		var observacao = Observacoes.findOne({nome: obsItem});

		var qtdProdItem = parseInt($('#qtdProdItem').val());

		if(produto){
			var item = new Item();
			item.idVenda= venda._id;
			item.idProd= produto._id;
			item.idObsItem = observacao._id;
			item.qtdProdItem = qtdProdItem;
			item.vlrTotal = produto.preProd *qtdProdItem; 
			Meteor.call('incluirProduto', item, function (error, result) {});
			exibirMessage('sucesso','Item incluido com sucesso!');
		}else exibirMessage('atencao','Produto NÃO EXISTE');
		
		$('#codProd').val('');
		$('#desProd').val('');
		$('#qtdProdItem').val('');
		ultimoObs='';
		focusInput();

	},
	//botões dos modais
	'click #bloqueio':function(){
		var mesa = Session.get('selectedMesa');
		modalHide('#incluirProduto');
		Meteor.call('editarEstadoMesa', mesa._id, estadoBoqueado,function (error, result) {});
	},
	'click #reabrir':function(){
		var mesa = Session.get('selectedMesa');
		modalHide('#bloqueioMesa');
		Meteor.call('editarEstadoMesa', mesa._id, estadoOcupado,function (error, result) {});
		
	},
	'click #encerrar':function(){
		var mesa = Session.get('selectedMesa');
		var venda = Session.get('selectedVenda');
        var historico = obterComanda();

        venda.temPermanencia = historico.temPermanencia;
        venda.horSaiMesa = new Date(Session.get('horaServe'));
        venda.vlrTotal = currency.parseStr(historico.vlrTotalVenda);
        venda.atiVenda = false;

		modalHide('#bloqueioMesa');
		Meteor.call('editarEstadoMesa', mesa._id, estadoLivre,function (error, result) {});
		Meteor.call('encerrarVenda', venda, function (error, result) {});
		Session.set('selectedVenda','');
	},	
	'click #addObservacao': function(event) {
		event.preventDefault();
		$('#addObservacaoModal').modal('show');
	},
	'click .btn-close':function(event){
		event.preventDefault();
		Session.set('modalOn', false);
	}
});


Template.modalIncluirProduto.events({
	'keyup #codProd':function(){
		var codProd = $('#codProd').val();
		var produto = Produtos.findOne({codProd: codProd, atiProd: true});
		var desProd = produto && produto.desProd;

		if(desProd)
			$('#desProd').val(desProd);
		else
			$('#desProd').val('');
	},
	'keyup #incluirProduto': function(event){
    	console.log(event.which);
	}
});

Template.modalIncluirProduto.helpers({
	'listObservacao':function(){
		return Observacoes.find();
	},
	'forObs':function(nome){
		return nome === ultimoObs;
	}
});

Template.modalObservacoes.events({
	'click #saveObs': function(event) {
		event.preventDefault();
		var data = new Observacao();
		data.nome = $('#nomeObs').val().toUpperCase();
		if (Observacoes.findOne({nome: data.nome})) {
				exibirMessage('atencao','Observação já cadastrada');
		} else {
			Meteor.call('addObservacao', data);
			$('#addObservacaoModal').modal('hide');
			$('#nomeObs').val('');
			ultimoObs=data.nome;

		}
	},
	'shown.bs.modal  #addObservacaoModal': function(){
     	$('#nomeObs').focus();	
  	}
});
Template.modalIncluirProduto.events({
	//ao carregar o modal do bootstrap executar a função
	'shown.bs.modal #incluirProduto': function(){
    	focusInput();
  	}
});
Template.modalAbrirMesa.events({
	'keyup #codGarcomAtend':function(){
		var codFunc = $('#codGarcomAtend').val();
		var funcionario = Funcionarios.findOne({codFunc: codFunc});
		var nomFunc = funcionario && funcionario.nomFunc;

		if(nomFunc)
			$('#nomeGarcom').text(nomFunc);
		else
			$('#nomeGarcom').text('');
	},
	'shown.bs.modal #aberturaMesa': function(){
    	focusInput();
  }
});

Template.historico.helpers({
	'hasVendaMesa':function(){
		var venda = Session.get('selectedVenda');
		if(venda){
			return true;
		}else false;
	},
	'histMesa': function() {
		var historico = obterComanda();
		return historico;
	}
});
Template.historico.events({
	'click #btn-cancelar-item': function () {
		var itemId = this._id;
		Meteor.call('cancelarItem',itemId ,function (error, result) {});
	}
});