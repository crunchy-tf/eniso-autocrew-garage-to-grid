// A virtual shell: these operations only affect workshop files, never the host.
export type Word={value:string;pattern:string;operator?:boolean};
export function lex(input:string):Word[]{
 const out:Word[]=[];let value='',pattern='',quote='',active=false;
 const flush=()=>{if(active){out.push({value,pattern});value='';pattern='';active=false;}};
 const literal=(ch:string)=>{value+=ch;pattern+='\\'+ch;active=true;};
 for(let i=0;i<input.length;i++){
  const ch=input[i];
  if(ch==='\\'&&quote!=="'"){if(i+1===input.length)throw Error('Complete the escaped character.');if(quote==='"'&&!['$','`','"','\\','\n'].includes(input[i+1]))literal(ch);else literal(input[++i]);}
  else if(quote){if(ch===quote)quote='';else literal(ch);}
  else if(ch==='"'||ch==="'"){quote=ch;active=true;}
  else if(/\s/.test(ch))flush();
  else if(ch==='&'||ch===';'||ch==='>'){flush();let op=ch;if(input[i+1]===ch&&ch!==';')op+=input[++i];if(op==='&')throw Error('Use && to run the next command only after success.');out.push({value:op,pattern:op,operator:true});}
  else {if(/[|`<$]/.test(ch))throw Error('Pipes, substitutions and input redirection are not available in this workshop shell.');value+=ch;pattern+=ch;active=true;}
 }
 if(quote)throw Error('Close the quotation mark in your command.');flush();return out;
}
export function glob(pattern:string){
 let source='';for(let i=0;i<pattern.length;i++){
  const ch=pattern[i];if(ch==='\\'){const next=pattern[++i]||'\\';source+=next.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}
  else if(ch==='*')source+='.*';else if(ch==='?')source+='.';
  else if(ch==='['){const end=pattern.indexOf(']',i+1);if(end>i+1){let cls=pattern.slice(i+1,end);if(cls[0]==='!')cls='^'+cls.slice(1);source+='['+cls+']';i=end;}else source+='\\[';}
  else source+=ch.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 }return new RegExp('^'+source+'$');
}
export const normalizePath=(path:string)=>path.replace(/^(?:\.\/)+/,'').replace(/\/$/,'')||'.';
export function expand(words:Word[],files:string[]):string[]{return words.flatMap(word=>{
 if(!/(^|[^\\])[*?[]/.test(word.pattern))return [word.value];
 const p=normalizePath(word.pattern),matches=files.filter(f=>(!f.startsWith('.')||p.startsWith('.'))&&glob(p).test(f)).sort();return matches.length?matches:[word.value];
});}
