//posicionar o mouse no primeiro input da tela
focusInput = function(){
	$('input:text:visible:first').focus();	
}
var estadoLivre = "btn-success";
var estadoOcupado = "btn-primary";
var estadoBoqueado = "btn-danger";
ultimoObs ='';

exibirMessage =function(type,m){
	var typeMessege = {'sucesso':'bg-success text-success','atencao':'bg-danger text-danger'};

    $(".msg").toggleClass(typeMessege[type]);
	$('.msg').text(m);
	$('.msg').fadeIn('slow');
	$('.msg').fadeOut(4000, function(){
		$(".msg").toggleClass(typeMessege[type]);
	});
	
}


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
		
		if (mesa.estado == estadoLivre) {
			$('#codGarcomAtend').val('');
			$('#qtdPessoas').val('');
			$('#nomeGarcom').text('');

			$('#aberturaMesa').modal('show');

			Session.set('selectedVenda', '');

		} else if (mesa.estado == estadoOcupado) {
			Session.set('selectedVenda', Vendas.findOne({numeroMesa:mesa.numero, atiVenda:true}));
			Meteor.call('horaServe', function (error, result) {
				Session.set('horaServe', result);
			});
			$('#incluirProduto').modal('show');
		}
		else{
			Session.set('selectedVenda', Vendas.findOne({numeroMesa:mesa.numero, atiVenda: true}));
			$('#bloqueioMesa').modal('show');
		}
	},
	//submit dos formularios 
	'submit #abrir': function(event) {
		event.preventDefault();
		var mesa = Session.get('selectedMesa');
		var codGarcomAtend = $('#codGarcomAtend').val();
		var qtdPessoas = $('#qtdPessoas').val();
		var isCodGarcomAtend = Funcionarios.findOne({codFunc: codGarcomAtend});

		if(isCodGarcomAtend){
			var venda = new Venda();

			venda.numeroMesa = mesa.numero;
			venda.codGarcomAtend = codGarcomAtend;
			venda.qtdPessoas = qtdPessoas;

			$('#aberturaMesa').modal('hide');
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

		var qtdProdItem = $('#qtdProdItem').val();

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
        var historico = obterComanda();

        venda.temPermanencia = historico.temPermanencia;
        venda.horSaiMesa = new Date(Session.get('horaServe'));
        venda.vlrTotal = historico.vlrTotalVenda;
        venda.atiVenda = false;

		$('#bloqueioMesa').modal('hide');
		Meteor.call('editarEstadoMesa', mesa._id, estadoLivre,function (error, result) {});
		Meteor.call('encerrarVenda', venda, function (error, result) {});
		Session.set('selectedVenda','');
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

new Currency('Brazil', 'BRL', 'R$ ', '%{symbol}%<value>.2f', true);

obterComanda = function(){
	var venda = Session.get('selectedVenda');
	var historico = new Historico();
	var currency = Currency.findByCode("BRL");
	if(venda){
		historico.textHeader = "Espetinho do Gledson";
		historico.codGarcomAtend = venda.codGarcomAtend;
		historico.numeroMesa = venda.numeroMesa;
		var horAberMesa = new Date(venda.horAberMesa);
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
				itemHistorico.preProd = currency.toStr(produto.preProd);
			}
			itemHistorico.qtdProdItem = item.qtdProdItem;
			itemHistorico.vlrTotal = currency.toStr(item.vlrTotal);
			somaTotalVenda += item.vlrTotal;
			historico.listItens.push(itemHistorico);	
			i+=1;
		});
		historico.vlrTotalVenda =  currency.toStr(somaTotalVenda);
		historico.qtdPessoas = venda.qtdPessoas;
		var vlrPorPessoa = somaTotalVenda / historico.qtdPessoas;
		historico.vlrPorPessoa = currency.toStr(vlrPorPessoa);
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