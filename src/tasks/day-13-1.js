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

export default function findRightPackets(inputLines) {

    let packets = [];
    let first = true;

    inputLines.forEach(line => {
        if (line.length > 0) {
            let parsed = JSON.parse(line);
            if (first) {
                packets.push({ left: parsed });
            } else {
                packets[packets.length - 1].right = parsed;
            }
            first = !first;
        }
    });

    return packets.reduce((acc, packet, i) => acc + (compareRightOrder(packet.left, packet.right) === -1 ? i + 1 : 0), 0);
}