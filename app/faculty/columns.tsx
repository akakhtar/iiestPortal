"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Faculty = {
  id: number
  name: string
  department: string
  phone: number
  email: string
  researchArea: string
}

export const columns: ColumnDef<Faculty>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "department",
    header:"Department",
  },
  {
    accessorKey: "phone",
    header:"Phone",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "researchArea",
    header: "Research Area",
  },
]
