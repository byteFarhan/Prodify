import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ProductsSec from "./ProductsSec/ProductsSec";

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
