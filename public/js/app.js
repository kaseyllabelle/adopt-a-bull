// landing > sign up / sign in

$('.form-sign-in').hide();

$('#btn-sign-in').click(function(){
	$('.form-sign-up').hide();
	$('.form-sign-in').show();
});

$('#btn-sign-up').click(function(){
	$('.form-sign-in').hide();
	$('.form-sign-up').show();
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
		// window.location.href= d.user.shelterId ? '/main/shelter' : '/main/adopter'
		window.location.href = '/main/' + d.user._id;
	});
});


// puppies

var currentPuppy;
var puppies;
var favoritePuppies;


// make adopter only able to favorite unique puppy once
// make list of favorites appear in the sidebar
// retain list of favorites (if refresh, don't disappear)
// get conditional / shift working



// next puppy

$('.next').click(function(){
	// conditional before shift 
	// if not puppies.length, then no puppies left
	puppies.shift();
	currentPuppy = puppies[0];
	$('.puppy-card-thumbnail').attr('src', currentPuppy.photo);
	$('.puppy-card-name').attr('src', currentPuppy.name);
});

// get next puppy from db
$.ajax({url: "http://localhost:8080/api/puppies"}).done(function(data){
	puppies = data;
	currentPuppy = data[0];
	$('.discovery-wrapper').html(`
		<div class="puppy-card">
			<div class="puppy-card-container" data-puppyId="${currentPuppy._id}">
				<img src="${currentPuppy.photo}" class="puppy-card-thumbnail" />
				<div class="puppy-card-info">
					<p class="puppy-card-name">${currentPuppy.name}</p>
					<i class="material-icons puppy-card-icon">info</i>
				</div>
			</div>
		</div>
	`);
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


// expand puppy card

$('.discovery-wrapper').on('click', '.puppy-card-info', function(){
	if($('.puppy-card-icon').text() === 'info'){
		$('.puppy-card-icon').text('cancel');
		$('.puppy-card-container').append(`
			<div class="puppy-card-expanded">
				<p class="name">Rhino</p>
				<p class="gender">male</p>
				<p class="age">senior</p>
				<p class="size">XL</p>
				<p class="training">well trained</p>
				<p class="characteristics">house broken, neutered/spayed, vaccinated, micro-chipped, special needs</p>
				<p class="compatibility">apartments, kids</p>
				<p class="biography">Rhino is a sweet pup. He's just about 10 years old. He loves face kisses, snuggles, and naps. He loves people, especially kids.</p>
				<p class="adoption-fee">$500</p>
				<div class="shelter-info">
					<p class="name">MSPCA Boston</p>
					<p class="address">350 South Huntington Avenue</p>
					<p class="address">Boston, MA 02130</p>
					<p class="telephone">617-522-5055</p>
					<p class="email">adoption@mspca.org</p>
				</div>
			</div>
		`);
	}
	else{
		$('.puppy-card-icon').text('info');
		$('.puppy-card-expanded').remove();
	}
});


// list of favorites

function getFavoritePuppies(){
	$.ajax({url: `http://localhost:8080/api/adopters/${localStorage.getItem('userId')}`}).done(function(data){
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