function api(path, method, body) {
  const url = "http://localhost:7070" + path;

  const options = {
    method,

    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-Requested-With": "XMLHttpRequest",
    },
  };

  if (body !== null) {
    options.body = JSON.stringify(body);
  }
  return fetch(url, options);
}

async function getMedication() {
  let data = await api("/api/v1/medications/all", "GET", null);
  return data.json();
}

async function getSortedBy(field) {
  let medications = await api("/api/v1/medications/sort/" + field, "GET", null);

  return medications.json();
}

async function addMedication(medication) {
  let medResponse = await api("/api/v1/medications/add", "POST", medication);
  return medResponse.json();
}

async function delMedication(id) {
  let medResponse = await api(`/api/v1/medications/delete/${id}`, "DELETE");
  return medResponse.json();
}

async function updateMedication(medication) {
  let data = {
    medication,
  };
  console.log(data);
  let medResponse = await api("/api/v1/medications/update", "PUT", data);

  return medResponse.json();
}

async function getMedById(id) {
  let data = await api(`/api/v1/medications/find/id/${id}`, "GET", null);
  return data.json();
}
