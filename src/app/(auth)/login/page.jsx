import LoginForm from "@/forms/login-form";
import Image from "next/image";
import LoginPageImage from "@/assets/login.jpg";
import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";

const Login = () => {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 justify-center items-center">
          <Loader2 className="animate-spin" size={40} />
        </div>
      }
    >
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
    </Suspense>
  );
};

export default Login;
