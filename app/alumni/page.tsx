'use client'

import { Alumni, columns as baseColumns } from "./columns"
import { DataTable } from "./data-table"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"
import { Row } from "@tanstack/react-table"
import { useRouter } from "next/navigation"
import Link from "next/link"

// Function to fetch alumni data from the API
async function fetchAlumni(): Promise<Alumni[]> {
  const res = await fetch("/api/alumni")
  if (!res.ok) {
    throw new Error("Failed to fetch alumni data")
  }
  return res.json()
}

export default function DemoPage() {
  const [data, setData] = useState<Alumni[]>([])
  const router = useRouter()

  // Fetch data on component mount
  useEffect(() => {
    const getData = async () => {
      try {
        const alumniData = await fetchAlumni()
        setData(alumniData)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    getData()
  }, [])

  // Delete handler
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/alumni?id=${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete alumni")
      const updatedAlumni = await fetchAlumni()
      setData(updatedAlumni)
    } catch (error) {
      console.error("Error deleting alumni:", error)
    }
  }

  // Define columns with action buttons
  const columns = [
    ...baseColumns,
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: { row: Row<Alumni> }) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-emerald-500 hover:bg-emerald-600 text-slate-100 hover:text-slate-200"
            onClick={() => router.push(`/alumni/${row.original.id}`)}
          >
            Edit
          </Button>
          <Button variant="outline" size="sm" className="bg-red-500 hover:bg-red-700 text-slate-100 hover:text-slate-200" onClick={() => handleDelete(row.original.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Alumni Directory</h1>
      <DataTable columns={columns} data={data} />
      <Link href={"/alumni/add"} className={`${buttonVariants({variant:"default"})} mt-4 bg-emerald-600 hover:bg-emerald-500`}>Add Alum</Link>
    </div>
  )
}
