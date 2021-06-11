const data = [
  {
    name: "MyAlarm1",
    source: "Server 12",
    metric: "CPU usage",
    trigger: "> 80%",
    paused: true,
  },
  {
    name: "MyAlarm2",
    source: "Server 32",
    metric: "RAM usage",
    trigger: "> 80%",
    paused: true,
  },
  {
    name: "MyAlarm3",
    source: "Server 1",
    metric: "Net usage",
    trigger: "> 80%",
    paused: false,
  },
  {
    name: "MyAlarm4",
    source: "Server 100",
    metric: "CPU usage",
    trigger: "> 40%",
    paused: false,
  },
];

function between(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

async function triggerAlarm() {
  let alarm = between(0, 5);
  for (let index = 0; index < data.length; index++) {
    if (alarm === index) {
      data[index].paused = !data[index].paused;
      break;
    }
  }
  return data;
}

// API

async function getAlarms() {
  return data;
}

async function getAlarm(name) {
  return data.filter((a) => a.name === name)[0];
}

async function activateAlarm(name) {
  data.forEach((a) => {
    if (a.name === name) {
      a.paused = !a.paused;
    }
  });

  return data;
}

async function deleteAlarm(name) {
  var index = data.findIndex(function (o) {
    return o.name === name;
  });
  if (index !== -1) data.splice(index, 1);
  return data;
}

async function saveAlarm(name, alarm) {
  deleteAlarm(name);
  data.push(alarm);
  return data;
}

const API = {
  getAlarms: getAlarms,
  getAlarm: getAlarm,
  deleteAlarm: deleteAlarm,
  activateAlarm: activateAlarm,
  saveAlarm: saveAlarm,
  triggerAlarm: triggerAlarm,
};

export default API;
