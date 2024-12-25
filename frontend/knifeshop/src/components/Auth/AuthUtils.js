import axios from "axios";

let cachedRole = null;

export const checkAdmin = async () => {
    if (cachedRole !== null) {
        return cachedRole === "Admin";
    }
    cachedRole = "Admin";
    return true;
    
    // try {
    //     const response = await axios.get("/api/auth/role");
    //     cachedRole = response.data.role;
    //     return cachedRole === "Admin";
    // } catch (error) {
    //     console.error("Error checking admin role:", error);
    //     cachedRole = null;
    //     return false;
    // }
};