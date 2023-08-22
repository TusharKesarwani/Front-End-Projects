const log = (val) => console.log(val);

// custom local db
export class DB {

    static save(key, data) {
        if (typeof key === undefined || key === null || key === "" || key.length === 0) {
            console.error("Failed to save data, key is empty.");
            return false;
        }

        localStorage.setItem(key, JSON.stringify(data));
        log("DB data saved")
        return true;
    }

    static get(key) {
        const savedData = JSON.parse(localStorage.getItem(key)) ?? null;
        return savedData
    }

    static deleteDbCol(colId, key) {
        const savedData = JSON.parse(localStorage.getItem(key)) ?? null;

        if (savedData === null) {
            log("Failed to delete db data", colId)
            return false;
        }
        else {
            const filteredData = savedData.filter(d => d.name !== key);
            localStorage.setItem(key, JSON.stringify(filteredData));
            log("DB data deleted", colId)
            return true;
        }
    }
}

export class Util {
    static uuid() {
        // I generate the UID from two parts here 
        // to ensure the random number provide enough bits.
        var firstPart = (Math.random() * 46656) | 0;
        var secondPart = (Math.random() * 46656) | 0;
        firstPart = ("000" + firstPart.toString(36)).slice(-3);
        secondPart = ("000" + secondPart.toString(36)).slice(-3);
        return firstPart + secondPart;
    }

    static shortenWrd(wrd) {
        if (wrd.length > 20) {
            return `${wrd.slice(0, 20)}...`
        }
        return wrd;
    }
}
