"use client";
import Link from "next/link";


export function EntrySection({ title, to }: { title: string; to: string }) {

  return (
    <Link href={to} className="">
      <div
        className="w-full bg-white rounded-md shadow mb-4 flex justify-between items-center p-4"
      >
        <span className="text-lg font-semibold">{title}</span>
        <span className="text-sm">{ ">"}</span>
      </div>
    </Link>
  );
}
