import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Data } from "../utils/Data";

const ProductPage = () => {
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [suggestedItems, setSuggestedItems] = useState([]);

  useEffect(() => {
    const selectedItem = Data.find((item) => item._id === Number(id));
    setSelectedProduct(selectedItem);

    if (selectedItem) {
      const suggestions = Data.filter(
        (item) => item.category === selectedItem.category && item._id !== selectedItem._id
      );
      setSuggestedItems(suggestions);
    }
  }, [id]);

  console.log(selectedProduct, "suggested items: ", suggestedItems);

  if (!selectedProduct) {
    return <div className="text-center text-gray-500 mt-10">Product not found</div>;
  }

  return (
    <div className="mx-auto p-5 bg-gray-900">
      <div className="md:flex bg-gray-100 p-5 rounded-lg shadow-lg">
        <div className="flex-1 flex flex-col items-center">
          <img
            src={selectedProduct.imageUrl}
            alt={selectedProduct.name}
            className="w-3/4 object-cover border border-gray-300 rounded-lg mb-4"
          />

          {/* <div className="flex gap-2">
            {[...Array(4)].map((_, index) => (
              <img
                key={index}
                src={selectedProduct.imageUrl}
                alt={`Thumbnail ${index + 1}`}
                className="w-16 h-16 border border-gray-300 rounded-lg cursor-pointer hover:ring-2 hover:ring-indigo-500"
              />
            ))}
          </div> */}

        </div>
        <div className="flex-1 px-6">
          <h1 className="text-2xl font-semibold text-gray-800">{selectedProduct.name}</h1>
          <p className="text-sm text-gray-500 mt-2">Category: {selectedProduct.category}</p>
          <p className="text-lg text-gray-600 mt-4">{selectedProduct.description}</p>
          <p className="text-3xl text-indigo-600 font-bold mt-6">${selectedProduct.price}</p>
          <p className={`text-lg font-semibold mt-4 ${selectedProduct.stock ? "text-green-500" : "text-red-500"}`}>
            {selectedProduct.stock ? "In Stock" : "Out of Stock"}
          </p>
        </div>

        <div className="flex-1 p-5 rounded-lg shadow-md">
          <p className="text-xl font-semibold mb-4">Purchase Options</p>
          <div className="flex items-center mb-4">
            <label htmlFor="quantity" className="mr-2">
              Quantity:
            </label>
            <select id="quantity" className="border border-gray-300 rounded-md px-2 py-1">
              {[...Array(10)].map((_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
          <button className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-lg hover:bg-yellow-500 transition">
            Add to Cart
          </button>
          <button className="w-full bg-orange-500 text-white font-semibold py-2 rounded-lg mt-3 hover:bg-orange-600 transition">
            Buy Now
          </button>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold text-white mb-5">Suggested Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {suggestedItems.map((item) => (
            <Link to={`/${item._id}`} key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                <p className="text-lg text-indigo-600 font-bold mt-2">${item.price}</p>
                <button className="w-full mt-3 bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600">
                  View Details
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
