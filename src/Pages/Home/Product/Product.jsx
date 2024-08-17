import { Rating } from "@smastrom/react-rating";
import { FaDollarSign } from "react-icons/fa";

const Product = ({ product, convertUTCToSimpleFormat }) => {
  return (
    <div>
      <div className="card bg-base-100 w-full shadow-xl">
        <figure>
          <img src={product.image} alt={product.name} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {product.name}
            <div className="badge badge-primary border-none text-black p-2 bg-[#FFB23F]">
              NEW
            </div>
          </h2>
          <p className="text-base">{product.description}</p>
          <div className="card-actions justify-between">
            <div className="font-semibold flex items-center justify-center ">
              Price: &nbsp;
              <span className="text-green-600">{product.price}</span>{" "}
              <FaDollarSign className="text-green-600" />
            </div>
            <div className="font-semibold ">
              Brand: <span className="text-red-600">{product.brand}</span>
            </div>
            <div className="font-semibold">
              Category:{" "}
              <span className="text-base font-normal">{product.category}</span>
            </div>
            <div className="font-semibold ">
              Date:{" "}
              <span className="text-base font-normal">
                {convertUTCToSimpleFormat(product.createdAt)}
              </span>
            </div>
            <Rating
              style={{ maxWidth: 180 }}
              value={product.ratings}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
