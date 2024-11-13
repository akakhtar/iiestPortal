import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma"; // Import Prisma client instance

// GET: Fetch all faculties
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  // GET: Fetch all faculties
  if (method === "GET") {
    try {
      const faculties = await prisma.faculty.findMany();
      res.status(200).json(faculties);
    } catch (error) {
      res.status(500).json({ message: "Error fetching faculties." });
    }
  }

  // POST: Create new faculty
  if (method === "POST") {
    const { name, department, phone, email, researchArea } = req.body;
    try {
      const newFaculty = await prisma.faculty.create({
        data: {
          name,
          department,
          phone,
          email,
          researchArea,
        },
      });
      res.status(201).json(newFaculty);
    } catch (error) {
      res.status(500).json({ message: "Error adding faculty." });
    }
  }

  // PUT: Update an existing faculty
  if (method === "PUT") {
    const { id, name, department, phone, email, researchArea } = req.body;
    try {
      const updatedFaculty = await prisma.faculty.update({
        where: { id },
        data: {
          name,
          department,
          phone,
          email,
          researchArea,
        },
      });
      res.status(200).json(updatedFaculty);
    } catch (error) {
      res.status(500).json({ message: "Error updating faculty." });
    }
  }

  // DELETE: Delete a faculty by ID
  if (method === "DELETE") {
    const { id } = req.query;
    try {
      const deletedFaculty = await prisma.faculty.delete({
        where: { id: Number(id) },
      });
      res.status(200).json(deletedFaculty);
    } catch (error) {
      res.status(500).json({ message: "Error deleting faculty." });
    }
  }
}
