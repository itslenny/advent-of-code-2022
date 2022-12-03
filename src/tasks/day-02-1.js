function getScore(p1, p2) {

    const choiceScores = {
        X: 1, // rock
        Y: 2, // paper
        Z: 3, // scissors
    };

    const p1ChoiceMap = {
        A: 'X', // rock
        B: 'Y', // paper
        C: 'Z', // scissors
    }

    let winScore = 0;
    if (p1ChoiceMap[p1] === p2) {
        // draw
        winScore = 3;
    } else if (
        (p2 === 'X' && p1 === 'C') ||
        (p2 === 'Y' && p1 === 'A') ||
        (p2 === 'Z' && p1 === 'B')
    ) {
        // win
        winScore = 6;
    }

    return winScore + choiceScores[p2];
}

export default function calculateTotalScore(inputLines) {
    return inputLines.reduce((acc, line) => {
        const vals = line.split(' ');
        return acc + getScore(vals[0], vals[1]);
    }, 0);
}