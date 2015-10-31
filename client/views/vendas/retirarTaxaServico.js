/**
 * Created by paulocyber on 30/10/15.
 */
Template.retirarTaxaServico.events({
    'submit #form-confirmacao': function (event){
        event.preventDefault();

        var password = $('#senha-encerrar').val();

        var result = Meteor.call('equalsSenha', password,function (error, result) {
            if(result){
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
            }else{
                mensagem(new Mensage('atencao','Senha invalida!!!'));
            }
        });

        $('#senha-encerrar').val('');

    },
    'shown.bs.modal  #retirarTaxaServico': function(){
        $('#senha-encerrar').focus();
    }
});