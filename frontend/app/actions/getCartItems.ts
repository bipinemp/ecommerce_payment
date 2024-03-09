import axios from "axios";

export const getCartItems = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/cartitems`
    );
    return response.data.data;
  } catch (error) {
    return error;
  }
};
