
const SAND_START = [500, 0];
const MAP_WIDTH = 1000;
const MAP_HEIGHT = 1000;

// visualize the map for debugging
function drawMap(map, buffer = 3) {
    const minCoord = [Infinity, Infinity];
    const maxCoord = [-Infinity, -Infinity];
    map.forEach((row, y) => row.forEach((v, x) => {
        if (v !== '.') {
            minCoord[0] = Math.max(0, Math.min(minCoord[0], x - buffer));
            minCoord[1] = Math.max(0, Math.min(minCoord[1], y - buffer));
            maxCoord[0] = Math.max(maxCoord[0], x + buffer);
            maxCoord[1] = Math.max(maxCoord[1], y + buffer);
        }
    }));
    console.log('   ');
    map.slice(minCoord[1], maxCoord[1]).forEach(row => console.log(row.slice(minCoord[0], maxCoord[0]).join('')));
    console.log('   ');
}

export default function measureSand(inputLines) {
    const map = new Array(MAP_HEIGHT).fill(1).map(() => new Array(MAP_WIDTH).fill('.'));
    let lowestRockY = -Infinity;

    // populate the rocky bits
    inputLines.forEach(line => {
        const coords = line.split('->').map(v => v.trim().split(',').map(c => parseInt(c, 10)));
        let startCoord = coords[0];
        for (let i = 1; i < coords.length; i++) {
            const endCoord = coords[i];
            const isXMove = endCoord[0] !== startCoord[0];
            let idx = isXMove ? 0 : 1;

            let [start, end] = startCoord[idx] > endCoord[idx] ? [endCoord[idx], startCoord[idx]] : [startCoord[idx], endCoord[idx]];

            for (let j = start; j <= end; j++) {
                const target = startCoord.slice();
                target[idx] = j;
                map[target[1]][target[0]] = '#';
                lowestRockY = Math.max(target[1], lowestRockY);
            }

            startCoord = endCoord;
        }
    });

    // pour in the sand
    let sandCount = 0;
    outer:
    while (true) {
        let [x, y] = SAND_START.slice();
        while (true) {
            if (y > lowestRockY) {
                // infinite falling sand
                break outer;
            } else if (map[y + 1][x] === '.') {
                // sand can fall down
                y++;
            } else if (map[y + 1][x - 1] === '.') {
                // sand can fall down left
                y++;
                x--;
            } else if (map[y + 1][x + 1] === '.') {
                // sand can fall down right
                y++;
                x++;
            } else {
                // sand at rest
                break;
            }
        }
        map[y][x] = 'o';
        sandCount++;
    }

    // drawMap(map);

    return sandCount;
}