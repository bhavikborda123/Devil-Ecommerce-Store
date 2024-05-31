export const isWish = (id, wList) => {
  if (wList !== null && wList.includes(id) === true) {
    return true;
  }
  return false;
};

export const isWishReq = (e, id, setWishList) => {
  let list = localStorage.getItem("wishList")
    ? JSON.parse(localStorage.getItem("wishList"))
    : [];
  if (list.length > 0) {
    if (list.includes(id) !== true) {
      list.push(id);
      localStorage.setItem("wishList", JSON.stringify(list));
      setWishList(list);
    }
  } else {
    list.push(id);
    localStorage.setItem("wishList", JSON.stringify(list));
    setWishList(list);
  }
};

export const unWishReq = (e, id, setWishList) => {
  let list = localStorage.getItem("wishList")
    ? JSON.parse(localStorage.getItem("wishList"))
    : [];
  if (list.length > 0) {
    if (list.includes(id) === true) {
      list.splice(list.indexOf(id), 1);
      localStorage.setItem("wishList", JSON.stringify(list));
      setWishList(list);
    }
  }
};