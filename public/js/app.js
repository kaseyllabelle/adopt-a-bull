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
		userId: localStorage.getItem('userId'), puppyId: $(this).data('pId')
	});
});


// next puppy

var currentPuppy;
var puppies;
var favoritePuppies;

$('.next').click(function(){
	// console.log('puppy', puppies);
	puppies.shift();
	// console.log('puppy', puppies);
	currentPuppy = puppies[0];
	$('.puppy-card-thumbnail').attr('src', currentPuppy.photo);
	$('.puppy-card-name').attr('src', currentPuppy.name);
});

$.ajax({url: "http://localhost:8080/api/puppies"}).done(function(data){
	puppies = data;
	currentPuppy = data[0];
	// $('.puppy-card-thumbnail').attr('src', currentPuppy.photo);
	// $('.puppy-card-name').attr('src', currentPuppy.name);
	console.log(currentPuppy);
	$('.discovery-wrapper').html(`
		<div class="puppy-card">
			<a class="puppy-card-container">
				<img src="${currentPuppy.photo}" class="puppy-card-thumbnail" />
				<div class="puppy-card-info">
					<p class="puppy-card-name">${currentPuppy.name}</p>
					<i class="material-icons puppy-card-icon">info</i>
				</div>
			</a>
		</div>
	`);
});

$.ajax({url: "http://localhost:8080/api/adopters/5a811b1f4e979cb2fc454de2"}).done(function(data){
	favoritePuppies = data.favoritePuppies;
	$('.favorite-puppies').html(`
		<a class="puppy-container">
			<img src="${favoritePuppies[1].photo}" class="puppy-thumbnail" />
			<div class="puppy-info">
				<p class="puppy-name">${favoritePuppies[1].name}</p>
				<i class="material-icons puppy-icon">favorite</i>
			</div>
		</a>
	`);
	// console.log(favoritePuppies);
});

// favorite puppy

$('.favorite').click(function(){
	console.log('favorite puppy', currentPuppy._id);

	if(favoritePuppies.indexOf(currentPuppy._id) == -1){
		favoritePuppies.push(currentPuppy._id);
	}
	else{
		favoritePuppies.slice(favoritePuppies.indexOf(currentPuppy._id));
	}

	$.ajax({
		method: "PUT", 
		url: "/api/adopters/5a811b1f4e979cb2fc454de2", 
		data: {'favoritePuppies': favoritePuppies, id: '5a811b1f4e979cb2fc454de2'}})
	.done(function( msg ) {
		console.log( "Data Saved: " + msg );
	});
});

// list of favorites



