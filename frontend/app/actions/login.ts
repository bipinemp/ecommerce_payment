import axios from "axios";

type TData = {
  email: string;
  password: string;
};

export const login = async (data: TData) => {
  try {
    console.log("data: ", data);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/login`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
