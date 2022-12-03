import fs from 'fs';

// this just a little script I made to create files for all the days
// I created all the files for day 1 as a template and had this script duplicate it
// leaving it here for reference of just how lazy I really am

console.log('THIS FILE IS DISABLED FOR YOUR OWN SAFETY!!');
process.exit(1);

const source = [
    `day-01-1.js`,
    `day-01-2.js`,
    `day-01-input-real.txt`,
    `day-01-input-test.txt`,
    `day-01.md`
];

for (let i = 2; i < 26; i++) {
    let paddedNum = ('0' + i).slice(-2);

    [
        `day-${paddedNum}-1.js`,
        `day-${paddedNum}-2.js`,
        `day-${paddedNum}-input-real.txt`,
        `day-${paddedNum}-input-test.txt`,
        `day-${paddedNum}.md`
    ].forEach((v, fI) => {

        console.log('  ');
        console.log(`copy ${source[fI]} to ${v}`);
        const prefix = 'src/tasks/';
        fs.copyFileSync(prefix + source[fI], prefix + v);

    });
}