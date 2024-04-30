import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { message } from "antd";

const userSignup = () => {
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);


    const registerUser = async(values) => {
        if(values.password !== values.passwordConfirm){
        return setError("Passwords are not the same");
    }

    try{
        setError(null);
        setLoading(true);
        const response = await fetch('http://localhost:5555/api/auth/signup', {   
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        const data = await response.json();
        if(response.status === 201){
            message.success(data.message);
            if(login){
                login(data.token, data.user)
            }
        }else if(response.status === 400){
            setError(data.message || "Registration failed due to invalid data");
        }else{
            message.error('Registration Failed');
        }

    }catch(error){
        message.error("Registration Failed");
    }finally{
        setLoading(false);
    }
};

  return {loading, error, registerUser};
};

export default userSignup;