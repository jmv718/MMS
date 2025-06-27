// Replace all localStorage operations with fetch calls to your API

async function loadRequests() {
  try {
    const response = await fetch('/api/requests');
    if (!response.ok) throw new Error('Network response was not ok');
    requests = await response.json();
    updateTable();
  } catch (error) {
    console.error('Error loading requests:', error);
  }
}s

async function addRequest(newRequest) {
  try {
    const response = await fetch('/api/requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRequest)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to add request');
    }
    
    const data = await response.json();
    requests.push(data);
    updateTable();
    return true;
  } catch (error) {
    console.error('Error adding request:', error);
    alert(error.message);
    return false;
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', loadRequests);