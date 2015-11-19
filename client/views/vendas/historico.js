/**
 * Created by SERVIDOR on 29/10/2015.
 */

Template.historico.helpers({
    'hasVendaMesa':function(){
        var venda = Session.get('selectedVenda');
        if(venda){
            return true;
        }else false;
    },
    'histMesa': function() {
        var historico = obterComanda(Session.get('selectedVenda'));
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
        var itemId =  this._id;

        Modal.show('adminRequestModal');
        adminCallback = function(){
            Meteor.call('cancelarItem',itemId ,function (error, result) {mensagem(result);});
        };

        $('#senha-cancelamentos').focus();
    },
    'click #btn-taxa-servico': function(event){
        Modal.show('adminRequestModal');
        adminCallback = function(){
            var venda = Session.get('selectedVenda');
            if(Session.get('taxaServico')){
                venda.taxaServico = false;
                var result = Meteor.call('retirarTaxaServ',venda);
                Session.set('taxaServico', false);
            }
            else{
                venda.taxaServico = true;
                var result = Meteor.call('retirarTaxaServ',venda);
                Session.set('taxaServico', true);
            }
            Modal.hide();
        }
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
