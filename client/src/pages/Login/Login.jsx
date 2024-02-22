import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import "./Login.css";

export default function Login() {
    const [isShow, setIsShow] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log(data);
        toast.success("Event has been created");
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
