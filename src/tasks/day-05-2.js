export default function arrangeCrates(inputLines) {
    const breakIdx = inputLines.indexOf('');
    const crateData = inputLines.slice(0, breakIdx);
    const moveData = inputLines.slice(breakIdx + 1);

    const crates = [];

    crateData[crateData.length - 1].split('').forEach((crate, offset) => {
        if (crate !== ' ') {
            const crateContents = [];
            for (let i = crateData.length - 2; i >= 0; i--) {
                const char = crateData[i].charAt(offset);
                if (char === ' ') {
                    break;
                }
                crateContents.push(char);
            }
            crates.push(crateContents);
        }
    });

    moveData.forEach(move => {
        const [count, from, to] = move.match(/\d+/g);
        const fromCrate = crates[from - 1];
        crates[to - 1].push(...fromCrate.splice(fromCrate.length - count, count));
    });

    return crates.reduce((acc, v) => acc + (v.length > 0 ? v[v.length - 1] : ' '), '');
}