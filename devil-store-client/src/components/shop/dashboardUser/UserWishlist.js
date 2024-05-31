import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Layout from "./Layout";
import { wishListProducts } from "./FetchApi";

const apiURL = process.env.REACT_APP_API_URL;

const TableHeader = () => {
    return (
        <Fragment>
            <thead>
                <tr>
                    <th className="px-4 py-2 border">Products</th>
                    <th className="px-4 py-2 border">Price</th>
                    <th className="px-4 py-2 border">Availability</th>
                    <th className="px-4 py-2 border">Action</th>
                </tr>
            </thead>
        </Fragment>
    );
};

const TableBody = ({ products, removeFromWishlist, history }) => {
    if (products.length === 0) {
        return (<tbody><tr>
            <td
                colSpan="8"
                className="text-xl text-center font-semibold py-8"
            >
                No products in wishlist
            </td>
        </tr></tbody>)
    }
    return (
        <tbody>
            {products.map((product, index) => (
                <tr key={index}>
                    <td className="px-4 py-2 border">
                        <div className="md:flex md:items-center">
                            <img
                                onClick={(e) => history.push(`/products/${product._id}`)}
                                className="cursor-pointer md:h-20 md:w-20 object-cover object-center"
                                src={`${apiURL}/uploads/products/${product.pImages[0]}`}
                                alt="wishListProduct"
                            />
                            <div className="text-lg md:ml-6 truncate">{product.pName}</div>
                        </div>
                    </td>
                    <td className="px-4 py-2 border">₹{product.pPrice}.00</td>
                    <td className="px-4 py-2 border">
                        {product.pQuantity > 0 ? (
                            <div className="text-green-500 my-1">In Stock</div>
                        ) : (
                            <div className="text-red-500 my-1">Out of Stock</div>
                        )}
                    </td>
                    <td className="px-4 py-2 border">
                        <div className="flex items-center justify-center">
                            <div
                                onClick={(e) => history.push(`/products/${product._id}`)}
                                className="cursor-pointer mr-2 py-1 px-3 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                            >
                                View
                            </div>
                            <svg
                                onClick={(e) => removeFromWishlist(product._id)}
                                className="w-6 h-6 ml-auto cursor-pointer text-red-600 hover:text-red-800"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </td>
                </tr>
            ))}
        </tbody>
    );
};

const Product = () => {
    const history = useHistory();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        let responseData = await wishListProducts();
        setTimeout(() => {
            if (responseData && responseData.Products) {
                setProducts(responseData.Products);
            }
        }, 50);
        setLoading(false);
    };

    const removeFromWishList = (id) => {
        let list = localStorage.getItem("wishList")
            ? JSON.parse(localStorage.getItem("wishList"))
            : [];
        if (list.length > 0) {
            if (list.includes(id) === true) {
                list.splice(list.indexOf(id), 1);
                localStorage.setItem("wishList", JSON.stringify(list));
                fetchData();
            }
        }
    };

    if (loading) {
        return (
            <div className="w-full md:w-9/12 flex items-center justify-center py-24">
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
            <div className="flex flex-col w-full my-4 md:my-0 md:w-9/12 md:px-8">
                <div className="border">
                    <div className="py-4 px-4 text-lg font-semibold border-t-2 border-yellow-700">
                        Wishlist
                    </div>
                    <hr />
                    <div className="overflow-auto bg-white shadow-lg p-4">
                        <table className="table-auto border w-full my-2">
                            <TableHeader />
                            <TableBody
                                products={products}
                                removeFromWishlist={removeFromWishList}
                                history={history}
                            />
                        </table>
                        <div className="text-sm text-gray-600 mt-2">
                            Total {products.length} products in wishlist
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

const WishList = () => {
    return (
        <Fragment>
            <Layout children={<Product />} />
        </Fragment>
    );
};

export default WishList;
