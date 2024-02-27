import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import "./Register.css";
import Cookies from "js-cookie";

export default function Register() {
    const navigate = useNavigate();

    useEffect(() => {
        const access_token = Cookies.get("access_token");
        if (access_token) {
            navigate("/");
        }
    }, []);

    const [isShow, setIsShow] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        // console.log(data);
        try {
            const res = await axios.post(
                "http://localhost:8800/api/auth/register",
                data
            );
            console.log("response", res);
            if (res.status == 201) {
                toast.success("Registration successful!");
                navigate("/login");
            }
        } catch (err) {
            toast.error(err.response.data);
            console.log(err.response.data);
        }
    };

    return (
        <section className="register-main">
            <span className="credit">@developedbyak</span>
            <div className="register-container">
                <h1>Welcome to The Blogs!</h1>
                <p>
                    Register to create your first account and start exploring
                    and sharing the world with everyone.
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        placeholder="User name"
                        {...register("username", {
                            required: true,
                            maxLength: 20,
                        })}
                    />
                    <input
                        placeholder="Email"
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
                    <button type="submit">Register</button>
                </form>
                <span>
                    Already have an account?{" "}
                    <Link to="/login" className="link">
                        Log In
                    </Link>{" "}
                </span>
            </div>
            <div className="coverImg-Register" />
        </section>
    );
}
