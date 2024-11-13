import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma"; // Import Prisma client instance

// GET: Fetch all alumni
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  // const data = req.body;

  // // Validate that data is an object and not null
  // if (!data || typeof data !== 'object') {
  //   return res.status(400).json({ error: "Invalid payload" });
  // }
  

  if (method === "GET") {
    try {
      const alum = await prisma.alumni.findMany();
      res.status(200).json(alum);
    } catch (error) {
      console.error("Error fetching alum:", error);
      res.status(500).json({ message: "Error fetching alum." });
    }
  }

  // POST: Create new alumni
  else if (method === "POST") {
    const { name,  department,graduationYear, phone, email } = req.body;
    try {
      const newAlum = await prisma.alumni.create({
        data: {
          name,
          department,
          graduationYear,
          phone,
          email,
        },
      });
      res.status(201).json(newAlum);
    } catch (error) {
      console.error("Error adding alum:", error);
      res.status(500).json({ message: "Error adding alum." });
    }
  }

  // PUT: Update an existing alumni
  else if (method === "PUT") {
    const { id, name, graduationYear, department, email, phone } = req.body;
    try {
      const updatedAlum = await prisma.alumni.update({
        where: { id },
        data: {
          name,
          graduationYear,
          department,
          email,
          phone,
        },
      });
      res.status(200).json(updatedAlum);
    } catch (error) {
      console.error("Error updating alum:", error);
      res.status(500).json({ message: "Error updating alum." });
    }
  }

  // DELETE: Delete an alumni by ID
  else if (method === "DELETE") {
    const { id } = req.query;
    try {
      const deletedAlum = await prisma.alumni.delete({
        where: { id: Number(id) },
      });
      res.status(200).json(deletedAlum);
    } catch (error) {
      console.error("Error deleting alum:", error);
      res.status(500).json({ message: "Error deleting alum." });
    }
  }

  // Method not allowed
  else {
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
