export default function computeFileSizesToDelete(inputLines) {
    let path = ['root'];
    let dirSizes = {};
    let isList = false;

    inputLines.forEach(line => {

        if (line.startsWith('$')) {
            // it is a command
            const parts = line.split(' ');
            const cmd = parts[1];

            if (cmd === 'ls') {
                isList = true;
            } else if (cmd === 'cd') {
                isList = false;

                const param = parts[2];
                if (param === '/') {
                    path = ['root'];
                } else if (param === '..') {
                    path.pop();
                } else {
                    path.push(param);
                }
            }
        } else if (isList) {
            // output
            const [size, name] = line.split(' ');

            if (size !== 'dir') {
                for (let i = 0; i <= path.length; i++) {
                    const curPath = path.slice(0, i).join('/');
                    if (!(curPath in dirSizes)) {
                        dirSizes[curPath] = 0;
                    }
                    dirSizes[curPath] += parseInt(size, 10);
                }
            }
        }
    });

    return Object.values(dirSizes).filter(s => s <= 100000).reduce((acc, v) => acc + v, 0);
}