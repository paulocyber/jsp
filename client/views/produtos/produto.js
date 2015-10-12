//teste git alteraçoes
Meteor.subscribe('Produtos');
Meteor.subscribe('Categorias');

//Função comuns 
function atribuirProduto() {
	var prod = new Produto();

	prod.codProd = $('#codProd').val().toUpperCase();
	prod.refProd = $('#refProd').val().toUpperCase();
	prod.desProd = $('#desProd').val().toUpperCase();
	prod.undProd = $('#undProd').val().toUpperCase();
	prod.cusProd = $('#cusProd').val();
	prod.preProd = $('#preProd').val();
	prod.marProd = $('#marProd').val();

	var nomeCat = $('#catProd').val().toUpperCase();
	var categoria = Categorias.findOne({
		nome: nomeCat
	});

	prod.idCatProd = categoria._id;
	prod.subProd = $('#subProd').val().toUpperCase();
	prod.datProd = new Date().toDateString();
	prod.atiProd = true;

	return prod;
}

function zeraCamposProduto() {
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

//Helpers e Events do template addProduto
Template.addProduto.helpers({
	'listCategoria': function() {
		return Categorias.find();
	}
});

Template.addProduto.events({
	'submit form': function(event) {
		event.preventDefault();
		atribuirProduto();

		Meteor.call('adicionarProduto', atribuirProduto(), function(error, result) {
			mensagem(result);
		});

		zeraCamposProduto();
	},

	'keyup #preProd': function(event) {
		event.preventDefault();
		var cusProd = $('#cusProd').val();
		var preProd = $('#preProd').val();
		var marProd = (preProd / cusProd * 100) - 100;
		$('#marProd').val(parseInt(marProd));
	},

	'keyup #marProd': function(event) {
		event.preventDefault();
		var cusProd = new Number($('#cusProd').val());
		var marProd = new Number($('#marProd').val());
		var preProd = marProd * cusProd / 100 + cusProd;
		$('#preProd').val(preProd.toFixed(1));
	},
	'click #addCategoria': function(event) {
		event.preventDefault();
		$('#addCategoriaModal').modal('show');
	}
});

//Helpers e Events do template listProduto
Template.listProduto.helpers({
	'listProduto': function() {
		return Produtos.find({
			atiProd: true
		}, {
			sort: {
				codProd: 1
			}
		});
	},
	'nomeCat':function(){
		var catId = this.idCatProd;
		var categoria =Categorias.findOne(catId);
		var nome =  categoria && categoria.nome;

		return nome;	
			
	}
});
Template.listProduto.events({
	'click #btnDesativar': function(event) {
		event.preventDefault();
		var idProd = this._id;
		var confirm = window.confirm('Tem certeza que deseja DELETAR?');
		if (confirm) {
			Meteor.call('desativarProduto', idProd, function(error, result){
				mensagem(result);
			});
		}
	}
});

//Helpers e Events do template modal para produto

Template.modalCategoria.events({
	'click #saveCat': function(event) {
		event.preventDefault();
		var data = new Categoria();
		data.nome = $('#nomeCat').val().toUpperCase();

		if (Categorias.findOne({
				nome: data.nome
			})) {
			$('.message-erro').fadeIn('slow');
			$('.message-erro').fadeOut(5000);
		} else {
			Meteor.call('addCategorias', data);
			$('#addCategoriaModal').modal('hide');
			$('#nomeCat').val('');
		}

	}
});