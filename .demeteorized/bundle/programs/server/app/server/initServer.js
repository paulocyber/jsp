(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/initServer.js                                                //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
//PlanosIrest(maxCat,maxMesas,maxGarcons,maxQtdProdutos)               //
//Plano báscio = 3 categorias(maxCat); 30 mesas(maxMesas); 5 funcionarios(maxFuncionarios); 100 produtos cadastrados(maxQtProdutos)
                                                                       //
configPlanoBasic = new PlanosIrest(3, 30, 5, 100);                     // 4
var estadoLivre = "btn-success"; //Botao verde do bootstrap            // 5
                                                                       //
function gerarMesas(qtMesas) {                                         // 8
  for (var i = 0; i < qtMesas; i++) {                                  // 9
    MapaMesas.insert(new Mesa(i + 1, estadoLivre));                    // 10
  }                                                                    //
};                                                                     //
                                                                       //
function zerarMesas(qtMesas) {                                         // 14
  for (var i = 0; i < qtMesas; i++) {                                  // 15
    MapaMesas.update({}, { $set: { estado: estadoLivre } }, { multi: true });
  }                                                                    //
};                                                                     //
                                                                       //
if (MapaMesas.find().count() == 0) {                                   // 21
  gerarMesas(configPlanoBasic.maxMesas);                               // 22
} else {                                                               //
  zerarMesas(configPlanoBasic.maxMesas);                               // 24
}                                                                      //
                                                                       //
//-------------------------------------------------------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=initServer.js.map
