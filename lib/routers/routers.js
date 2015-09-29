Router.configure({
	layoutTemplate: 'main'
});

Router.route('/',{
	name: 'home',
	template: 'home'
});

Router.route('/listProduto',{
	name: 'listProduto',
	template: 'listProduto'
});
Router.route('/addProduto',{
	name: 'addProduto',
	template: 'addProduto'
});

Router.route('/mapaMesas',{
	name: 'mapaMesas',
	template: 'mapaMesas'
});