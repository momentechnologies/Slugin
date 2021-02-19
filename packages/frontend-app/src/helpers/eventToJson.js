export default e => {
    const data = new FormData(e.target);
    let json = {};

    data.forEach((value, key) => {
        json[key] = value;
    });

    return json;
};
