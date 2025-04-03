'use client';

// import Link from 'next/link';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  // PaginationNext,
  // PaginationPrevious,
} from "@/components/ui/pagination";
import {
  LucideChevronsLeft,
  LucideChevronsRight,
} from "lucide-react";

import { usePathname, useSearchParams } from 'next/navigation';

export default function KeepPagination({
  totalPages,
  pagesCount,
}: {
  totalPages: number;
  pagesCount: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const pageGroup = pagesCount * 2 + 1;

  const startPage = totalPages >= pageGroup && currentPage - pagesCount > 0 
      ? (currentPage - pagesCount) - 
          (
            pageGroup < totalPages && currentPage + pagesCount > totalPages 
              ? currentPage + pagesCount - totalPages 
              : 0
          )
      : 1;

  const endPage = totalPages >= pageGroup && currentPage + pagesCount < totalPages 
      ? (currentPage + pagesCount) + 
          (
            pageGroup < totalPages && pagesCount - currentPage >= 0 
            ? pagesCount - currentPage + 1 
            : 0
          )
      : totalPages;

  const pages = [];
  for ( let i = startPage; i <= endPage; i++ ) {
    pages.push(i);
  }

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return(
    <Pagination>
      <PaginationContent>

        {(startPage > 1) && 
            <>
              <PaginationItem>
                <PaginationLink 
                  href={createPageURL(1)}
                  size="default"
                  className="sm:has-[>svg]:pr-5"
                >
                  <LucideChevronsLeft />
                  <span className="hidden sm:block">{1}</span>
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </>
        }

        {
          pages.map((page) => {
            return (
              <PaginationItem key={page}>
                <PaginationLink 
                  href={createPageURL(page)}
                  isActive={page === currentPage}
                  size="default"
                  className="px-3"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          })
        }

        {(endPage < totalPages) && 
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink 
                href={createPageURL(totalPages)}
                size="default"
                className="sm:has-[>svg]:pl-5"
              >
                <span className="hidden sm:block">{totalPages}</span>
                <LucideChevronsRight />
              </PaginationLink>
            </PaginationItem>
          </>
        }

      </PaginationContent>
    </Pagination>
  );
}
