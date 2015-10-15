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
        var currentUser = Meteor.userId();
        if(currentUser){
            this.next();
        } else {
            this.render("loginOrRegister");
        }
    }
});
Router.route('/addProduto',{
	name: 'addProduto',
	template: 'addProduto',
	onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            this.next();
        } else {
            this.render("loginOrRegister");
        }
    }	
});

//Vendas definições de rotas
Router.route('/mapaMesas',{
	name: 'mapaMesas',
	template: 'mapaMesas',
	onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            this.next();
        } else {
            this.render("loginOrRegister");
        }
    }
});

//Funcionarios definições de rotas
Router.route('/addFuncionario',{
	name: 'addFuncionario',
	template: 'addFuncionario',
	onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            this.next();
        } else {
            this.render("loginOrRegister");
        }
    }
});

Router.route('/listFuncionarios',{
	name: 'listFuncionarios',
	template: 'listFuncionarios',
	onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            this.next();
        } else {
            this.render("loginOrRegister");
        }
    }
});

Router.route('/configuracao',{
	name: 'configuracao',
	template: 'configuracao',
	onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            this.next();
        } else {
            this.render("loginOrRegister");
        }
    }
});

