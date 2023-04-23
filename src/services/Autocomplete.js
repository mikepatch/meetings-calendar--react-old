import { DB_API } from "./DB_API";

export default class Autocomplete {
    constructor() {
        this.DB = new DB_API();
    }

    getFilteredItems(inputName, value) {
        return this.DB.filterData(inputName, value)
            .then(queryItems => {
                const filteredDuplicates = this._filterDuplicates(queryItems, inputName);
                const result = this._createResultObject(filteredDuplicates, inputName);
                const limitedResults = this._setResultsLimit(result);

                return limitedResults;
            })
    }

    _filterDuplicates(queryItems, inputName) {
        const seen = new Set();

        return queryItems.filter(item => {
            const duplicate = seen.has(item[inputName]);
            seen.add(item[inputName]);

            return !duplicate;
        });
    }

    _createResultObject(array, inputName) {
        return array.map(item => (
            { id: item.id, inputName: inputName, content: item[inputName], }
        )
        );
    }

    _setResultsLimit(resultsArray) {
        if (resultsArray.length > 5) return resultsArray.slice(0, 5);
        else return resultsArray;
    }
}