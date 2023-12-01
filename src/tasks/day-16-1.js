export default function doStuff(inputLines) {

    const valves = {};

    inputLines.forEach(line => {
        console.log(line);
        const [zzz, valveId, rate, targets] = line.match(/Valve ([A-Z]{2}).+rate=(\d+).+valves? (.+)$/);
        valves[valveId] = { rate: parseInt(rate, 10), targets: targets.split(',').map(v => v.trim()) };
    });

    function traverseValve(targets, flow, time, opened) {
        const paths = [];
        for (let v of targets) {
            // move
            time--;

            // open if we haven't
            if (!opened.has(v)) {
                time--;
                flow += (valves[v].rate * time);
                opened = new Set(opened);
                opened.add(v);
            }

            if (time <= 0) {
                paths.push(flow);
                break;
            }

            paths.push(...traverseValve(valves[v].targets, flow, time, opened));
        }
        return paths;
    }

    return traverseValve(valves['AA'].targets, 0, 30, new Set(['AA']));
}