import Layout from "@/src/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/api/products").then((res) => setProducts(res.data));
  }, []);
  const router = useRouter();
  console.log(products);
  return (
    <Layout>
      <div className="w-full">
        <button
          className="mb-4  bg-gray-300 text-gray-800  text-md p-2 border rounded-lg"
          onClick={() => {
            router.push("products/create");
          }}
        >
          Create a Product
        </button>
        <div>{products}</div>
      </div>
    </Layout>
  );
}

// export const getServerSideProps = async () => {
//   const res = await fetch("https://localhost:300/api/products", {
//     method: "GET",
//   });
//   const products = await res.json();
//   return { props: { products } };
// };
