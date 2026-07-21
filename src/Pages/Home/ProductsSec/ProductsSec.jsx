import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const ProductsSec = () => {
  const axiosPublic = useAxiosPublic();
  const { data, isLoading } = useQuery({
    queryKey: [
      "products",
      // searchQuery,
      // brand,
      // category,
      // minPrice,
      // maxPrice,
      // sortBy,
    ],
    queryFn: async () => {
      const res = await axiosPublic.get("/products"); // Fetch all products
      return res.data;
    },
  });
  console.log(data);
  return (
    <>
      {isLoading && (
        <h1 className="text-3xl font-semibold text-center">Loading...</h1>
      )}
      <div className="mx-auto my-20 max-w-7xl">
        {data?.map((product) => (
          <div key={product._id}>
            <h1>{product.name}</h1>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductsSec;
