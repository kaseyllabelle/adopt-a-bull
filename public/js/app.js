// LANDING

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


// PUPPIES

// get all puppies
function getPuppies(puppyId = 0, nextPuppy = null){
	$('.js-puppy-card').load('/api/puppies/' + puppyId, nextPuppy, function(d){
		$('.puppy-card-expanded').hide();
		$('a.mail').attr('href', `mailto:${$(`.shelter-info .email`).text()}`);
	});
}

if($('.js-main-adopters')){
	getPuppies();
};


// expand puppy card
$('.main-inner').on('click', '.puppy-card-info', function(){
	if($('.puppy-card-icon').text() === 'info'){
		$('.puppy-card-icon').text('cancel');
		$('.puppy-card-expanded').show();
	}
	else{
		$('.puppy-card-icon').text('info');
		$('.puppy-card-expanded').hide();
	}
});


// next puppy
$('.next').click(function(){
	getPuppies($('.hidden-puppy').data('nextpuppy'), JSON.parse($('.hidden-puppy p').text()));
});


// favorite puppy
$('.favorite').click(function(){
	var puppyId = $('.puppy-card-container').data('puppyid');
	$.ajax({
		method: "POST", 
		url: "/api/favorite/", 
		data: {userId: localStorage.getItem('userId'), 'puppyId': puppyId}})
	.done(function(msg){
		renderFavoritePuppies();
		getPuppies($('.hidden-puppy').data('nextpuppy'), JSON.parse($('.hidden-puppy p').text()));
	});
});


// render list of favorites
// function renderFavoritePuppies(){
// 	$('.favorite-puppies').html('');
// 	$.ajax({url: `/api/adopters/${localStorage.getItem('userId')}`}).done(function(data){
// 		let favoritePuppies = data.favoritePuppies;
// 		for(i=0;i<favoritePuppies.length;i++){
// 			$('.favorite-puppies').prepend(`
// 				<a class="puppy-container">
// 					<img src="${favoritePuppies[i].photo}" class="puppy-thumbnail" />
// 					<div class="puppy-info">
// 						<p class="puppy-name">${favoritePuppies[i].name}</p>
// 						<i class="material-icons puppy-icon">favorite</i>
// 					</div>
// 				</a>
// 			`);
// 		}
// 	});
// }


// render list of unique favorites
function renderFavoritePuppies(){
	$('.favorite-puppies').html('');
	$.ajax({url: `/api/adopters/${localStorage.getItem('userId')}`}).done(function(data){
		let favoritePuppies = data.favoritePuppies;
		// var array = favoritePuppies.map(a => a._id);
		// let uniqueFavoritePuppies = [...new Set(array)];
		favoritePuppies = _.uniqBy(favoritePuppies, '_id');
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


// TO DO
// tests
// clean up api
// clean up shelters files - move to v2?
// fix ui
// spacing around forgot password link on sign in
// puppy card expanded