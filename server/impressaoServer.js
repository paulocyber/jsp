Meteor.methods({
	'print':function(data){
		try{
			var result = HTTP.call("POST", "http://localhost:8000",
				{
					data:data,
					headers:{"content-type":"application/json"}
				});
			return new Mensage ('sucesso',"impress�o realiza!");
		}catch(e){
			return new Mensage ('atencao',"servidor de impress�o n�o encontrado!");
		}
	}
});
