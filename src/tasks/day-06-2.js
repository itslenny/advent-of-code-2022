export default function getStartOfMessageMarkers(inputLines) {
    const uniqueStrLength = 14;
    return inputLines.map(line => {

        for (let i = 0; i < line.length - uniqueStrLength; i++) {
            const charSet = new Set(line.substr(i, uniqueStrLength).split(''));
            if (charSet.size === uniqueStrLength) {
                return i + uniqueStrLength;
            }
        }
    });    
}