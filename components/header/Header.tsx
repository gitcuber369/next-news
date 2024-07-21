import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import {
  BellPlus,
  BriefcaseBusiness,
  CalendarCheck2,
  Drama,
  PanelBottomOpen,
} from "lucide-react";

function Header() {
  return (
    <div className="border-b-2">
      <nav className="px-4 py-4">
        <div className="container mx-auto flex justify-between">
          <Link href={"/"}>
            <p className="text-3xl font-bold">
              Hacker<span className="text-[#423D8A]">News</span>
            </p>
          </Link>
          <div className="flex gap-5">
            <Button variant={"outline"} className="flex gap-1">
              <PanelBottomOpen className="w-6 h-6" />
              <Link href={"/"} className="w-full">
                Top Stories
              </Link>
            </Button>
            <Button variant={"outline"} className="flex gap-2">
              <BellPlus className="w-4 h-4" />
              <Link href={"/routes/newstories"}>New Stories</Link>
            </Button>
            <Button variant={"outline"} className="flex gap-2">
              <CalendarCheck2 className="w-4 h-4" />
              <Link href={"/routes/askstories"}>Ask Stories</Link>
            </Button>
            <Button variant={"outline"} className="flex gap-2">
              <Drama className="w-4 h-4" />
              <Link href={"/routes/showstories"}>Show Stories</Link>
            </Button>
            <Button variant={"outline"} className="flex gap-2">
              <BriefcaseBusiness className="w-4 h-4" />
              <Link href={"/routes/jobstories"}>Job Stories</Link>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
