module.exports = (value, len = 2) => {
    let returnValue = value.toString();
    while (returnValue.length < len) {
        returnValue = `0${returnValue}`;
    }
    return returnValue;
};
