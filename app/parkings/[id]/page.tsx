"use client";

// import { useRouter } from "next/navigation";
import React from "react";

const page = ({ params }: { params: Record<string, number> }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const router = useRouter();

  return <div>Welcome parking: {params.id}</div>;
};

export default page;
