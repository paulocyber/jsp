/**
 * Created by paulocyber on 30/10/15.
 */
Template.incluirProduto.helpers({
    'listObservacao':function(){
        return Observacoes.find();
    },
    //helper para setar ao incluir nova observação
    'forObs':function(nome){
        return nome === ultimoObs;
    }
});
Template.incluirProduto.events({
    'submit #incluir': function(event) {
        event.preventDefault();
        var venda = Session.get('selectedVenda');

        var codProd = $('#codProd').val();
        var produto = Produtos.findOne({codProd:codProd});

        var obsItem = $('#obsItem').val();
        var observacao = Observacoes.findOne({nome: obsItem});

        var qtdProdItem = parseInt($('#qtdProdItem').val());

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
        focusInput(); //Ao incluir um produto da focus no primeiro input

    },
    'click #bloqueio':function(){
        var mesa = Session.get('selectedMesa');
        Modal.hide();
        Meteor.call('editarEstadoMesa', mesa._id, estadoBoqueado,function (error, result) {

        });
        Modal.show('qtdPessoasModal');
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
    'click #addObservacao': function(event) {
        event.preventDefault();

        /*Devido ao problema que o bootstrap não aceita modais
         multiplos tenho ocultar uma para chamar outro*/
        Modal.hide('incluirProduto');
        Modal.show('addObservacaoModal');
    },
    'shown.bs.modal .modal': function(){
        focusInput();
    }
});

Template.addObservacaoModal.events({
    'click #saveObs': function(event) {
        event.preventDefault();
        var obs = new Observacao();
        obs.nome = $('#nomeObs').val().toUpperCase();
        if (Observacoes.findOne({nome: obs.nome})) {
            exibirMessage('atencao','Observação já cadastrada');
        } else {
            Meteor.call('addObservacao', obs);
            Modal.hide('addObservacaoModal');
            $('#nomeObs').val('');
            ultimoObs=obs.nome;
            Modal.show('incluirProduto');
        }
    },
    'click .btn-close': function(){
        /*Devido ao problema que o bootstrap não aceita modais
         multiplos tenho ocultar uma para chamar outro, tambem
         retirei o evento padrões dos botões cancel e close no
         modal de observação, para transição rapida de modal multiplo
         tiver que tirar o efeito fade do incluirProduto e observação*/
        Modal.hide();
        Modal.show('incluirProduto');
    },
    'shown.bs.modal  #addObservacaoModal': function(){
        $('#nomeObs').focus();
    }
});
