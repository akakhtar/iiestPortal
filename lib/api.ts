export type Faculty = {
    id: number
    name: string
    department: string
    email: string
    phone: string
    researchArea?: string
}
  
export type Alumni = {
  id: number
  name: string
  graduationYear: number 
  department: string
  phone: string
  email: string
  
}
  
  // Fetch faculty details
  export async function fetchFaculty(id: string): Promise<Faculty> {
    const res = await fetch(`/api/faculty/${id}`)
    if (!res.ok) throw new Error("Failed to fetch faculty data")
    return res.json()
  }
  
  // Update faculty details
  export async function updateFaculty(id: string, data: Partial<Faculty>) {
    const res = await fetch(`/api/faculty/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to update faculty")
    return res.json()
}
  
  // Fetch faculty details
  export async function fetchAlumni(id: string): Promise<Alumni> {
    const res = await fetch(`/api/alumni/${id}`)
    if (!res.ok) throw new Error("Failed to fetch faculty data")
    return res.json()
  }
  
  // Update faculty details
  export async function updateAlumni(id: string, data: Partial<Alumni>) {
    const res = await fetch(`/api/alumni/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to update faculty")
    return res.json()
  }
  