export default function findBeacon(inputLines) {
    const isTest = process.argv[3] === 'test';
    const max = isTest ? 20 : 4000000;

    console.log('isTest', isTest, 'max', max);

    const sensors = inputLines.map(line => {
        const [sInput, bInput] = line.split('closest');
        const [s, sX, sY] = sInput.match(/x=(-?\d+), y=(-?\d+)/).map(v => parseInt(v, 10));
        const [b, bX, bY] = bInput.match(/x=(-?\d+), y=(-?\d+)/).map(v => parseInt(v, 10));
        const range = Math.abs(sX - bX) + Math.abs(sY - bY);
        return { sX, sY, range };
    });

    for (let y = 0; y <= max; y++) {
        let x = 0
        for (; x <= max; x++) {

            let sensorCanHitUs = false;
            for (let { sX, sY, range } of sensors) {
                const dist = Math.abs(sX - x) + Math.abs(sY - y);
                if (dist <= range) {
                    const widthThisRow = range - Math.abs(sY - y);
                    x = sX + widthThisRow;
                    sensorCanHitUs = true;
                    break;
                }
            }
            if (!sensorCanHitUs) {
                console.log('x,y', x, y);
                return 4000000 * x + y;
            }
        }
    }
}