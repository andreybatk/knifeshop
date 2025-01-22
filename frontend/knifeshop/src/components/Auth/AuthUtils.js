import axios from "axios";
import { API } from "../../config";

let cachedRole = null; // Кэш для роли пользователя

export const checkAdmin = async () => {

  //TEST
  return true;

  if (cachedRole !== null) {
    return cachedRole === "Admin";
  }

  const token = localStorage.getItem("token");
  if (!token) {
    console.warn("Token not found in localStorage");
    return false;
  }

  try {
    const response = await axios.get(`${API}/api/auth/role`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    cachedRole = response.data.role;

    return cachedRole === "Admin";
  } catch (error) {
    console.error("Error checking admin role:", error);

    cachedRole = null;
    return false;
  }
};


export const getCurrentUser = async () => {
  //TEST
  return "test@mail.ru";
  const token = localStorage.getItem("token");
  if (!token) {
    console.warn("Token not found in localStorage");
    return null;
  }

  try {
    const response = await axios.get(`${API}/api/auth/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

