// src/api/authApi.js

export async function login(username, password) {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 600));

  const cleanUser = username?.trim();
  const cleanPass = password?.trim();

  // Explicit failure test: lets you test error UI when you want to
  if (!cleanUser || !cleanPass || cleanPass === 'fail' || cleanPass === 'wrong') {
    throw new Error('Invalid credentials. (Enter any valid password to log in)');
  }

  // Accepts ANY username and ANY password!
  return {
    id: Date.now(),
    username: cleanUser,
    email: cleanUser.includes('@') ? cleanUser : `${cleanUser}@example.com`,
    name: cleanUser.split('@')[0]
  };
}