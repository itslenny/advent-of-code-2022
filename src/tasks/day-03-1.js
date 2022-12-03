export default function countPriorityOfMisplacedItems(inputLines) {
    const dupes = [];
    inputLines.forEach(line => {
        const items = new Set();
        const chars = line.split('');

        for (let i = 0; i < chars.length; i++) {
            const c = chars[i];

            if (i < line.length / 2) {
                items.add(c);
            } else {
                if (items.has(c)) {
                    dupes.push(c);
                    // one dupe per sack, we're done
                    break;
                }
            }
        }

    });

    return dupes.reduce((acc, v) => {
        const charCode = v.charCodeAt(0);
        // a = 97, z = 122, A = 65, Z = 90
        const charVal = charCode >= 97 ? charCode - 96 : charCode - 38;
        return acc + charVal;
    }, 0)
}