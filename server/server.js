//PlanosIrest(maxCat,maxMesas,maxGarcons,maxQtdProdutos)
//Plano báscio = 3 categorias(maxCat); 30 mesas(maxMesas); 5 garçons(maxGarcons); 100 produtos cadastrados(maxQtProdutos)

var configPlanoBasic = new PlanosIrest(3,30,5,100);
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





Meteor.publish('MapaMesas',function(){
    return MapaMesas.find()
  });

Meteor.publish('Produtos',function(){
    return Produtos.find()
  });

Meteor.methods({
    'adicionarProduto': function(data){
      //var currentUserId = Meteor.userId();

      if(Produtos.find().count()==configPlanoBasic.maxQtdProdutos){
        return 'Quantidade de Produtos Plano Basico no limite, faça upgrade do seu Plano';
      }else{
        Produtos.insert(data);  
        return 'Produto adicionado com Sucesso!';
      }      
    },
    
    'desativarProduto': function(produtoId){
      Produtos.update({_id: produtoId},{$set:{atiProd: false}});
    },
    'editarEstadoMesa':function(mesaId,estado){
      MapaMesas.update({_id: mesaId},{$set:{estado: estado}});
    }
        
    /*
    'modifyPlayerScore': function(selectedPlayer,scorePlayer){
      var currentUserId = Meteor.userId();
      PlayersList.update({_id: selectedPlayer,createdBy: currentUserId},{$inc:{score:scorePlayer}})
    }*/

  });