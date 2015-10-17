//PlanosIrest(maxCat,maxMesas,maxGarcons,maxQtdProdutos)
//Plano báscio = 3 categorias(maxCat); 30 mesas(maxMesas); 5 funcionarios(maxFuncionarios); 100 produtos cadastrados(maxQtProdutos)

configPlanoBasic = new PlanosIrest(3,30,5,100);
var estadoLivre = "btn-success"; //Botao verde do bootstrap
var estadoOcupado = "btn-primary";

secretPass = 'asdfghjklç~]1234567!@!##$#%';

function gerarMesas(qtMesas){
  for(var i=0;i<qtMesas;i++){
    MapaMesas.insert(new Mesa((i+1), estadoLivre));
  }
};

function zerarMesas(qtMesas){
  for(var i=0;i<qtMesas;i++){
  	var num = i+1;
  	var venda = Vendas.findOne({numeroMesa: num, atiVenda: true});
  	if(venda){
  		MapaMesas.update({numero: num},{$set:{estado: estadoOcupado}});	
  	}else{
  		MapaMesas.update({numero: num},{$set:{estado: estadoLivre}});	
  	}    
  }
};


if(MapaMesas.find().count()==0){
  gerarMesas(configPlanoBasic.maxMesas);
}else{
  zerarMesas(configPlanoBasic.maxMesas);  
}

//-------------------------------------------------------------------------------------------------------------------------
