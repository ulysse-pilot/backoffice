"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Asterisk, Loader, Plus } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const FormSchema = z.object({
  capacity: z.string(),
  freePlaces: z.string(),
  type: z.enum(["PUBLIC", "PRIVATE"]),
  pricePerHour: z.string(),
  pricePerDay: z.string().optional(),
  pricePerWeek: z.string().optional(),
  street: z.string(),
  city: z.string()
  // longitude: z.number(),
  // latitude: z.number(),
});

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

const CreateParkingForm = () => {
  const [myLongitude, setLongitude] = React.useState(0);
  const [myLatitude, setLatitude] = React.useState(0);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: "PRIVATE",
      // capacity: 0,
      // freePlaces: 0,
      // pricePerHour: 0,
      // pricePerDay: 0,
      // pricePerWeek: 0,
    },
  });

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Latitude: ", latitude);
        console.log("Longitude: ", longitude);

        setLongitude(longitude);
        setLatitude(latitude);
      },
      (err) => console.log("====== ERROR: ", err.message),
      {
        enableHighAccuracy: false,
        maximumAge: 30000,
        timeout: 20000,
      }
    );
  }, [form]);

  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    const parkingBody = {
      capacity: Number(data.capacity),
      freePlaces: Number(data.freePlaces),
      type: data.type,
      pricePerHour: Number(data.pricePerHour),
      pricePerDay: Number(data.pricePerDay) || 0,
      pricePerWeek: Number(data.pricePerWeek) || 0,
    };

    const parkingResponse = await fetch(`${BASE_URL}/parkings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parkingBody),
    });

    const parkingResult = await parkingResponse.json();

    if (!parkingResponse.ok) {
      console.error("Error creating parking:", parkingResult.error);
      throw new Error("Error creating parking: ", parkingResult.error);
    }

    const addressBody = {
      city: data.city,
      street: data.street,
      longitude: myLongitude,
      latitude: myLatitude,
      parkingDto: parkingResult,
    };

    const addressResponse = await fetch(`${BASE_URL}/addresses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addressBody),
    });

    const addressResult = await addressResponse.json();

    if (!addressResponse.ok) {
      console.error("Error creating address:", addressResult.error);
      throw new Error("Error creating address: ", addressResult.error);
    }

    console.log("Created address:", addressResult);
    console.log("Created parking:", parkingResult);
  };

  return (
    <div className="flex flex-col w-full gap-5">
      <Form {...form}>
        <form
          className="flex flex-col gap-6 w-full"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <h3 className="text-xl text-slate-800 font-semibold">
            Generals Informations
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-2 text-slate-500">
                    Type <Asterisk color="red" size={12} />{" "}
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PUBLIC">Public</SelectItem>
                        <SelectItem value="PRIVATE">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-2 text-slate-500">
                    Capacity <Asterisk color="red" size={12} />{" "}
                  </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="eg: 100" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="freePlaces"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-2 text-slate-500">
                    Free places <Asterisk color="red" size={12} />{" "}
                  </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="eg: 100" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="pricePerHour"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-2 text-slate-500">
                    Price per hour <Asterisk color="red" size={12} />{" "}
                  </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="eg: 100" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pricePerDay"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-2 text-slate-500">
                    Price per day{" "}
                    {/* <Asterisk color="red" size={12} />{" "} */}
                  </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="eg: 100" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pricePerWeek"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-2 text-slate-500">
                    Price per week{" "}
                    {/* <Asterisk color="red" size={12} />{" "} */}
                  </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="eg: 100" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <h3 className="text-xl text-slate-800 font-semibold">
            Location Informations
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-2 text-slate-500">
                    City <Asterisk color="red" size={12} />{" "}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="eg: Rabat" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex space-x-2 text-slate-500">
                    Street <Asterisk color="red" size={12} />{" "}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="eg: 15 Rue Abdallah" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <p className="flex items-center text-sm text-slate-500">
            <Asterisk color="red" size={12} /> required field
          </p>
          <Button
            type="submit"
            className="w-[175px]"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader color="white" />
            ) : (
              <Plus color="white" />
            )}{" "}
            <span>Create parking</span>
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateParkingForm;
