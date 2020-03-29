const cidr2wildcard = require('./');

let tests = [
	'10.3.2.1/32',
	'10.3.2.1/31',
	'10.3.2.1/30',
	'10.3.2.1/24',
	'10.3.2.1/23',
	'10.3.2.1/16',
	'10.3.2.1/4',
	'1.2.3.4/1',
	'0.0.0.0/0'
];

tests.map(t => {
	console.log(t + ' => ');
	cidr2wildcard(t).map(v => console.log('\t'+v));
});

try {
	cidr2wildcard('0.0.0.0/-1');
} catch (err) {
	console.log(err.message);
}
		
try {
	cidr2wildcard('0.0.0.0/33');
} catch (err) {
	console.log(err.message);
}


try {
	cidr2wildcard('192.1220.0.0/22');
} catch (err) {
	console.log(err.message);
}
