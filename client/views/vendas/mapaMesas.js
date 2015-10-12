//posicionar o mouse no primeiro input da tela
focusInput = function(){
	$('input:text:visible:first').focus();	
}
var estadoLivre = "btn-success";
var estadoOcupado = "btn-primary";
var estadoBoqueado = "btn-danger";



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

});

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

			$('#aberturaMesa').modal('show');

			Session.set('selectedVenda', '');

		} else if (mesa.estado == estadoOcupado) {
			Session.set('selectedVenda', Vendas.findOne({numeroMesa:mesa.numero}));
			Meteor.call('horaServe', function (error, result) {
				Session.set('horaServe', result);
			});
			$('#incluirProduto').modal('show');
		}
		else{
			$('#bloqueioMesa').modal('show');
		}
	},
	//submit dos formularios 
	'submit #abrir': function(event) {
		event.preventDefault();
		var mesa = Session.get('selectedMesa');
		var codGarcomAtend = $('#codGarcomAtend').val();
		var qtdPessoas = $('#qtdPessoas').val();

		var venda = new Venda();

		venda.numeroMesa = mesa.numero;
		venda.codGarcomAtend = codGarcomAtend;
		venda.qtdPessoas = qtdPessoas;

		$('#aberturaMesa').modal('hide');
		Meteor.call('editarEstadoMesa', mesa._id, estadoOcupado);
		Meteor.call('iniciarVenda',venda);
		
	},
	'submit #incluir': function(event) {
		event.preventDefault();
		var venda = Session.get('selectedVenda');

		var codProd = $('#codProd').val();
		var produto = Produtos.findOne({codProd:codProd});

		var obsItem = $('#obsItem').val();
		var observacao = Observacoes.findOne({nome: obsItem});

		var qtdProdItem = $('#qtdProdItem').val();



		var item = new Item();
		item.idVenda= venda._id;
		item.idProd= produto._id;
		item.idObsItem = observacao._id;
		item.qtdProdItem = qtdProdItem;
		item.vlrTotal = produto.preProd *qtdProdItem; 
		Meteor.call('incluirProduto', item, function (error, result) {});
		$('#codProd').val('');
		$('#desProd').val('');
		$('#qtdProdItem').val('');


	},
	//botões dos modais
	'click #bloqueio':function(){
		var mesa = Session.get('selectedMesa');
		$('#incluirProduto').modal('hide');
		Meteor.call('editarEstadoMesa', mesa._id, estadoBoqueado,function (error, result) {});
	},
	'click #reabrir':function(){
		var mesa = Session.get('selectedMesa');
		$('#bloqueioMesa').modal('hide');
		Meteor.call('editarEstadoMesa', mesa._id, estadoOcupado,function (error, result) {});
	},
	'click #encerrar':function(){
		var mesa = Session.get('selectedMesa');
		var venda = Session.get('selectedVenda');
		$('#bloqueioMesa').modal('hide');
		Meteor.call('editarEstadoMesa', mesa._id, estadoLivre,function (error, result) {});
		Meteor.call('encerrarVenda', venda._id , function (error, result) {});
	},	
	'click #addObservacao': function(event) {
		event.preventDefault();
		$('#addObservacaoModal').modal('show');
	},
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
	}
});

Template.modalIncluirProduto.helpers({
	'listObservacao':function(){
		return Observacoes.find();
	}
});

Template.modalObservacoes.events({
	'click #saveObs': function(event) {
		event.preventDefault();
		var data = new Observacao();
		data.nome = $('[id="nomeObs"]').val().toUpperCase();

		if (Observacoes.findOne({
				nome: data.nome
			})) {
			$('.message-erro').fadeIn('slow');
			$('.message-erro').fadeOut(5000);
		} else {
			Meteor.call('addObservacao', data);
			$('#addObservacaoModal').modal('hide');
			$('[id="nomeObs"]').val('');
		}
	},
	'shown.bs.modal .modal': function(){
     	focusInput();	
  	}
});
Template.modalIncluirProduto.events({
	//ao carregar o modal do bootstrap executar a função
	'shown.bs.modal #addObservacaoModal': function(){
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
	'shown.bs.modal .modal': function(){
    	focusInput();
  }
});



formatDate = function(d){
	var dataBrasil = ""+d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
	return dataBrasil;
}
formatHora = function(d){
	var horaBrasil = ""+d.getHours()+":"+d.getMinutes();
	return horaBrasil;
}
calcPermanencia = function(d){
	var dataAtual = new Date(Session.get('horaServe'));
	var hora = dataAtual.getHours() - d.getHours();
	var minuto = dataAtual.getMinutes() - d.getMinutes();
	var permanencia = ""+hora+"h "+minuto+"min";
	return permanencia;
}



obterComanda = function(){
	var venda = Session.get('selectedVenda');
	var historico = new Historico();
	if(venda){
		historico.codGarcomAtend = venda.codGarcomAtend;
		historico.numeroMesa = venda.numeroMesa;
		var horAberMesa = venda.horAberMesa;
		historico.datVenda = formatDate(horAberMesa);
		var listaItens = Itens.find({idVenda: venda._id});

		if(listaItens){
		var somaTotalVenda = 0;
		var i = 1;
		listaItens.forEach(function (item) {
			var itemHistorico = new ItemHistorico();
			itemHistorico.seqItem = i;
			var produto = Produtos.findOne({_id: item.idProd});
			if(produto){
				itemHistorico.desProd = produto.desProd;
				itemHistorico.preProd = produto.preProd;
			}
			itemHistorico.qtdProdItem = item.qtdProdItem;
			itemHistorico.vlrTotal = item.vlrTotal.toFixed(2);
			somaTotalVenda += item.vlrTotal;
			historico.listItens.push(itemHistorico);	
			i+=1;
		});
		historico.vlrTotalVenda = somaTotalVenda.toFixed(2);
		historico.vlrPorPessoa = somaTotalVenda.toFixed(2) / venda.qtdPessoas;
		historico.horAberMesa = formatHora(horAberMesa);
		historico.temPermanencia = calcPermanencia(horAberMesa);
		historico.textFooter = "iRest - uBasic - Versão 1.00"
		}
	}

	return historico;
}


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