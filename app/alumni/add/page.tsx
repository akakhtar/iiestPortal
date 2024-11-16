'use client'
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

// Zod validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name should have at least 2 characters"),
  department: z.string().min(2, "Department should have at least 2 characters"),
    graduationYear: z.number().min(1900).max(new Date().getFullYear()),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  email: z.string().email("Please enter a valid email address"),
})

type FormData = z.infer<typeof formSchema>

interface Alumni {
  id: number
  name: string
  department: string
  graduationYear: number
  phone: string
  email: string
}

export default function AlumniPage() {
  const router = useRouter()
  const [alumniList, setAlumniList] = useState<Alumni[]>([])
  const [editing, setEditing] = useState<Alumni | null>(null)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      department: "",
      graduationYear: 0,
      phone: "",
      email: "",
    },
  })

  useEffect(() => {
    fetchAlumni()
  }, [])

  const fetchAlumni = async () => {
    try {
      const res = await fetch("/api/alumni", { method: "GET" });
      if (!res.ok) throw new Error(`Failed to fetch alumni data: ${res.statusText}`);
      const data = await res.json();
      setAlumniList(data);
    } catch (error) {
      console.error("Error fetching alumni data:", error);
    }
  };
  

  const onSubmit = async (data: FormData) => {
      const method = editing ? "PUT" : "POST";
      const endpoint = "/api/alumni";
    
      try {
        console.log("Data before sending:", data); 
      const res = await fetch("/api/alumni", {
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Failed to submit alumni data")

      fetchAlumni()  // Refresh the list to show the updated data
      setEditing(null)
      form.reset()
      router.push("/alumni")  // Optional: redirect to another page if needed
    } catch (error) {
      console.error("Error submitting data:", error)
    }
  }

  const handleEdit = (alumni: Alumni) => {
    setEditing(alumni)
    form.setValue("name", alumni.name)
    form.setValue("department", alumni.department)
    form.setValue("graduationYear", alumni.graduationYear)
    form.setValue("phone", alumni.phone)
    form.setValue("email", alumni.email)
  }

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/alumni?id=${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete alumni")
      fetchAlumni()  // Re-fetch the list after deletion
    } catch (error) {
      console.error("Error deleting alumni:", error)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Alumni Information</h1>

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
          <Button type="submit" className="mt-4 bg-emerald-600 hover:bg-emerald-500">{editing ? "Update Alumni" : "Add Alumni"}</Button>
        </form>
      </Form>
    </div>
  )
}
