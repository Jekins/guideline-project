'use strict';

const cheerio = require('cheerio');
const fs = require('fs');

//path
const src = 'parser/src/';
const componentsJson = 'src/assets/data/components/component';
const components = src + 'components/';

let componentData = [];

function parse() {
	return new Promise((resolve) => {
		let files = fs.readdirSync(components);

		for (let i = 0; i < files.length; i++) {
			parsingHtml(components, files[i]).then(
				result => {
					componentData.push({
						id: result.id,
						name: result.name
					});

					fs.writeFile(componentsJson + '-' + result.id + '.json', JSON.stringify(result, null, '  '), function (err) {
						if (err) {
							return console.log(err);
						}
						console.log('Generate ' + result.id + ' complete!');

						fs.writeFileSync(componentsJson + 's.json', JSON.stringify(componentData, null, '  '));
					});
				}
			);
		}

		resolve(files);
	});
}

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

			if ($view.find('preview').length && $view.find('preview').html() && !$view.find('preview').attr('hidden')) {
				console.log();
				view.preview = $view.find('preview').html();
			} else if ($view.find('preview').attr('hidden')) {
				view.preview = 'hidden';
			} else {
				view.preview = false;
			}

			result.views.push(view);
		}

		resolve(result);
	});
}

parse();
process.argv.forEach(function (val, index, array) {
	if (val === '-w' || val === '-watch') {
		fs.watchFile(components, (curr, prev) => {
			console.log('Files changed!');
			componentData = [];
			parse();
		});
	}
});
