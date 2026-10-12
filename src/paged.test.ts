import {it,expect} from 'vitest';
import {fileSections,wrapText} from './paged';
it('paginates many short lines while preserving every character',()=>{const text=Array.from({length:30},(_,i)=>'line '+i+'\n').join(''),sections=fileSections(text,35,5);expect(sections).toHaveLength(6);expect(sections.map(s=>text.slice(s.start,s.end)).join('')).toBe(text);expect(sections.every(s=>text.slice(s.start,s.end).split('\n').length<=6)).toBe(true);});
it('paginates long lines and preserves blank lines',()=>{const text='x'.repeat(300)+'\n\nend\n',sections=fileSections(text,20,4);expect(sections.length).toBeGreaterThan(3);expect(sections.map(s=>text.slice(s.start,s.end)).join('')).toBe(text);expect(wrapText('one\n\nthree',10)).toEqual(['one','','three']);});
