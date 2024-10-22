/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { BASE_URL } from "@/lib/constants";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

type Parking = {
  prkId: number;
  capacity: number;
  type: string;
  address: { street: string; city: string };
  pricePerHour: number;
};

const page = ({ params }: { params: Record<string, number> }) => {
  const [parking, setParking] = React.useState<Parking | null>(null);

  console.log("params.id", params.id);

  React.useEffect(() => {
    const fetchParking = async () => {
      const url = `${BASE_URL}/parkings/${params.id}`;
      console.log("url", url);
      const response = await fetch(`${BASE_URL}/parkings/${params.id}`);

      if (!response.ok) {
        console.error("Error fetching parking:", response.statusText);
        throw new Error(`Error fetching parking: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("data", data);
      setParking(data);
    };

    fetchParking();
  }, [params.id]);

  return (
    <div className="w-full p-4 h-screen flex flex-col gap-12 font-[family-name:var(--font-geist-sans)]">
      <Link href={"/"}>
        <span className="flex items-center space-x-3">
          <ArrowLeftCircle size={24} /> <span>Back to Home</span>
        </span>
      </Link>

      {parking && (
        <div className="container flex flex-col gap-6">
          <h3 className="text-xl text-slate-800 font-semibold">
            {parking.address?.street}, {parking.address?.city}
          </h3>
          <p className="text-lg text-slate-500 font-medium">
            {parking.type} parking spot
          </p>
          <p className="text-sm text-slate-400 font-medium">
            Capacity: {parking.capacity}
          </p>
          <p className="text-sm text-slate-400 font-medium">
            Price per hour: ${parking.pricePerHour}
          </p>
        </div>
      )}
    </div>
  );
};

export default page;
