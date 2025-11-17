'use client';
import React, { useEffect, useState } from 'react';

interface HallOfFameMember {
  id: string;
  name: string;
  title?: string;
  imageUrl?: string;
  year?: string;
}

const hallOfFameMembers: HallOfFameMember[] = [
  { id: "1", name: "Dr. Ada Nkem", title: "Pioneer of Quantum Computing Research", year: "2020" },
  { id: "2", name: "Engr. Michael Adebayo", title: "Founder, Nova Robotics", year: "2019" },
  { id: "3", name: "Prof. Chioma Eze", title: "Renowned AI Ethicist", year: "2021" },
  { id: "4", name: "Dr. Tunde Balogun", title: "Cybersecurity Visionary", year: "2018" },
  { id: "5", name: "Engr. Ifeoma Okoro", title: "Software Architect, Stellar Systems", year: "2022" },
  { id: "6", name: "Dr. Emmanuel Ojo", title: "Data Science Innovator", year: "2017" },
  { id: "7", name: "Mrs. Grace Umeh", title: "Humanitarian and Tech Advocate", year: "2023" },
  { id: "8", name: "Mr. Chidi Anozie", title: "IoT Systems Engineer", year: "2016" },
  { id: "9", name: "Dr. Mariam Sule", title: "Astrophysicist and Educator", year: "2024" },
  { id: "10", name: "Engr. Obinna Nwosu", title: "Blockchain Innovator", year: "2025" },
];

export default function HallOfFame() {
  const [isOpen, setIsOpen] = useState(false);
  const [members, setMembers] = useState<HallOfFameMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch('/api/hall-of-fame');
        const data = await res.json();
        setMembers(data);
      } catch (error) {
        console.error('Error fetching Hall of Fame:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  return (
      // {/* LEFT GATE */}
    <>
      <div
        className={`absolute bottom-0 left-0 w-1/2 h-[75vh] transition-transform duration-[2000ms] ease-in-out cursor-pointer z-20 ${
          isOpen ? '-translate-x-[75%]' : 'translate-x-0'
        }`}
        onClick={() => setIsOpen(true)}
      >
        <img src="gate-transparent.png" alt="gate left" className="w-full h-full" />
      </div>

      {/* RIGHT GATE */}
      <div
        className={`absolute bottom-0 right-0 w-1/2 h-[75vh]  transition-transform duration-[2000ms] ease-in-out cursor-pointer z-20 ${
          isOpen ? 'translate-x-[75%]' : 'translate-x-0'
        }`}
        onClick={() => setIsOpen(true)}
      >
        <img src="gate-transparent.png" alt="gate right" className="w-full h-full [transform:rotateY(180deg)]" />
      </div>

      {/* WHITE PAPER (scaling animation) */}
      <div
        className={`min-w-[80%] mx-auto h-[90%] relative z-10 transition-all duration-[1500ms] ease-in-out transform origin-center ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
        style={{
          backgroundImage: "url('/scroll.png')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h1 className="text-5xl font-bold text-center text-yellow-900 py-12 underline">
          HALL OF FAME
        </h1>

        <div className="flex flex-col items-center overflow-y-auto h-[calc(100vh-200px)]">
          {members?.map((member) => (
            <div
              key={member.id}
              className="flex flex-col items-center space-y-2 p-4 text-black w-full"
            >
              <p className="text-2xl font-semibold">{member.name}</p>
              {member.title && <p className="text-lg text-gray-600">{member.title}</p>}
              {member.year && <p className="text-sm text-yellow-600">{member.year}</p>}
            </div>
          ))}
        </div>
      </div>    
    </>
  );
}
