const fs = require('fs');
const vm = require('vm');
const path = require('path');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root,p),'utf8');
const write = (p,s) => { fs.mkdirSync(path.dirname(path.join(root,p)),{recursive:true}); fs.writeFileSync(path.join(root,p),s); };
const old=read('redesign/src/App.jsx');
write('reference/archive/editorial-v1-App.jsx',old);
write('reference/archive/editorial-v1-style.css',read('redesign/src/style.css'));
const plansSource=read('reference/source/page/PlanPage.js');
const plans=vm.runInNewContext(plansSource.match(/const PLANS_META = (\[[\s\S]*?\n\]);/)[1]);
write('redesign/src/data/plans.json',JSON.stringify(plans,null,2));
const home=read('reference/source/page/HomePage.js');
for(const name of ['services','testimonials']) {
 const block=home.match(new RegExp('const '+name+' = (\\[[\\s\\S]*?\\n  \\]);'))[1];
 write('redesign/src/data/'+name+'.json',JSON.stringify(vm.runInNewContext(block),null,2));
}
for(const name of ['PrivacyPolicy','ShippingDelivery','Cancellation','TermofUse']) {
 let source=read('reference/source/page/TermAndPolicy/'+name+'.js');
 // Preserve all legal text and JSX; presentation belongs to the new legal-page wrapper.
 source=source.replace(/className="[^"]*"/g,'').replace(/className=\{`[\s\S]*?`\}/g,'');
 write('redesign/src/pages/'+name+'.jsx',source);
}
fs.cpSync(path.join(root,'assets/images'),path.join(root,'redesign/public/assets/images'),{recursive:true});
fs.mkdirSync(path.join(root,'redesign/public/fonts'),{recursive:true});
for(let i=0;i<4;i++) fs.copyFileSync(path.join(root,`assets/external/montserrat-${i}.ttf`),path.join(root,`redesign/public/fonts/montserrat-${i}.ttf`));
let care=read('redesign/src/components/CareArt.jsx');
const colors={'#b5c7aa':'#b7d4ff','#eb784d':'#16a34a','#f6f3e9':'#eff6ff','#203c35':'#0a2350','#fffdf7':'#ffffff','#d1d7c9':'#cbd5e1','#e3e9da':'#e6f0ff'};
for(const [a,b] of Object.entries(colors)) care=care.replaceAll(a,b);
write('redesign/src/components/CareArt.jsx',care);
console.log('Prepared '+plans.length+' complete plans, 8 services, testimonials, four complete legal pages and original brand assets.');
