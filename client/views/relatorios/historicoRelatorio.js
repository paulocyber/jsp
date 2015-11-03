/**
 * Created by paulocyber on 02/11/15.
 */
Template.historicoRelatorio.helpers({
    'hasVendaMesa':function(){
        var venda = Session.get('selectedVendaRelatorio');
        if(venda){
            return true;
        }else false;
    },
    'histMesa': function() {
        var historico = obterComanda(Session.get('selectedVendaRelatorio'));
        Session.set('listaItens', historico.listItens);
        return historico;
    }
});
Template.historicoRelatorio.events({
    'click #print':function(){
        var venda = Session.get('selectedVendaRelatorio');
        Meteor.call('print', obterComanda(venda), function (error, result) {
            mensagem(result);
        });
    }
});

Template.tableHistRel_desktop.helpers({
    'Itens': function () {
        var itensHist = Session.get('listaItens');
        return itensHist;
    }
});

Template.tableHistRel_phone.helpers({
    'Itens': function () {
        var itensHist = Session.get('listaItens');
        return itensHist;
    }
});
