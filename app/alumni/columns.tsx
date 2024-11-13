'use client'

import { ColumnDef } from "@tanstack/react-table"

// Define the shape of alumni data
export type Alumni = {
  id: number
  name: string
  graduationYear: number
  department: string
  phone: string
  email: string
}

// Define column configurations for the data table
export const columns: ColumnDef<Alumni>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "graduationYear",
    header: "Graduation Year",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
]
