
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

Template.mapaMesas.events({
	'click .mesa': function() {	
		var mesa = new Mesa();	
		mesa._id = 	this._id;
		mesa.estado = this.estado;
		mesa.numero = this.numero;
		Session.set('selectedMesa', mesa);
		Session.set('historico', obterComanda());
		var historico = Session.get('historico');
		Session.set('vlrTotalVendaIncial', historico.vlrTotalVenda);
		
		if (mesa.estado == estadoLivre) {
			$('#codGarcomAtend').val('');
			$('#qtdPessoas').val('');
			$('#nomeGarcom').text('');


			/*Devido ao problema do botão voltar do navegador e 
			botão voltar dos celulares samsung tiver que add um
			pacote, peppelg:bootstrap-3-modal,para trabalhar com os modais do bootstrap assim 
			não fazer meu proprio modal*/
	        Modal.show('aberturaMesa');
			Session.set('selectedVenda', '');

		} else if (mesa.estado == estadoOcupado) {
			
			Session.set('selectedVenda', Vendas.findOne({numeroMesa:mesa.numero}));
			Meteor.call('horaServe', function (error, result) {
				Session.set('horaServe', result);
			});
			Modal.show('incluirProduto');
		}
		else{
			Session.set('selectedVenda', Vendas.findOne({numeroMesa:mesa.numero}));
			Modal.show('bloqueioMesa');
		}
	}
});

Template.aberturaMesa.events({
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

			Modal.hide('mapaMesas');

			Meteor.call('editarEstadoMesa', mesa._id, estadoOcupado);
			Meteor.call('iniciarVenda',venda, function (error, result){
				mensagem(result);
			});	
		}else{
			exibirMessage('atencao','Garçom NÃO EXISTE');
		}				
	},
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

Template.incluirProduto.events({
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
			
			Meteor.call('horaServe', function (error, result) {
				Session.set('horaServe', result);
			});

			item.idVenda= venda._id;
			item.idProd= produto._id;
			item.idObsItem = observacao._id;
			item.qtdProdItem = qtdProdItem;
			item.vlrTotal = produto.preProd *qtdProdItem;

			item.criado = Session.get('horaServe');
			
			Meteor.call('incluirProduto', item, function (error, result) {
				if(result){
					exibirMessage('sucesso','Item incluido com sucesso!');		
				}else{
					exibirMessage('atencao','Item não pode ser incluído!');		
				}
			});
			
		}else exibirMessage('atencao','Produto NÃO EXISTE');
		
		$('#codProd').val('');
		$('#desProd').val('');
		$('#qtdProdItem').val('');
		ultimoObs=''; //Ao incluir seta o select observação para o padrão
		focusInput(); //Ao incluir um produto da focus no primeiro input

	},
	'click #bloqueio':function(){
		var mesa = Session.get('selectedMesa');
		Modal.hide('incluirProduto');
		Meteor.call('editarEstadoMesa', mesa._id, estadoBoqueado,function (error, result) {});
	},
	'keyup #codProd':function(){
		var codProd = $('#codProd').val();
		var produto = Produtos.findOne({codProd: codProd, atiProd: true});
		var desProd = produto && produto.desProd;

		if(desProd)
			$('#desProd').val(desProd);
		else
			$('#desProd').val('');
	},
	'click #addObservacao': function(event) {
		event.preventDefault();

		/*Devido ao problema que o bootstrap não aceita modais 
		multiplos tenho ocultar uma para chamar outro*/
		Modal.hide('incluirProduto');
		Modal.show('addObservacaoModal');
	},
	'shown.bs.modal .modal': function(){
    	focusInput();
  	}
});
Template.addObservacaoModal.events({
	'click #saveObs': function(event) {
		event.preventDefault();
		var obs = new Observacao();
		obs.nome = $('#nomeObs').val().toUpperCase();
		if (Observacoes.findOne({nome: obs.nome})) {
				exibirMessage('atencao','Observação já cadastrada');
		} else {
			Meteor.call('addObservacao', obs);
			Modal.hide('addObservacaoModal');
			$('#nomeObs').val('');
			ultimoObs=obs.nome;
			Modal.show('incluirProduto');
		}
	},
	'click .btn-close': function(){
		/*Devido ao problema que o bootstrap não aceita modais 
		multiplos tenho ocultar uma para chamar outro, tambem
		retirei o evento padrões dos botões cancel e close no
		modal de observação, para transição rapida de modal multiplo
		tiver que tirar o efeito fade do incluirProduto e observação*/
		Modal.hide();
		Modal.show('incluirProduto');
	},
	'shown.bs.modal  #addObservacaoModal': function(){
     	$('#nomeObs').focus();
  	}
});

Template.incluirProduto.helpers({
	'listObservacao':function(){
		return Observacoes.find();
	},
	//helper para setar ao incluir nova observação
	'forObs':function(nome){
		return nome === ultimoObs;
	}
});

Template.bloqueioMesa.events({
	'click #reabrir':function(){
		var mesa = Session.get('selectedMesa');
		Modal.hide('bloqueioMesa');
		Meteor.call('editarEstadoMesa', mesa._id, estadoOcupado,function (error, result) {

		});
		
	},
	'click #encerrar':function(){
		Modal.hide();
		Modal.show('encerrarMesaModal');
	},	
});

dezPorCento=false;

Template.historico.helpers({
	'hasVendaMesa':function(){
		var venda = Session.get('selectedVenda');
		if(venda){
			return true;
		}else false;
	},
	'histMesa': function() {
		var historico = Session.get('historico');
		Session.set('listaItens', historico.listItens);
		return historico;
	},
	'vlrTotalVenda':function(){
		return Session.get('vlrTotalVenda');
	}
});
Template.historico.events({
	'click #btn-cancelar-item': function () {
		Session.set('itemCancelar', this._id);
		Modal.show('cancelamentoItemModal');
	},
	'click [type=checkbox]': function(event){
		 
		if(event.target.checked){
		 	var somaTotalVenda = currency.parseStr( Session.get('vlrTotalVendaIncial'));
			somaTotalVenda = currency.toStr(somaTotalVenda+(somaTotalVenda*0.10));
			Session.set('vlrTotalVenda',somaTotalVenda); 			
		}else{
			var somaTotalVenda = Session.get('vlrTotalVendaIncial');
			Session.set('vlrTotalVenda',somaTotalVenda);
		}
 	}
});

Template.tableHist_desktop.helpers({
	'Itens': function () {
		var itensHist = Session.get('listaItens');
		return itensHist;
	}
});

Template.tableHist_phone.helpers({
	'Itens': function () {
		var itensHist = Session.get('listaItens');
		return itensHist;
	}
});

Template.cancelamentoItemModal.events({
	'submit #formCancel': function (event){
		event.preventDefault();

		var itemId = Session.get('itemCancelar');
		var password = $('#senha-cancelamento').val();

		Meteor.call('equalsSenha', password,function (error, result) {
			if(result){
				Meteor.call('cancelarItem',itemId ,function (error, result) {
					return mensagem(result);
				});		
			}else{
				mensagem(new Mensage('atencao','Senha invalida!!!'));
			}
		});
		Modal.hide();
		$('#senha-cancelamento').val('');
	}
});

Template.encerrarMesaModal.events({
	'submit #form-encerrar': function (event){
		event.preventDefault();
		var mesa = Session.get('selectedMesa');
		var venda = Session.get('selectedVenda');
        var historico = obterComanda();

        venda.temPermanencia = historico.temPermanencia;
        venda.horSaiMesa = new Date(Session.get('horaServe'));
        venda.vlrTotal = currency.parseStr(historico.vlrTotalVenda);
        venda.atiVenda = false;

		var password = $('#senha-encerrar').val();

		Meteor.call('equalsSenha', password,function (error, result) {
			if(result){
				Meteor.call('editarEstadoMesa', mesa._id, estadoLivre,function (error, result) {

				});
				Meteor.call('encerrarVenda', venda, function (error, result) {
					mensagem(result);
				});		
			}else{
				mensagem(new Mensage('atencao','Senha invalida!!!'));
			}
		});
		Modal.hide();
		$('#senha-encerrar').val('');		

		Modal.hide();
		Session.set('selectedVenda','');
	}
});