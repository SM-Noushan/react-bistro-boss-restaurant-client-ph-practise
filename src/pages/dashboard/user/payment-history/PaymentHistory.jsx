import SectionHeading from "../../../../components/home/SectionHeading";
import Spinner from "../../../../components/shared/Spinner";
import useAuth from "../../../../hooks/useAuth";
import useFetchData from "../../../../hooks/useFetchData";

const getDate = (dateString) => {
  // Parse date string in milliseconds
  const timestamp = Date.parse(dateString);
  // Create a Date object from the timestamp
  const date = new Date(timestamp);

  // Define options for formatting the date
  const dateOptions = { day: "2-digit", month: "short", year: "numeric" };
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  // Format the date and time
  const formattedDate = date.toLocaleDateString("en-US", dateOptions);
  const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

  // Combine the date, time, and milliseconds into the desired format
  const formattedDateTime = `${formattedDate}, ${formattedTime}`;

  return formattedDateTime; // Example: "22 Mar, 2024, 07:52:13 PM"
};

const PaymentHistory = () => {
  const { user } = useAuth();
  const { data, isLoading } = useFetchData(
    "myPayments",
    `payments?uid=${user?.uid}`,
    () => {},
    true
  );
  return (
    <>
      <SectionHeading heading="PAYMENT HISTORY" subHeading="At a Glance!" />

      <div>
        <div className="overflow-x-auto rounded-t-xl font-inter">
          {isLoading ? (
            <Spinner />
          ) : data?.length > 0 ? (
            <>
              <h1 className="flex justify-between items-center font-cinzel font-bold text-dark-001 text-[32px] mb-6">
                Total Payments : {data.length}
              </h1>

              <table className="table *:text-base">
                {/* head */}
                <thead className="bg-gold-054">
                  <tr className="uppercase text-white font-semibold">
                    <th />
                    <th>Transaction Id</th>
                    <th>Total Price</th>
                    <th>Status</th>
                    <th>Payment Date</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row */}
                  {data.map((data, idx) => (
                    <tr key={data._id} className="text-dark-003 hover">
                      <td>{idx + 1}</td>
                      <td>{data?.transactionId}</td>
                      <td>{data.price}</td>
                      <td>{data.status}</td>
                      <td>{getDate(data.date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <div
              role="alert"
              className="alert alert-info flex justify-center rounded-md my-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>No Payments Made</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentHistory;
