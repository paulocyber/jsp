(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/routers/routers.js                                              //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Router.configure({                                                     // 1
	layoutTemplate: 'layout'                                              // 2
});                                                                    //
                                                                       //
Router.route('/', {                                                    // 5
	name: 'home',                                                         // 6
	template: 'home'                                                      // 7
});                                                                    //
                                                                       //
//Produtos definiçoes de rotas                                         //
Router.route('/listProduto', {                                         // 11
	name: 'listProduto',                                                  // 12
	template: 'listProduto'                                               // 13
});                                                                    //
Router.route('/addProduto', {                                          // 15
	name: 'addProduto',                                                   // 16
	template: 'addProduto'                                                // 17
});                                                                    //
                                                                       //
//Vendas definições de rotas                                           //
Router.route('/mapaMesas', {                                           // 21
	name: 'mapaMesas',                                                    // 22
	template: 'mapaMesas'                                                 // 23
});                                                                    //
                                                                       //
//Funcionarios definições de rotas                                     //
Router.route('/addFuncionario', {                                      // 27
	name: 'addFuncionario',                                               // 28
	template: 'addFuncionario'                                            // 29
});                                                                    //
                                                                       //
Router.route('/listFuncionarios', {                                    // 32
	name: 'listFuncionarios',                                             // 33
	template: 'listFuncionarios'                                          // 34
});                                                                    //
                                                                       //
Router.route('/abrirMesa', {                                           // 37
	name: 'abrirMesa',                                                    // 38
	template: 'modalAbrirMesa'                                            // 39
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=routers.js.map
