const fs=require('fs');
const sharp=require('sharp');
async function main(){
 const manifest=JSON.parse(fs.readFileSync('image-manifest.json','utf8'));
 fs.mkdirSync('public/images/editorial',{recursive:true});fs.mkdirSync('image-originals',{recursive:true});
 for(const a of manifest.assets){
  fs.copyFileSync(a.path,`image-originals/${a.key}.png`);
  const meta=await sharp(a.path).metadata();
  await sharp(a.path).webp({quality:92,effort:6}).toFile(`public/images/editorial/${a.key}.webp`);
  console.log(a.key,meta.width,meta.height);
 }
 let s=fs.readFileSync('app/site-page.tsx','utf8');
 const hero=s.match(/<div className="hero-scroll-scene">[\s\S]*?<section className="intro home-overview">/)[0];
 s=s.replace("src={'https://images.unsplash.com/'+sectorPhotos[view]+'?auto=format&fit=crop&w=1200&q=85'}", "src={'/images/editorial/'+view+'.webp'}");
 s=s.replace('<img src="/banquet-hero.png" alt="A candlelit banquet table set with gold cutlery and crystal glasses"/>','<img src="/images/editorial/hospitality.webp" alt="Hospitality colleagues discussing preparations before service"/>');
 s=s.replace('src="/tower-bridge-night.png" alt="Tower Bridge and the London skyline at dusk"','src="/images/editorial/about.webp" alt="A recruitment consultation in a London office"');
 s=s.replace('src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85" alt="A restaurant table ready for service"','src="/images/editorial/candidates.webp" alt="A candidate speaking with a recruitment consultant"');
 s=s.replace('src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&amp;fit=crop&amp;w=900&amp;q=85"','src="/images/editorial/home-careers.webp"');
 s=s.replace('src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85" alt="An inviting restaurant prepared for service"','src="/images/editorial/services-hospitality.webp" alt="A hospitality professional preparing a service station"');
 s=s.replace("src={'https://images.unsplash.com/'+img+'?auto=format&fit=crop&w=800&q=85'}", "src={'/images/editorial/services-'+(id==='care-education'?'care':id)+'.webp'}");
 if(!s.includes(hero))throw new Error('Hero changed');
 fs.writeFileSync('app/site-page.tsx',s);
 let r=fs.readFileSync('app/hospitality-roles.tsx','utf8');
 for(const name of ['kitchen','front-of-house','event-staffing'])r=r.replace(/image:'\/(banquet-hero|royal-banquet-hero)\.png'/,`image:'/images/editorial/${name}.webp'`);
 r=r.replace('alt="A hospitality venue prepared for service"','alt={info.title+" preparing for hospitality service"}');fs.writeFileSync('app/hospitality-roles.tsx',r);
 let b=fs.readFileSync('render-preview.cjs','utf8');b=b.replace(".replaceAll('/vanta-background.js'", ".replaceAll('/images/editorial/','public/images/editorial/').replaceAll('/vanta-background.js'");fs.writeFileSync('render-preview.cjs',b);
}
main().catch(e=>{console.error(e);process.exit(1)});
