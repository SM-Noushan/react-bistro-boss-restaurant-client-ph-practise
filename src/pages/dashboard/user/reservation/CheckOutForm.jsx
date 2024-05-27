import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useFetchData from "../../../../hooks/useFetchData";
import useAuth from "../../../../hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const CheckOutForm = () => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: myCartData } = useFetchData(
    "myCartData",
    `carts?userId=${user?.uid}`,
    {},
    true
  );
  const price =
    myCartData?.length > 0 &&
    myCartData
      .reduce(
        (acc, curr) =>
          acc +
          Number.parseFloat(curr.quantity) *
            Number.parseFloat(curr.details.price),
        0
      )
      .toFixed(2);

  useEffect(() => {
    if (price)
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    else setClientSecret("");
  }, [axiosSecure, price]);

  const handleForm = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) return;

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast.error(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
    // confirm payment
    const { paymentIntent, error: payError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "Anonymous",
            name: user?.displayName || "Anonymous",
          },
        },
      }
    );
    if (payError) {
      console.log("pay error", error);
      //   toast.error(error.message);
    } else {
      //   console.log("[PaymentConfirm]", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        const payment = {
          email: user?.email,
          uid: user.uid,
          price,
          transactionId: paymentIntent.id,
          date: new Date(),
          cartIds: myCartData.map((item) => item._id),
          menuItemIds: myCartData.map((item) => item.menuID),
          menuQuantity: myCartData.map((item) => item.quantity),
          status: "pending",
        };
        const resPayDB = await axiosSecure.post("/payments", payment);
        // console.log("pay db >> ", resPayDB.data);
        if (resPayDB?.data?.insertedId) {
          queryClient.invalidateQueries([
            "totalCartItems, myCartData",
            "myPayments",
          ]);
          toast.success("Payment Successful");
          navigate("/dashboard/payment-history");
        }
      }
    }
  };

  return (
    <form onSubmit={handleForm}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div className="w-full text-center font-inter">
        <button
          className="bg-gold-054 hover:brightness-90 disabled:brightness-100 disabled:bg-gray-300 disabled:text-dark-001 px-4 py-3 rounded-md text-xl text-white mt-6 w-1/2 disabled:font-thin"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </div>
    </form>
  );
};

export default CheckOutForm;
