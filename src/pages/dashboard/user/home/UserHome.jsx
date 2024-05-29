import useAuth from "../../../../hooks/useAuth";

const UserHome = () => {
  const { user } = useAuth();
  return (
    <div>
      <div className="font-inter">
        <h1 className="font-cinzel font-semibold text-[32px] text-dark-001">
          Hi, Welcome {user?.displayName || "Back!"}
        </h1>
      </div>
    </div>
  );
};

export default UserHome;
