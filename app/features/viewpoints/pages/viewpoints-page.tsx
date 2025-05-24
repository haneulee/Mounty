import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/common/components/ui/dropdown-menu";
import { Form, Link, useSearchParams } from "react-router";

import { Button } from "~/common/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { Hero } from "~/common/components/hero";
import { Input } from "~/common/components/ui/input";
import type { Route } from "~/types";
import { ViewpointCard } from "~/features/viewpoints/components/viewpoint-card";

const SORT_OPTIONS = ["newest", "popular", "rating"] as const;
const PERIOD_OPTIONS = ["all", "week", "month", "year"] as const;

interface Viewpoint {
  id: string;
  title: string;
  description: string;
  locationName: string;
  latitude: number;
  longitude: number;
  thumbnailPhotoUrl?: string;
  createdAt: Date;
  createdBy: {
    id: string;
    username: string;
    profileImageUrl?: string;
  };
}

export function loader({ request }: Route.LoaderArgs) {
  return {
    viewpoints: [
      {
        id: "1",
        title: "Mount Everest Base Camp",
        description: "The most famous viewpoint in the world",
        locationName: "Nepal",
        latitude: 27.9881,
        longitude: 86.925,
        thumbnailPhotoUrl: "https://example.com/everest.jpg",
        createdAt: new Date(),
        createdBy: {
          id: "1",
          username: "john_doe",
          profileImageUrl: "https://github.com/haneulee.png",
        },
      },
    ] as Viewpoint[],
  };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Viewpoints - Mounty" },
    {
      name: "description",
      content: "Discover beautiful viewpoints around the world",
    },
  ];
};

export default function ViewpointsPage({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sorting = searchParams.get("sorting") || "newest";
  const period = searchParams.get("period") || "all";

  return (
    <div>
      <Hero
        title="Viewpoints"
        subtitle="Discover beautiful viewpoints around the world"
      />
      <div className="grid grid-cols-6 items-start gap-40">
        <div className="col-span-4 space-y-10">
          <div className="flex justify-between">
            <div className="space-y-5 w-full">
              <div className="flex items-center gap-5">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1">
                    <span className="text-sm capitalize">{sorting}</span>
                    <ChevronDownIcon className="size-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {SORT_OPTIONS.map((option) => (
                      <DropdownMenuCheckboxItem
                        className="capitalize cursor-pointer"
                        key={option}
                        onCheckedChange={(checked: boolean) => {
                          if (checked) {
                            searchParams.set("sorting", option);
                            setSearchParams(searchParams);
                          }
                        }}
                      >
                        {option}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {sorting === "popular" && (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1">
                      <span className="text-sm capitalize">{period}</span>
                      <ChevronDownIcon className="size-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {PERIOD_OPTIONS.map((option) => (
                        <DropdownMenuCheckboxItem
                          className="capitalize cursor-pointer"
                          key={option}
                          onCheckedChange={(checked: boolean) => {
                            if (checked) {
                              searchParams.set("period", option);
                              setSearchParams(searchParams);
                            }
                          }}
                        >
                          {option}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
              <Form className="w-2/3">
                <Input
                  type="text"
                  name="search"
                  placeholder="Search for viewpoints"
                />
              </Form>
            </div>
            <Button asChild>
              <Link to={`/viewpoints/new`}>Add Viewpoint</Link>
            </Button>
          </div>
          <div className="space-y-5">
            {loaderData.viewpoints.map((viewpoint: Viewpoint) => (
              <ViewpointCard key={viewpoint.id} {...viewpoint} />
            ))}
          </div>
        </div>
        <aside className="col-span-2 space-y-5">
          <span className="text-sm font-bold text-muted-foreground uppercase">
            Categories
          </span>
          <div className="flex flex-col gap-2 items-start">
            {["Mountains", "Beaches", "Cities", "Nature", "Historical"].map(
              (category) => (
                <Button
                  asChild
                  variant={"link"}
                  key={category}
                  className="pl-0"
                >
                  <Link to={`/viewpoints?category=${category}`}>
                    {category}
                  </Link>
                </Button>
              )
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
