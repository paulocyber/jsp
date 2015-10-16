Meteor.methods({
	'encrypMessage':function(code){
		var hash = CryptoJS.HmacMD5(code, 'jhdjahs12/*;~^acx1213!').toString(); 
		console.log(hash);
	}
});