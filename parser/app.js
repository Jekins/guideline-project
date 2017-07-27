'use strict';

const cheerio = require('cheerio');
const fs = require('fs');

//path
const src = 'src/';
const componentsJson = 'dist/components.json';
const components = src + 'components/';

let componentData = [];

//get components files content and put in to json
fs.readdir(src, (err, files) => {
	console.log(files);
});

fs.readdir(components, (err, files) => {
	files.forEach(file => {
		parsingHtml(components, file).then(
			result => {
				componentData.push(result);

				fs.writeFile(componentsJson, JSON.stringify(componentData, null, '  '), function (err) {
					if (err) {
						return console.log(err);
					}
					console.log(result);
				});
			}
		);
	});
});

//parsing function
function parsingHtml(dir, file) {
	return new Promise((resolve) => {
		let $ = cheerio.load(fs.readFileSync(dir + file), { decodeEntities: false });

		let result = {};
		result.component = file.replace('.html','');
		result.name = $('name').html();
		result.desc = $('desc').html();
		result.code = $('codes').html();

		resolve(result);
	});
}