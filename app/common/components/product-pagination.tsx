import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

import { Link } from "react-router";
import { useSearchParams } from "react-router";

type ProductPaginationProps = {
  totalPages: number;
};

export default function ProductPagination({
  totalPages,
}: ProductPaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const onClick = (page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  };
  return (
    <div>
      <Pagination>
        <PaginationContent>
          {page === 1 ? null : (
            <>
              <PaginationItem>
                <Link
                  to={`?page=${page - 1}`}
                  onClick={(event) => {
                    event.preventDefault();
                    onClick(page - 1);
                  }}
                >
                  <PaginationPrevious />
                </Link>
              </PaginationItem>
              <PaginationItem>
                <Link
                  to={`?page=${page - 1}`}
                  onClick={(event) => {
                    event.preventDefault();
                    onClick(page - 1);
                  }}
                >
                  <PaginationLink>{page - 1}</PaginationLink>
                </Link>
              </PaginationItem>
            </>
          )}
          <PaginationItem>
            <Link
              to={`?page=${page}`}
              onClick={(event) => {
                event.preventDefault();
                onClick(page);
              }}
            >
              <PaginationLink isActive>{page}</PaginationLink>
            </Link>
          </PaginationItem>
          {page === totalPages ? null : (
            <>
              <PaginationItem>
                <Link
                  to={`?page=${page + 1}`}
                  onClick={(event) => {
                    event.preventDefault();
                    onClick(page + 1);
                  }}
                >
                  <PaginationLink>{page + 1}</PaginationLink>
                </Link>
              </PaginationItem>
              {page + 1 === totalPages ? null : (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <Link
                  to={`?page=${page + 1}`}
                  onClick={(event) => {
                    event.preventDefault();
                    onClick(page + 1);
                  }}
                >
                  <PaginationNext />
                </Link>
              </PaginationItem>
            </>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
