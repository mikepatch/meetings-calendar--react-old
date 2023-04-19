import { DB_API } from "./DB_API";

export default class Autocomplete {
    constructor() {
        this.DB = new DB_API();
    }
    getItems(inputName, value) {
        return this.DB.getFilteredData(inputName, value)
            .then(queryItems => {
                const filteredDuplicates = this._filterDuplicates(queryItems, inputName);

                const result = value.length !== 0 && this._createResultObject(filteredDuplicates, inputName);

                return result;
            })
    }

    _createResultObject(array, inputName) {
        return array.map(
            item => (
                { id: item.id, inputName: inputName, content: item[inputName], }
            )
        );
    }

    _filterDuplicates(queryItems, inputName) {
        const seen = new Set();

        return queryItems.filter(item => {
            const duplicate = seen.has(item[inputName]);
            seen.add(item[inputName]);

            return !duplicate;
        });
    }
}