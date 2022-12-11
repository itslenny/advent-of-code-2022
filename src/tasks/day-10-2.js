export default function renderScreenPictureCRT(inputLines) {
    let xVal = 1;
    let cycle = 0;

    const vals = [];
    const incrementCycle = () => {
        const rowPos = [cycle % 40, (cycle + 1) % 40, (cycle - 1) % 40];
        const val = rowPos.includes(xVal) ? '#' : '.';
        vals.push(val);
        cycle++;
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

    let output = '';
    let i = 0;
    while (i < vals.length) {
        output += vals.slice(i, i + 40).join('') + '\n';
        i += 40;
    }

    return output;
}