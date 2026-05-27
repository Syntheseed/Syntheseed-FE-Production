import React from "react";

const CareerView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 my-10">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        Software Engineer – Backend
      </h2>

      <div className="text-gray-600 mb-4">
        <p><strong>Department:</strong> Engineering</p>
        <p><strong>Location:</strong> Bengaluru, India</p>
        <p><strong>Work Mode:</strong> Remote</p>
        <p><strong>Job Type:</strong> Full-time</p>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-2">Description</h3>
      <p className="text-gray-700">
        We are seeking a passionate and detail-oriented <strong>Backend Software Engineer</strong> to join our dynamic engineering team. The ideal candidate will design, develop, and maintain scalable backend services, ensuring high performance and responsiveness. You will collaborate with cross-functional teams to deliver robust APIs and contribute to system architecture discussions.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2">Details</h3>
      <p className="text-gray-700">
        As a Backend Software Engineer, you will build efficient APIs, optimize database interactions, and ensure system reliability. Work with modern tech, participate in design discussions and solve real-world engineering challenges.
      </p>

      <h4 className="text-lg font-semibold mt-6">Key Responsibilities</h4>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        <li>Develop and maintain backend APIs using Django REST Framework.</li>
        <li>Design scalable database schemas and ensure efficient queries.</li>
        <li>Implement auth, validation and collaborate with frontend teams.</li>
        <li>Participate in code reviews and CI/CD activities.</li>
      </ul>

      <h4 className="text-lg font-semibold mt-6">Qualifications</h4>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        <li>Bachelor’s degree or equivalent experience.</li>
        <li>2–4 years backend development (Python/Django preferred).</li>
        <li>Experience with PostgreSQL, Docker, Git, AWS/Azure.</li>
      </ul>

      <div className="mt-6">
        <p><strong>Perks & Benefits:</strong> Remote-first, learning budget, health insurance.</p>
        <p className="text-gray-600 mt-2"><strong>Tags:</strong> Python, Django, REST API, PostgreSQL, Docker, AWS, Remote, Full-time</p>
        <p className="text-gray-600"><strong>Posted on:</strong> October 31, 2025</p>
      </div>
    </div>
  );
};

export default CareerView;
