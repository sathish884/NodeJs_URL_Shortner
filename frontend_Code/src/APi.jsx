import axios from 'axios';

const apiBaseURL = 'https://api.example.com/';

// Login
export const login = async (body) => {
    try {
        const result = await axios.post(apiBaseURL + "login", body);
        return result;
    } catch (error) {
        console.log("Error fetching data : ", error);
    }
}

// Register
export const userRegister = async (body) => {
    try {
        const result = await axios.post(apiBaseURL + "register", body);
        return result;
    } catch (error) {
        console.log("Error fetching data : ", error);
    }
}

// Forget Password
export const forgetPassword = async (body) => {
    try {
        const result = await axios.post(apiBaseURL + "forget-password", body);
        return result;
    } catch (error) {
        console.log("Error fetching data : ", error);
    }
}

// Reset Password
export const resetPassword = async (body) => {
    try {
        const result = await axios.post(apiBaseURL + "reset-password", body);
        return result;
    } catch (error) {
        console.log("Error fetching data : ", error);
    }
}