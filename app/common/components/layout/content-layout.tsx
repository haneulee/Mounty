import { Card, CardContent, CardHeader } from "~/common/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/common/components/ui/dropdown-menu";

import { Button } from "~/common/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Hero } from "~/common/components/hero";
import { Input } from "~/common/components/ui/input";
import { Link } from "react-router";
import { Particles } from "../ui/particles";
import { Search } from "lucide-react";

interface FilterOption {
  label: string;
  value: string;
}

interface SidebarFilter {
  title: string;
  options: FilterOption[];
  type: "link" | "tag";
}

interface ContentLayoutProps {
  title: string;
  subtitle?: string;
  searchPlaceholder: string;
  addButtonText: string;
  addButtonLink: string;
  sortOptions: FilterOption[];
  periodOptions?: FilterOption[];
  sidebarFilters: SidebarFilter[];
  children: React.ReactNode;
  onSearch: (value: string) => void;
  onSort: (value: string) => void;
  onPeriodChange?: (value: string) => void;
  currentSort: string;
  currentPeriod?: string;
  searchValue: string;
}

export function ContentLayout({
  title,
  subtitle,
  searchPlaceholder,
  addButtonText,
  addButtonLink,
  sortOptions,
  periodOptions,
  sidebarFilters,
  children,
  onSearch,
  onSort,
  onPeriodChange,
  currentSort,
  currentPeriod,
  searchValue,
}: ContentLayoutProps) {
  return (
    <div className="min-h-screen">
      <Particles className="opacity-30" />
      <Hero title={title} subtitle={subtitle} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div
          className={`flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 ${
            sidebarFilters.length === 0 ? "lg:justify-center" : ""
          }`}
        >
          <div
            className={`flex-grow ${
              sidebarFilters.length === 0 ? "max-w-4xl" : ""
            }`}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold">
                {title}
              </h1>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto h-9 sm:h-10 text-sm sm:text-base"
                    >
                      Sort by: {currentSort}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {sortOptions.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        onClick={() => onSort(option.value)}
                      >
                        {option.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {periodOptions && currentPeriod && onPeriodChange && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto h-9 sm:h-10 text-sm sm:text-base"
                      >
                        Period: {currentPeriod}
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {periodOptions.map((option) => (
                        <DropdownMenuItem
                          key={option.value}
                          onClick={() => onPeriodChange(option.value)}
                        >
                          {option.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={searchPlaceholder}
                  className="pl-9 w-full h-9 sm:h-10 text-sm sm:text-base"
                  value={searchValue}
                  onChange={(e) => onSearch(e.target.value)}
                />
              </div>
              <Button
                asChild
                className="w-full sm:w-auto h-9 sm:h-10 text-sm sm:text-base"
              >
                <Link to={addButtonLink}>{addButtonText}</Link>
              </Button>
            </div>

            {children}
          </div>

          {sidebarFilters.length > 0 && (
            <div className="w-full lg:w-64 space-y-4 sm:space-y-6">
              {sidebarFilters.map((filter) => (
                <Card key={filter.title}>
                  <CardHeader className="p-3 sm:p-4">
                    <h2 className="text-base sm:text-lg font-semibold">
                      {filter.title}
                    </h2>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4">
                    {filter.type === "link" ? (
                      <div className="space-y-1 sm:space-y-2">
                        {filter.options.map((option) => (
                          <Link
                            key={option.value}
                            to={`?${filter.title.toLowerCase()}=${
                              option.value
                            }`}
                            className="block text-xs sm:text-sm text-muted-foreground hover:text-primary capitalize"
                          >
                            {option.label}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {filter.options.map((option) => (
                          <Link
                            key={option.value}
                            to={`?tag=${option.value}`}
                            className="text-xs sm:text-sm text-muted-foreground hover:text-primary"
                          >
                            #{option.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
