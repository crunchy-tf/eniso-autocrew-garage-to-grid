import {screens} from './content';
export type Frame={screen:number;part:number;kind:'welcome'|'concept'|'practice'|'quiz'|'mission-brief'|'mission-lab'|'victory'|'real';quiz?:number;label:string};
export const frames:Frame[]=[];
function add(screen:number,kind:Frame['kind'],label:string,quiz?:number){frames.push({screen,part:frames.filter(f=>f.screen===screen).length+1,kind,label,quiz});}
for(const s of screens){const n=s.number;if(n===1){add(n,'welcome','Welcome');continue;}if(n>=29&&n<=34){add(n,'mission-brief','Mission briefing');add(n,'mission-lab','Mission workbench');if(n===34)add(n,'victory','The starting grid');continue;}if([7,14,21,26,36].includes(n)){if(n!==7)add(n,'concept','Key idea');const count=n===36?3:2;for(let i=0;i<count;i++)add(n,'quiz','Question '+(i+1),i);continue;}if(n>=38){add(n,'real','Real-world lab');continue;}add(n,'concept',n===27?'Pit break':n===37?'Resources':'Key idea');if(s.context||n===35){add(n,'practice',n===35?'Inspect your finished history':'Guided practice');if(n===16)add(n,'practice','Separate revert demo');}}
export const indexOfFrame=(screen:number,part=1)=>Math.max(0,frames.findIndex(f=>f.screen===screen&&f.part===part));
