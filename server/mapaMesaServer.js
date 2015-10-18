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
        if(validacao()){
            MapaMesas.update({_id: mesaId},{$set:{estado: estado}});
        }
    }
});

Meteor.methods({
  'iniciarVenda':function(data){      
      if(validacao()){
          data.horAberMesa = new Date();
          data.atiVenda = true;
          Vendas.insert(data);
          return new Mensage ('sucesso',"Mesa aberta com sucesso!");  
      }     
    },
    'incluirProduto': function(data){
        if(validacao()){
            data.isCancelado = false;
            Itens.insert(data);
        }
    },
    'encerrarVenda': function(venda){
        if(validacao()){
            Vendas.update({_id: venda._id},{$set:
                {
                temPermanencia: venda.temPermanencia,
                horSaiMesa: venda.horSaiMesa,
                vlrTotal: venda.vlrTotal,
                atiVenda: venda.atiVenda 
                }
            });
        } 
    },
    'horaServe':function(){
        if(validacao()){
            return new Date();
        }
    },
    'cancelarItem':function(itemId){
        if(validacao()){
            Itens.update({_id: itemId},{$set:{isCancelado: true}}); 
            return new Mensage('sucesso','item cancelado');
        }
    }
});

Meteor.methods({
  'addObservacao':function(data){
        if(validacao()){
            Observacoes.insert(data);
        }
    }
});