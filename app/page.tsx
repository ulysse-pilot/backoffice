"use client";

import { Button } from "@/components/ui/button";
// import { ColumnDef } from "@tanstack/react-table";
import React from "react";
// import {
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from "@tanstack/react-table";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

type ParkingType = {
  id: string;
  fullName: string;
  phoneNumber: string;
};

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [parkings, setParkings] = React.useState<ParkingType[]>([]);

  // const columns: ColumnDef<ParkingType>[] = [
  //   {
  //     accessorKey: "id",
  //     header: "Id",
  //   },
  //   {
  //     accessorKey: "fullName",
  //     header: "Full name",
  //   },
  //   {
  //     accessorKey: "phoneNumber",
  //     header: "Phone number",
  //   },
  // ];

  // const table = useReactTable({
  //   parkings,
  //   columns,
  //   getCoreRowModel: getCoreRowModel(),
  // });

  

  React.useEffect(() => {
    fetchParkings();
  }, []);

  const fetchParkings = async () => {
    setIsLoading(true);

    const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;
    console.log("BASE_URL", BASE_URL);
    try {
      const response = await fetch(`${BASE_URL}/conductors`);

      if (!response.ok) {
        console.error("Error fetching parkings:", response.statusText);
        throw new Error(`Error fetching parkings: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("data", data);
      setParkings(data);
    } catch (error) {
      console.error("Error fetching parkings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full p-4 h-screen flex flex-col gap-12 font-[family-name:var(--font-geist-sans)]">
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
          <Button variant={"default"}>Add new parking</Button>
        </div>
        <div className="container flex flex-col space-y-2">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : parkings && parkings.length > 0 ? (
            parkings.map((parking) => (
              <div
                key={parking.id}
                className="flex items-center justify-between space-x-4"
              >
                {/* <Image
                  src={"https://via.placeholder.com/150"}
                  alt={parking.fullName}
                  width={70}
                  height={70}
                  className="w-12 h-12 rounded-full"
                /> */}
                <div className="flex flex-col">
                  <p className="text-sm text-slate-700 font-medium">
                    {parking.fullName}
                  </p>
                  <p className="text-xs text-slate-500 font-medium">
                    {parking.phoneNumber}
                  </p>
                </div>
                <Button variant={"secondary"} size={"sm"}>
                  View details
                </Button>
              </div>
            ))
            // <Table>
            //   <TableHeader>
            //     {table.getHeaderGroups().map((headerGroup) => (
            //       <TableRow key={headerGroup.id}>
            //         {headerGroup.headers.map((header) => {
            //           return (
            //             <TableHead key={header.id}>
            //               {header.isPlaceholder
            //                 ? null
            //                 : flexRender(
            //                     header.column.columnDef.header,
            //                     header.getContext()
            //                   )}
            //             </TableHead>
            //           );
            //         })}
            //       </TableRow>
            //     ))}
            //   </TableHeader>
            //   <TableBody>
            //     {table.getRowModel().rows?.length ? (
            //       table.getRowModel().rows.map((row) => (
            //         <TableRow
            //           key={row.id}
            //           data-state={row.getIsSelected() && "selected"}
            //         >
            //           {row.getVisibleCells().map((cell) => (
            //             <TableCell key={cell.id}>
            //               {flexRender(
            //                 cell.column.columnDef.cell,
            //                 cell.getContext()
            //               )}
            //             </TableCell>
            //           ))}
            //         </TableRow>
            //       ))
            //     ) : (
            //       <TableRow>
            //         <TableCell
            //           colSpan={columns.length}
            //           className="h-24 text-center"
            //         >
            //           No results.
            //         </TableCell>
            //       </TableRow>
            //     )}
            //   </TableBody>
            // </Table>
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
