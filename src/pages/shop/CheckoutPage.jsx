import CheckoutSteps from "../../components/website/Checkout/CheckoutSteps";
import Footer from "../../components/website/layout/Footer";
import Header from "../../components/website/layout/Header";
import Checkout from "../../components/website/Checkout/Checkout";

const CheckoutPage = () => {
  return (
    <div>
      <Header />
      <br />
      <br />
      <CheckoutSteps active={1} />
      <Checkout />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default CheckoutPage;
