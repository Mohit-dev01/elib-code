import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="border-b border-gray-300">
        <div className="flex justify-between items-center py-3 max-w-7xl mx-auto ">
          <div className="text-orange-500 ">Coders Book</div>
          <div className="flex gap-5">
            <button className="text-orange-500 border rounded-md p-2">
              Sign in
            </button>
            <button className="text-white border rounded-md p-2 bg-orange-500 ">
              Sign up
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
