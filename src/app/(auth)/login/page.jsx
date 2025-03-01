import LoginForm from "@/forms/login-form";
import Image from "next/image";
import LoginPageImage from "@/assets/login.jpg";
import React from "react";

const Login = () => {
  return (
    <section className="flex flex-1 w-full min-h-screen   ">
      <div className="hidden md:flex md:flex-[0.5]">
        <Image
          alt="login_image"
          src={LoginPageImage}
          height={500}
          width={700}
          className="aspect-square object-contain"
        />
      </div>
      <div className="flex flex-1 justify-center items-center md:flex-[0.5] ">
        <LoginForm />
      </div>
    </section>
  );
};

export default Login;
