export default function countPriorityOfBadges(inputLines) {
    const badges = [];

    const items = [new Set(), new Set()];

    inputLines.forEach((line, i) => {
        if (i % 3 === 2) {
            const chars = line.split('');
            for (let i = 0; i < chars.length; i++) {
                const c = chars[i];
                if (items[0].has(c) && items[1].has(c)) {
                    badges.push(c);
                    // we found the item, exit
                    break;
                }
            }
        } else {
            items[i % 3] = new Set(line.split(''));
        }
    });

    return badges.reduce((acc, v) => {
        const charCode = v.charCodeAt(0);
        // a = 97, z = 122, A = 65, Z = 90
        const charVal = charCode >= 97 ? charCode - 96 : charCode - 38;
        return acc + charVal;
    }, 0)
}