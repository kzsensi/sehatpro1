// Server-render every route without driving a browser or contacting product APIs.
const fs=require('fs'),path=require('path'),esbuild=require('esbuild');
const {createRequire}=require('module');
const React=require('react');const {renderToString}=require('react-dom/server');
const plans=require('./src/data/plans.json'),services=require('./src/data/services.json');
const routes=['/','/services','/plans','/contact','/term-of-use','/privacy-policy','/cancellation-policy','/shipping-delivery-policy',...plans.map(p=>'/plans/'+p.planCode),...services.map(s=>'/services/'+s.title.toLowerCase().replaceAll(' ','-'))];
(async()=>{
 const result=await esbuild.build({entryPoints:['src/App.jsx'],bundle:true,write:false,format:'cjs',platform:'node',jsx:'automatic',loader:{'.css':'empty'},external:['react','react-dom'],logLevel:'silent'});
 const code=result.outputFiles[0].text;const localRequire=createRequire(path.resolve('smoke-check.cjs'));let count=0;
 for(const route of routes){
   global.window={location:{pathname:route}};
   const mod={exports:{}};
   new Function('require','module','exports',code)(localRequire,mod,mod.exports);
   const html=renderToString(React.createElement(mod.exports.default));
   if(!html.includes('SehatFirstPro')||html.includes('PAGE NOT FOUND'))throw new Error('Route failed: '+route);
   for(const m of html.matchAll(/(?:src|href)="(\/(?:illustrations|fonts|assets|animations)\/[^"?#]+)"/g))if(!fs.existsSync(path.join('public',m[1])))throw new Error('Missing asset: '+m[1]);
   if(route==='/plans'&&(html.match(/class="spotlight-card plan-card/g)||[]).length!==6)throw new Error('Expected six plan cards');
   if(route==='/services'&&(html.match(/class="service-card"/g)||[]).length!==8)throw new Error('Expected eight service cards');
   count++;
 }
 delete global.window;
 console.log('PASS: '+count+' routes rendered; all referenced local images exist; six plans and eight services present.');
 console.log('This verifies rendering/content only, not browser layout or interactive behavior.');
})().catch(e=>{console.error(e);process.exitCode=1});
