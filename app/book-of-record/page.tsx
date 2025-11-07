'use client'

import { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, Award, Download } from "lucide-react";
import Link from "next/link";

interface HallOfFameMember {
  id: string;
  name: string;
  title?: string;
  imageUrl?: string;
  year?: string;
  description?: string;
}

export default function Home() {
  const ITEMS_PER_PAGE = 10;
  const [showCover, setShowCover] = useState(true);
  const [members, setMembers] = useState<HallOfFameMember[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

// Fetch data from backend
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await fetch(`/api/first-book-api/appraisal?page=${currentPage}&limit=${ITEMS_PER_PAGE}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to fetch records");

      setMembers(data.data || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("❌ Failed to fetch records:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [currentPage]);


  const handlePrevPage = () => setCurrentPage(prev => Math.max(1, prev - 1));
  const handleNextPage = () => setCurrentPage(prev => Math.min(totalPages, prev + 1));
  const handlePageClick = (page: number) => setCurrentPage(page);

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      {/* Cover Image */}
      <img onClick={() => setShowCover(false)} src="/1st-book.png" alt="first book"  className={`${ showCover ? 'translate-x-0': '-translate-x-full' } transition-transform duration-[700ms] ease-in-out absolute h-full w-full top-0 left-0 z-20`}/>


      {/* Main Content */}
      <div className="relative flex flex-col bg-white shadow-2xl rounded-xl w-full max-w-4xl h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-pes to-pes text-white p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8" />
              <h2 className="text-2xl font-bold">1st Book of Record (Appraisal)</h2>
            </div>
            <div className="text-sm bg-white/20 px-4 py-2 rounded-full">
              Page {currentPage} of {totalPages}
            </div>
          </div>
        </div>

        {/* Members List */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="text-center text-gray-500 py-20">Loading records...</div>
          ) : members.length === 0 ? (
            <div className="text-center text-gray-500 py-20">No records found</div>
          ) : (
            <div className="space-y-3">
              {members.map(member => (
                <Link
                  href={`/reward/badges/${encodeURIComponent(member.name)}`}
                  key={member.id}
                  className="w-full border rounded-lg p-5 transition-all duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-pes transition-colors">
                          {member.name}
                        </h3>
                      </div>
                      <p className="text-gray-600 text-sm">{member.title}</p>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <span className="inline-block bg-white text-pes text-sm font-medium px-3 py-1 rounded-full">
                        <Download />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Pagination Footer */}
        <div className="border-t bg-gray-50 p-4">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="flex items-center gap-2 bg-pes hover:bg-pes disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-lg font-medium shadow-md transition-all duration-200 disabled:shadow-none"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 bg-pes hover:bg-pes disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-lg font-medium shadow-md transition-all duration-200 disabled:shadow-none"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Page Numbers */}
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
                  page === currentPage
                    ? "bg-pes text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-pes border border-gray-300"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
