Meteor.methods({
	'encrypMessage':function(password){
		if(validacao()){
			var hash = CryptoJS.HmacMD5(password, secretPass).toString(); 
			var configuracao = new Configuracao();
			configuracao.senhaCancelarItem = hash;
			var thisSenha = Configuracoes.find().count();
			if(thisSenha){
				return new Mensage('atencao', 'Já existe senha salva');
			}else{
				Configuracoes.insert(configuracao);
				return new Mensage('sucesso', 'Senha salva');
			}
		}		
	},
	'equalsSenha':function(password){
		if(validacao()){
			var hash = CryptoJS.HmacMD5(password, secretPass).toString();
			var isSenhaValida = Configuracoes.findOne({senhaCancelarItem: hash});
			if(isSenhaValida)
				return true;
			else
				return false;
		}
	}
});