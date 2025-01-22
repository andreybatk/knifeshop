import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { ClientId } from "../../config";
import { API } from "../../config";

const GoogleAuthButton = () => {
  const handleSuccess = async (response) => {
    try {
      // Токен пользователя
      const { credential: token } = response;

      console.log("Authentication successful:", token);

      const result = await axios.post(`${API}/api/auth/user`, { token });

      // Сохранение токена или данных пользователя
      localStorage.setItem("authToken", result.data.token);
      console.log("Server response:", result.data);
    } catch (error) {
      console.error("Error verifying token:", error);
    }
  };

  const handleFailure = (error) => {
    console.error("Authentication failed:", error);
  };

  return (
    <GoogleOAuthProvider clientId={ClientId}>
      <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthButton;
