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
];

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
};

export default API;
