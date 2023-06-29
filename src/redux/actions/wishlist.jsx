// add to Wishlist
export const addToWishlist = (data) => async (dispatch, getState) => {
    dispatch({
        type: "addToWishlist",
        payload: data,
    });

    localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlist));
    return data;
};

// remove from Wishlist
export const removeFromWishlist = (data) => async (dispatch, getState) => {
    dispatch({
        type: "removeFromWishlist",
        payload: data._id,
    });
    localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlist));
    return data;
};