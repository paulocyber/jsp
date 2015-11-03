Meteor.publish('MapaMesas',function(){
    return MapaMesas.find()
  });
Meteor.publish('Observacoes',function(){
    return Observacoes.find()
  });
Meteor.publish('Vendas',function(){
    return Vendas.find()
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
          return new Mensage ('sucesso',"Mesa " +venda.numeroMesa+" aberta com sucesso!");
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
            return new Mensage('sucesso',"Mesa " +venda.numeroMesa+" encerrada!");
        } 
    },
    'retirarTaxaServ':function(venda){
        if(validacao()){
            Vendas.update({_id: venda._id},{$set:
                {
                    taxaServico: venda.taxaServico,
                }
            });
        }
    },
    'addQtdPessoas':function(venda){
        if(validacao()) {
            Vendas.update({_id: venda._id}, {
                $set: {
                    qtdPessoas: venda.qtdPessoas,
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
    },
    'transferirMesa':function(origem,destino){
        if(validacao()) {
            var vendaOrigem = Vendas.findOne({numeroMesa:origem,atiVenda:true});
            var vendaDestino = Vendas.findOne({numeroMesa:destino,atiVenda:true});
            var itemVendaOrigem = Itens.find({idVenda:vendaOrigem._id,isCancelado:false});
            itemVendaOrigem.forEach(function(item){
                Itens.update({_id:item._id},{$set:{idVenda:vendaDestino._id}});
            });
            Vendas.remove({_id:vendaOrigem._id});
            var mesaOrigem = MapaMesas.findOne({numero:origem});
            MapaMesas.update({_id: mesaOrigem._id},{$set:{estado:estadoLivre}});
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