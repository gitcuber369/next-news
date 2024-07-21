/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import { StoriesProps } from "@/lib/types";
import { PaginationProps } from "@/lib/types";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import SkeletonLoading from "@/components/skeleton/skeleton-card";

export default function TopStories() {
  const [newStories, setNewStories] = useState<StoriesProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [filteredStories, setFilteredStories] = useState<StoriesProps[]>([]);
  const storiesPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(
        "https://hacker-news.firebaseio.com/v0/newstories.json"
      );
      const storyIds: number[] = await response.json();
      const storyPromises = storyIds.slice(0, 50).map(async (id) => {
        const storyRes = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        );
        return storyRes.json();
      });

      const newStories: StoriesProps[] = await Promise.all(storyPromises);
      setNewStories(newStories);
      setFilteredStories(newStories);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const result = newStories.filter((story) =>
      story.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredStories(result);
    setCurrentPage(1);
  }, [search, newStories]);

  // Get stories for the current page
  const lastStoryIndex = currentPage * storiesPerPage;
  const firstStoryIndex = lastStoryIndex - storiesPerPage;
  const currentStories = filteredStories.slice(firstStoryIndex, lastStoryIndex);

  // Change the page number
  const changePage = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div>
        <SkeletonLoading />
      </div>
    );
  }

  return (
    <div className="container mx-auto min-w-8 p-4">
      <div className="py-3">
        <h1 className="text-3xl font-bold flex justify-center pb-4">
          New <span className="text-[#423D8A]">Stories</span>
        </h1>
        <div className="flex justify-center">
          <Input
            type="text"
            placeholder="Search stories"
            className="w-3/5"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <ul className="space-y-4 list-none">
        {currentStories.map((story) => (
          <li key={story.id} className="pb-2 list-none">
            <Card className="mx-auto px-4 py-2 sm:px-6 sm:py-4 lg:px-8 lg:py-6 hover:shadow-lg">
              <a
                href={story.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#423D8A] font-bold text-xl w-full hover:border-b hover:border-[#423D8A]"
              >
                {story.title}
              </a>
              <p className="text-gray-600">
                <Badge variant={"secondary"}>{story.by}</Badge> |{" "}
                <Badge variant={"secondary"}>{story.score} points</Badge> |{" "}
                <Badge variant={"secondary"}>
                  {story.descendants} comments
                </Badge>
              </p>
            </Card>
          </li>
        ))}
      </ul>
      <PaginationSelect
        totalStories={filteredStories.length}
        storiesPerPage={storiesPerPage}
        currentPage={currentPage}
        onPageChange={changePage}
      />
    </div>
  );
}

function PaginationSelect({
  totalStories,
  storiesPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalStories / storiesPerPage); i++) {
    pages.push(i);
  }

  const handleNextPage = () => {
    if (currentPage < pages.length) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrePage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <Pagination className="list-none cursor-pointer mt-2 flex justify-center gap-2">
      <PaginationItem>
        <PaginationPrevious onClick={() => handlePrePage()}>
          Previous
        </PaginationPrevious>
      </PaginationItem>
      {pages.map((page) => (
        <PaginationItem key={page}>
          <PaginationLink
            className={`${
              currentPage === page ? "bg-[#423D8A] text-white " : ""
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem>
        <PaginationNext onClick={() => handleNextPage()}>Next</PaginationNext>
      </PaginationItem>
    </Pagination>
  );
}
