/**
 * Created by paulocyber on 31/10/15.
 */
Template.aberturaMesa.events({
    'submit #abrir': function(event) {
        event.preventDefault();
        var mesa = Session.get('selectedMesa');
        var codGarcomAtend = $('#codGarcomAtend').val();
        var isCodGarcomAtend = Funcionarios.findOne({codFunc: codGarcomAtend});

        if(isCodGarcomAtend){
            var venda = new Venda();

            venda.numeroMesa = mesa.numero;
            venda.codGarcomAtend = codGarcomAtend;
            venda.taxaServico = true;

            Modal.hide('mapaMesas');

            Meteor.call('editarEstadoMesa', mesa._id, estadoOcupado);
            Meteor.call('iniciarVenda',venda, function (error, result){
                mensagem(result);
            });
        }else{
            exibirMessage('atencao','Garçom NÃO EXISTE');
        }
    },
    'keyup #codGarcomAtend':function(){
        var codFunc = $('#codGarcomAtend').val();
        var funcionario = Funcionarios.findOne({codFunc: codFunc});
        var nomFunc = funcionario && funcionario.nomFunc;

        if(nomFunc)
            $('#nomeGarcom').text(nomFunc);
        else
            $('#nomeGarcom').text('');
    },
    'shown.bs.modal #aberturaMesa': function(){
        focusInput();
    }
});