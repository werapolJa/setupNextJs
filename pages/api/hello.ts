// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import connectionPool from "@/utils/db";

// Define the Pet type based on your table structure
type Pet = {
  pet_id: number;
  pettype_id: number;
  pet_name: string;
  experience: '0-2' | '3-5' | '5+'; // Assuming experience is one of these values
  breed: string;
  sex: 'M' | 'F';
  age: number;
  color: string;
  weight: number;
  about?: string;
  create_at: string;
  update_at: string;
};

// Update the response type to an array of Pet objects
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Pet[] | { message: string }> // Response can now be an array of Pet or error message
) {
  if (req.method === "GET") {
    try {
      // Query to fetch all pets
      const result = await connectionPool.query("SELECT * FROM pet");
      const pets = result.rows; // Get rows from the result

      // Return the pets data as JSON
      res.status(200).json(pets);
    } catch (error) {
      console.error("Error fetching pets:", error);
      res.status(500).json({ message: "Failed to fetch pets" });
    }
  } else {
    // Handle unsupported HTTP methods (e.g., POST, PUT, DELETE)
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
