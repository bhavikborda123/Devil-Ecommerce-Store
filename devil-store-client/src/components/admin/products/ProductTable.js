import React, { Fragment, useContext, useEffect, useState } from "react";
import { getAllProduct, deleteProduct } from "./FetchApi";
import moment from "moment";
import { ProductContext } from "./index";

const apiURL = process.env.REACT_APP_API_URL;

const AllProduct = (props) => {
  const { data, dispatch } = useContext(ProductContext);
  const { products } = data;

  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  const fetchData = async () => {
    setLoading(true);
    let responseData = await getAllProduct();
    setTimeout(() => {
      if (responseData && responseData.Products) {
        let filteredProducts = responseData.Products;
        if (selectedCategory !== "All") {
          filteredProducts = responseData.Products.filter(
            (product) =>
              product.pCategory && product.pCategory.cName === selectedCategory
          );
        }
        const uniqueCategories = [
          ...new Set(
            responseData.Products.map(
              (product) => product.pCategory && product.pCategory.cName
            )
          ),
        ];
        setCategories(uniqueCategories.filter(Boolean));
        dispatch({
          type: "fetchProductsAndChangeState",
          payload: filteredProducts,
        });
        setLoading(false);
      }
    }, 1000);
  };

  const deleteProductReq = async (pId) => {
    let deleteC = await deleteProduct(pId);
    if (deleteC.success) {
      fetchData();
    }
  };

  /* This method call the edit modal & dispatch product context */
  const editProduct = (pId, product, type) => {
    if (type) {
      dispatch({
        type: "editProductModalOpen",
        product: { ...product, pId: pId },
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <svg
          className="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <Fragment>
      <div className="col-span-1 overflow-auto bg-white shadow-lg p-4">
        {/* Category Filter Dropdown */}
        <div className="mb-4">
          <label htmlFor="category" className="mr-2 font-semibold">
            Filter by Category:
          </label>
          <select
            id="category"
            className="p-2 border rounded"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Product Table */}
        <table className="table-auto border w-full my-2">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Product</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Stock</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Offer</th>
              <th className="px-4 py-2 border">Created at</th>
              <th className="px-4 py-2 border">Updated at</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0 ? (
              products.map((item, key) => (
                <ProductTable
                  product={item}
                  editProduct={(pId, product, type) =>
                    editProduct(pId, product, type)
                  }
                  deleteProduct={(pId) => deleteProductReq(pId)}
                  key={key}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan="10"
                  className="text-xl text-center font-semibold py-8"
                >
                  No product found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="text-sm text-gray-600 mt-2">
          Total {products && products.length} product found
        </div>
      </div>
    </Fragment>
  );
};

/* Single Product Component */
const ProductTable = ({ product, deleteProduct, editProduct }) => {
  return (
    <Fragment>
      <tr>
        <td className="p-2 text-left">
          {product.pName.length > 15
            ? product.pName.substring(0, 15) + "..."
            : product.pName}
        </td>
        <td className="p-2 text-left">
          {product.pDescription.slice(0, 15)}...
        </td>
        <td className="p-2 text-center">
          <img
            className="w-12 h-12 object-cover object-center"
            src={`${apiURL}/uploads/products/${product.pImages[0]}`}
            alt="pic"
          />
        </td>
        <td className="p-2 text-center">
          {product.pStatus === "Active" ? (
            <span className="bg-green-200 rounded-full text-center text-xs px-2 font-semibold">
              {product.pStatus}
            </span>
          ) : (
            <span className="bg-red-200 rounded-full text-center text-xs px-2 font-semibold">
              {product.pStatus}
            </span>
          )}
        </td>
        <td className="p-2 text-center">
          {product.pQuantity >= 15
            ? product.pQuantity
            : `${product.pQuantity}-LS`}
        </td>
        {/* LS : Limited Stock */}
        <td className="p-2 text-center">
          {product.pCategory ? product.pCategory.cName : "N/A"}
        </td>

        <td className="p-2 text-center">{product.pOffer}</td>
        <td className="p-2 text-center">
          {moment(product.createdAt).format("lll")}
        </td>
        <td className="p-2 text-center">
          {moment(product.updatedAt).format("lll")}
        </td>
        <td className="p-2 flex items-center justify-center">
          <span
            onClick={(e) => editProduct(product._id, product, true)}
            className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1"
          >
            <svg
              className="w-6 h-6 fill-current text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path
                fillRule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span
            onClick={(e) => deleteProduct(product._id)}
            className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1"
          >
            <svg
              className="w-6 h-6 fill-current text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </td>
      </tr>
    </Fragment>
  );
};

export default AllProduct;
