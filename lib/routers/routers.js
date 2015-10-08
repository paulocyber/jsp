Router.configure({
	layoutTemplate: 'layout'
});

Router.route('/',{
	name: 'home',
	template: 'home'
});

//Produtos definiçoes de rotas
Router.route('/listProduto',{
	name: 'listProduto',
	template: 'listProduto'
});
Router.route('/addProduto',{
	name: 'addProduto',
	template: 'addProduto'
});

//Vendas definições de rotas
Router.route('/mapaMesas',{
	name: 'mapaMesas',
	template: 'mapaMesas'
});

//Funcionarios definições de rotas
Router.route('/addFuncionario',{
	name: 'addFuncionario',
	template: 'addFuncionario'
});

Router.route('/listFuncionarios',{
	name: 'listFuncionarios',
	template: 'listFuncionarios'
});
