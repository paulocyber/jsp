
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
Router.route('/vendas/mapaMesas',{
	name: 'mapaMesas',
	template: 'mapaMesas',
    onBeforeAction: function(){
        thisLogged(this);
    },
    onStop:function () {
       Modal.hide();
    }
});
 Router.route('/vendas/addObservacoes',{
     name: 'addObservacoes',
     template: 'addObservacoes',
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

Router.route('/painelAdministrativo',{
	name: 'painelAdministrativo',
	template: 'painelAdministrativo',
	onBeforeAction: function(){
        var currentUser = Meteor.user();
        var user = Meteor.userId();
        if(user) {
            if (Roles.userIsInRole(currentUser, 'admin')) {
                this.next();
            } else {
                this.render("loginOrRegister");
            }
        }
    }
});

Router.route('/relatorios/reimprimir-cupom',{
    name: 'reimVendas',
    template: 'reimVendas',
    onBeforeAction: function(){ 
        thisLogged(this)
    }
});

Router.route('/relatorios/grafico-vendas',{
     name: 'graficoVenda',
     template: 'graficoVenda',
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