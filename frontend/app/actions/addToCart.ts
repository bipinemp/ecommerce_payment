import axios from "axios";

interface Data {
  productId: string;
  quantity: number;
}

export const addToCart = async (data: Data) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      data
    );

    return response;
  } catch (error) {
    return error;
  }
};
