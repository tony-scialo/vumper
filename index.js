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
        } else if (process.argv[2] === 'increment') {
            replacedVersion = JSON.stringify(packageJson, incrementLastValue);
        } else if (process.argv[2] === 'remove') {
            replacedVersion = JSON.stringify(packageJson, removePreRelease);
        } else {
            console.log('ERROR: Argument not supported');
        }

        fs.writeFile('test-p.json', replacedVersion, (err) => {
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