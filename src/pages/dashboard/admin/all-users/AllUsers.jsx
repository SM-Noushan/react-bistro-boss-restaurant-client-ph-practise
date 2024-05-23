import { FaTrashCan, FaUsersGear } from "react-icons/fa6";
import Swal from "sweetalert2";
import Spinner from "../../../../components/shared/Spinner";
import SectionHeading from "../../../../components/home/SectionHeading";
import useSendData from "../../../../hooks/useSendData";
import { useQueryClient } from "@tanstack/react-query";
import useFetchData from "../../../../hooks/useFetchData";

const swalWithCustomButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-error text-white",
    cancelButton: "btn btn-info text-white ml-4",
  },
  buttonsStyling: false,
});

const AllUsers = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useFetchData(
    "allUserInfo",
    "admin/users",
    () => {},
    true
  );

  const onSuccess = () => {
    queryClient.invalidateQueries(["allUserInfo"]);
  };

  const { mutateAsync: changeUserRoleMutation } = useSendData(onSuccess);
  const { mutateAsync: removeUserMutation } = useSendData(onSuccess);

  const handleUserRole = (user) => {
    swalWithCustomButtons
      .fire({
        title: "Change role to admin?",
        text: "User role will change to admin",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Change",
        showClass: {
          popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
        },
        hideClass: {
          popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
        },
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const object = {
              method: "patch",
              url: `admin/user/${user._id}`,
            };
            const res = await changeUserRoleMutation(object);
            if (res.data?.modifiedCount)
              Swal.fire({
                title: "Role!",
                text: `${user.name}'s role changed to admin`,
                icon: "success",
              });
          } catch (error) {
            console.log(error);
            Swal.fire({
              title: "Error!",
              text: "Please try again",
              icon: "error",
            });
          }
        }
      });
  };

  const handleDelete = (id) => {
    swalWithCustomButtons
      .fire({
        title: "Do you want to proceed?",
        text: "User will be removed",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Remove",
        showClass: {
          popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
        },
        hideClass: {
          popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
        },
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const object = {
              method: "delete",
              url: `user/${id}`,
            };
            const res = await removeUserMutation(object);
            if (res.data?.deletedCount)
              Swal.fire({
                title: "Removed!",
                text: "Successfully removed user",
                icon: "success",
              });
          } catch (error) {
            console.log(error);
            Swal.fire({
              title: "Error!",
              text: "Please try again",
              icon: "error",
            });
          }
        } else
          Swal.fire({
            title: "Cancelled!",
            text: "Request Cancelled",
            icon: "error",
          });
      });
  };
  return (
    <>
      <SectionHeading heading="MANAGE ALL USERS" subHeading="How many??" />

      <div>
        <div className="overflow-x-auto rounded-t-xl font-inter">
          {isLoading ? (
            <Spinner />
          ) : data?.length > 0 ? (
            <>
              {/* <div className=""> */}
              <h1 className="font-cinzel font-bold text-dark-001 text-[32px] mb-6">
                Total Users: {data.length}{" "}
              </h1>
              {/* </div> */}

              <table className="table *:text-base">
                {/* head */}
                <thead className="bg-gold-054">
                  <tr className="uppercase text-white font-semibold">
                    <th />
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row */}
                  {data.map((user, idx) => (
                    <tr key={user._id} className="text-dark-003 hover">
                      <th>{idx + 1}</th>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        {user?.role === "admin" ? (
                          "Admin"
                        ) : (
                          <button
                            onClick={() => handleUserRole(user)}
                            className="bg-gold-054/80 hover:bg-gold-054 p-3.5 rounded-lg text-white w-fit"
                          >
                            <FaUsersGear />
                          </button>
                        )}
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="bg-red-c1c/80 hover:bg-red-c1c p-3.5 rounded-lg text-white w-fit"
                        >
                          <FaTrashCan />
                        </button>
                      </td>
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
              <span>No User</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllUsers;
