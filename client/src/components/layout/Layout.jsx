// client/src/components/layout/Layout.jsx

import { useState } from "react";

import Navbar from "./Navbar";

import Sidebar from "./Sidebar";

const Layout = ({ children }) => {

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (

    <div
      className="
        flex

        min-h-screen

        bg-gray-50
        dark:bg-dark-200

        text-gray-900
        dark:text-white
      "
    >

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}

        onClose={() =>

          setSidebarOpen(false)

        }
      />

      {/* Main Content */}
      <div
        className="
          flex flex-1 flex-col

          overflow-hidden
        "
      >

        {/* Navbar */}
        <Navbar
          onMenuToggle={() =>

            setSidebarOpen(

              (prev) => !prev

            )

          }
        />

        {/* Page Content */}
        <main
          className="
            flex-1

            overflow-y-auto

            p-4
            sm:p-6
            lg:p-8
          "
        >

          {children}

        </main>

      </div>

    </div>

  );
};

export default Layout;