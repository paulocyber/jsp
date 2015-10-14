(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/categoriaServer.js                                           //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Meteor.publish('Categorias', function () {                             // 1
    return Categorias.find();                                          // 2
});                                                                    //
                                                                       //
Meteor.methods({                                                       // 5
    'addCategorias': function (data) {                                 // 6
        Categorias.insert(data);                                       // 7
    }                                                                  //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=categoriaServer.js.map
