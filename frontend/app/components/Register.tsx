"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { register } from "../actions/register";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();

  const [regVal, setRegVal] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: register,
    onSuccess: () => {
      router.push("/login");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      name: regVal.name,
      email: regVal.email,
      password: regVal.password,
    };

    mutate(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegVal({ ...regVal, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 flex flex-col gap-4 w-[400px]"
    >
      <h1 className="text-center">Register</h1>
      <Input
        className="bg-transparent"
        type="text"
        name="name"
        placeholder="Enter name"
        onChange={handleChange}
      />
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
        {isPending ? "Registering..." : "Register"}
      </Button>
    </form>
  );
};

export default Register;
