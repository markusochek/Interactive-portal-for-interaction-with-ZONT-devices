class Server {
    async request(url) {
        const response = await fetch(url);
        return await response.json();
    }

    async getOpenWeatherMap() {
        const data = await this.request(`/api/?method=getOpenWeatherMap`);
        return data;
    }

    async setTemperature(dateTime, device, temperature) {
        const data = await this.request(`/api/?method=setTemperature&dateTime=${dateTime}&device=${device}&temperature=${temperature}`);
        return data;
    }

    async getAuthtoken() {
        const data = await this.request(`/api/?method=getAuthtoken`);
        return data;
    }

    async getTemperature() {
        const data = await this.request(`/api/?method=getTemperature`);
        return data;
    }

    async getTemperatureDevice() {
        const data = await this.request(`/api/?method=getTemperatureDevice`);
        return data;
    }
}