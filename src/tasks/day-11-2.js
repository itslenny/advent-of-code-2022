
// no, I am not doing eval
function doOperation(old, operations) {
    if (operations.length !== 3) {
        throw new Error('I DO NOT KNOW HOW TO DO THIS OPERATION!!');
    }

    let a = operations[0] === 'old' ? old : parseInt(operations[0], 10);
    let b = operations[2] === 'old' ? old : parseInt(operations[2], 10);
    switch (operations[1]) {
        case '*':
            return a * b;
        case '+':
            return a + b;
        default:
            throw new Error('unknown operation');
    }
}

function doTest(value, test) {
    if (test.length !== 2 || test[0] !== 'divisible') {
        throw new Error('CANNOT TEST. UNKNOWN OPERATION AHHH!!');
    }
    return value % parseInt(test[1], 10) === 0;
}

export default function computeMonkeyBusiness(inputLines) {
    
    const monkeys = [];
    
    inputLines.forEach(line => {
        if (line === '') {
            return;
        }

        const [cmd, values] = line.trim().split(':');

        switch (cmd.replace(/ \d+$/, '')) {
            case 'Monkey':
                monkeys.push({ count: 0 });
                break;
            case 'Starting items':
                let items = values.split(',').map(v => parseInt(v.trim(), 10));
                monkeys[monkeys.length - 1].items = items;
                break;
            case 'Operation':
                monkeys[monkeys.length - 1].operation = values.trim().split(' = ')[1].split(' ');
                break;
            case 'Test':
                monkeys[monkeys.length - 1].test = values.trim().split(' by ');
                break;
            case 'If true':
                monkeys[monkeys.length - 1].trueTarget = parseInt(values.trim().split(' monkey ')[1], 10);
                break;
            case 'If false':
                monkeys[monkeys.length - 1].falseTarget = parseInt(values.trim().split(' monkey ')[1], 10);
                break;
        }
    });  
    
    const modulo = monkeys.reduce((acc, m) => acc * m.test[1], 1);

    for (let i = 0; i < 10000; i++) {
        for (let monkey of monkeys) {
            while (monkey.items.length > 0) {
                monkey.count++;
                let value = monkey.items.shift();
                value = doOperation(value, monkey.operation);
                value %= modulo;
                const test = doTest(value, monkey.test);
                const target = test ? monkey.trueTarget : monkey.falseTarget;
                monkeys[target].items.push(value);
            }
        }
    }

    return monkeys.sort((a,b) => b.count - a.count).slice(0, 2).reduce((acc, m) => acc * m.count, 1);
}