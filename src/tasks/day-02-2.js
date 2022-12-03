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

    // father forgive more for I have sinned
    // this answer is so dumb, but if it works it's not dumb. I know I could've been more clever here
    
    if (p2 === 'X') { // lose
        if (p1 === 'A') {
            return choiceScores['Z'];
        } else if (p1 === 'B') {
            return choiceScores['X'];
        } else {
            return choiceScores['Y'];
        }
    } else if (p2 === 'Y') { // draw
        winScore = 3;
        if (p1 === 'A') {
            return choiceScores['X'] + 3;
        } else if (p1 === 'B') {
            return choiceScores['Y'] + 3;
        } else {
            return choiceScores['Z'] + 3;
        }
    } else { // Z = win
        if (p1 === 'A') {
            return choiceScores['Y'] + 6;
        } else if (p1 === 'B') {
            return choiceScores['Z'] + 6;
        } else {
            return choiceScores['X'] + 6;
        }
    }
}

export default function calculateTotalScore(inputLines) {
    return inputLines.reduce((acc, line) => {
        const vals = line.split(' ');
        return acc + getScore(vals[0], vals[1]);
    }, 0);
}