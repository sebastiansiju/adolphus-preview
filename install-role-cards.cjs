const fs=require('fs');
const sharp=require('sharp');
async function main(){
 for(const {key,path} of JSON.parse(fs.readFileSync('role-card-images.json','utf8'))){
  fs.copyFileSync(path,`image-originals/role-option-${key}.png`);
  await sharp(path).webp({quality:92,effort:6}).toFile(`public/images/editorial/role-option-${key}.webp`);
  const m=await sharp(path).metadata();console.log(key,m.width,m.height);
 }
 let s=fs.readFileSync('app/site-page.tsx','utf8');
 if(!s.includes("import {HospitalityRoleCards}")){
  s=s.replace("import {EmployerEnquiry}","import {HospitalityRoleCards} from './hospitality-role-cards';\nimport {EmployerEnquiry}");
  const start=s.indexOf('<div className="process-grid hospitality-role-directory">');
  const end=s.indexOf('<div className="hospitality-paths">',start);
  if(start<0||end<0)throw Error('Directory not found');
  s=s.slice(0,start)+'<HospitalityRoleCards/>'+s.slice(end);
  fs.writeFileSync('app/site-page.tsx',s);
 }
}
main().catch(e=>{console.error(e);process.exit(1)});
