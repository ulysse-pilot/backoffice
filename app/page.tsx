"use client";

import { Button } from "@/components/ui/button";
import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/lib/constants";

type ParkingType = {
  id: number;
  capacity: number;
  type: string;
  address: string;
  pricePerHour: number;
};

export default function Home() {
  const router = useRouter();
  const isLoaded = React.useRef(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [parkings, setParkings] = React.useState<ParkingType[]>([]);

  React.useEffect(() => {
    if (isLoaded.current) return;

    fetchParkings();

    isLoaded.current = true;
  }, []);

  const fetchParkings = async () => {
    setIsLoading(true);

    console.log("BASE_URL", BASE_URL);
    try {
      const response = await fetch(`${BASE_URL}/parkings`);

      if (!response.ok) {
        console.error("Error fetching parkings:", response.statusText);
        throw new Error(`Error fetching parkings: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("data", data);
      const formatedData = data.map(
        (parking: {
          prkId: number;
          capacity: number;
          type: string;
          address: { street: string; city: string };
          pricePerHour: number;
        }) => {
          return {
            id: parking.prkId,
            capacity: parking.capacity,
            type: parking.type,
            address: parking.address
              ? `${parking.address.street}, ${parking.address.city}`
              : "Not registered yet",
            pricePerHour: parking.pricePerHour,
          };
        }
      );

      setParkings(formatedData);
    } catch (error) {
      console.error("Error fetching parkings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full p-4 flex flex-col gap-12 font-[family-name:var(--font-geist-sans)]">
      <div className="container flex flex-col space-y-3">
        <h1 className="text-3xl text-slate-800 font-semibold">Karz</h1>
        <p className="text-lg text-slate-500 font-medium">
          A powerful, modern, and user-friendly digital platform for managing
          and organizing your parking lot.
        </p>
      </div>
      <div className="container flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xl text-slate-800 font-semibold">
            Registered parkings
          </h3>
          <Button
            variant={"default"}
            onClick={() => router.push("/create-parking")}
          >
            Add new parking
          </Button>
        </div>
        <div className="container flex flex-col space-y-2">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="spinner-border text-primary" role="status">
                <span /* className="sr-only" */>Loading...</span>
              </div>
            </div>
          ) : parkings && parkings.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Id</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Price per hour</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parkings.length ? (
                  parkings.map((parking) => (
                    <TableRow
                      key={parking.id}
                      // data-state={row.getIsSelected() && "selected"}
                      className="cursor-pointer"
                      onClick={() => router.push(`/parkings/${parking.id}`)}
                    >
                      <TableCell className="w-[100px]">{parking.id}</TableCell>
                      <TableCell>{parking.capacity}</TableCell>
                      <TableCell>{parking.type}</TableCell>
                      <TableCell>{parking.address}</TableCell>
                      <TableCell>{parking.pricePerHour}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">No parking found</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
