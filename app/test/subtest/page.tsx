"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Define the form schema using Zod
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
    department: z.string().min(2),
    phone: z.string().max(10).regex(/^[0-9]+$/, { message: "Phone number can only contain digits." }),
    email: z.string().email({ message: "Invalid email address." }),
    researchArea: z.string().min(0).max(500),
});

// Define the type for form data
type FormData = z.infer<typeof formSchema>;

export default function subtest() {
  // Initialize the form with react-hook-form and zodResolver
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        username: "",
        department: "",
        phone: "",
        email: "",
        researchArea: "",
    },
  });

  // Define the onSubmit function
  const onSubmit = (data: FormData) => {
    console.log("Form submitted successfully:", data);
    // Additional actions on form submission can go here
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="atif akhtar" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
              />
          <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <FormControl>
                <Input placeholder="Information Technology" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
              />
              
              <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="+91 00000 12345" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
              />
              
              <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="@gamil.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
              />
              
              <FormField
          control={form.control}
          name="researchArea"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Research Area</FormLabel>
              <FormControl>
                <Input placeholder=" " {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
