'use client'
import { Faculty, columns as baseColumns } from "./columns"
import { DataTable } from "./data-table"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"
import { Row } from "@tanstack/react-table"
import { useRouter } from "next/navigation" // Import useRouter for navigation
import Link from "next/link"

// Function to fetch faculty data from the API
async function fetchFaculties(): Promise<Faculty[]> {
  const res = await fetch("/api/faculty")
  if (!res.ok) {
    throw new Error("Failed to fetch faculty data")
  }
  return res.json()
}

export default function DemoPage() {
  const [data, setData] = useState<Faculty[]>([])
  const router = useRouter() // Initialize router

  // Fetch data on component mount
  useEffect(() => {
    const getData = async () => {
      try {
        const faculties = await fetchFaculties()
        setData(faculties)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    getData()
  }, [])

  // Delete handler
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/faculty?id=${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete faculty")
      const updatedFaculties = await fetchFaculties()
      setData(updatedFaculties)
    } catch (error) {
      console.error("Error deleting faculty:", error)
    }
  }

  // Define columns with action buttons
  const columns = [
    ...baseColumns,
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: { row: Row<Faculty> }) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/faculty/${row.original.id}`)} // Navigate to edit page
          >
            Edit
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleDelete(row.original.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Faculty Directory</h1>
      <DataTable columns={columns} data={data} />
      <Link href="/faculty/add" className={buttonVariants({ variant: "default" })}>Add Faculty</Link>
    </div>
  )
}
