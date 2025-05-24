import { ContentLayout } from "~/common/components/layout/content-layout";
import type { Route } from "~/types";
import { ViewpointCard } from "~/features/viewpoints/components/viewpoint-card";
import { useSearchParams } from "react-router";

interface FilterOption {
  label: string;
  value: string;
}

const SORT_OPTIONS: FilterOption[] = [
  { label: "Newest", value: "newest" },
  { label: "Popular", value: "popular" },
  { label: "Rating", value: "rating" },
];

const PERIOD_OPTIONS: FilterOption[] = [
  { label: "All Time", value: "all" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "This Year", value: "year" },
];

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
      {
        id: "2",
        title: "Machu Picchu",
        description: "Ancient Incan citadel set high in the Andes Mountains",
        locationName: "Peru",
        latitude: -13.1631,
        longitude: -72.545,
        thumbnailPhotoUrl: "https://example.com/machupicchu.jpg",
        createdAt: new Date(),
        createdBy: {
          id: "2",
          username: "mountain_lover",
          profileImageUrl: "https://github.com/haneulee.png",
        },
      },
      {
        id: "3",
        title: "Grand Canyon South Rim",
        description: "One of the most spectacular views in the world",
        locationName: "Arizona, USA",
        latitude: 36.0544,
        longitude: -112.1401,
        thumbnailPhotoUrl: "https://example.com/grandcanyon.jpg",
        createdAt: new Date(),
        createdBy: {
          id: "3",
          username: "nature_explorer",
          profileImageUrl: "https://github.com/haneulee.png",
        },
      },
      {
        id: "4",
        title: "Santorini Sunset View",
        description: "Breathtaking sunset views over the Aegean Sea",
        locationName: "Greece",
        latitude: 36.3932,
        longitude: 25.4615,
        thumbnailPhotoUrl: "https://example.com/santorini.jpg",
        createdAt: new Date(),
        createdBy: {
          id: "4",
          username: "travel_enthusiast",
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
  const search = searchParams.get("search") || "";

  const sidebarFilters = [
    {
      title: "View Type",
      type: "link" as const,
      options: [
        { label: "Mountain", value: "mountain" },
        { label: "Ocean", value: "ocean" },
        { label: "City", value: "city" },
        { label: "Forest", value: "forest" },
        { label: "Desert", value: "desert" },
        { label: "Lake", value: "lake" },
      ],
    },
    {
      title: "Best Time",
      type: "link" as const,
      options: [
        { label: "Sunrise", value: "sunrise" },
        { label: "Sunset", value: "sunset" },
        { label: "Day", value: "day" },
        { label: "Night", value: "night" },
        { label: "Golden Hour", value: "golden-hour" },
      ],
    },
    {
      title: "Popular Tags",
      type: "tag" as const,
      options: [
        { label: "Panoramic", value: "panoramic" },
        { label: "Scenic", value: "scenic" },
        { label: "Photography", value: "photography" },
        { label: "Hiking", value: "hiking" },
        { label: "Nature", value: "nature" },
      ],
    },
  ];

  return (
    <ContentLayout
      title="Viewpoints"
      subtitle="Discover beautiful viewpoints around the world"
      searchPlaceholder="Search viewpoints..."
      addButtonText="Add Viewpoint"
      addButtonLink="/viewpoints/new"
      sortOptions={SORT_OPTIONS}
      periodOptions={PERIOD_OPTIONS}
      sidebarFilters={sidebarFilters}
      currentSort={sorting}
      currentPeriod={period}
      searchValue={search}
      onSearch={(value) => {
        searchParams.set("search", value);
        setSearchParams(searchParams);
      }}
      onSort={(value) => {
        searchParams.set("sorting", value);
        setSearchParams(searchParams);
      }}
      onPeriodChange={(value) => {
        searchParams.set("period", value);
        setSearchParams(searchParams);
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {loaderData.viewpoints.map((viewpoint: Viewpoint) => (
          <ViewpointCard key={viewpoint.id} {...viewpoint} />
        ))}
      </div>
    </ContentLayout>
  );
}
