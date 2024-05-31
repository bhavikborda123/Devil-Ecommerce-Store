import { getAllOrder, deleteOrder } from "./FetchApi";

export const fetchData = async (dispatch) => {
  dispatch({ type: "loading", payload: true });
  let responseData = await getAllOrder();
  setTimeout(() => {
    if (responseData && responseData.Orders) {
      dispatch({
        type: "fetchOrderAndChangeState",
        payload: responseData.Orders,
      });
      dispatch({ type: "loading", payload: false });
    }
  }, 1000);
};

/* This method call the edit modal & dispatch category context */
export const editOrderReq = (oId, type, status, dispatch) => {
  if (type) {
    dispatch({ type: "updateOrderModalOpen", oId: oId, status: status });
  }
};

export const deleteOrderReq = async (oId, dispatch) => {
  let responseData = await deleteOrder(oId);
  if (responseData && responseData.success) {
    fetchData(dispatch);
  }
};

/* Filter All Order */
export const filterOrder = async (
  type,
  data,
  dispatch,
  dropdown,
  setDropdown
) => {
  let responseData = await getAllOrder();
  if (responseData && responseData.Orders) {
    let newData;
    if (type === "All") {
      dispatch({
        type: "fetchOrderAndChangeState",
        payload: responseData.Orders,
      });
      setDropdown(!dropdown);
    } else if (type === "SearchFilter") {
      newData = responseData.Orders.filter(
        (item) => item.transactionId === data.transactionId
      )
      data.setTransactionId(null);
      dispatch({ type: "fetchOrderAndChangeState", payload: newData });
    } else if (type === "ByDate") {
      if (data.startDate.getTime() === data.endDate.getTime()) {
        newData = responseData.Orders.filter(
          (item) =>
            new Date(item.createdAt).getFullYear() === data.startDate.getFullYear() &&
            new Date(item.createdAt).getMonth() === data.startDate.getMonth() &&
            new Date(item.createdAt).getDate() === data.startDate.getDate()
        );
      } else {
        const adjustedEndDate = new Date(data.endDate);
        adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

        newData = responseData.Orders.filter(
          (item) =>
            new Date(item.createdAt) >= data.startDate &&
            new Date(item.createdAt) < adjustedEndDate
        );
      }
      dispatch({ type: "fetchOrderAndChangeState", payload: newData });
    } else if (type === "Not processed") {
      newData = responseData.Orders.filter(
        (item) => item.status === "Not processed"
      );
      dispatch({ type: "fetchOrderAndChangeState", payload: newData });
      setDropdown(!dropdown);
    } else if (type === "Processing") {
      newData = responseData.Orders.filter(
        (item) => item.status === "Processing"
      );
      dispatch({ type: "fetchOrderAndChangeState", payload: newData });
      setDropdown(!dropdown);
    } else if (type === "Shipped") {
      newData = responseData.Orders.filter((item) => item.status === "Shipped");
      dispatch({ type: "fetchOrderAndChangeState", payload: newData });
      setDropdown(!dropdown);
    } else if (type === "Delivered") {
      newData = responseData.Orders.filter(
        (item) => item.status === "Delivered"
      );
      dispatch({ type: "fetchOrderAndChangeState", payload: newData });
      setDropdown(!dropdown);
    } else if (type === "Cancelled") {
      newData = responseData.Orders.filter(
        (item) => item.status === "Cancelled"
      );
      dispatch({ type: "fetchOrderAndChangeState", payload: newData });
      setDropdown(!dropdown);
    } else if (type === "Reset") {
      dispatch({
        type: "fetchOrderAndChangeState",
        payload: responseData.Orders,
      });
    }
  }
};