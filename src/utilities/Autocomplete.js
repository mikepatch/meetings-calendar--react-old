import MeetingsProvider from "../services/MeetingsProvider";

export default class Autocomplete {
  constructor() {
    this.DB = new MeetingsProvider();
  }

  getFilteredItems(inputName, value) {
    return this.DB.filter(inputName, value).then((queryItems) => {
      const resultsLimit = 5;
      const filteredDuplicates = this._filterDuplicates(
        queryItems,
        inputName,
        resultsLimit
      );
      const results = this._createResultsArray(filteredDuplicates, inputName);

      return results;
    });
  }

  _filterDuplicates(queryItems, inputName, limiter) {
    const seen = new Set();
    const results = queryItems.filter((item) => {
      const duplicate = seen.has(item[inputName]);
      seen.add(item[inputName]);

      return !duplicate;
    });

    return results.slice(0, limiter);
  }

  _createResultsArray(array, inputName) {
    return array.map((item) => ({
      id: item.id,
      inputName: inputName,
      content: item[inputName],
    }));
  }
}