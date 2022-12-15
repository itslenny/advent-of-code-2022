export default function findMissingSpacesInTargetRow(inputLines) {
    const isTest = process.argv[3] === 'test';
    const targetRow = isTest ? 10 : 2000000;
    console.log('isTest', isTest, 'targetRow', targetRow);

    const targetRowCoords = new Set();
    const targetRowBeacons = new Set();

    inputLines.forEach(line => {
        const [sInput, bInput] = line.split('closest');
        const [s, sX, sY] = sInput.match(/x=(-?\d+), y=(-?\d+)/).map(v => parseInt(v, 10));
        const [b, bX, bY] = bInput.match(/x=(-?\d+), y=(-?\d+)/).map(v => parseInt(v, 10));

        if (bY === targetRow) {
            targetRowBeacons.add(bX);
        }

        const dist = Math.abs(sX - bX) + Math.abs(sY - bY);
        const startRow = sY - dist;
        const endRow = sY + dist;

        if (targetRow >= startRow && targetRow <= endRow) {
            const width = dist - Math.abs(sY - targetRow);
            for (let x = sX - width; x <= sX + width; x++) {
                targetRowCoords.add(x);
            }
        }
    });

    return Array.from(targetRowCoords).filter(v => !targetRowBeacons.has(v)).length;
}