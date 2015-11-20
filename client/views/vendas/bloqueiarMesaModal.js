/**
 * Created by paulocyber on 30/10/15.
 */
Template.bloqueiarMesaModal.helpers({

});
Template.bloqueiarMesaModal.events({
    'click #bloqueio':function(){
        var mesa = Session.get('selectedMesa');
        Modal.hide();
        Meteor.call('editarEstadoMesa', mesa._id, estadoBoqueado,function (error, result) {

        });
        Modal.show('qtdPessoasModal');
    },
});
/**
 * Created by SERVIDOR on 20/11/2015.
 */
