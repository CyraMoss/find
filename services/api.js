const BASE_URL = 'http://192.168.1.108:3001/api';

export async function fetchBars(query) {
  const response = await fetch(`${BASE_URL}/bars?q=${query}`);
  if (!response.ok) {
    throw new Error('Failed to fetch bars');
  }
  return response.json();
}

export async function fetchAllBars() {
  const response = await fetch(`${BASE_URL}/bars`);
  if (!response.ok) {
    throw new Error('Failed to fetch bars');
  }
  return response.json();
}
