"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Zod validation schema for alumni
const formSchema = z.object({
  name: z.string().min(2),
  department: z.string().min(2),
  graduationYear: z.number(),
  phone: z.string().max(10),
  email: z.string().email(),
});

type FormData = z.infer<typeof formSchema>;

interface Alumni {
  id: number;
  name: string;
  department: string;
  graduationYear: number;
  phone: string;
  email: string;
}

// Update the component to accept `params` directly for dynamic routes
export default function AlumniPage({ params }: { params: { id: number } }) {
  const router = useRouter();
  const [alumni, setAlumni] = useState<Alumni | null>(null);
  const [editing, setEditing] = useState<Alumni | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      department: "",
      graduationYear: 1234,
      phone: "",
      email: "",
    },
  });

  // Use the id from params to fetch a specific alumni
  const id = params.id;

  // Fetch a specific alumni by ID when it's available
  useEffect(() => {
    if (id) {
      fetchAlumniById(id);
    }
  }, [id]);

  const fetchAlumniById = async (alumniId: number) => {
    const res = await fetch(`/api/alumni/${alumniId}`);
    if (res.ok) {
      const data = await res.json();
      setAlumni(data);

      // Pre-fill the form with the alumni's data for editing
      if (data) {
        form.setValue("name", data.name);
        form.setValue("department", data.department);
        form.setValue("graduationYear", data.graduationYear);
        form.setValue("phone", data.phone);
        form.setValue("email", data.email);
        setEditing(data); // Mark as editing
      }
    } else {
      // Handle error if alumni is not found
      console.error("Alumni not found");
    }
  };

  const onSubmit = async (data: FormData) => {
    const method = editing ? "PUT" : "POST";
    const endpoint = editing ? `/api/alumni/${editing.id}` : "/api/alumni";
    
    await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, id: editing?.id }), // Include id for updates
    });

    setEditing(null); // Reset editing state after submission
    form.reset(); // Reset the form fields
    setAlumni(null); // Reset the alumni data to not show any other record
    router.push("/alumni");  
  };

  const handleEdit = (alumni: Alumni) => {
    setEditing(alumni); // Set the alumni to be edited
    form.setValue("name", alumni.name);
    form.setValue("department", alumni.department);
    form.setValue("graduationYear", alumni.graduationYear);
    form.setValue("phone", alumni.phone);
    form.setValue("email", alumni.email);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">{alumni ? `Editing Alumni: ${alumni.name}` : "No Alumni Selected"}</h1>

      {/* Render the form for the specific alumni */}
      {alumni && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-bold mb-4">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Alumni Name" {...field} />
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
                  <FormLabel className="text-lg font-bold mb-4">Department</FormLabel>
                  <FormControl>
                    <Input placeholder="Department Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
            control={form.control}
            name="graduationYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-bold mb-4">Graduation Year</FormLabel>
                <FormControl>
                  <Input
                    type="number" // Set input type to "number" for graduationYear
                    placeholder="Graduation Year"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value, 10))} // Convert string input to number
                  />
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
                  <FormLabel className="text-lg font-bold mb-4">Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone Number" {...field} />
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
                  <FormLabel className="text-lg font-bold mb-4">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">{editing ? "Update Alumni" : "Add Alumni"}</Button>
          </form>
        </Form>
      )}
    </div>
  );
}
