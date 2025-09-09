const API_BASE = process.env.REACT_APP_API_URL || "";

export async function authFetch(path, init = {}) {
  const token = localStorage.getItem("token");
  const headers = { ...(init.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;

  const url = path.startsWith("http") ? path : `${API_BASE}${path}`;
  const res = await fetch(url, { ...init, headers, credentials: init.credentials || "include" });

  if (res.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    if (typeof window !== "undefined") window.location.href = "/signin";
    throw new Error("Session expired. Please sign in again.");
  }
  return res;
}

export default authFetch;



