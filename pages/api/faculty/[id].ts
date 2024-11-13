import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma"; // Assuming you have a prisma instance in /lib/prisma.ts

// Handler for getting and updating faculty based on ID
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  // Validate the ID
  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid ID" });
  }

  switch (method) {
    // GET: Fetch faculty by ID
    case "GET":
      try {
        const faculty = await prisma.faculty.findUnique({
          where: {
            id: parseInt(id),
          },
        });

        if (!faculty) {
          return res.status(404).json({ error: "Faculty not found" });
        }

        return res.status(200).json(faculty);
      } catch (error) {
        return res.status(500).json({ error: "Failed to fetch faculty" });
      }

    // PUT: Update faculty by ID
    case "PUT":
      try {
        const updatedFaculty = await prisma.faculty.update({
          where: {
            id: parseInt(id),
          },
          data: req.body, // Update with the data provided in the request body
        });

        return res.status(200).json(updatedFaculty);
      } catch (error) {
        return res.status(500).json({ error: "Failed to update faculty" });
      }

    // Method Not Allowed
    default:
      return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}
