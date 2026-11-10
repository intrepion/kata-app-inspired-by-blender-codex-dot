import {primitive,transform} from './core.js';
export const TYPES=['cube','sphere','cylinder','cone','torus'];
export const palette=['#df986e','#b0c6ab','#e8d9b6','#82a9ad','#d2b766','#a99bbe'];
let id=0;
export function object(type,name=type,options={}){return {id:`form-${Date.now()}-${++id}`,type,name,color:palette[id%palette.length],position:[0,0,0],rotation:[0,0,0],scale:[1,1,1],hidden:false,...options};}
export function starter(){return {format:'kata-formyard',version:1,name:'Objects for a quiet afternoon',objects:[
 object('cylinder','Round plinth',{color:'#e3d6bc',position:[-.8,-1.25,0],scale:[1.3,.35,1.3]}),
 object('torus','Sun ring',{color:'#df986e',position:[-.8,.65,0],rotation:[90,0,0],scale:[1.05,1.05,1.05]}),
 object('sphere','River pebble',{color:'#a4baa2',position:[1.55,-.72,1],scale:[.78,.86,.78]}),
 object('cube','Small pedestal',{color:'#d5c7aa',position:[1.4,-1.2,-1.2],scale:[.65,.4,.65]}),
 object('cone','Ochre spire',{color:'#c8ad66',position:[1.4,-.05,-1.2],scale:[.6,.75,.6]})]};}
export function meshes(doc){return doc.objects.map(o=>({...o,mesh:primitive(o.type)}));}
export function validate(input){
 if(!input||input.format!=='kata-formyard'||input.version!==1||!Array.isArray(input.objects)||input.objects.length>40)throw Error('Not a valid Formyard project (maximum 40 objects).');
 const ids=new Set();const objects=input.objects.map(o=>{if(!o||typeof o.id!=='string'||!o.id||o.id.length>120||ids.has(o.id)||!TYPES.includes(o.type)||typeof o.name!=='string'||o.name.length>80||!/^#[0-9a-f]{6}$/i.test(o.color)||typeof o.hidden!=='boolean')throw Error('Invalid object settings.');ids.add(o.id);for(let k of ['position','rotation','scale']){if(!Array.isArray(o[k])||o[k].length!==3||o[k].some(x=>typeof x!=='number'||!Number.isFinite(x)||Math.abs(x)>(k==='rotation'?360:20)||(k==='scale'&&x<.1)))throw Error('Invalid transform.');}return {id:o.id,type:o.type,name:o.name,color:o.color,hidden:o.hidden,position:[...o.position],rotation:[...o.rotation],scale:[...o.scale]};});
 return {format:'kata-formyard',version:1,name:typeof input.name==='string'?input.name.slice(0,80):'Untitled scene',objects};
}
export function bounds(doc){let points=meshes(doc).filter(o=>!o.hidden).flatMap(o=>o.mesh.vertices.map(v=>transform(v,o)));if(!points.length)return {center:[0,0,0],size:5};let min=[0,1,2].map(i=>Math.min(...points.map(v=>v[i]))),max=[0,1,2].map(i=>Math.max(...points.map(v=>v[i])));return {center:min.map((v,i)=>(v+max[i])/2),size:Math.max(...max.map((v,i)=>v-min[i]),1)};}
