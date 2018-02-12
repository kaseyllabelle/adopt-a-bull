// landing > sign up / sign in

$('form.sign-up').submit(function(e){
	e.preventDefault();
	$.post('/user/', $(this).serialize(), function(){
		window.location.href = '/sign-in/'
	});
});

$('form.sign-in').submit(function(e){
	e.preventDefault();
	$.post('/user/sign-in/', $(this).serialize(), function(d){
		localStorage.setItem('authToken', d.authToken);
		localStorage.setItem('userId', d.user._id);
		window.location.href= d.user.shelterId ? '/main/shelter' : '/main/adopter'
	});
});

$('.icon-favorite').click(function(e){
	e.preventDefault();
	$.post('/favorite/', {
		userId: localStorage.getItem('userId'), puppyId: $(this).data('pId');
	});
});