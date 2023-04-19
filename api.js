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
