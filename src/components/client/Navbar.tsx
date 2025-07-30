"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LocalUserType } from "@/app/(dashboard)/admin/settings/manage-profile/page";
import { useNavMenu } from "@/hooks/useNavMenu";
import { Bell, Gift, HelpCircle, LogOut, ScanLine, Settings, ShieldCheck, ShoppingBag, UserIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { logout } from '@/actions/logout.action';

const collections = [
  {
    title: "Luxury",
    href: "/by-style",
    children: [
      {
        title: "Korean Dress",
        href: "/by-style/korean-dress",
      },
      {
        title: "Western Wear",
        href: "/by-style/western-wear",
      },
      {
        title: "Vintage Wear",
        href: "/by-style/vintage-wear",
      },
      {
        title: "Beach Wear",
        href: "/by-style/beach-wear",
      },
    ],
  },
  {
    title: "By Style",
    href: "/by-style",
    children: [
      {
        title: "Korean Dress",
        href: "/by-style/korean-dress",
      },
      {
        title: "Western Wear",
        href: "/by-style/western-wear",
      },
      {
        title: "Vintage Wear",
        href: "/by-style/vintage-wear",
      },
      {
        title: "Beach Wear",
        href: "/by-style/beach-wear",
      },
    ],
  },
  {
    title: "By Season",
    href: "/by-season",
    children: [
      {
        title: "Summer wear",
        href: "/by-style/korean-dress",
      },
      {
        title: "Winter Wear",
        href: "/by-style/western-wear",
      },
    ],
  },
  {
    title: "By Occasion",
    href: "/by-occasion",
    children: [
      {
        title: "Christmas Dresses",
        href: "/by-occasion/christmas-dresses",
      },
      {
        title: "Cocktail Dresses",
        href: "/by-occasion/cocktail-dresses",
      },
      {
        title: "New Year’s Eve Dresses",
        href: "/by-occasion/new-years-eve-dresses",
      },
      {
        title: "Party Wear Tops",
        href: "/by-occasion/party-wear-tops",
      },
      {
        title: "Valentine’s Day Dresses",
        href: "/by-occasion/valentines-day-dresses",
      },
      {
        title: "Barbie Dresses",
        href: "/by-occasion/barbie-dresses",
      },
      {
        title: "Birthday Picks",
        href: "/by-occasion/birthday-picks",
      },
      {
        title: "Valentine’s Day Collection",
        href: "/by-occasion/valentines-day-collection",
      },
    ],
  },
  {
    title: "Bags",
    href: "/by-style",
    children: [
      {
        title: "Korean Dress",
        href: "/by-style/korean-dress",
      },
      {
        title: "Western Wear",
        href: "/by-style/western-wear",
      },
    ],
  },
  {
    title: "Shoes",
    href: "/by-style",
    children: [
      {
        title: "Korean Dress",
        href: "/by-style/korean-dress",
      },
      {
        title: "Western Wear",
        href: "/by-style/western-wear",
      },
    ],
  },
  {
    title: "Accessories",
    href: "/by-style",
    children: [
      {
        title: "Korean Dress",
        href: "/by-style/korean-dress",
      },
      {
        title: "Western Wear",
        href: "/by-style/western-wear",
      },
    ],
  },
];



const profileMenus = [
  // { title: "Feedback", icon: <Bell size={20} />, to: "/settings/feedback" },
  {
    title: "Help & Support",
    icon: <HelpCircle size={20} />,
    to: "/help-support",
  },
  { title: "Policy", icon: <ShieldCheck size={20} />, to: "" },
  // { title: "Settings", icon: <Settings size={20} />, to: "/settings" },
];

export default function Navbar() {
  const [user, setUser] = useState<LocalUserType | null>();
  const { data: menu, isLoading, isError } = useNavMenu();
  const [popoverOpen, setPopoverOpen] = useState(false);
  // console.log("Menu data", menu)


  // const [isLoaded, setIsLoaded] = useState(false);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     try {
  //       const storedUserData = localStorage.getItem("client");
  //       if (storedUserData) {
  //         const parsedUserData = JSON.parse(storedUserData);
  //         setUser(parsedUserData);
  //       }
  //     } catch (error) {
  //       console.error("Error parsing user data from localStorage:", error);
  //     } finally {
  //       setIsLoaded(true);
  //     }
  //   }
  // }, []);
  useEffect(() => {
    const storedUserData = localStorage.getItem("client");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUser(parsedUserData);
      console.log("User data", user);
    }
  }, []);
  // const collectionsWithChildren = collections.filter(
  //   (collection) => collection.children
  // );
  // const collectionsWithoutChildren = collections.filter(
  //   (collection) => !collection.children
  // );

  if (isLoading) return <div>Loading menu...</div>;
  if (isError || !menu) return <div>Failed to load menu</div>;

  // Categorize collections
  const collectionsWithChildren = menu.filter((item: any) => item.children?.length);
  const collectionsWithoutChildren = menu.filter((item: any) => !item.children?.length);
  return (
    <header className="container mx-auto w-full py-8">
      <nav className="sticky top-0 w-full flex justify-between items-center gap-10">
        {/* Logo */}
        <div>

          <h1 className="text-5xl font-semibold font-playfairdisplay">Pink Amethyst</h1>
        </div>
        {/* Links */}
        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Collections</NavigationMenuTrigger>
              <NavigationMenuContent className="z-50 relative">
                <div className="w-[900px] p-4 mx-auto ">
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4 max-h-[500px] overflow-y-auto">
                    {menu?.map((collection) => (
                      <div key={collection._id} className="space-y-2">
                        <Link
                          href={`/collection/${collection._id}`}
                          className="font-semibold block"
                        >
                          {collection.name}
                        </Link>

                        {collection.subcollections?.length > 0 && (
                          <ul className="flex flex-col space-y-1">
                            {collection.subcollections.map((sub) => (
                              <li key={sub._id}>
                                <Link
                                  href={`/collections/${collection._id}/${sub._id}`}
                                  className="text-sm text-gray-700 py-1 block"
                                >
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>


            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About Us
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Contact Us
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* cart & Login */}
        <div className="flex justify-between items-center gap-11">

          <div>
            {/* <svg
              width="29"
              height="32"
              viewBox="0 0 29 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.6797 0.0703125C18.464 0.0703125 21.5901 3.07293 21.9755 6.91317L22.0831 6.9145C24.1823 6.9145 26.7347 8.36631 27.5961 12.4383L28.7384 21.6452C29.1481 24.6167 28.6356 27.0002 27.2125 28.7098C25.7966 30.4104 23.5555 31.3104 20.7309 31.3104H8.64508C5.54255 31.3104 3.38106 30.5189 2.03609 28.8922C0.685343 27.261 0.233645 24.8142 0.69403 21.6211L1.81748 12.5363C2.55584 8.37083 5.25589 6.9145 7.34645 6.9145C7.52692 5.18148 8.27734 3.53281 9.46784 2.29703C10.836 0.881399 12.7224 0.0703125 14.6493 0.0703125H14.6797ZM22.0831 9.17589H7.34645C6.70799 9.17589 4.574 9.44424 3.9616 12.8876L2.84394 21.9332C2.48055 24.4704 2.76142 26.3067 3.68074 27.4178C4.58848 28.5153 6.21286 29.049 8.64508 29.049H20.7309C22.2481 29.049 24.3199 28.7339 25.5707 27.2293C26.5639 26.0368 26.9056 24.2609 26.5871 21.9497L25.4593 12.8258C24.9786 10.578 23.7104 9.17589 22.0831 9.17589ZM18.9021 13.3732C19.5015 13.3732 20.0212 13.8797 20.0212 14.5039C20.0212 15.128 19.5681 15.6346 18.9687 15.6346H18.9021C18.3027 15.6346 17.8163 15.128 17.8163 14.5039C17.8163 13.8797 18.3027 13.3732 18.9021 13.3732ZM10.4616 13.3732C11.0609 13.3732 11.5807 13.8797 11.5807 14.5039C11.5807 15.128 11.1261 15.6346 10.5267 15.6346H10.4616C9.8622 15.6346 9.37576 15.128 9.37576 14.5039C9.37576 13.8797 9.8622 13.3732 10.4616 13.3732ZM14.6754 2.33171H14.6537C13.2913 2.33171 11.9638 2.90308 11.001 3.89961C10.2168 4.7126 9.70385 5.78138 9.53792 6.91379L19.787 6.91421C19.4149 4.32381 17.2638 2.33171 14.6754 2.33171Z"
                fill="#2F2F2F"
              />
            </svg> */}
            <Link href={"/cart"}> <ShoppingBag strokeWidth={1} /></Link>


          </div>
          {user ? (
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user.image || "https://github.com/shadcn.png"} alt="User Profile" />
                  <AvatarFallback>{user.name ? user.name.charAt(0).toUpperCase() : "PK"}</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-fit border-border/50 p-1" align="end">
                <ul>
                  {profileMenus.map((item, idx) => (
                    <li key={idx} onClick={() => setPopoverOpen(false)} className="">
                      <Link
                        className="text-muted-foreground flex items-center gap-4 justify-between hover:bg-secondary p-1 px-2 cursor-pointer transition rounded-sm text-base"
                        href={item.to}
                      >
                        {item.title}
                        {item.icon}
                      </Link>
                    </li>
                  ))}

                  <li
                    onClick={() => {
                      setPopoverOpen(false);
                      // logout() -> logout function will be called here
                      logout(setUser);

                    }}
                    className="text-destructive flex gap-4 justify-between hover:bg-secondary p-1 px-2 cursor-pointer transition rounded-sm text-base"
                  >
                    LogOut
                    <LogOut size={20} />
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
          ) : (
            <Button>
              <Link href="/accounts/login">Login</Link>
            </Button>
          )

          }
        </div>
      </nav>
    </header >
  );
}
