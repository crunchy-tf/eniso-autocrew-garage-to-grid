import {describe,it,expect} from 'vitest';
import {mkdtempSync,writeFileSync,rmSync,readdirSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {makeWorkspace,runCommand,edit,headTree,headId,checkpoint,missionChecks,advance,openPR,reviewPR,mergePR,REMOTE,type Workspace} from './repo';
function execute(w:Workspace,line:string){const result=runCommand(w,line);expect(result.error,result.output+' · '+line).toBe(false);return result.workspace;}
describe('Flexible terminal workflows',()=>{
 it('expands visible shell globs while quoted Git pathspecs include hidden files',()=>{let w=execute(makeWorkspace('inspect'),'cd ./garage-to-grid && git init');w=execute(w,'git add *');expect(w.local!.index['lighting.cfg']).toBeDefined();expect(w.local!.index['.gitignore']).toBeUndefined();w=execute(w,"git add '*' ");expect(w.local!.index['.gitignore']).toBeDefined();});
 it('accepts extension globs, character classes, relative paths and path separators',()=>{let w=edit(edit(makeWorkspace('branch'),'lighting.cfg','headlights=off\n'),'steering.cfg','response=reversed\n');w=execute(w,'git add -- ./[ls]*.cfg');expect(w.local!.index['lighting.cfg']).toBe('headlights=off\n');expect(w.local!.index['steering.cfg']).toBe('response=reversed\n');});
 it('uses -u and -am for tracked edits without adding new files',()=>{let w=edit(edit(makeWorkspace('branch'),'lighting.cfg','headlights=off\n'),'notes.txt','new\n');w=execute(w,'git add -u && git commit --message="Tracked repair"');expect(headTree(w.local!)['notes.txt']).toBeUndefined();w=edit(w,'lighting.cfg','headlights=on\n');w=execute(w,'git commit -am "Restore lights"');expect(headTree(w.local!)['lighting.cfg']).toBe('headlights=on\n');expect(headTree(w.local!)['notes.txt']).toBeUndefined();});
 it('writes, appends and removes files through virtual shell operations',()=>{let w=makeWorkspace('branch');w=execute(w,'echo "headlights=off" > lighting.cfg && printf "%s\\n" "# garage" >> lighting.cfg');expect(w.local!.working['lighting.cfg']).toBe('headlights=off\n# garage\n');w=execute(w,'touch notes.txt && git add -A && git commit -m "Add notes"');w=execute(w,'rm notes.txt && git add -A && git commit -m "Remove notes"');expect(headTree(w.local!)['notes.txt']).toBeUndefined();});
 it('stops && chains after failure and preserves prior successful commands',()=>{const result=runCommand(makeWorkspace('branch'),'echo "headlights=off" > lighting.cfg && git add missing.cfg && git commit -am "Should not happen"');expect(result.error).toBe(true);expect(result.workspace.local!.working['lighting.cfg']).toBe('headlights=off\n');expect(headTree(result.workspace.local!)['lighting.cfg']).toBe('headlights=on\n');});
 it('restores from parent syntax and accepts both checkout and restore forms',()=>{let w=makeWorkspace('recovery');w=execute(w,'git checkout HEAD^ -- steering.cfg');expect(w.local!.working['steering.cfg']).toBe('response=calibrated\n');expect(w.local!.index['steering.cfg']).toBe('response=calibrated\n');w=execute(w,'git reset HEAD -- steering.cfg');expect(w.local!.index['steering.cfg']).toBe('response=reversed\n');w=execute(w,'git restore --source=HEAD~1 -- steering.cfg');expect(w.local!.working['steering.cfg']).toBe('response=calibrated\n');});
 it('accepts --no-ff and records a real two-parent merge',()=>{let w=makeWorkspace('branch');w=execute(w,'git checkout -b feature/dashboard');w=execute(w,'echo enabled=on > dashboard.cfg && git commit -am "Dashboard"');w=execute(w,'git checkout main && git merge --no-ff --no-edit feature/dashboard');expect(w.local!.objects[headId(w.local!)!].parents).toHaveLength(2);});
 it('completes all missions using a different valid workflow',()=>{
  let w=execute(makeWorkspace(),`git clone ${REMOTE} && cd ./garage-to-grid`);
  w=execute(w,'git status -s; git remote; git log --oneline; git show HEAD^:steering.cfg');expect(missionChecks(w).every(([,ok])=>ok)).toBe(true);w=advance(w);
  w=execute(w,'git checkout -b repairs/lights');w=execute(w,'echo response=calibrated > steering.cfg && echo headlights=on > lighting.cfg && git commit -am "Repair essentials"');expect(missionChecks(w).every(([,ok])=>ok)).toBe(true);w=advance(w);
  w=execute(w,'git checkout -b feature/dashboard');w=execute(w,'echo enabled=on > dashboard.cfg && git add *.cfg && git commit --message="Dashboard"');w=execute(w,'git checkout repairs/lights && git merge --no-ff feature/dashboard');expect(missionChecks(w).every(([,ok])=>ok)).toBe(true);w=advance(w);
  w=execute(w,'git pull --no-rebase origin pit-crew');expect(missionChecks(w).every(([,ok])=>ok)).toBe(true);w=advance(w);
  w=execute(w,'echo compound=wet > tyres.cfg && git commit -am "Wet setup"');w=execute(w,'git pull origin tyre-plan');expect(w.local!.merge).toBeTruthy();w=execute(w,'git checkout --ours -- tyres.cfg && git add -u && git commit --no-edit');expect(missionChecks(w).every(([,ok])=>ok)).toBe(true);w=advance(w);
  w=execute(w,'git push --set-upstream origin HEAD');w=openPR(w);w=reviewPR(w);w=mergePR(w);w=execute(w,'git checkout main && git fetch && git merge origin/main');expect(missionChecks(w).every(([,ok])=>ok)).toBe(true);
 });
 it('rejects a manual sensor edit as a substitute for integrating pit-crew history',()=>{let w=checkpoint(4);w=execute(w,'echo obstacle_detection=on > sensors.cfg && git commit -am "Local sensors"');expect(missionChecks(w).every(([,ok])=>ok)).toBe(false);});
});
describe('Real Git wildcard compatibility',()=>{
 it('matches shell expansion, quoted Git wildcards, ignored paths and commit -am',()=>{
  const dir=mkdtempSync(join(tmpdir(),'autocrew-wildcards-'));
  const git=(...args:string[])=>execFileSync('git',['-c','core.autocrlf=false','-c','commit.gpgsign=false',...args],{cwd:dir,encoding:'utf8',stdio:['ignore','pipe','pipe'],env:{...process.env,GIT_AUTHOR_NAME:'Test',GIT_AUTHOR_EMAIL:'test@example.invalid',GIT_COMMITTER_NAME:'Test',GIT_COMMITTER_EMAIL:'test@example.invalid'}}).trim();
  try{git('init','-b','main');let w=execute(makeWorkspace('inspect'),'cd garage-to-grid && git init');for(const [path,content]of Object.entries(w.local!.working))writeFileSync(join(dir,path),content);
   git('add',...readdirSync(dir).filter(p=>!p.startsWith('.')).sort());w=execute(w,'git add *');expect(git('ls-files').split('\n').sort()).toEqual(Object.keys(w.local!.index).sort());
   git('add','*');w=execute(w,"git add '*'");expect(git('ls-files').split('\n').sort()).toEqual(Object.keys(w.local!.index).sort());git('commit','-m','Baseline');w=execute(w,'git commit -m "Baseline"');
   writeFileSync(join(dir,'telemetry.log'),'generated\n');w=edit(w,'telemetry.log','generated\n');let failed=false;try{git('add',...readdirSync(dir).filter(p=>!p.startsWith('.')).sort());}catch{failed=true;}const result=runCommand(w,'git add *');expect(result.error).toBe(failed);w=result.workspace;expect(git('ls-files').split('\n').sort()).toEqual(Object.keys(w.local!.index).sort());git('add','*');w=execute(w,"git add '*'");expect(git('ls-files').split('\n').sort()).toEqual(Object.keys(w.local!.index).sort());
   writeFileSync(join(dir,'lighting.cfg'),'headlights=on\n');w=edit(w,'lighting.cfg','headlights=on\n');git('commit','-am','Lights');w=execute(w,'git commit -am "Lights"');expect(git('show','HEAD:lighting.cfg')).toBe(headTree(w.local!)['lighting.cfg'].trim());expect(headTree(w.local!)['telemetry.log']).toBeUndefined();
  }finally{rmSync(dir,{recursive:true,force:true});}
 });
});
