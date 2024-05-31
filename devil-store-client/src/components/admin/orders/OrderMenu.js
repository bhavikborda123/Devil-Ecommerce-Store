import React, { Fragment, useState, useContext } from "react";
import { OrderContext } from "./index";
import UpdateOrderModal from "./UpdateOrderModal";
import { filterOrder } from "./Actions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const OrderMenu = (props) => {
  const { data, dispatch } = useContext(OrderContext);
  const [dropdown, setDropdown] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  let [transactionId, setTransactionId] = useState(null);

  // eslint-disable-next-line
  const resetTransactionId = () => {
    setTransactionId(null);
  };

  return (
    <Fragment>
      <div className="col-span-1 flex items-center">
        <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0 w-full">
          {/* SearchFilter */}
          <div className="border-3 border-gray-400 rounded-full flex items-center justify-between overflow-hidden">
            <span
              style={{ background: "#303031" }}
              className="py-2 px-3"
              onClick={(e) => {
                if (transactionId)
                  filterOrder(
                    "SearchFilter",
                    { transactionId, setTransactionId },
                    dispatch,
                    dropdown,
                    setDropdown
                  );
              }}
            >
              <svg
                className="rounded-l-full w-6 h-6 text-gray-100"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <input
              placeholder="Transaction id..."
              className="py-2 px-2 focus:outline-none rounded-r-full w-full"
              type="text"
              onChange={(e) => setTransactionId(e.target.value)}
            />

            <button
              className="relative text-white text-base font-semibold py-2 px-3 rounded-full uppercase"
              onClick={(e) => {
                filterOrder("Reset", data, dispatch, dropdown, setDropdown);
                setTransactionId(null);
              }}
              style={{ background: "#303031" }}
            >
              X
            </button>
          </div>

          {/* DateRangePicker */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-gray-700 text-xl font-bold">From:</span>
              <DatePicker
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-700 text-xl font-bold">To:</span>
              <DatePicker
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </div>
            <button
              className="relative text-white text-base font-semibold py-2 px-4 rounded-full uppercase"
              onClick={(e) => {
                if (startDate && endDate)
                  filterOrder(
                    "ByDate",
                    { startDate, endDate },
                    dispatch,
                    dropdown,
                    setDropdown
                  );
              }}
              style={{ background: "#303031" }}
            >
              Apply
            </button>
            <button
              className="relative text-white text-base font-semibold py-2 px-4 rounded-full uppercase"
              onClick={(e) => {
                filterOrder("Reset", data, dispatch, dropdown, setDropdown);
                setStartDate(null);
                setEndDate(null);
                setTransactionId(null);
              }}
              style={{ background: "#303031" }}
            >
              Reset
            </button>
          </div>

          {/* Filter */}
          <div
            style={{ background: "#303031" }}
            className="relative rounded-full text-gray-100 text-sm font-semibold uppercase"
          >
            <div
              onClick={(e) => setDropdown(!dropdown)}
              className="flex items-center cursor-pointer rounded-full overflow-hidden p-2 justify-center"
            >
              <svg
                className="w-6 h-6 text-gray-100 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
              </svg>
              <span className="pr-2">Filter</span>
            </div>
            <div
              style={{ background: "#303031" }}
              className={`${
                dropdown ? "" : "hidden"
              } absolute top-0 right-0 mt-12 rounded-lg overflow-hidden w-full md:w-48 flex flex-col z-10`}
            >
              <span
                onClick={(e) =>
                  filterOrder("All", data, dispatch, dropdown, setDropdown)
                }
                className="px-4 py-2 hover:bg-black text-center cursor-pointer"
              >
                All
              </span>
              <span
                onClick={(e) =>
                  filterOrder(
                    "Not processed",
                    data,
                    dispatch,
                    dropdown,
                    setDropdown
                  )
                }
                className="px-4 py-2 hover:bg-black text-center cursor-pointer"
              >
                Not processed
              </span>
              <span
                onClick={(e) =>
                  filterOrder(
                    "Processing",
                    data,
                    dispatch,
                    dropdown,
                    setDropdown
                  )
                }
                className="px-4 py-2 hover:bg-black text-center cursor-pointer"
              >
                Processing
              </span>
              <span
                onClick={(e) =>
                  filterOrder("Shipped", data, dispatch, dropdown, setDropdown)
                }
                className="px-4 py-2 hover:bg-black text-center cursor-pointer"
              >
                Shipped
              </span>
              <span
                onClick={(e) =>
                  filterOrder(
                    "Delivered",
                    data,
                    dispatch,
                    dropdown,
                    setDropdown
                  )
                }
                className="px-4 py-2 hover:bg-black text-center cursor-pointer"
              >
                Delivered
              </span>
              <span
                onClick={(e) =>
                  filterOrder(
                    "Cancelled",
                    data,
                    dispatch,
                    dropdown,
                    setDropdown
                  )
                }
                className="px-4 py-2 hover:bg-black text-center cursor-pointer"
              >
                Cancelled
              </span>
            </div>
          </div>
        </div>
        <UpdateOrderModal />
      </div>
    </Fragment>
  );
};

export default OrderMenu;
