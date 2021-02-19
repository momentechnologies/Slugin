export default (collection, match, element) => {
    const newCollection = [...collection];
    const index = newCollection.findIndex(
        e => !Object.keys(match).some(key => e[key] !== match[key])
    );

    if (index === -1) {
        newCollection.push(element);
    } else {
        newCollection[index] = element;
    }

    return newCollection;
};
