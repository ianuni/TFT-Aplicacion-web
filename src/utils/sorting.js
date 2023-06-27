export function sortOldest(a, b) {
    const timestampA = a.timestamp
    const timestampB = b.timestamp
  
    return timestampA - timestampB;
}

export const sortNewest = (a, b) => {
    const timestampA = a.timestamp
    const timestampB = b.timestamp
  
    return timestampB - timestampA;
}

export function sortHigherTotal(a, b) {
    const totalA = a.total
    const totalB = b.total
  
    return totalB - totalA;
}

export function sortLowestTotal(a, b) {
    const totalA = a.total
    const totalB = b.total
  
    return totalA - totalB;
}
