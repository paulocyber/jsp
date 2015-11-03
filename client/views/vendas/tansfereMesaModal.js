/**
 * Created by paulocyber on 01/11/15.
 */
Template.transfereMesaModal.helpers({

});

Template.transfereMesaModal.events({
   'submit #transferir-mesa-form':function(event){
       event.preventDefault();
       var origem = parseInt($('#origem').val());
       var destino = parseInt($('#destino').val());

       if(origem!=destino){
           var mesaOrigem =MapaMesas.findOne({numero:origem});
           var mesaDestino =MapaMesas.findOne({numero:destino});
           if(mesaOrigem && mesaDestino){
               if((mesaOrigem.estado==estadoOcupado)&&(mesaDestino.estado==estadoOcupado)){
                   Meteor.call('transferirMesa',origem,destino);
                   Modal.hide();
               }else
                   exibirMessage('atencao','As mesas têm que estarem abertas');
           }else
               exibirMessage('atencao','As mesas têm que existirem');
       }else
           exibirMessage('atencao','As mesas têm que ser diferentes');
   }
});