import CreateParkingForm from "@/components/CreateParkingForm";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";

const page = () => {

  return (
    <div className="w-full p-4 h-screen flex flex-col gap-12 font-[family-name:var(--font-geist-sans)]">
      <Link href={"/"}>
        <span className="flex items-center space-x-3">
          <ArrowLeftCircle size={24} /> <span>Back to Home</span>
        </span>
      </Link>

      <div className="flex flex-col w-full gap-5">
        <h3 className="text-xl text-slate-800 font-semibold">
          Generals Informations
        </h3>
        <CreateParkingForm />
      </div>
    </div>
  );
};

export default page;
