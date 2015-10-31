/**
 * Created by paulocyber on 30/10/15.
 */
Template.confirmacaoEncerrarMesaModal.events({
    'submit #form-encerrar': function (event){
        event.preventDefault();
        console.log('entrou');
        var mesa = Session.get('selectedMesa');
        var venda = Session.get('selectedVenda');
        var historico = obterComanda();

        venda.temPermanencia = historico.temPermanencia;
        venda.horSaiMesa = new Date(Session.get('horaServe'));
        venda.vlrTotal = currency.parseStr(historico.vlrTotalVenda);
        venda.atiVenda = false;

        var password = $('#senha-encerrar').val();

        Meteor.call('equalsSenha', password,function (error, result) {
            if(result){
                Meteor.call('editarEstadoMesa', mesa._id, estadoLivre,function (error, result) {

                });
                Modal.hide();
                var confirm = window.confirm('Desejar imprimir cupom?');
                if (confirm) {
                    Meteor.call('print', obterComanda());
                }
                Meteor.call('encerrarVenda', venda, function (error, result) {
                    mensagem(result);
                });
                Session.set('selectedVenda','');
            }else{
                mensagem(new Mensage('atencao','Senha invalida!!!'));
                Session.set('selectedVenda','');
            }
        });
    },
    'shown.bs.modal  #encerrarMesaModal': function(){
        $('#senha-encerrar').focus();
    }
});

