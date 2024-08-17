import { useMemo, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ProductsSec from "./ProductsSec/ProductsSec";
import { Rating } from "@smastrom/react-rating";
import { useQuery } from "@tanstack/react-query";
import "@smastrom/react-rating/style.css";
import "./Home.css";
import ReactPaginate from "react-paginate";
import { FaDollarSign } from "react-icons/fa";

const Home = () => {
  const axiosPublic = useAxiosPublic();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // Stores the actual query used to filter results
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("default"); // Set default sorting
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 9;

  const { data, isLoading } = useQuery({
    queryKey: [
      "products",
      searchQuery,
      brand,
      category,
      minPrice,
      maxPrice,
      sortBy,
    ],
    queryFn: async () => {
      const res = await axiosPublic.get("/products"); // Fetch all products
      return res.data;
    },
  });
  console.log(data);

  // Perform filtering and sorting
  const filteredProducts = useMemo(() => {
    if (!data?.products) return [];
    return data.products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (brand ? product.brand === brand : true) &&
        (category ? product.category === category : true) &&
        (minPrice ? product.price >= parseFloat(minPrice) : true) &&
        (maxPrice ? product.price <= parseFloat(maxPrice) : true)
    );
  }, [data?.products, searchQuery, brand, category, minPrice, maxPrice]);

  const sortedProducts = useMemo(() => {
    if (!filteredProducts) return [];
    switch (sortBy) {
      case "priceAsc":
        return [...filteredProducts].sort((a, b) => a.price - b.price);
      case "priceDesc":
        return [...filteredProducts].sort((a, b) => b.price - a.price);
      case "createdAt":
        return [...filteredProducts].sort(
          (a, b) =>
            new Date(convertUTCToSimpleFormat(b.createdAt)) -
            new Date(convertUTCToSimpleFormat(a.createdAt))
        );
      default:
        return filteredProducts; // Default: No sorting
    }
  }, [filteredProducts, sortBy]);

  //date fixing
  function convertUTCToSimpleFormat(utcTimestamp) {
    const utcDate = new Date(utcTimestamp);

    // Convert to a simpler format (e.g., YYYY-MM-DD HH:MM:SS)
    const year = utcDate.getFullYear();
    const month = String(utcDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(utcDate.getDate()).padStart(2, "0");
    const hours = String(utcDate.getHours()).padStart(2, "0");
    const minutes = String(utcDate.getMinutes()).padStart(2, "0");
    const seconds = String(utcDate.getSeconds()).padStart(2, "0");

    // Format as YYYY-MM-DD HH:MM:SS
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  if (isLoading)
    return (
      <div className="flex justify-center min-h-[60vh]">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );

  return (
    <section className="min-h-screen max-w-7xl mx-auto px-5 md:px-6 lg:px-0">
      <div className="">
        <hr />
        <br />
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search */}
          <div className="relative w-full md:w-72 lg:w-96">
            <input
              type="text"
              placeholder="Search by name"
              // value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-full"
            />
            <button
              // onClick={() => setSearchQuery(searchTerm)}
              className="btn btn-primary absolute right-[0%] bg-black border-none hover:bg-black text-white"
            >
              Search
            </button>
          </div>
          {/* Sorting */}
          <div className="w-full md:w-72">
            <select
              // value={sortBy}
              // onChange={(e) => setSortBy(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="default">Sort by</option>
              <option value="createdAt">Newly Added</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
            </select>
          </div>
        </div>
        <br />
        <hr />
        <br />
      </div>
      {/* Filtering */}
      <div className="flex justify-between">
        <div className="w-full">
          <h1 className="text-2xl text-center mb-5">Filter Products</h1>
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <select
              //   value={category}
              //   onChange={(e) => setCategory(e.target.value)}
              className="select select-bordered w-full md:w-52 lg:w-60"
            >
              <option value="">Select Category</option>
              <option>Accessories</option>
              <option>Audio</option>
              <option>Cameras</option>
              <option>Computers</option>
              <option>Electronics</option>
              <option>Gaming</option>
              <option>Kitchen Appliances</option>
              <option>Mobile Phones</option>
              <option>Personal Care</option>
              <option>Smart Home</option>
              <option>Wearables</option>
            </select>
            <select
              //   value={brand}
              //   onChange={(e) => setBrand(e.target.value)}
              className="select select-bordered w-full md:w-52 lg:w-60"
            >
              <option value="">Select Brand</option>
              <option>AxcoTube</option>
              <option>CareBite</option>
              <option>CookZone</option>
              <option>ComputerMenia</option>
              <option>CurciteLab</option>
              <option>FitTech</option>
              <option>GameVibe</option>
              <option>HomeLab</option>
              <option>RIOBD</option>
              <option>SoundWave</option>
            </select>
            <select
              //   value={`${minPrice}-${maxPrice}`}
              //   onChange={(e) => {
              //     const [min, max] = e.target.value.split("-");
              //     setMinPrice(min);
              //     setMaxPrice(max);
              //   }}
              className="select select-bordered w-full md:w-52 lg:w-60"
            >
              <option value="">Select Price Range</option>
              <option value="10-49.99">10 - 49.99 $</option>
              <option value="50-99.99">50 - 99.99 $</option>
              <option value="100-199.99">100 - 199.99 $</option>
              <option value="200-499.99">200 - 499.99 $</option>
              <option value="500-999.99">500 - 999.99 $</option>
              <option value="1000-1999.99">1000 - 1999.99 $</option>
              <option value="2000-4999.99">2000 - 4999.99 $</option>
              <option value="5000-9999.99">5000 - 9999.99 $</option>
              <option value="10000-">10000 $ +</option>
            </select>
          </div>
        </div>
      </div>
      <br />
      <hr />
      <br />
      <ProductsSec></ProductsSec>
    </section>
  );
};

export default Home;
