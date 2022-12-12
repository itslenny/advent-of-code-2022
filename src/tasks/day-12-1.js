export default function findShortestPath(inputLines) {
    let startPos, endPos;
    const heights = inputLines.map((line, y) => {
        return line.split('').map((char, x) => {
            if (char === 'S') {
                startPos = { x, y };
                return 'a'.charCodeAt(0);
            } else if (char === 'E') {
                endPos = { x, y };
                return 'z'.charCodeAt(0);
            }
            return char.charCodeAt(0);
        });
    });

    let visited = heights.map((line) => line.map(() => false));
    let shortestPaths = heights.map((line) => line.map(() => Infinity));
    shortestPaths[endPos.y][endPos.x] = 0;

    let queue = [endPos];

    while (queue.length > 0) {
        let pos = queue.shift();
        visited[pos.y][pos.x] = true;

        let neighbors = [
            { x: pos.x, y: pos.y - 1 },
            { x: pos.x, y: pos.y + 1 },
            { x: pos.x - 1, y: pos.y },
            { x: pos.x + 1, y: pos.y },
        ].filter((neighbour) => {
            return heights[neighbour.y]?.[neighbour.x] !== undefined;
        });

        neighbors.forEach((neighbor) => {
            let curHeight = heights[pos.y][pos.x];
            let nextHeight = heights[neighbor.y][neighbor.x];
            if (curHeight >= nextHeight - 1) {
                let shortestDist = shortestPaths[neighbor.y][neighbor.x] + 1;
                let currShortestDist = shortestPaths[pos.y][pos.x];
                shortestPaths[pos.y][pos.x] = Math.min(currShortestDist, shortestDist);
            }

            if (!visited[neighbor.y][neighbor.x] && curHeight <= nextHeight + 1) {
                queue.push(neighbor);
                visited[neighbor.y][neighbor.x] = true;
            }
        });
    }

    return shortestPaths[startPos.y][startPos.x];

}