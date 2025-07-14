import { Button } from "@/components/ui/button";
import { UserAuth } from "@/context/AuthContext";
// import { EyeIcon, EyeOffIcon } from "lucide-react";

function UserCard() {
  const { user, signOut } = UserAuth() || {};
  return (
    <div className="space-x-2 ">
      {user ? (
        <div className="flex items-center space-x-2">
          <img
            src={user?.photoURL || "src/assets/defaultAvatar.png"}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span>Hi, {user.displayName?.split(" ")[0]}.</span>
          <Button
            className=" hover:cursor-pointer "
            size="sm"
            onClick={signOut}
          >
            Sign Out
          </Button>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <img
            src="src/assets/defaultAvatar.png"
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span>Welcome.</span>
        </div>
      )}
    </div>
  );
}

export default UserCard;
