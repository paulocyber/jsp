Meteor.publish('MapaMesas',function(){
    return MapaMesas.find()
  });
Meteor.publish('Observacoes',function(){
    return Observacoes.find()
  });
Meteor.publish('Vendas',function(){
    return Vendas.find({atiVenda: true})
  });

Meteor.publish('Itens',function(){
    return Itens.find();
  });

Meteor.methods({
  'editarEstadoMesa':function(mesaId,estado){
      MapaMesas.update({_id: mesaId},{$set:{estado: estado}});
    }
});

Meteor.methods({
  'iniciarVenda':function(data){      
  	  data.horAberMesa = new Date();
  	  data.atiVenda = true;
      Vendas.insert(data);
      return "Venda iniciada com sucesso!";
    },
    'incluirProduto': function(data){
      data.isCancelado = false;
      Itens.insert(data);
    },
    'encerrarVenda': function(idVenda){
        Vendas.update({_id: idVenda},{$set:{atiVenda: false}}); 
    },
    'horaServe':function(){
      return new Date();
    }
});

Meteor.methods({
  'addObservacao':function(data){
      Observacoes.insert(data);
    }
});