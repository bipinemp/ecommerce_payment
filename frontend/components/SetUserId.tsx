"use client";

import { useUserId } from "@/store/store";
import { FC, useEffect } from "react";

interface SetUserIdProps {
  userId: string;
}

const SetUserId: FC<SetUserIdProps> = ({ userId }) => {
  const { setUserId } = useUserId();

  useEffect(() => {
    if (userId) {
      setUserId(userId);
    }
  }, []);

  return <></>;
};

export default SetUserId;
