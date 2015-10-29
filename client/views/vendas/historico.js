Template.historico.helpers({
    'hasVendaMesa':function(){
        var venda = Session.get('selectedVenda');
        if(venda){
            return true;
        }else false;
    },
    'histMesa': function() {
        var historico = obterComanda();
        Session.set('listaItens', historico.listItens);
        return historico;
    },
    'iconTaxa':function(){
        if(Session.get('taxaServico'))
            return 'glyphicon-minus'
        else
            return 'glyphicon-plus'
    },
    'corBtn':function(){
        if(Session.get('taxaServico'))
            return 'btn-danger'
        else
            return 'btn-primary'
    }
});
Template.historico.events({
    'click #btn-cancelar-item': function () {
        Session.set('itemCancelar', this._id);
        Modal.show('cancelamentoItemModal');
        $('#senha-cancelamentos').focus();
    },
    'click #btn-taxa-servico': function(event){
        Modal.show('retirarTaxaServico');
    }
});

Template.tableHist_desktop.helpers({
    'Itens': function () {
        var itensHist = Session.get('listaItens');
        return itensHist;
    }
});

Template.tableHist_phone.helpers({
    'Itens': function () {
        var itensHist = Session.get('listaItens');
        return itensHist;
    }
});

Template.cancelamentoItemModal.events({
    'submit #formCancel': function (event){
        event.preventDefault();

        var itemId = Session.get('itemCancelar');
        var password = $('#senha-cancelamento').val();

        Meteor.call('equalsSenha', password,function (error, result) {
            if(result){
                Meteor.call('cancelarItem',itemId ,function (error, result) {
                    return mensagem(result);
                });
            }else{
                mensagem(new Mensage('atencao','Senha invalida!!!'));
            }
        });
        Modal.hide();
        $('#senha-cancelamento').val('');
    },
    'shown.bs.modal  #cancelamentoItemModal': function(){
        $('#senha-cancelamento').focus();
    }
});/**
 * Created by SERVIDOR on 29/10/2015.
 */
Template.retirarTaxaServico.events({
    'submit #form-confirmacao': function (event){
        event.preventDefault();

        var password = $('#senha-encerrar').val();

        Meteor.call('equalsSenha', password,function (error, result) {
            if(result){
                if(Session.get('taxaServico')){
                    Session.set('taxaServico',false);
                }
                else{
                    Session.set('taxaServico',true);
                }
            }else{
                mensagem(new Mensage('atencao','Senha invalida!!!'));
            }
        });
        Modal.hide();
        $('#senha-encerrar').val('');

        Modal.hide();
    },
    'shown.bs.modal  #confirmacaoModal': function(){
        $('#senha-encerrar').focus();
    }
});