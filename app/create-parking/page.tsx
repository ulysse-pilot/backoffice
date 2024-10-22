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

      <CreateParkingForm />
    </div>
  );
};

export default page;
