//teste git alteraçoes
Meteor.subscribe('Produtos');
Meteor.subscribe('Categorias');

//variaveis globais
ultimoCat=''; //variavel para setar select na hora que inserir uma nova categoria 

//Helpers e Events do template addProduto
Template.addProduto.onRendered(function(){
	$('#codProd').focus();
});
Template.addProduto.helpers({
	'listCategoria': function() {
		return Categorias.find();
	},
	'forCat':function(nome){
		return nome === ultimoCat;
	}

});

Template.addProduto.events({
	'submit form': function(event) {
		event.preventDefault();
		atribuirProduto();

		Meteor.call('adicionarProduto', atribuirProduto(), function(error, result) {
			if(result){
				mensagem(result);
				zeraCamposProduto();
			}
			else
				mensagem(new Mensage('atencao','Código produto está em uso!'));
		});
		ultimoCat = '';
		$('#codProd').focus();

	},

	'keyup #preProd': function(event) {
		event.preventDefault();
		var cusProd = $('#cusProd').val();
		var preProd = $('#preProd').val();
		var marProd = (preProd / cusProd * 100) - 100;
		$('#marProd').val(parseFloat(marProd).toFixed(2));
	},

	'keyup #marProd': function(event) {
		event.preventDefault();
		var cusProd = new Number($('#cusProd').val());
		var marProd = new Number($('#marProd').val());
		var preProd = marProd * cusProd / 100 + cusProd;
		$('#preProd').val(preProd.toFixed(2));
	},
	'click #addCategoria': function(event) {
		event.preventDefault();
		Modal.show('modalCategoria');
	}
});


//Helpers e Events do template modal para produto

Template.modalCategoria.events({
	'click #saveCat': function(event) {
		event.preventDefault();
		var cat = new Categoria();
		cat.nome = $('#nomeCat').val().toUpperCase();

		if (Categorias.findOne({nome: cat.nome})) {
			exibirMessage('atencao','Categoria já cadastrada');
		} else {
			Meteor.call('addCategorias', cat, function(error, result){
				mensagem(result);
			});
			Modal.hide();
			ultimoCat = cat.nome;
			$('#nomeCat').val('');
			$('#subProd').focus();

		}

	},
	'shown.bs.modal #modalCategoria': function(){
    	$('#nomeCat').focus();	
  	}
});
