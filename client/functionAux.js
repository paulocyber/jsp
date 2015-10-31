new Currency('Brazil', 'BRL', 'R$ ', '%{symbol}%<value>.2f', true);
currency = Currency.findByCode("BRL");

typeMessages = {'sucesso':'#message-success', 'info':'#message-info', 'aviso':'#message-warning', 'atencao':'#message-danger'};

localidade= 'America/Fortaleza';
formatoData = 'DD/MM/YYYY';
formatoHora = 'HH:mm:ss';

//Função comuns 
atribuirFuncionario = function(){
		var func = new Funcionario();

		func.codFunc = $('#codFunc').val().toUpperCase();
		func.nomFunc = $('#nomFunc').val().toUpperCase();
		func.funcaoFunc = $('#funcaoFunc').val().toUpperCase();
		func.atiFunc = true;

		return func;
};
zeraCamposFunc = function(){
		$('#codFunc').val('');
		$('#nomFunc').val('');
		$('#funcaoFunc').val('');
};

//Função comuns 
atribuirProduto = function(){
	var prod = new Produto();

	prod.codProd = $('#codProd').val().toUpperCase();
	prod.refProd = $('#refProd').val().toUpperCase();
	prod.desProd = $('#desProd').val().toUpperCase();
	prod.undProd = $('#undProd').val().toUpperCase();
	prod.cusProd = parseFloat($('#cusProd').val());
	prod.preProd = parseFloat($('#preProd').val());
	prod.marProd = parseInt($('#marProd').val());

	var nomeCat = $('#catProd').val().toUpperCase();
	var categoria = Categorias.findOne({
		nome: nomeCat
	});

	prod.idCatProd = categoria._id;
	prod.subProd = $('#subProd').val().toUpperCase();
	prod.datProd = new Date();
	prod.atiProd = true;

	return prod;
}

zeraCamposProduto = function() {
	$('#codProd').val('');
	$('#refProd').val('');
	$('#desProd').val('');
	$('#undProd').val('');
	$('#cusProd').val('');
	$('#preProd').val('');
	$('#marProd').val('');
	$('#catProd').val('');
	$('#subProd').val('');
}

//posicionar o mouse no primeiro input da tela
focusInput = function(){
	$('input:text:visible:first').focus();	
};

exibirMessage =function(type,m){
	var typeMessege = {'sucesso':'bg-success text-success','atencao':'bg-danger text-danger'};

    $(".msg").toggleClass(typeMessege[type]);
	$('.msg').text(m);
	$('.msg').fadeIn('slow');
	$('.msg').fadeOut(3000, function(){
		$(".msg").toggleClass(typeMessege[type]);
	});
	
};
mensagem = function (mensage){	
	$('.message').text(mensage.mens);
	$(typeMessages[mensage.tipo]).fadeIn('slow');
	$(typeMessages[mensage.tipo]).fadeOut(3000);
};

formatDate = function(d){
	var dataAber = moment(d);
	var dataBrasil = dataAber.tz(localidade).format(formatoData); 
	return dataBrasil;
};

formatHora = function(d){
	var dataAber = moment(d);
	var horaBrasil = dataAber.tz(localidade).format(formatoHora);
	return horaBrasil;
};

calcPermanencia = function(d){
	
	var dataAtual = moment(Session.get('horaServe'));
	var dataAber = moment(d);
	var duracaoMinutes = dataAtual.diff(dataAber,'minutes');
	var minutos = duracaoMinutes%60;
	var horas = (duracaoMinutes-minutos)/60;
	var permanencia = horas+"h "+minutos+"min"
	return permanencia;
};

obterComanda = function(){
	var venda = Session.get('selectedVenda');
	var historico = new Comanda();
	historico.tipo = 'comanda';
	var configuracao = Configuracoes.findOne({});
	if(venda){
		historico.textHeader = configuracao.titleComanda;
		historico.codGarcomAtend = venda.codGarcomAtend;
		historico.numeroMesa = venda.numeroMesa;
		var horAberMesa = venda.horAberMesa;
		historico.datVenda = formatDate(horAberMesa);
		var listaItens = Itens.find({idVenda: venda._id, isCancelado: false});

		if(listaItens){
		var somaTotalVenda = 0;
		var i = 1;
		listaItens.forEach(function (item) {
			var itemHistorico = new ItemComanda();
			itemHistorico._id = item._id;
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
		historico.vlrTotalItens =  currency.toStr(somaTotalVenda);
		historico.qtdPessoas = venda.qtdPessoas;
		historico.horAberMesa = formatHora(horAberMesa);
		historico.temPermanencia = calcPermanencia(horAberMesa);
		historico.textFooter = configuracao.rodapeComanda;		
		if(Session.get('taxaServico')){
			historico.taxaServico = vlrTaxaServico(historico.vlrTotalItens);
			var vlrTotal = addTaxaServico(historico.vlrTotalItens);
			historico.vlrTotalVenda = vlrTotal;
		}else{
			historico.vlrTotalVenda = historico.vlrTotalItens;
		}
		var vlrPorPessoa = currency.parseStr(historico.vlrTotalVenda) / historico.qtdPessoas;
		historico.vlrPorPessoa = currency.toStr(vlrPorPessoa);
		}
	}


	return historico;
};

obterItemComanda= function(item,codGarcomAtend,numeroMesa){
	var itemAcom = new ItemAcom();
	itemAcom.tipo = 'item';
	itemAcom.codGarcomAtend = codGarcomAtend;

	var func = Funcionarios.findOne({codFunc:codGarcomAtend});
	if(func)
		itemAcom.nomeGarcomAtend =func.nomFunc;

	itemAcom.numeroMesa = numeroMesa;
	var produto = Produtos.findOne({_id: item.idProd});
	var observacao = Observacoes.findOne({_id: item.idObsItem});
	if(produto){
		var categoria = Categorias.findOne({_id: produto.idCatProd});
		itemAcom.desProd = produto.desProd;
		itemAcom.catProd = categoria.nome;
		itemAcom.qtdProdItem= item.qtdProdItem;
		itemAcom.obsItem = observacao.nome;
		var d = moment(item.criado)
		itemAcom.criado  = d.tz(localidade).format(formatoHora);
	}
	return itemAcom;
};

modalShow = function(nameModal){
		Session.set("modalOn", true);
		 	// Ativa escuta por keyup no modal
		$(document).on('keyup', function (e) {
			if (e.keyCode == 27) { // Se clicou no ESC
			// Despacha modal
				Session.set('modalOn', false);
			// Desativa escuta por keyup no modal
				$(document).off('keyup');
			}
		});

		$(nameModal).modal('show');
};

modalHide = function(nameModal){
		Session.set("modalOn", false);
		$(nameModal).modal('hide');
};

var TXSER = 0.10;

addTaxaServico = function(moneyCurrency){
	var valor = currency.parseStr(moneyCurrency);
	valor = currency.toStr(valor+(valor*TXSER));
	return valor;
};
remTaxaServico = function(vlrTotalVenda,taxaServico){
	var valor = currency.parseStr(vlrTotalVenda)-currency.parseStr(taxaServico);	
	return currency.toStr(valor);
};
vlrTaxaServico = function(moneyCurrency){
	var valor = currency.parseStr(moneyCurrency);
	valor = currency.toStr(valor*TXSER);
	return valor;
};