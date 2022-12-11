export default function countInterestingCycles(inputLines) {
    const interestingCycles = new Set([20, 60, 100, 140, 180, 220]);

    let xVal = 1;
    let cycle = 0;

    const vals = [];
    const incrementCycle = () => {
        cycle++;
        if (interestingCycles.has(cycle)) {
            vals.push(xVal * cycle);
        }
    }

    inputLines.forEach(line => {
        if (line === 'noop') {
            incrementCycle();
        } else {
            const [cmd, value] = line.split(' ');
            incrementCycle();
            incrementCycle();
            xVal += parseInt(value, 10);
        }
    });

    return vals.reduce((acc, v) => acc + v, 0);
}