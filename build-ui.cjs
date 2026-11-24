require('esbuild').buildSync({entryPoints:['lib/interactions.ts'],outfile:'public/interactions.js',bundle:true,globalName:'AdolphusInteractions',footer:{js:'AdolphusInteractions.initInteractions();'},minify:true});
require('esbuild').buildSync({entryPoints:['lib/vanta-background.js'],outfile:'public/vanta-background.js',bundle:true,globalName:'AdolphusFog',minify:true});
