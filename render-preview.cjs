require('./build-ui.cjs');
const fs = require('fs');
const babel = require('next/dist/compiled/babel/core');
const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');
const result = require('esbuild').buildSync({entryPoints:['app/site-page.tsx'],bundle:true,platform:'node',format:'cjs',packages:'external',write:false,jsx:'automatic'});
const compiled = {exports:{}};
new Function('require','module','exports',result.outputFiles[0].text)(require,compiled,compiled.exports);
const interactions = fs.readFileSync('public/interactions.js','utf8');
const fontUrls = fs.readdirSync('public/fonts').filter(file => file.endsWith('.ttf')).map(file => ({
  path: '/fonts/' + file,
  url: 'data:font/ttf;base64,' + fs.readFileSync('public/fonts/' + file).toString('base64'),
}));
const css = fontUrls.reduce((styles, font) => styles.replaceAll(font.path, font.url), fs.readFileSync('app/site.css','utf8') + fs.readFileSync('app/reference-design.css','utf8') + fs.readFileSync('app/site-polish.css','utf8'));
const fontPreloads = fontUrls.map(font => '<link rel="preload" href="' + font.url + '" as="font" type="font/ttf" crossorigin="anonymous">').join('');
for (const [view,title] of Object.entries({'kitchen-teams':'Kitchen teams','front-of-house':'Front of house','event-staffing':'Event staffing',home:'Recruitment in London',about:'About us',expertise:'Recruitment services',candidates:'For candidates',contact:'Contact us',"hospitality":"Hospitality & Events","finance":"Finance","technology":"IT & Media","care-education":"Healthcare & Education","administration":"Administration"})) {
  const markup = renderToStaticMarkup(React.createElement(compiled.exports.default,{view}))
    .replaceAll('/vanta-background.js','public/vanta-background.js').replaceAll('/adolphus-logo.png','public/adolphus-logo.png').replaceAll('/banquet-hero.png','public/banquet-hero.png').replaceAll('/royal-banquet-hero.png','public/royal-banquet-hero.png').replaceAll('/banquet-orbit.mp4','public/banquet-orbit.mp4').replaceAll('/tower-bridge-night.png','public/tower-bridge-night.png')
    .replace(/href="\/(about|expertise|candidates|contact)(?=["?#])/g, 'href="$1.html')
    .replace(/href="\/expertise\/(hospitality|finance|technology|care-education|administration)(?=["?#])/g, 'href="$1.html')
    .replace(/href="\/expertise\/hospitality\/(kitchen-teams|front-of-house|event-staffing)(?=["?#])/g, 'href="$1.html')
    .replaceAll('href="/"','href="preview.html"');
  fs.writeFileSync(view==='home'?'preview.html':view+'.html','<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+title+' | Adolphus Group</title>'+fontPreloads+'<style>'+css+'</style></head><body>'+markup+'<script defer src="public/interactions.js"></script>'+'</body></html>');
}
console.log('Rendered thirteen linked preview pages.');


