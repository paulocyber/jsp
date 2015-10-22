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
  'iniciarVenda':function(venda){      
      if(validacao()){
          venda.horAberMesa = new Date();
          venda.atiVenda = true;
          Vendas.insert(venda);
          return new Mensage ('sucesso',"Mesa aberta com sucesso!");  
      }     
    },
    'incluirProduto': function(item){
        if(validacao()){
            item.isCancelado = false;
            Itens.insert(item);
            return true; 
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
            return new Mensage('sucesso','Mesa encerrada!');
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
  'addObservacao':function(obs){
        if(validacao()){
            Observacoes.insert(obs);
        }
    }
});