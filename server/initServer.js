//PlanosIrest(maxCat,maxMesas,maxGarcons,maxQtdProdutos)
//Plano báscio = 3 categorias(maxCat); 30 mesas(maxMesas); 5 funcionarios(maxFuncionarios); 100 produtos cadastrados(maxQtProdutos)

configPlanoBasic = new PlanosIrest(3,30,5,100);
var estadoLivre = "btn-success"; //Botao verde do bootstrap


function gerarMesas(qtMesas){
  for(var i=0;i<qtMesas;i++){
    MapaMesas.insert(new Mesa((i+1), estadoLivre));
  }
};

function zerarMesas(qtMesas){
  for(var i=0;i<qtMesas;i++){
    MapaMesas.update({},{$set:{estado: estadoLivre}},{multi:true});
  }
};


if(MapaMesas.find().count()==0){
  gerarMesas(configPlanoBasic.maxMesas);
}else{
  zerarMesas(configPlanoBasic.maxMesas);  
}

//-------------------------------------------------------------------------------------------------------------------------
