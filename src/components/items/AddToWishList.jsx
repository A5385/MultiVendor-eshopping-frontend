import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const AddToWishList = ({ click, size, onClickAdd, onClickRemove }) => {
  return (
    <div className="cursor-pointer my-auto">
      {click ? (
        <AiFillHeart
          size={size}
          onClick={onClickRemove}
          color={click ? "red" : "rgb(20 184 166 )"}
          title="Remove from wishlist"
        />
      ) : (
        <AiOutlineHeart
          size={size}
          onClick={onClickAdd}
          color={click ? "red" : "rgb(20 184 166 )"}
          title="Add from wishlist"
        />
      )}
    </div>
  );
};

export default AddToWishList;
