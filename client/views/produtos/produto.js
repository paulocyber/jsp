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
			mensagem(result);
		});

		zeraCamposProduto();
		ultimoCat = '';
		$('#codProd').focus();

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
		modalShow('#addCategoriaModal');
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

		if (Categorias.findOne({nome: data.nome})) {
			exibirMessage('atencao','Categoria já cadastrada');
		} else {
			Meteor.call('addCategorias', data);
			modalHide('#addCategoriaModal');
			ultimoCat = data.nome;
			$('#nomeCat').val('');
			$('#subProd').focus();

		}

	},
	'click .btn-close':function(event){
		event.preventDefault();
		Session.set('modalOn', false);
	},
	'shown.bs.modal #addCategoriaModal': function(){
    	$('#nomeCat').focus();	
  	}
});
