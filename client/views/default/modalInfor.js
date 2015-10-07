typeMessages = {'sucesso':'#message-success', 'info':'#message-info', 'aviso':'#message-warning', 'atencao':'#message-danger'};

mensagem = function (mensage){	
	$('.text-info').text(mensage.mens);
	$(typeMessages[mensage.tipo]).fadeIn('slow');
	$(typeMessages[mensage.tipo]).fadeOut(3000);
};
