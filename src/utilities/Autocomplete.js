import MeetingsProvider from "../services/MeetingsProvider";

export default class Autocomplete {
    constructor() {
        this.DB = new MeetingsProvider();
    }

    getFilteredItems(inputName, value) {
        return this.DB.filter(inputName, value)
            .then(queryItems => {
                const filteredDuplicates = this._filterDuplicates(queryItems, inputName);
                const resultsLimit = 5;
                const results = this._createResultsArray(filteredDuplicates, inputName, resultsLimit);

                return results;
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

    _createResultsArray(array, inputName, limiter) {
        const results = [];
        for (let i = 0; i < limiter; i++) {
            const result = array.map(item => (
                { id: item.id, inputName: inputName, content: item[inputName], }
            ));

            if (result[i]) results.push(result[i]);
        }

        return results;
    }
}