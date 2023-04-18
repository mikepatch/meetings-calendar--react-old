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
            headers: { "Content-Type": "application/json" }
        }

        return this._fetch(options)
    }

    _fetch(options, additionalPath = '') {
        const url = this.rootURL + additionalPath;

        return fetch(url, options)
            .then(response => {
                if (response.ok) return response.json();

                throw new Error('Network error!');
            })
    }
}