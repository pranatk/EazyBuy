import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Navbar({ handleClick, open }) {
  const router = useRouter();
  const menuItems = [
    {
      title: "Dashboard",
      icon: "/dashboard.svg",
      link: "/",
    },
    {
      title: "Products",
      icon: "/product.svg",
      link: "/products",
    },
    ,
    {
      title: "Orders",
      icon: "/orders.svg",
      link: "/orders",
    },
    {
      title: "Settings",
      icon: "/settings.svg",
      link: "/settings",
    },
  ];
  return (
    <div
      className={`${
        open ? "w-[180px]" : "w-[70px]"
      }  bg-secondary-medium  relative transition-[width] ease-linear delay-50 overflow-hidden`}
    >
      <div
        className={`flex flex-row h-[60px] ${
          !open ? "justify-center" : "justify-between px-4"
        }  items-center`}
      >
        {open && (
          <div className="flex flex-row ">
            <div className=" text-white">
              <Image src="/eazybuy.svg" width="24" height="24" />
            </div>
            <div className="text-xl font-bold text-white">EasyBuy</div>
          </div>
        )}
        <div
          className="text-white flex flex-row justify-center "
          onClick={handleClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      </div>

      <ul className={`mx-auto  ${open ? "p-4" : "py-4"} text-white`}>
        {menuItems.map((item, i) => {
          return (
            <li
              key={i}
              className={`mb-4 ${open ? "px-2 py-2" : "py-2 mx-2"} ${
                item.link === router.pathname
                  ? "border border-transparent rounded-md bg-secondary-darkGrey"
                  : ""
              }`}
            >
              <Link
                href={item.link}
                className={`flex flex-row ${!open ? "justify-center" : ""}`}
              >
                <div>
                  <Image
                    src={item.icon}
                    width="24"
                    height="24"
                    alt={item.title}
                    className="text-white"
                  />
                </div>
                {open && <div className="pl-2">{item.title}</div>}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
