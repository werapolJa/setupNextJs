import DataTable from "@/components/table";
import axios from "axios";
import { useEffect, useState } from "react";

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

export default function Home() {
  const [pet, setPet] = useState<Pet[]>([]);
  useEffect(() => {
    DataPet();
  }, []);

  const DataPet = async () => {
    try {
      const res = await axios.get("/api/pet");
      const data = res.data;
      setPet(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-52  ">
      <div className="text-2xl text-red-700">werapol</div>
      <div className="w-full ">
        <DataTable pet={pet} />
      </div>
    </div>
  );
}
