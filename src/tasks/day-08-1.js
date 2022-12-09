export default function countVisibleTrees(inputLines) {
    const rowCount = inputLines.length;
    const colCount = inputLines[0].length;

    function getTreeHeight(row, col) {
        return parseInt(inputLines[row].charAt(col), 10);
    }

    function isTreeVisible(row, col) {
        const targetHeight = getTreeHeight(row, col);

        // up
        let blocked = false;
        for (let i = row - 1; i >= 0; i--) {
            if (getTreeHeight(i, col) >= targetHeight) {
                blocked = true;
                break;
            }
        }
        if (!blocked) {
            return true;
        }

        // down
        blocked = false;
        for (let i = row + 1; i < rowCount; i++) {
            if (getTreeHeight(i, col) >= targetHeight) {
                blocked = true;
                break;
            }
        }
        if (!blocked) {
            return true;
        }

        // left
        blocked = false;
        for (let i = col - 1; i >= 0; i--) {
            if (getTreeHeight(row, i) >= targetHeight) {
                blocked = true;
                break;
            }
        }
        if (!blocked) {
            return true;
        }

        // right
        blocked = false;
        for (let i = col + 1; i < colCount; i++) {
            if (getTreeHeight(row, i) >= targetHeight) {
                blocked = true;
                break;
            }
        }
        if (!blocked) {
            return true;
        }

        return false;

    }

    return inputLines.reduce((acc, row, rI) => acc + row.split('').reduce((rowAcc, v, cI) => rowAcc + isTreeVisible(rI, cI), 0), 0)
}