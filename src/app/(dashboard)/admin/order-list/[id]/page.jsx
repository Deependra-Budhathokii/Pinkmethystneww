import Status from "@/components/ui/status";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

const orderData = [
  {
    productName: "Wireless Mouse",
    imageUrl: "https://picsum.photos/id/237/200/300",
    quantity: 50,
    amountPerUnit: 1,
    price: 25.99,
  },
  {
    productName: "Laptop Stand",
    imageUrl: "https://picsum.photos/id/289/200/300",
    quantity: 30,
    amountPerUnit: 1,
    price: 49.99,
  },
  {
    productName: "Bluetooth Speaker",
    imageUrl: "https://picsum.photos/id/238/200/300",
    quantity: 20,
    amountPerUnit: 1,
    price: 99.99,
  },
  {
    productName: "Gaming Keyboard",
    imageUrl: "https://picsum.photos/id/222/200/300",
    quantity: 15,
    amountPerUnit: 1,
    price: 79.99,
  },
  {
    productName: "USB-C Hub",
    imageUrl: "https://picsum.photos/id/211/200/300.jpg",
    quantity: 40,
    amountPerUnit: 1,
    price: 34.99,
  },
];

const CustomerPage = () => {
  return (
    <div className="px-6 pb-10">
      <div className="flex justify-between items-center flex-wrap">
        <h2 className="text-3xl font-bold font-playfairdisplay">
          Customer Details
        </h2>
        <Status />
      </div>
      <div className="mt-6 flex flex-col gap-4 flex-wrap">
        <span className="font-playfairdisplay font-semibold text-xl">
          Id : <span className="font-normal">001010</span>
        </span>
        <div className="flex gap-10">
          <p className="font-playfairdisplay font-semibold text-xl">
            Name : <span className="font-normal">Rajesh Hamal</span>
          </p>
          <p className="font-playfairdisplay font-semibold text-xl">
            Address :{" "}
            <span className="font-normal">
              Lubhu, Mahalaxmi - 8, Lalitpur, Nepal
            </span>
          </p>
        </div>
        <div className="flex gap-10">
          <p className="font-playfairdisplay font-semibold text-xl">
            Phone Number : <span className="font-normal">+977 9876545453</span>
          </p>
          <p className="font-playfairdisplay font-semibold text-xl">
            Order Date : <span className="font-normal">02-09.2024</span>
          </p>
        </div>
        <div className="">
          <p className="font-playfairdisplay font-semibold text-xl">
            Order Status :{" "}
            <span className="font-normal bg-green-300 py-1 px-2 inline-block rounded-md text-white">
              Completed
            </span>
          </p>
        </div>
      </div>
      <div className="">
        <h3 className="text-2xl font-bold font-playfairdisplay mt-10">
          Billing Details
        </h3>
        <div className="mt-6 font-playfairdisplay">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Amount Per Unit</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderData &&
                orderData.map((order) => (
                  <TableRow key={order.productName}>
                    <TableCell>
                      <Image
                        className="h-[100px] w-full object-cover object-center"
                        src={order.imageUrl}
                        width={100}
                        height={100}
                        alt={order.productName}
                      />
                    </TableCell>
                    <TableCell>{order.productName}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>Rs. {order.amountPerUnit}</TableCell>
                    <TableCell className="text-right">
                      Rs. {order.price}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
        {/* Calculation */}
        <div className="mt-6 flex flex-col gap-4 flex-wrap items-start md:items-end">
          <span className="font-playfairdisplay font-semibold text-xl inline-flex items-center gap-8">
            Subtotal : <span className="font-normal">Rs. 6000</span>
          </span>
          <p className="font-playfairdisplay font-semibold text-xl inline-flex items-center gap-8">
            Tax : <span className="font-normal">Rs. 600</span>
          </p>
          <p className="font-playfairdisplay font-semibold text-xl inline-flex items-center gap-8">
            Delivery :<span className="font-normal">Rs. 100</span>
          </p>
          <p className="font-playfairdisplay font-semibold text-xl md:inline-flex items-center gap-8 border-b border-b-black pb-4">
            Discount Code :
            <input
              type="text"
              className="bg-transparent border p-2 rounded-md"
            />
            <span className="font-normal">Rs. 100</span>
          </p>
          <p className="font-playfairdisplay font-semibold text-xl inline-flex items-center gap-8">
            Total :<span className="font-normal">Rs. 100</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;
