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

// get all puppies

function getPuppies(puppyId = 0, nextPuppy = null){
	$('.puppy-card').load('/api/puppies/' + puppyId, nextPuppy, function(d){
		$('a.mail').attr('href', `mailto:${$(`.shelter-info .email`).text()}`);
	});
}




// TO DO
// only add puppy to favorite once
// mail to shelter
// tests

if($('.js-main-adopters')){
	getPuppies();
}

// expand puppy card
//
// FIX THIS
//
// $('.discovery-wrapper').on('click', '.puppy-card-info', function(){
// 	if($('.puppy-card-icon').text() === 'info'){
// 		$('.puppy-card-icon').text('cancel');
// 		$('.puppy-card-container').append('');
// 	}
// 	else{
// 		$('.puppy-card-icon').text('info');
// 		$('.puppy-card-expanded').remove();
// 	}
// });


// next puppy

$('.next').click(function(){
	getPuppies($('.hidden-puppy').data('nextpuppy'), JSON.parse($('.hidden-puppy p').text()));
});


// favorite puppy

$('.favorite').click(function(){
	console.log('favorite puppy');
	var element = this;
	var puppyId = $('.puppy-card-container').data('puppyid');

	$.ajax({
		method: "POST", 
		url: "/api/favorite/", 
		data: {userId: localStorage.getItem('userId'), 'puppyId': puppyId}})
	.done(function(msg){
		console.log("Data Saved: ", msg);
		renderFavoritePuppies();
		getPuppies($('.hidden-puppy').data('nextpuppy'), JSON.parse($('.hidden-puppy p').text()));
	});
});


// render list of favorites
function renderFavoritePuppies(){
	$('.favorite-puppies').html('');
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

renderFavoritePuppies();