const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('adopt-a-bull', function(){
	before(function(){
		return runServer();
	});
	after(function(){
		return closeServer();
	});
  //   it('should be able to create an adopter account', function(){
		// return chai.request(app)
		// .post('/user/')
		// 	.send({
		// 		'log-in': 'on', 
		// 		'email': 'demo-adopter@gmail.com', 
		// 		'password': 'Password123',
		// 		'user-type': 'adopter'
		// 	})
		// .then(function(res){
		// 	expect(res).to.have.status(201);
		// });
  //   });
    it('should be able to log in as an adopter', function(){
		return chai.request(app)
		.post('/user/sign-in/')
		.send({
			'log-in': 'on', 
			'email': 'demo-adopter@gmail.com', 
			'password': 'Password123'
		})
		.then(function(res){
			expect(res).to.have.status(200);
		});
    });
    it('should be able to view a list of all adopt-a-bull puppies', function(){
		return chai.request(app)
		.get('/api/puppies/')
		.then(function(res){
			expect(res).to.have.status(200);
			expect(res).to.be.json;
			expect(res.body).to.be.a('array');
			expect(res.body.length).to.be.above(0);
			res.body.forEach(function(item){
				expect(item).to.be.a('object');
				expect(item).to.have.all.keys(
				'_id', 
				'adoptionFee', 
				'age', 
				'biography', 
				'characteristics', 
				'compatibility', 
				'created',
				'gender', 
				'name', 
				'photo', 
				'shelterId', 
				'size', 
				'training'
				);
			});
		});
    });
  //   it('should be able to next a puppy', function(){
  //   	return chai.request(app)
		// .post('/api/puppies/')
		// .then(function(res){
		// 	expect(res).to.have.status(203);
		// 	expect(res).to.be.json;
		// 	expect(res.body).to.be.a('array');
		// 	expect(res.body.length).to.be.above(0);
		// 	res.body.forEach(function(item){
		// 		expect(item).to.be.a('object');
		// 		expect(item).to.have.all.keys(
		// 		'created', 
		// 		'_id', 
		// 		'photo', 
		// 		'name', 
		// 		'gender', 
		// 		'age', 
		// 		'size', 
		// 		'training', 
		// 		'biography', 
		// 		'adoptionFee',
		// 		'shelterId[address][number]', 
		// 		'shelterId[address][street]', 
		// 		'shelterId[address][city]',
		// 		'shelterId[address][zipcode]', 
		// 		'shelterId[_id]', 
		// 		'shelterId[name]',
		// 		'shelterId[telephone]',
		// 		'shelterId[email]'
		// 		);
		// 	});
		// });
  //   });
    it('should be able to favorite a puppy', function(){
    	const favoritePuppy = {userId: '5a811b1f4e979cb2fc454de3', puppyId: '5a8124f9f36d28314de96e34'};
    	return chai.request(app)
		.post('/api/favorite/')
		.send(favoritePuppy)
		.then(function(res){
			expect(res).to.have.status(206);
			expect(res).to.be.json;
			expect(res.body).to.be.a('object');
			// expect(res.body).to.include.keys('__v', '_creator', '_id', 'favoritePuppies', 'puppyId', 'userId');
			// expect(res.body.length).to.be.above(0);
			// });
		});
    });
  }
);