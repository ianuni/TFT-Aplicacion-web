export const sortingSelector = {
    oldest: (a, b) => {
        const timestampA = a.timestamp
        const timestampB = b.timestamp

        return timestampA - timestampB;
    },
    newest: (a, b) => {
        const timestampA = a.timestamp
        const timestampB = b.timestamp

        return timestampB - timestampA;
    },
    highest: (a, b) => {
        const totalA = a.total
        const totalB = b.total

        return totalB - totalA;
    },
    lowest: (a, b) => {
        const totalA = a.total
        const totalB = b.total

        return totalA - totalB;
    }
}
