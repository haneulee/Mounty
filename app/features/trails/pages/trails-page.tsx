import { ContentLayout } from "~/common/components/layout/content-layout";
import type { Route } from "~/types";
import { TrailCard } from "~/features/trails/components/trail-card";
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

interface Trail {
  id: string;
  title: string;
  description: string;
  startLocation: string;
  endLocation: string;
  distance: number;
  elevationGain: number;
  estimatedTime: number;
  difficulty: string;
  season: string;
  thumbnailPhotoUrl: string;
  createdAt: Date;
  createdBy: {
    id: string;
    username: string;
    profileImageUrl?: string;
  };
}

export function loader({ request }: Route.LoaderArgs) {
  return {
    trails: [
      {
        id: "1",
        title: "Everest Base Camp Trek",
        description: "The classic trek to Everest Base Camp",
        startLocation: "Lukla",
        endLocation: "Everest Base Camp",
        distance: 130,
        elevationGain: 2800,
        estimatedTime: 12,
        difficulty: "hard",
        season: "spring",
        thumbnailPhotoUrl: "https://github.com/haneulee.png",
        createdAt: new Date(),
        createdBy: {
          id: "1",
          username: "john_doe",
          profileImageUrl: "https://github.com/haneulee.png",
        },
      },
      {
        id: "2",
        title: "Annapurna Circuit",
        description: "One of the most diverse treks in Nepal",
        startLocation: "Besisahar",
        endLocation: "Jomsom",
        distance: 160,
        elevationGain: 3000,
        estimatedTime: 14,
        difficulty: "hard",
        season: "fall",
        thumbnailPhotoUrl: "https://github.com/haneulee.png",
        createdAt: new Date(),
        createdBy: {
          id: "2",
          username: "mountain_lover",
          profileImageUrl: "https://github.com/haneulee.png",
        },
      },
      {
        id: "3",
        title: "Inca Trail to Machu Picchu",
        description: "Ancient path to the lost city of the Incas",
        startLocation: "Cusco",
        endLocation: "Machu Picchu",
        distance: 43,
        elevationGain: 1200,
        estimatedTime: 4,
        difficulty: "moderate",
        season: "winter",
        thumbnailPhotoUrl: "https://github.com/haneulee.png",
        createdAt: new Date(),
        createdBy: {
          id: "3",
          username: "nature_explorer",
          profileImageUrl: "https://github.com/haneulee.png",
        },
      },
      {
        id: "4",
        title: "Tour du Mont Blanc",
        description: "Circumnavigate Western Europe's highest mountain",
        startLocation: "Chamonix",
        endLocation: "Chamonix",
        distance: 170,
        elevationGain: 10000,
        estimatedTime: 11,
        difficulty: "hard",
        season: "summer",
        thumbnailPhotoUrl: "https://github.com/haneulee.png",
        createdAt: new Date(),
        createdBy: {
          id: "4",
          username: "travel_enthusiast",
          profileImageUrl: "https://github.com/haneulee.png",
        },
      },
    ] as Trail[],
  };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Trails - Mounty" },
    {
      name: "description",
      content: "Discover hiking trails around the world",
    },
  ];
};

export default function TrailsPage({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sorting = searchParams.get("sorting") || "newest";
  const period = searchParams.get("period") || "all";
  const search = searchParams.get("search") || "";

  const sidebarFilters = [
    {
      title: "Difficulty",
      type: "link" as const,
      options: [
        { label: "Easy", value: "easy" },
        { label: "Moderate", value: "moderate" },
        { label: "Hard", value: "hard" },
      ],
    },
    {
      title: "Season",
      type: "link" as const,
      options: [
        { label: "Spring", value: "spring" },
        { label: "Summer", value: "summer" },
        { label: "Fall", value: "fall" },
        { label: "Winter", value: "winter" },
      ],
    },
    {
      title: "Popular Tags",
      type: "tag" as const,
      options: [
        { label: "Hiking", value: "hiking" },
        { label: "Camping", value: "camping" },
        { label: "Nature", value: "nature" },
        { label: "Adventure", value: "adventure" },
        { label: "Scenic", value: "scenic" },
      ],
    },
  ];

  return (
    <ContentLayout
      title="Trails"
      subtitle="Discover hiking trails around the world"
      searchPlaceholder="Search trails..."
      addButtonText="Add Trail"
      addButtonLink="/trails/new"
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
        {loaderData.trails.map((trail: Trail) => (
          <TrailCard key={trail.id} {...trail} />
        ))}
      </div>
    </ContentLayout>
  );
}
