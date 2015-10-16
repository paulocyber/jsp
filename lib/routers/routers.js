
 thisLogged = function(data){
        var currentUser = Meteor.userId();
        if(currentUser){
            data.next();
        } else {
            data.render("loginOrRegister");
        }
    };

Router.configure({
	layoutTemplate: 'layout'
});

Router.route('/',{
	name: 'home',
	template: 'home'
});

Router.route('/login',{
	name: 'login',
	template: 'loginOrRegister'
});

//Produtos definiçoes de rotas
Router.route('/listProduto',{
	name: 'listProduto',
	template: 'listProduto',
	onBeforeAction: function(){
        thisLogged(this);
    }
});
Router.route('/addProduto',{
	name: 'addProduto',
	template: 'addProduto',
    onBeforeAction: function(){
        thisLogged(this);
    }
});

//Vendas definições de rotas
Router.route('/mapaMesas',{
	name: 'mapaMesas',
	template: 'mapaMesas',
    onBeforeAction: function(){
        thisLogged(this);
    }
});

//Funcionarios definições de rotas
Router.route('/addFuncionario',{
	name: 'addFuncionario',
	template: 'addFuncionario',
    onBeforeAction: function(){
        thisLogged(this);
    }
});

Router.route('/listFuncionarios',{
	name: 'listFuncionarios',
	template: 'listFuncionarios',
    onBeforeAction: function(){
        thisLogged(this);
    }
});

Router.route('/configuracao',{
	name: 'configuracao',
	template: 'configuracao',
	onBeforeAction: function(){ 
        thisLogged(this)
    }
});
