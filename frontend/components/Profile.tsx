"use client";

import { useUserId } from "@/store/store";
import { FC } from "react";

interface ProfileProps {}

const Profile: FC<ProfileProps> = ({}) => {
  const { userId } = useUserId();
  return <div className="text-background">Profile Id : {userId}</div>;
};

export default Profile;
