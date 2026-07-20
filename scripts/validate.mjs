import {readdir,readFile} from 'node:fs/promises';
const files=(await readdir('.')).filter(f=>f.endsWith('.html'));
let failed=false;for(const file of files){const s=await readFile(file,'utf8');for(const token of ['<title>','meta name="description"','</html>'])if(!s.includes(token)){console.error(`${file}: missing ${token}`);failed=true;}}
if(failed)process.exit(1);console.log(`Validated ${files.length} HTML pages.`);
