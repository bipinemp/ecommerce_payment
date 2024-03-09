"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { login } from "../actions/login";
import { useState } from "react";

const Login = () => {
  const [loginVal, setLoginVal] = useState({
    email: "",
    password: "",
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginVal({
      ...loginVal,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      email: loginVal.email,
      password: loginVal.password,
    };
    console.log(data);
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 flex flex-col gap-4 w-[400px]"
    >
      <h1 className="text-center">Login</h1>
      <Input
        className="bg-transparent"
        type="email"
        name="email"
        placeholder="Enter Email"
        onChange={handleChange}
      />
      <Input
        className="bg-transparent"
        type="password"
        name="password"
        placeholder="Enter Password"
        onChange={handleChange}
      />
      <Button variant={"secondary"}>
        {isPending ? "Logging In..." : "Login"}
      </Button>
    </form>
  );
};

export default Login;
