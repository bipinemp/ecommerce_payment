import axios from "axios";

export const getAllProducts = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/products`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
