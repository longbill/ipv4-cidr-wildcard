

function wildcard(cidr) {
	let ms = cidr.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\/(\d{1,2})$/);
	if (!ms) throw new Error(cidr + ' is not a valid CIDR string');
	let ips = [ms[1], ms[2], ms[3], ms[4], ms[5]];
	ips = ips.map(v => parseInt(v, 10));

	let binaries = ips.map(v => Number(v).toString(2).padStart(8, '0')).slice(0, 4).join('');
	let mask = ips[4];
	if (mask > 32 || mask < 0) throw new Error(cidr + ' is not a valid CIDR string');
	if (mask === 0) return ['*.*.*.*'];
	let first = binaries.substr(0, mask).padEnd(32, '0');
	let last = binaries.substr(0, mask).padEnd(32, '1');

	first = bstr2ip(first);
	last = bstr2ip(last);
	let base = [];
	let start = 0, end = 255;
	if (32 - mask >= 24) {
		start = first[0];
		end = last[0];
	} else if (32 - mask >= 16) {
		base.push(first[0]);
		start = first[1];
		end = last[1];
	} else if (32 - mask >= 8) {
		base.push(first[0]);
		base.push(first[1]);
		start = first[2];
		end = last[2];
	} else {
		base.push(first[0]);
		base.push(first[1]);
		base.push(first[2]);
		start = first[3];
		end = last[3];
	}

	let addresses = [];
	for (let i = start ; i <= end; i++) {
		let ip = [...base];
		ip.push(i);
		for (let j = 0; j < 3 - base.length; j++) {
			ip.push('*');
		}
		addresses.push(ip.join('.'));
	}
	return addresses;
}

function bstr2ip(bs) {
	let p = [];
	p.push(parseInt(bs.substr(0, 8), 2));
	p.push(parseInt(bs.substr(8, 8), 2));
	p.push(parseInt(bs.substr(16, 8), 2));
	p.push(parseInt(bs.substr(24, 8), 2));
	return p;
}


module.exports = wildcard;

