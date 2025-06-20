const BASE_URL = 'http://localhost:8080'; // Update this if your Spring Boot backend uses a different port

export const api = async (url, options = {}) => {
  const user = JSON.parse(localStorage.getItem('stayfinder_user'));
  const token = user ? user.token : null;

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let errorMsg = 'Unknown error';
    try {
      const data = await res.json();
      errorMsg = data.message || JSON.stringify(data);
    } catch (e) {
      try {
        errorMsg = await res.text();
      } catch (e2) {}
    }
    throw { message: errorMsg, status: res.status };
  }
  
  if (res.status === 204) return null; // Handle No Content response
  return res.json();
};
