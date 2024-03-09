import Products from "../components/Products";
import Cart from "../components/Cart";
import UserDataFromJWT from "@/components/UserDataFromJWT";

export default function Home() {
  return (
    <main className="h-screen">
      <div className="pt-10">
        <Products />
      </div>
    </main>
  );
}
