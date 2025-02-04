import connectionPool from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

// Define Pet type
type Pet = {
  pet_id: number;
  pettype_id: number;
  pet_name: string;
  experience: "0-2" | "3-5" | "5+"; // Assuming experience is one of these values
  breed: string;
  pet_sex: "M" | "F";
  age: number;
  color: string;
  weight: number;
  about?: string;
  create_at: string;
  update_at: string;
};

type Data = {
  data?: Pet[]; // Update the response type to reflect Pet data
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    try {
      // Query to fetch pet data
      const result = await connectionPool.query('SELECT * FROM pet');
      
      // Send the data as a response
      res.status(200).json({ data: result.rows });
    } catch (error) {
      console.error("Error fetching pet data:", error);
      res.status(500).json({ data: [] }); // Send empty array if there's an error
    }
  } else {
    // Return an error if the request method is not GET
    res.status(405).json({ data: [] });
  }
}
