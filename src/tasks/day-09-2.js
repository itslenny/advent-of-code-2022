export default function trackRope(inputLines) {

    let visited = new Set(['0,0']);
    let pos = new Array(10).fill(1).map(_ => [0, 0]);

    const getDistance = (hPos, tPos) => [hPos[0] - tPos[0], hPos[1] - tPos[1]];

    inputLines.forEach(line => {

        const [dir, moves] = line.split(' ');

        for (let i = 0; i < moves; i++) {

            let hPos = pos[0];

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

            for (let j = 1; j < 10; j++) {
                hPos = pos[j - 1];
                let tPos = pos[j];

                const distance = getDistance(hPos, tPos);
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
            }

            visited.add(pos[9].join(','));
        }
    });

    return visited.size;
}