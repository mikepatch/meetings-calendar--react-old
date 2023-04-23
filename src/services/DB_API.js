export class DB_API {
    constructor() {
        this.rootURL = 'http://localhost:3005/meetings';
    }

    loadData() {
        const options = { method: 'GET' };

        return this._fetch(options);
    }

    addData(data) {
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: this._getHeaders()
        };

        return this._fetch(options);
    }

    removeData(id) {
        const options = {
            method: 'DELETE',
            headers: this._getHeaders()
        };

        return this._fetch(options, `/${id}`);
    }

    filterData(keyName, value) {
        const options = { method: 'GET', };

        return this._fetch(options, `?${keyName}_like=${value}`);
    }

    _getHeaders() {
        return { "Content-Type": "application/json" };
    }

    _fetch(options, additionalPath = '') {
        const url = this.rootURL + additionalPath;

        return fetch(url, options)
            .then(response => {
                if (response.ok) return response.json();

                throw new Error('Network error!');
            });
    }
}