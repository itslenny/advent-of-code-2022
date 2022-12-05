export default function countPackOverlap(inputLines) {
    let count = 0;

    inputLines.forEach(line => {

        const [elf1, elf2] = line.split(',');
        const [elf1Start, elf1End] = elf1.split('-').map(v => parseInt(v, 10));
        const [elf2Start, elf2End] = elf2.split('-').map(v => parseInt(v, 10));

        if (
            (elf1Start <= elf2Start && elf1End >= elf2End) ||
            (elf2Start <= elf1Start && elf2End >= elf1End) 
        ) {
            // fully contained
            count++;
        }

    });

    return count;
}