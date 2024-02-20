const {isPathRelative} = require('../isPathRelative');
const {layers} = require('./layers');
const path = require("path");

function shouldBeRelative(from, to) {
    if (isPathRelative(to)) {
        return false;
    }
    const toPath = to.split('/');
    const toLayer = toPath[0];
    const toSlice = toPath[1];

    if(!toLayer || !toSlice || !layers[toLayer]){
        return false;
    }

    const normalizedPath = path.toNamespacedPath(from);
    const pathFrom = normalizedPath.split('src')[1];
    const fromPath = pathFrom.split('\\');
    const fromLayer = fromPath[1];
    const fromSlice = fromPath[2];

    if(!fromLayer || !fromSlice || !layers[fromLayer]){
        return false;
    }

    return  fromSlice === toSlice && fromLayer === toLayer;
};

module.exports = {shouldBeRelative};