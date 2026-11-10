
const VALID_USERNAME = "230408942@st.biruni.edu.tr"; 
const VALID_PASSWORD = "demo123456";

export function login(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        resolve({ username });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 500);
  });
}