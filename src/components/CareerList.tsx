// src/components/CareerList.tsx
import { Link } from "react-router-dom";
import { useGetCareersQuery } from "../services/careersApi";
import { stripToPlainText } from "../utils/formatText";
import type { Career } from "../types/content";

const CareerList = () => {
  const { data: careers = [], isLoading } = useGetCareersQuery();

  if (isLoading) return <p className="text-secondary text-center mt-10">Loading careers...</p>;

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">Open Positions</h1>
      <div className="grid gap-6">
        {careers.map((career: Career) => (
          <Link
            key={career.id}
            to={`/careers/${career.id}`}
            className="block bg-bg-secondary text-primary border rounded-lg p-6 shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{career.title}</h2>
            <p className="text-secondary mt-2">
              {stripToPlainText(career.short_description || career.description) || "No description available"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CareerList;
