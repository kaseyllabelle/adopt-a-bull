// landing > sign up / sign in

$('#btn-sign-in').click(function(){
	window.location.href = '/sign-in/'
});

$('#btn-sign-up').click(function(){
	window.location.href = '/sign-up/'
});

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
		window.location.href = '/main/' + d.user._id;
	});
});


// puppies

// make adopter only able to favorite unique puppy once
// make list of favorites appear in the sidebar
// retain list of favorites (if refresh, don't disappear)
// get conditional / shift working
// email shelter



// get all puppies

function getPuppies(puppyId = 0){
	console.log(puppyId);
	$(".testing-this-thing").load('/api/puppies/' + puppyId);
	// $.ajax({url: '/api/puppies/' + puppyId})
	// .done(function(data){
	// 	currentPuppy = data;
	// 	console.log(currentPuppy);
	// 	$('.discovery-wrapper').html('');
	// });
}
if($('.js-main-adopters')){
	getPuppies();
}

// expand puppy card

$('.discovery-wrapper').on('click', '.puppy-card-info', function(){
	if($('.puppy-card-icon').text() === 'info'){
		$('.puppy-card-icon').text('cancel');
		$('.puppy-card-container').append('');
	}
	else{
		$('.puppy-card-icon').text('info');
		$('.puppy-card-expanded').remove();
	}
});


// next puppy

$('.next').click(function(){
	// conditional before shift 
	// if not puppies.length, then no puppies left
	puppies.shift();
	currentPuppy = puppies[0];
	$('.puppy-card-thumbnail').attr('src', currentPuppy.photo);
	$('.puppy-card-name').attr('src', currentPuppy.name);
});


// favorite puppy

$('.favorite').click(function(){
	console.log('favorite puppy', currentPuppy._id);
	var element = this;
	var puppyId = $('.puppy-card-container').data('puppyId');

	$.ajax({
		method: "POST", 
		url: "/main/favorite/", 
		data: {userId: localStorage.getItem('userId'), 'puppyId': currentPuppy._id}})
	.done(function(msg){
		console.log("Data Saved: ", msg);
		$('.next').trigger('click');
		getFavoritePuppies();
	});
});


// list of favorites
// move this to ejs

function getFavoritePuppies(){
	$.ajax({url: `/api/adopters/${localStorage.getItem('userId')}`}).done(function(data){
		console.log(data);
		favoritePuppies = data.favoritePuppies;
		for(i=0;i<favoritePuppies.length;i++){
			$('.favorite-puppies').prepend(`
				<a class="puppy-container">
					<img src="${favoritePuppies[i].photo}" class="puppy-thumbnail" />
					<div class="puppy-info">
						<p class="puppy-name">${favoritePuppies[i].name}</p>
						<i class="material-icons puppy-icon">favorite</i>
					</div>
				</a>
			`);
		}
	});
}

getFavoritePuppies();