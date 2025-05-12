import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react'; // Optional: for 3-dot icon
import Navbar from './shared/Navbar';

const resumeTemplates = [
  { title: "ATS Optimized Resume - Software Engineer", file: "/resumes/res1.pdf" },
  { title: "ATS Friendly Resume - Data Analyst", file: "/resumes/res2.pdf" },
  { title: "Clean Resume - UI/UX Designer", file: "/resumes/res3.pdf" },
  { title: "Modern Resume - Product Manager", file: "/resumes/res4.pdf" },
  { title: "Elegant Resume - Backend Developer", file: "/resumes/res5.pdf" },
  { title: "Professional Resume - Marketing Specialist", file: "/resumes/res6.pdf" },
  { title: "Simple Resume - Graphic Designer", file: "/resumes/res7.pdf" },
  { title: "Experienced Resume - Project Manager", file: "/resumes/res8.pdf" },
  { title: "Creative Resume - Content Writer", file: "/resumes/res9.pdf" },
  { title: "Minimal Resume - Software Developer", file: "/resumes/res10.pdf" },
];

const Resumes = () => {
  const [openMenuIndex, setOpenMenuIndex] = useState(null);

  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  return (
   
    <div>
         <Navbar/>
      <h2 className="text-2xl font-bold mb-4 text-gray-800 mt-10">
        Few High ATS Score Resumes
      </h2>

      <table className="w-full text-left border border-gray-200 rounded-xl overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Resume</th>
            <th className="p-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {resumeTemplates.map((template, index) => (
            <tr key={index} className="border-t">
              <td className="p-3">{template.title}</td>
              <td className="p-3 text-right relative">
                <button
                  onClick={() => toggleMenu(index)}
                  className="hover:bg-gray-200 rounded-full p-1"
                >
                  <MoreVertical size={20} />
                </button>
                {openMenuIndex === index && (
                  <div className="absolute right-2 mt-2 bg-white border rounded shadow-md z-10">
                   <a
  href={template.file}
  download={template.title.split(' ').join('-') + '.pdf'} // Ensure a PDF file is downloaded
  className="block px-4 py-2 text-sm hover:bg-gray-100"
>
  Download
</a>

                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Resumes;
