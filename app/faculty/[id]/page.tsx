"use client";
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

// Update the component to accept `params` directly for dynamic routes
export default function FacultyPage({ params }: { params: { id: number } }) {
  const router = useRouter();
  const [faculty, setFaculty] = useState<Faculty | null>(null);
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

  // Use the id from params to fetch a specific faculty
  const id = params.id;

  // Fetch a specific faculty by ID when it's available
  useEffect(() => {
    if (id) {
      fetchFacultyById(id);
    }
  }, [id]);

  const fetchFacultyById = async (facultyId: number) => {
    const res = await fetch(`/api/faculty/${facultyId}`);
    if (res.ok) {
      const data = await res.json();
      setFaculty(data);

      // Pre-fill the form with the faculty's data for editing
      if (data) {
        form.setValue("name", data.name);
        form.setValue("department", data.department);
        form.setValue("phone", data.phone);
        form.setValue("email", data.email);
        form.setValue("researchArea", data.researchArea);
        setEditing(data); // Mark as editing
      }
    } else {
      // Handle error if faculty is not found
      console.error("Faculty not found");
    }
  };

  const onSubmit = async (data: FormData) => {
    const method = editing ? "PUT" : "POST";
    const endpoint = editing ? `/api/faculty/${editing.id}` : "/api/faculty";
    
    await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, id: editing?.id }), // Include id for updates
    });

    setEditing(null); // Reset editing state after submission
    form.reset(); // Reset the form fields
    setFaculty(null); // Reset the faculty data to not show any other record
    router.push("/faculty");  
  };

  const handleEdit = (faculty: Faculty) => {
    setEditing(faculty); // Set the faculty to be edited
    form.setValue("name", faculty.name);
    form.setValue("department", faculty.department);
    form.setValue("phone", faculty.phone);
    form.setValue("email", faculty.email);
    form.setValue("researchArea", faculty.researchArea);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">{faculty ? `Editing Faculty: ${faculty.name}` : "No Faculty Selected"}</h1>

      {/* Render the form for the specific faculty */}
      {faculty && (
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
                  <FormControl>
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
            <Button type="submit">{editing ? "Update Faculty" : "Add Faculty"}</Button>
          </form>
        </Form>
      )}
    </div>
  );
}
