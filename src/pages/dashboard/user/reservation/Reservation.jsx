import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import SectionHeading from "../../../../components/home/SectionHeading";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Reservation = () => {
  return (
    <>
      <SectionHeading heading="Payment" subHeading="Pay Now" />
      <div>
        <Elements stripe={stripePromise}>
          <CheckOutForm />
        </Elements>
      </div>
    </>
  );
};

export default Reservation;
