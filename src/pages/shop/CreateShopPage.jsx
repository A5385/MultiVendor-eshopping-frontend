import { useEffect } from "react";
import CreateShop from "../../components/shop/CreateShop";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CreateShopPage = () => {
  const navigate = useNavigate();
  const { isSeller, seller } = useSelector((state) => state.seller);

  useEffect(() => {
    if (isSeller === true) {
      navigate(`/shop/${seller._id}`);
    }
  }, []);
  return (
    <div>
      <CreateShop />
    </div>
  );
};

export default CreateShopPage;
