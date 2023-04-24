export default class MeetingsProvider {
    constructor() {
        this.rootURL = 'http://localhost:3005/meetings';
    }

    load() {
        const options = { method: 'GET' };

        return this._fetch(options);
    }

    add(data) {
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: this._getHeaders()
        };

        return this._fetch(options);
    }

    remove(id) {
        const options = {
            method: 'DELETE',
            headers: this._getHeaders()
        };

        return this._fetch(options, `/${id}`);
    }

    filter(keyName, value) {
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