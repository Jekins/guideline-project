'use strict';

const cheerio = require('cheerio');
const fs = require('fs');

//path
const src = 'src/';
const componentsJson = '../src/assets/data/components/component';
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
				componentData.push({
					id: result.id,
					name: result.name
				});

				fs.writeFile(componentsJson + '-' + result.id + '.json', JSON.stringify(result, null, '  '), function (err) {
					if (err) {
						return console.log(err);
					}
					console.log(result);
				});
				fs.writeFile(componentsJson + 's.json', JSON.stringify(componentData, null, '  '), function (err) {
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
		result.id = file.replace('.html','');
		result.name = $('name').text();
		result.views = [];

		for (let i = 0; i < $('view').length; i++) {
			let $view = $('view').eq(i);
			let view = {};
			view.desc = $view.find('desc').html();
			view.width = $view.find('width').length ? $view.find('width').text() : '100%';
			view.code = $view.find('tpl').html();
			result.views.push(view);
		}

		resolve(result);
	});
}