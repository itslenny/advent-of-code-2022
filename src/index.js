import fs from 'fs';

const { argv } = process;

if (argv.length < 3 || !argv[2].match(/^\d{1,2}-\d$/)) {
    console.log('  ');
    console.log('INVALID INPUT. Must include task number in the format #-#');
    console.log('for example to run day 1 task 1 enter npm start 1-1');
    console.log('  ');
    process.exit(1);
}

runIt();

async function runIt() {
    const zero = argv[2].split('-')[0].length === 1 ? '0' : '';
    const day = `day-${zero}${argv[2]}`;

    const codeFile = `./tasks/${day}.js`;
    const inputSuffix = argv.length > 3 && argv[3] === 'test' ? 'test' : 'real';
    const inputFile = `src/tasks/${day.slice(0, -2)}-input-${inputSuffix}.txt`;
    
    const task = await import(codeFile);
    const input = fs.readFileSync(inputFile);
    
    console.log('  ');
    console.log(`Running: ${codeFile}`);
    console.log(`Input: ${inputFile}`);
    console.log('  ');
    console.log('Result...');
    console.log('  ');
    console.log(task.default(input.toString().replace(/^\n|\n$/g, '').split('\n')));
    console.log('  ');
}
