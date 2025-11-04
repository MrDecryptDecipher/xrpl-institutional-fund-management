// Test Xaman network connectivity
console.log("=== Xaman Network Connectivity Test ===");

// Test basic connectivity to Xaman services
const urls = [
  'https://xumm.app',
  'https://oauth2.xumm.app',
  'https://api.xumm.dev'
];

urls.forEach(url => {
  console.log(`Testing connectivity to ${url}...`);
  
  fetch(url)
    .then(response => {
      console.log(`✓ ${url}: Status ${response.status}`);
    })
    .catch(error => {
      console.error(`✗ ${url}: ${error.message}`);
    });
});

// Test with a simple GET request to the API
console.log("Testing API endpoint...");
fetch('https://api.xumm.dev/platform/ping', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => {
    console.log(`API ping response: Status ${response.status}`);
    return response.json();
  })
  .then(data => {
    console.log("API ping data:", data);
  })
  .catch(error => {
    console.error("API ping error:", error);
  });