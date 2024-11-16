"use client"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Zod validation schema
const formSchema = z.object({
  name: z.string().min(2),
  department: z.string().min(2),
  phone: z.string().max(10),
  email: z.string().email(),
  researchArea: z.string().max(500),
});

type FormData = z.infer<typeof formSchema>;

interface Faculty {
  id: number;
  name: string;
  department: string;
  phone: string;
  email: string;
  researchArea: string;
}

export default function FacultyPage() {
    const router = useRouter();
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [editing, setEditing] = useState<Faculty | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      department: "",
      phone: "",
      email: "",
      researchArea: "",
    },
  });

  useEffect(() => {
    fetchFaculties();
  }, []);

  const fetchFaculties = async () => {
    const res = await fetch("/api/faculty");
    const data = await res.json();
    setFaculties(data);
    };

  const onSubmit = async (data: FormData) => {
    const method = editing ? "PUT" : "POST";
    const endpoint = editing ? `/api/faculty` : "/api/faculty";
    
    await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, id: editing?.id }),
    });

    setEditing(null);
      form.reset();
      router.push("/faculty");  
  };

  const handleEdit = (faculty: Faculty) => {
    setEditing(faculty);
    form.setValue("name", faculty.name);
    form.setValue("department", faculty.department);
    form.setValue("phone", faculty.phone);
    form.setValue("email", faculty.email);
    form.setValue("researchArea", faculty.researchArea);
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/faculty?id=${id}`, { method: "DELETE" });
    fetchFaculties(); // Re-fetch the list after deletion
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Faculty Information</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-bold mb-4">Name</FormLabel>
                <FormControl>
                  <Input placeholder="Faculty Name" {...field} />
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
                <FormControl >
                  <Input placeholder="Department Name" {...field} />
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
          <FormField
            control={form.control}
            name="researchArea"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-bold mb-4">Research Area</FormLabel>
                <FormControl>
                  <Input placeholder="Research Area" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-4 bg-emerald-600 hover:bg-emerald-500">{editing ? "Update Faculty" : "Add Faculty"}</Button>
        </form>
      </Form>
    </div>
  );
}
