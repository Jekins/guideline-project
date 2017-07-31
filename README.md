# Gline project
Developer: [Jekins](https://github.com/Jekins)

Description: Gline – fast and comfortable instrument for creation guidelines.

## Install
Install [Node.js](https://nodejs.org/).

In a root directory write `npm i` for install all dependencies.

## Compile components
Run `npm run compile` for a compile your components from source directory in to project. Run `npm run compile:w` for compile and run watcher.

## Development server
Run `npm start` for a build project and start dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build
Run `npm build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Source directory for your components
Put your component's code and description in this directory: `/parser/src/components` in HTML files. Do not forget use special markup for right parse your code and his description.

## Markup for HTML
For one component create one HTML file. But one component can have many views and modifications. write their all in one components's html file. We are using special markup in HTML file for right parse your code and his description:

```
<name>Component's name</name>
<view>
	<desc>
		Component's description
	</desc>
	<width>25%</width>
	<preview>
		Custom code for preview
	</preview>
	<tpl>
		Component's HTML code
	</tpl>
</view>
```

Read more about special markup:

`<name>` – short component's name without html tags. Can be only one in HTML file with you component.

`<view>` – use this tag for show one view your component. Can be used many times for showing many views your component.

`<desc>` – Component's description. You can use HTML tags for decoration description.

`<width>` – For some components need setup container's width for correct his preview. Use this tag and will write width in `%` or `px`. If you not will be write this tag, container's width will be set `100%` automatically. Do not need to be used.

`<preview>` – Use this tag if you need set custom preview, not from source code `<tpl>`. Writing custom code preview in this tag. But if you need hide all component's preview, add to tag `<preview>` attribute `hidden`: `<preview hidden></preview>`. Do not need to be used.

`<tpl>` – Write component's code in this tag. Can will be multi line with tabs and indents.


## Further help
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.5.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
