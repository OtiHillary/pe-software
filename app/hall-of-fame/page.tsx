// components/HallOfFame.tsx
import React from 'react';
import Image from 'next/image';

interface HallOfFameMember {
  id: string;
  name: string;
  title?: string;
  imageUrl?: string;
  year?: string;
}

interface HallOfFameProps {
  members: HallOfFameMember[];
}
const hallOfFameMembers: HallOfFameMember[] = [
  {
    id: "1",
    name: "Dr. Ada Nkem",
    title: "Pioneer of Quantum Computing Research",
    year: "2020",
  },
  {
    id: "2",
    name: "Engr. Michael Adebayo",
    title: "Founder, Nova Robotics",
    year: "2019",
  },
  {
    id: "3",
    name: "Prof. Chioma Eze",
    title: "Renowned AI Ethicist",
    year: "2021",
  },
  {
    id: "4",
    name: "Dr. Tunde Balogun",
    title: "Cybersecurity Visionary",
    year: "2018",
  },
  {
    id: "5",
    name: "Engr. Ifeoma Okoro",
    title: "Software Architect, Stellar Systems",
    year: "2022",
  },
  {
    id: "6",
    name: "Dr. Emmanuel Ojo",
    title: "Data Science Innovator",
    year: "2017",
  },
  {
    id: "7",
    name: "Mrs. Grace Umeh",
    title: "Humanitarian and Tech Advocate",
    year: "2023",
  },
  {
    id: "8",
    name: "Mr. Chidi Anozie",
    title: "IoT Systems Engineer",
    year: "2016",
  },
  {
    id: "9",
    name: "Dr. Mariam Sule",
    title: "Astrophysicist and Educator",
    year: "2024",
  },
  {
    id: "10",
    name: "Engr. Obinna Nwosu",
    title: "Blockchain Innovator",
    year: "2025",
  },
];

export default function HallOfFame({ members }: HallOfFameProps) {
  return (
    <div className="min-h-screen w-screen bg-yellow-900 py-16 px-4">
        <div className='absolute bottom-0 left-0 w-[50%]'>
            <img src="gate.png" alt="gate1" />
        </div>

        <div className='absolute bottom-0 right-0 w-[50%] rotate-180'>
            <img src="gate.png" alt="gate2" />
        </div>

      <div className="max-w-7xl mx-auto bg-white h-screen">
        <h1 className="text-5xl font-bold text-center text-yellow-500 py-12 underline">
          HALL OF FAME
        </h1>
        
      </div>
    </div>
  );
}