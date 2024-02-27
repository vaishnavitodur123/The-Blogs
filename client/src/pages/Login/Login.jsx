import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Cookies from "js-cookie";
import { AuthContext } from "../../context/authContext";
import "./Login.css";

export default function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        const access_token = Cookies.get("access_token");
        if (access_token) {
            navigate("/");
        }
    }, []);

    const [isShow, setIsShow] = useState(false);
    const { setCurrentUser } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            console.log(data);
            const res = await axios.post(
                "http://localhost:8800/api/auth/login",
                data
            );
            console.log("response", res);
            if (res.status == 200) {
                toast.success("Logged in successfully.");
                setCurrentUser(res.data.other);
                Cookies.set("access_token", res.data.token);
                navigate("/");
            }
        } catch (err) {
            toast.error(err.response.data);
            console.log(err.response.data);
        }
    };

    return (
        <section className="login-main">
            <span className="credit">@developedbyak</span>
            <div className="login-container">
                <h1>Welcome back!</h1>
                <p>
                    Bridging Ideas: Connecting People through the Art of
                    Blogging
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        placeholder="Email"
                        id="email"
                        {...register("email", {
                            required: true,
                            maxLength: 20,
                        })}
                    />
                    <div className="input-pass">
                        <input
                            type={isShow ? "text" : "password"}
                            placeholder="Password"
                            {...register("password", {
                                required: true,
                                maxLength: 20,
                            })}
                        />

                        {isShow ? (
                            <EyeIcon
                                size={15}
                                className="Eye"
                                onClick={() => setIsShow(!isShow)}
                            />
                        ) : (
                            <EyeSlashIcon
                                className="Eye"
                                onClick={() => setIsShow(!isShow)}
                            />
                        )}
                    </div>
                    <button type="submit">Login</button>
                </form>
                <span>
                    Don't have an account?{" "}
                    <Link to="/register" className="link">
                        Register
                    </Link>{" "}
                </span>
            </div>
            <div className="coverImg-login" />
        </section>
    );
}
