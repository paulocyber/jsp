typeMessages = {'sucesso':'#message-success', 'info':'#message-info', 'aviso':'#message-warning', 'atencao':'#message-danger'};

mensagem = function (mensage){	
	$('.message').text(mensage.mens);
	$(typeMessages[mensage.tipo]).fadeIn('slow');
	$(typeMessages[mensage.tipo]).fadeOut(3000);
};


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

new Currency('Brazil', 'BRL', 'R$ ', '%{symbol}%<value>.2f', true);
currency = Currency.findByCode("BRL");

//posicionar o mouse no primeiro input da tela
focusInput = function(){
	$('input:text:visible:first').focus();	
};

exibirMessage =function(type,m){
	var typeMessege = {'sucesso':'bg-success text-success','atencao':'bg-danger text-danger'};

    $(".msg").toggleClass(typeMessege[type]);
	$('.msg').text(m);
	$('.msg').fadeIn('slow');
	$('.msg').fadeOut(4000, function(){
		$(".msg").toggleClass(typeMessege[type]);
	});
	
};

formatDate = function(d){
	var dataBrasil = ""+d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
	return dataBrasil;
};

formatHora = function(d){
	var horaBrasil = acresZero(d.getHours())+":"+acresZero(d.getMinutes());
	return horaBrasil;
};
acresZero = function(n){
	var number = '';
	if(n.toString().length<2) 
		number +="0"+n;
	else
		number += n;

	return number;
};

calcPermanencia = function(d){
	var dataAtual = new Date(Session.get('horaServe'));
	var hora = dataAtual.getHours() - d.getHours();
	var minuto = dataAtual.getMinutes() - d.getMinutes();
	var permanencia = ""+hora+"h "+minuto+"min";
	return permanencia;
};

obterComanda = function(){
	var venda = Session.get('selectedVenda');
	var historico = new Historico();
	if(venda){
		historico.textHeader = "Espetinho do Gledson";
		historico.codGarcomAtend = venda.codGarcomAtend;
		historico.numeroMesa = venda.numeroMesa;
		var horAberMesa = new Date(venda.horAberMesa);
		historico.datVenda = formatDate(horAberMesa);
		var listaItens = Itens.find({idVenda: venda._id, isCancelado: false});

		if(listaItens){
		var somaTotalVenda = 0;
		var i = 1;
		listaItens.forEach(function (item) {
			var itemHistorico = new ItemHistorico();
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