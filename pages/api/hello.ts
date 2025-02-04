import connectionPool from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

type Pet = {
  user_id: number;
  full_name: string;
  phone: string;
  id_number?: string;
  image?: string;
  birthdate?: string;
  status: string;
  create_at: string;
  update_at: string;
};

type Data = {
  data?: Pet[];
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    try {
      const result = await connectionPool.query("select * from pet");
      res.status(200).json({ data: result.rows });
    } catch (error) {
      console.error("Error fetching pets:", error);
      res.status(500).json({ error: "Failed to fetch pets" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
