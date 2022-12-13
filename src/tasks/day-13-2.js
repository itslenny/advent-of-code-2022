function compareRightOrder(left, right) {
    if (Array.isArray(right) && Array.isArray(left)) {
        // both arrays
        for (let i = 0; ; i++) {
            if (i >= left.length && i >= right.length) {
                return 0;
            } else if (right.length > i && i >= left.length) {
                return -1;
            } else if (left.length > i && i >= right.length) {
                return 1;
            } else {
                const result = compareRightOrder(left[i], right[i]);
                if (result !== 0) {
                    return result;
                }
            }
        }
    } else if (!Array.isArray(left) && Array.isArray(right)) {
        // convert left to array
        return compareRightOrder([left], right);
    } else if (!Array.isArray(right) && Array.isArray(left)) {
        // convert right to array
        return compareRightOrder(left, [right]);
    } else {
        // both numbers
        if (left === right) {
            return 0;
        }
        return left < right ? -1 : 1;
    }
}

const DIVIDERS = ['[[2]]', '[[6]]'];

export default function findSortedDividerPackets(inputLines) {
    return inputLines
        .concat(DIVIDERS)
        .filter(v => v.length > 0)
        .map(JSON.parse)
        .sort(compareRightOrder)
        .reduce((acc, v, i) => acc * (DIVIDERS.includes(JSON.stringify(v)) ? i + 1 : 1), 1)
}