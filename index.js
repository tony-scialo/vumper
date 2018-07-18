const fs = require('fs');

if (process.argv[2]) {

    fs.readFile('package.json', (err, data) => {
        if (err) {
            console.log('ERROR: Reading file');
            throw err;
        }
        let packageJson = JSON.parse(data);

        let replacedVersion;
        if (process.argv[2] === 'dv') {
            replacedVersion = JSON.stringify(packageJson, addDv);
        } else if (process.argv[2] === 'rc') {
            replacedVersion = JSON.stringify(packageJson, addRc);
        } else if (process.argv[2] === 'increment-pre') {
            replacedVersion = JSON.stringify(packageJson, incrementLastValue);
        } else if (process.argv[2] === 'remove-pre') {
            replacedVersion = JSON.stringify(packageJson, removePreRelease);
        } else if (process.argv[2] === 'major') {
            replacedVersion = JSON.stringify(packageJson, major);
        } else if (process.argv[2] === 'minor') {
            replacedVersion = JSON.stringify(packageJson, minor);
        } else if (process.argv[2] === 'patch') {

        } else {
            console.log('ERROR: Argument not supported');
        }

        fs.writeFile('package-1.json', replacedVersion, (err) => {
            if (err) {
                console.log('ERROR: Writing to package.json');
                throw err;
            }
        });
    });


} else {
    console.log('ERROR: Must supply argument');
}

function addDv(name, val) {
    if (name === 'version') {
        return val + '-dv.0';
    } else {
        return val;
    }
}

function addRc(name, val) {
    if (name === 'version') {
        return val + '-rc.0';
    } else {
        return val;
    }
}

function incrementLastValue(name, val) {
    if (name === 'version') {
        return increment(val);
    } else {
        return val;
    }
}

function increment(val) {
    const lastDot = val.lastIndexOf('.');
    const nameOnly = val.slice(0, lastDot + 1);
    let lastDigit = val.slice(lastDot + 1, val.length);
    lastDigit = Number(lastDigit) + 1;
    return nameOnly + lastDigit;
}

/* Removes anything past the '-' 
 *  Ex.) 2.0.0-rc.0 becomes 2.0.0
 */
function removePreRelease(name, val) {

    if (name === 'version') {
        return remove(val);
    } else {
        return val;
    }
}

function remove(val) {
    const dash = val.lastIndexOf('-');
    const nameOnly = val.slice(0, dash);
    return nameOnly;
}

function major(name, val) {
    if (name === 'version') {
        return increaseMajor(val);
    } else {
        return val;
    }
}

function increaseMajor(val) {
    const firstDot = val.indexOf('.');
    let firstValue = val.slice(0, firstDot);
    const restOfVersion = val.slice(firstDot, val.length);
    firstValue = Number(firstValue) + 1;
    return firstValue + restOfVersion;
}

function minor(name, val) {
    if (name === 'version') {
        return increaseMinor(val);
    } else {
        return val;
    }
}

function increaseMinor(val) {
    const firstDot = val.indexOf('.');
    const secondDot = nthIndex(val, '.', 2);
    const firstHalf = val.slice(0, firstDot);
    const secondHalf = val.slice(secondDot + 1, val.length);
    let minorV = val.slice(firstDot + 1, secondDot);

    console.log(firstHalf);
    console.log(secondHalf);
    console.log(minorV);

    minorV = Number(minorV) + 1;
    return firstHalf + '.' + minorV + '.' + secondHalf;
}

/*
 * Util function pulled from SO to find the nth index of a given string
 */
function nthIndex(str, pat, n) {
    var L = str.length,
        i = -1;
    while (n-- && i++ < L) {
        i = str.indexOf(pat, i);
        if (i < 0) break;
    }
    return i;
}