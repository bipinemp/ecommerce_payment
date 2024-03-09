import axios from "axios";

type TData = {
  name: string;
  email: string;
  password: string;
};

export const register = async (data: TData) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/register`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};
