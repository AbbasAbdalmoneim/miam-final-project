import { useState, useMemo } from "react";
import { Search, Sparkles } from "lucide-react";
import { useEvents } from "@/contexts/EventsProvider";
import type { EventType } from "@/lib/types";
import EventCard from "./EventCard";

interface FilterState {
  search: string;
}

interface EventSearchFilterProps {
  onFilteredEvents?: (filteredEvents: EventType[]) => void;
}

export default function EventSearchFilter({
  onFilteredEvents = () => {},
}: EventSearchFilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
  });
  const { events } = useEvents();

  const filteredEvents = useMemo(() => {
    const filtered: EventType[] = events.filter((event) => {
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const matchesSearch =
          event.name.toLowerCase().includes(searchTerm) ||
          event.description.toLowerCase().includes(searchTerm) ||
          event.organizer.toLowerCase().includes(searchTerm) ||
          event.tags.some((tag) => tag.toLowerCase().includes(searchTerm));

        if (!matchesSearch) return false;
      }
      return true;
    });

    onFilteredEvents(filtered);
    return filtered;
  }, [events, filters, onFilteredEvents]);

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ search: "" });
  };

  return (
    <div className="relative mt-28">
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-2xl shadow-lg border border-slate-200/60 p-6 mb-8 backdrop-blur-sm">

        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 z-10">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            placeholder="Search events by name, description, organizer, or tags..."
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-white/80 backdrop-blur-sm border-2 border-slate-200/60 rounded-xl text-sm placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <Sparkles className="h-5 w-5 text-slate-300" />
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredEvents.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}

        {filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
              <div className="relative p-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl inline-block shadow-lg">
                <Search className="h-16 w-16 text-slate-400 mx-auto" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">
              No Events Found
            </h3>
            <p className="text-slate-600 max-w-md mx-auto">
              We couldn't find any events matching your search. Try a different keyword.
            </p>
            <button
              onClick={clearFilters}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Reset Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
