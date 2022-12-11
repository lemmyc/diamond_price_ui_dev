input = {
  "carat": "2",
  "cut": "2",
  "color": "2",
  "clarity": "2",
  "depth": "2",
  "table": "2",
  "x": "2",
  "y": "2",
  "z": "2"
}


async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) 
  });
  return response.json(); 
}

