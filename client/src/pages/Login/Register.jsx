import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import "./Register.css";

export default function Register() {
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
