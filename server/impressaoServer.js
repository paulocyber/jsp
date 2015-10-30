Meteor.methods({
	'print':function(data){
		try{
			var result = HTTP.call("POST", "http://localhost:8000",
				{
					data:data,
					headers:{"content-type":"application/json"}
				});
			return new Mensage ('sucesso',"impressão realiza!");
		}catch(e){
			return new Mensage ('atencao',"servidor de impressão não encontrado!");
		}
	}
});
