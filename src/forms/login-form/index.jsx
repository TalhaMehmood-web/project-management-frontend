"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginFormValidationSchema from "@/form-validations/login-form-validation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PasswordEye from "@/components/shared/molecules/password-eye";
import Link from "next/link";
import InputFieldRenderor from "@/components/shared/ui/input-field-renderer";
import useLoginFormAction from "@/actions/login";
import LoadingButton from "@/components/shared/molecules/loading-button";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginFormValidationSchema),
  });
  const { loginFormAction, loading } = useLoginFormAction(reset);

  return (
    <Card
      style={{
        width: "70%",
      }}
    >
      <CardHeader>
        <CardTitle>Login in</CardTitle>
        <CardDescription>
          Fill the form and click on Log in button to submit
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(loginFormAction)}>
          <div className="flex flex-col gap-6">
            <InputFieldRenderor
              containerClassName="gap-y-1.5"
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              label="Email"
              error={errors.email ? errors.email.message : ""}
            />

            <PasswordEye
              label="Password"
              name="password"
              register={register}
              placeholder="Enter your password"
              error={errors.password ? errors.password.message : ""}
            />
            <LoadingButton
              loading={loading}
              type="submit"
              className="transition-all transform duration-300 "
              size="lg"
            >
              {loading ? "Processing ..." : "Log in"}
            </LoadingButton>
            <Link href="/register">
              <Button
                type="secondary"
                variant="link"
                className="hover:bg-blue-500 w-full hover:text-white transition-all transform duration-300"
                size="lg"
              >
                Register
              </Button>
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
