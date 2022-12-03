export default function countCaloriesTop3(inputLines) {
    let elves = [];
    let total = 0;

    inputLines.forEach(v => {
        if (v.length === 0) {
            elves.push(total);
            total = 0;
        } else {
            total += parseInt(v, 10);
        }
    });
    elves.push(total);

    elves.sort((a,b) => b - a);
    return elves[0] + elves[1] + elves[2];
}