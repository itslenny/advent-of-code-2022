export default function trackRope(inputLines) {

    let visited = new Set(['0,0']);
    let hPos = [0, 0];
    let tPos = [0, 0];

    const getDistance = () => [hPos[0] - tPos[0], hPos[1] - tPos[1]];

    inputLines.forEach(line => {

        const [dir, moves] = line.split(' ');

        for (let i = 0; i < moves; i++) {

            // move head
            switch (dir) {
                case 'L':
                    hPos[0]--;
                    break;
                case 'R':
                    hPos[0]++;
                    break;
                case 'U':
                    hPos[1]--;
                    break;
                case 'D':
                    hPos[1]++;
                    break;
            }

            const distance = getDistance();
            const xDist = Math.abs(distance[0]);
            const yDist = Math.abs(distance[1]);

            if (xDist > 1 || yDist > 1) {
                if (xDist !== 0) {
                    tPos[0] += distance[0] > 0 ? 1 : -1;
                }
                if (yDist !== 0) {
                    tPos[1] += distance[1] > 0 ? 1 : -1;
                }
            }
            visited.add(tPos.join(','));
        }
    });

    return visited.size;
}