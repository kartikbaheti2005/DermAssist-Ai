// ===============================
// Imports
// ===============================

import { useState, useRef, useEffect } from "react";
import { ChevronDown, User, LogOut } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

// ===============================
// Component
// ===============================

const UserMenu = () => {

  const navigate = useNavigate();

  const {
    user,
    logout,
  } = useAuth();

  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (

<div
    ref={menuRef}
    className="relative"
>

    <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 rounded-xl px-3 py-2 transition-all duration-200 hover:bg-slate-100"
    >

        <div
            className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white"
        >
            <User size={20}/>
        </div>

        <div className="hidden md:block text-left">

            <p className="text-sm font-semibold text-slate-800">
                {user?.full_name || "User"}
            </p>

            <p className="text-xs text-slate-500">
                {user?.role || "User"}
            </p>

        </div>

        <ChevronDown
            size={18}
            className="hidden md:block text-slate-500"
        />

    </button>

    {open && (
        <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border bg-white shadow-lg">
            
            <button
              onClick={() => {
                navigate("/profile");
                setOpen(false);
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-slate-100"
            >
              <User size={18} />
              My Profile
            </button>
            
            <button
                onClick={() => {
                    logout();
                    navigate("/login");
                }}
                className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-100"
            >
                <LogOut size={16} />
                Logout
            </button>
        </div>
    )}

</div>

);
};

// ===============================
// Export
// ===============================

export default UserMenu;
