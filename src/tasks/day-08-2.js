export default function computeHighestScenicScore(inputLines) {
    const rowCount = inputLines.length;
    const colCount = inputLines[0].length;

    function getTreeHeight(row, col) {
        return parseInt(inputLines[row].charAt(col), 10);
    }

    function computeScenicScore(row, col) {
        const targetHeight = getTreeHeight(row, col);

        // up
        let upScore = 0
        for (let i = row - 1; i >= 0; i--) {
            upScore++;
            if (getTreeHeight(i, col) >= targetHeight) {
                break;
            }
        }

        // down
        let downScore = 0;
        for (let i = row + 1; i < rowCount; i++) {
            downScore++;
            if (getTreeHeight(i, col) >= targetHeight) {
                break;
            }
        }

        // left
        let leftScore = 0;
        for (let i = col - 1; i >= 0; i--) {
            leftScore++;
            if (getTreeHeight(row, i) >= targetHeight) {
                break;
            }
        }

        // right
        let rightScore = 0;
        for (let i = col + 1; i < colCount; i++) {
            rightScore++;
            if (getTreeHeight(row, i) >= targetHeight) {
                break;
            }
        }

        return leftScore * rightScore * upScore * downScore;

    }

    let scores = [];
    inputLines.forEach((row, rI) => row.split('').forEach((v, cI) => scores.push(computeScenicScore(rI, cI))));
    return scores.sort((a,b) => b - a)[0];
}