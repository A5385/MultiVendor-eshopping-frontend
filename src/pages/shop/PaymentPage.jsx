import CheckoutSteps from "../../components/website/Checkout/CheckoutSteps";
import Payment from "../../components/website/Payment/Payment";
import Footer from "../../components/website/layout/Footer";
import Header from "../../components/website/layout/Header";

const PaymentPage = () => {
  return (
    <div className="w-full min-h-screen bg-[#f6f9fc]">
      <Header />
      <br />
      <br />
      <CheckoutSteps active={2} />
      <Payment />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default PaymentPage;
