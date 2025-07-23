"use client";
import Link from "next/link";
import React, { useState } from "react";
import customers from "./../../../public/icons/customers.png";
import dashboard from "./../../../public/icons/dashboard.png";
import orderList from "./../../../public/icons/orderList.png";
import productStock from "./../../../public/icons/productStock.png";
import stockClearance from "./../../../public/icons/stockClearance.png";
import reviews from "./../../../public/icons/reviews.png";
import logout from "./../../../public/icons/logout.png";
import settings from "./../../../public/icons/settings.png";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "../loader/loading";


const Sidebar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter()
  const sidebarItems = [
    {
      name: "Dashboard",
      link: "/admin/dashboard",
      icon: dashboard,
    },
    {
      name: "Product Stock",
      link: "/admin/product-stock",
      icon: productStock,
    },
    {
      name: "Stock Clearance",
      link: "/admin/stock-clearance",
      icon: stockClearance,
    },
    {
      name: "Order List",
      link: "/admin/order-list",
      icon: orderList,
    },
    {
      name: "Discount Spin",
      link: "/admin/discount-spin",
      icon: customers,
    },
    {
      name: "Customers",
      link: "/admin/customers",
      icon: customers,
    },
    {
      name: "Reviews",
      link: "/admin/reviews",
      icon: reviews,
    },
  ];

  const handleLogOut = async () => {
    try {
      setIsLoading(true)
      const res = await fetch("/api/logout", {
        method: "POST"
      })
      const data = await res.json()
      if (data.success) {
        toast.success(data.message);
        router.push("/")
      }
    } catch (error) {
      toast.error("Log Out Failed");
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Toaster position="top-center" />
      <div className="flex flex-col gap-6 min-h-[90vh]">
        {sidebarItems &&
          sidebarItems.map((item) => {
            const isActive = pathname === item.link;

            return (
              <Link
                key={item.name}
                href={item.link}
                className={`group p-2 rounded-md inline-flex items-center gap-2 justify-center md:justify-normal hover:bg-secondary hover:text-white ${isActive ? "bg-secondary text-white" : "text-black"
                  } `}
              >
                <Image
                  className={`${isActive ? "invert" : "invert-0"
                    } group-hover:invert`}
                  src={item.icon}
                  alt={item.name}
                  height={24}
                  width={24}
                />
                <span className="hidden md:inline">{item.name}</span>
              </Link>
            );
          })}
        <div className="flex flex-col gap-2 mt-auto mb-6">
          <Link
            href={"/admin/settings"}
            className={`${pathname == "/admin/settings"
              ? "bg-secondary text-white"
              : "text-black"
              } group p-2 rounded-md inline-flex items-center gap-2 justify-center md:justify-normal hover:bg-secondary hover:text-white`}
          >
            <Image
              className={`${pathname == "/admin/settings" ? "invert" : "invert-0"
                } group-hover:invert`}
              src={settings}
              alt={"settings"}
              height={24}
              width={24}
            />
            <span className="hidden md:inline">Settings</span>
          </Link>
          {
            isLoading ? (
              <div className="inline-flex items-center gap-2  cursor-not-allowed">
                <LoadingSpinner />
                <span>Logging Out</span>
              </div>
            ) :
              (
                <button
                  onClick={handleLogOut}
                  className="group p-2 rounded-md inline-flex items-center gap-2 justify-center md:justify-normal hover:bg-secondary hover:text-white"
                >
                  <Image
                    className="group-hover:invert"
                    src={logout}
                    alt={"logout"}
                    height={24}
                    width={24}
                  />
                  <span className="hidden md:inline">Logout</span>
                </button>
              )
          }
        </div>
      </div>
    </>
  );
};

export default Sidebar;
