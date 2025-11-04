// Test network connectivity to Xaman services
console.log("Testing network connectivity to Xaman services...");

// Test basic connectivity to xumm.app
fetch('https://xumm.app')
  .then(response => {
    console.log("Connectivity to xumm.app:", response.status);
  })
  .catch(error => {
    console.error("Error connecting to xumm.app:", error);
  });

// Test connectivity to OAuth2 endpoint
fetch('https://oauth2.xumm.app')
  .then(response => {
    console.log("Connectivity to oauth2.xumm.app:", response.status);
  })
  .catch(error => {
    console.error("Error connecting to oauth2.xumm.app:", error);
  });

// Test connectivity to API endpoint
fetch('https://api.xumm.dev', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    method: 'ping'
  })
})
  .then(response => {
    console.log("Connectivity to api.xumm.dev:", response.status);
  })
  .catch(error => {
    console.error("Error connecting to api.xumm.dev:", error);
  });