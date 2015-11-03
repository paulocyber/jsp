/**
 * Created by paulocyber on 02/11/15.
 */


Template.reimVendas.onRendered(function(){
    focusInput();
    Session.set('selectedVendaRelatorio', '');
});
Template.reimVendas.helpers({
    getTemplate: function () {
        return 'historicoRelatorio';
    },
    'listaVendas':function(){
        var campos = Session.get('camposFormReimp');
        var data = new Date(campos.data);
        var vendas = Vendas.find({atiVenda:false, numeroMesa:campos.mesa});
        return vendas;
    }
});

Template.reimVendas.events({
    'submit #reimVendas-form': function(event){
        event.preventDefault();
        //Session.set('selectedVendaRelatorio', Vendas.findOne({numeroMesa:2,atiVenda:false}));
        var data = $('#data').val();
        var mesa = $('#numMesa').val();
        var codGarcom = $('#codGarcom').val();
        var campos = new CamposFormReimp(data,parseInt(mesa),codGarcom);
        Session.set('camposFormReimp',campos);
    },
    'click #btn-reim-vendas':function(event){
        event.preventDefault();
    }
});

/*Venda = function() {
    this.numeroMesa=0;
    this.codGarcomAtend;
    this.qtdPessoas=1;
    this.horAberMesa;
    this.temPermanencia;
    this.horSaiMesa;
    this.vlrTotal;
    this.taxaServico;
    this.atiVenda;
}*/