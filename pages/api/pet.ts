
import type { NextApiRequest, NextApiResponse } from "next";
import connectionPool from "@/utils/db";

type Pet = {
  pet_id: number;
  pettype_id: number;
  pet_name: string;
  experience: "0-2" | "3-5" | "5+";
  breed: string;
  pet_sex: "M" | "F";
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
  res: NextApiResponse<Pet[] | { message: string }>
) {
  if (req.method === "GET") {
    try {
      // Query to fetch all pets
      const result = await connectionPool.query(
        "select pet_id, pettype_id ,pet_name, breed,pet_sex,age,color,weight,about,create_at,update_at FROM pet"
      );
      const pets = result.rows;

      res.status(200).json(pets);
    } catch (error) {
      console.error("Error fetching pets:", error);
      res.status(500).json({ message: "Failed to fetch pets" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
