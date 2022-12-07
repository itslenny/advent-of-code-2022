export default function getStartOfPacketMarkers(inputLines) {
    const uniqueStrLength = 4;
    return inputLines.map(line => {

        for (let i = 0; i < line.length - uniqueStrLength; i++) {
            const charSet = new Set(line.substr(i, uniqueStrLength).split(''));
            if (charSet.size === uniqueStrLength) {
                return i + uniqueStrLength;
            }
        }
    });    
}