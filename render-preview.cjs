const fs = require('fs');
const babel = require('next/dist/compiled/babel/core');
const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');
const source = fs.readFileSync('app/site-page.js','utf8');
const result = babel.transformSync(source,{presets:[[require('next/dist/compiled/babel/preset-react'),{runtime:'automatic'}]],plugins:[require('next/dist/compiled/babel/plugin-transform-modules-commonjs')],babelrc:false,configFile:false});
const compiled = {exports:{}};
new Function('require','module','exports',result.code)(require,compiled,compiled.exports);
const interactions = fs.readFileSync('public/interactions.js','utf8');
const css = fs.readFileSync('app/site.css','utf8');
for (const [view,title] of Object.entries({home:'Recruitment in London',about:'About us',expertise:'Recruitment services',candidates:'For candidates',contact:'Contact us',"hospitality":"Hospitality & Events","finance":"Finance","technology":"IT & Media","care-education":"Healthcare & Education","administration":"Administration"})) {
  const markup = renderToStaticMarkup(React.createElement(compiled.exports.default,{view}))
    .replaceAll('/adolphus-logo.png','public/adolphus-logo.png').replaceAll('/banquet-hero.png','public/banquet-hero.png').replaceAll('/tower-bridge-night.png','public/tower-bridge-night.png')
    .replace(/href="\/(about|expertise|candidates|contact)(?=["?#])/g, 'href="$1.html')
    .replace(/href="\/expertise\/(hospitality|finance|technology|care-education|administration)(?=["?#])/g, 'href="$1.html')
    .replaceAll('href="/"','href="preview.html"');
  fs.writeFileSync(view==='home'?'preview.html':view+'.html','<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+title+' | Adolphus Group</title><style>'+css+'</style></head><body>'+markup+'<script>'+interactions+'</script></body></html>');
}
console.log('Rendered ten linked preview pages.');
