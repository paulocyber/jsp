
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
Router.route('/produto/listProduto',{
	name: 'listProduto',
	template: 'listProduto',
	onBeforeAction: function(){
        thisLogged(this);
    }
});
Router.route('/produto/addProduto',{
	name: 'addProduto',
	template: 'addProduto',
    onBeforeAction: function(){
        thisLogged(this);
    },
    onStop:function () {
        Modal.hide();
    }
});

//Vendas definições de rotas
Router.route('/mapaMesas',{
	name: 'mapaMesas',
	template: 'mapaMesas',
    onBeforeAction: function(){
        thisLogged(this);
    },
    onStop:function () {
       Modal.hide();
    }
});

//Funcionarios definições de rotas
Router.route('/funcionario/addFuncionario',{
	name: 'addFuncionario',
	template: 'addFuncionario',
    onBeforeAction: function(){
        thisLogged(this);
    }
});

Router.route('/funcionario/listFuncionarios',{
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
Router.route('/relatorios/vendas',{
    name: 'r-vendas',
    template: 'relatorios',
    onBeforeAction: function(){ 
        thisLogged(this)
    }
});
Router.route('/acompanhamentoPedidos',{
    name: 'acompanhamentoPedidos',
    template: 'acompanhamentoPedidos',
    onBeforeAction: function(){ 
        thisLogged(this)
    }
});