/**
 * Created by paulocyber on 30/10/15.
 */
Template.incluirProduto.helpers({

});
Template.incluirProduto.events({
    'submit #incluir': function(event) {
        event.preventDefault();
        var codProd = $('#codProd').val();
        var produto = Produtos.findOne({codProd:codProd});

        var codObs = $('#codObs').val();
        var observacao = Observacoes.findOne({nome: obsItem});

        var qtdProdItem = parseInt($('#qtdProdItem').val());

        var venda = Vendas.findOne()

        if(produto){
            var item = new Item();

            Meteor.call('horaServe', function (error, result) {
                Session.set('horaServe', result);
            });

            item.idVenda= venda._id;
            item.idProd= produto._id;
            item.idObsItem = observacao._id;
            item.qtdProdItem = qtdProdItem;
            item.vlrTotal = produto.preProd *qtdProdItem;

            item.criado = Session.get('horaServe');

            Meteor.call('incluirProduto', item, function (error, result) {
                if(result){
                    exibirMessage('sucesso','Item incluido com sucesso!');
                }else{
                    exibirMessage('atencao','Item não pode ser incluído!');
                }
            });

            Meteor.call('print', obterItemComanda(item,venda.codGarcomAtend,venda.numeroMesa), function (error, result) {
                mensagem(result);
            });

        }else exibirMessage('atencao','Produto NÃO EXISTE');
        $('#codProd').val('');
        $('#desProd').val('');
        $('#qtdProdItem').val('');
        ultimoObs=''; //Ao incluir seta o select observação para o padrão
        focusInput();
    },
    'keyup #codProd':function(){
        var codProd = $('#codProd').val();
        var produto = Produtos.findOne({codProd: codProd, atiProd: true});
        var desProd = produto && produto.desProd;

        if(desProd)
            $('#desProd').val(desProd);
        else
            $('#desProd').val('');
    },
    'keypress .modal':function(event){

    },
});