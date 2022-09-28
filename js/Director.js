const server = new Server;
// server.getAuthtoken();
setTimeout(function run() {
  server.getTemperatureDevice().then(
    response => {
        for(let i = 0; i < 5; i++) {
          if (i != 3) {
            let dateTime = response.devices[0].thermometers[i].last_value_time;
            let device = response.devices[0].thermometers[i].name;
            let temperature = response.devices[0].thermometers[i].last_value;
            server.setTemperature(dateTime, device, temperature);
          }
        }
    });
  setTimeout(run, 36000);
}, 36000);

let dateTime = [];
let temperature = [];
const devices = ["Баня", "Гостевая", "Трубы", "Улица"];
const colors = ["red", "blue", "green", "black"]

const data = {
  labels: dateTime,
  datasets: [{
    label: "",
    data: temperature,
  }]
};

const config = {
  type: 'line',
  data: data,
  options: {}
};

const charts = [myChart1, myChart2, myChart3, myChart4];
for (let i = 0; i < 4; i++) {
  charts[i] = new Chart(
    document.getElementById('myChart' + (i+1)), 
    config
  );
}
let myChart5 = new Chart(
  document.getElementById('myChart5'), 
  config
);

setTimeout(function run() {
  server.getTemperature().then(
    response => {
      let j = 0;
      for (let i = 0; i < 4; i++) {
        dateTime = [];
        temperature = [];
        while( j < response.length && response[j].device == devices[i]) {
          dateTime.push(response[j].dateTime);
          temperature.push(response[j].temperature);
          j++;
        }

        charts[i].config.data.datasets[0].label = devices[i];
        charts[i].config.data.labels = dateTime;
        charts[i].config.data.datasets[0].data = temperature;
        charts[i].config.data.datasets[0].backgroundColor = colors[i];
        charts[i].config.data.datasets[0].borderColor = colors[i];
        charts[i].update();
      }
    }
  );

  server.getOpenWeatherMap().then(
    response => {
      let i = 0;
      let dateTime = [];
      let temperature = [];
      while(i < response.list.length) {
        dateTime.push(response.list[i].dt_txt);
        temperature.push(response.list[i].main.temp - 273);
        i++;
      }
      myChart5.config.data.datasets[0].label = myChart5.config.data.datasets[0].label = "Прогноз погоды";
      myChart5.config.data.labels = dateTime;
      myChart5.config.data.datasets[0].data = temperature;
      myChart5.config.data.datasets[0].backgroundColor = 'purple';
      myChart5.config.data.datasets[0].borderColor = 'purple';
      myChart5.update();
    }
  )
  setTimeout(run, 6000);
}, 6000);