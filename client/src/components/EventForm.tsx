import React, { useState } from "react";
import { 
  Plus, 
  Shuffle, 
  MapPin, 
  Tag, 
  Ticket, 
  Calendar, 
  User, 
  Building, 
  Zap,
  X,
  Sparkles,
  Music,
  Trophy
} from "lucide-react";
import { useEvents } from "@/contexts/EventsProvider";

export interface TicketType {
  name: string;
  type: "VIP" | "GENERAL";
  price: number;
}

export interface Address {
  city: string;
  state: string;
  zipCode: string;
  street: string;
}

export interface Venue {
  name: string;
  capacity: number;
  address: Address;
}

export interface EventFormData {
  name: string;
  description: string;
  emoji: string;
  category: string;
  tags: string[];
  datetime: string;
  organizer: string;
  popularity: string;
  ticketTypes: TicketType;
  venue: Venue;
}

interface FormErrors {
  [key: string]: string;
}

const EventForm: React.FC = () => {
  const { createEvent } = useEvents();
  const [formData, setFormData] = useState<EventFormData>({
    name: "",
    description: "",
    emoji: "🎉",
    category: "",
    tags: [],
    datetime: "",
    organizer: "",
    popularity: "",
    ticketTypes: { name: "", type: "GENERAL", price: 0 },
    venue: {
      name: "",
      capacity: 0,
      address: {
        city: "",
        state: "",
        zipCode: "",
        street: "",
      },
    },
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [currentTag, setCurrentTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const categories = [
    "Music & Arts",
    "Sports",
    "Technology", 
    "Business",
    "Food & Drink",
    "Education",
    "Health & Wellness",
    "Entertainment",
    "E-Sports",
  ];

  const popularityOptions = [
    "Low Popularity",
    "Medium Popularity", 
    "High Popularity",
    "Very High Popularity",
  ];

  const states = [
    "Alexandria",
    "Cairo",
    "Giza",
    "Sharjah",
    "Dubai",
    "Abu Dhabi",
  ];

  const cities = {
    Alexandria: ["AL-Mandara", "Sidi Gaber", "Stanley", "Gleem"],
    Cairo: ["Downtown", "Maadi", "Zamalek", "Heliopolis"],
    Sharjah: ["Al Majaz", "Al Nahda", "Al Qasimia", "Al Taawun"],
    Dubai: ["Al Majaz", "Al Nahda", "Al Qasimia", "Al Taawun"],
    AbuDhabi: ["Al Majaz", "Al Nahda", "Al Qasimia", "Al Taawun"],
  };

  const emojis = [
    "🎉", "🎵", "🎨", "🏀", "⚽", "🎸", "🎭", "🎪", "🎯", "🎲", 
    "🎮", "🏆", "🌟", "💫", "🔥", "⭐", "🎊", "🎈"
  ];

  const generateRandomEmoji = () => {
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    setFormData((prev) => ({ ...prev, emoji: randomEmoji }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Event name is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.datetime) newErrors.datetime = "Date and time is required";
    if (!formData.organizer.trim()) newErrors.organizer = "Organizer is required";
    if (!formData.popularity) newErrors.popularity = "Popularity is required";

    if (!formData.venue.name.trim()) newErrors["venue.name"] = "Venue name is required";
    if (formData.venue.capacity <= 0) newErrors["venue.capacity"] = "Capacity must be greater than 0";
    if (!formData.venue.address.street.trim()) newErrors["venue.address.street"] = "Street address is required";
    if (!formData.venue.address.city) newErrors["venue.address.city"] = "City is required";
    if (!formData.venue.address.state) newErrors["venue.address.state"] = "State is required";
    if (!formData.venue.address.zipCode.trim()) newErrors["venue.address.zipCode"] = "ZIP code is required";

    if (!formData.ticketTypes.name.trim()) newErrors["ticketTypes.name"] = "Ticket name is required";
    if (formData.ticketTypes.price <= 0) newErrors["ticketTypes.price"] = "Price must be greater than 0";

    if (formData.tags.length === 0) newErrors.tags = "At least one tag is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setSubmitSuccess(false);

      if (validateForm()) {
        const eventData = {
          name: formData.name,
          description: formData.description,
          emoji: formData.emoji,
          category: formData.category,
          tags: formData.tags,
          datetime: formData.datetime,
          organizer: formData.organizer,
          popularity: formData.popularity,
          ticketTypes: formData.ticketTypes,
          venue: formData.venue,
        };
        
        await createEvent(eventData);
        setSubmitSuccess(true);

        setFormData({
          name: "",
          description: "",
          emoji: "🎉",
          category: "",
          tags: [],
          datetime: "",
          organizer: "",
          popularity: "",
          ticketTypes: { name: "", type: "GENERAL", price: 0 },
          venue: {
            name: "",
            capacity: 0,
            address: {
              city: "",
              state: "",
              zipCode: "",
              street: "",
            },
          },
        });
      }
    } catch (error) {
      console.log((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateTicketType = (field: keyof TicketType, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      ticketTypes: { ...prev.ticketTypes, [field]: value },
    }));
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const getAvailableCities = () => {
    const selectedState = formData.venue.address.state || "Alexandria";
    const citiesList = Object.entries(cities).filter(
      ([Key]) => Key.toLocaleLowerCase() === selectedState.toLocaleLowerCase()
    );
    return citiesList[0][1] || [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-orange-50 py-12 px-4">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-violet-600 to-purple-700 rounded-2xl shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-700 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              Create Amazing Event
            </h1>
          </div>
          <p className="text-xl text-violet-600 font-medium max-w-2xl mx-auto">
            Bring your vision to life with our powerful event creation platform
          </p>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-3xl shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500 rounded-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-green-800 font-bold text-lg">🎉 Event Created Successfully!</h3>
                <p className="text-green-700">Your event has been created and is ready to go live.</p>
              </div>
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl shadow-slate-900/10 p-10">
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Basic Information Section */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 pb-4 border-b border-violet-200">
                <div className="p-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl shadow-lg">
                  <Tag className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-700 to-purple-700 bg-clip-text text-transparent">
                  Basic Information
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-violet-700 mb-2">
                    Event Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className={`w-full px-6 py-4 bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-violet-500/30 focus:border-violet-500 transition-all duration-300 placeholder-violet-400 font-medium ${
                      errors.name ? "border-red-400 ring-red-500/30" : ""
                    }`}
                    placeholder="Enter your amazing event name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm font-semibold flex items-center gap-2">
                      <X className="w-4 h-4" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-bold text-violet-700 mb-2">
                    Event Emoji
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={formData.emoji}
                      onChange={(e) => setFormData((prev) => ({ ...prev, emoji: e.target.value }))}
                      className="flex-1 px-6 py-4 bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-violet-500/30 focus:border-violet-500 transition-all duration-300 text-2xl text-center font-medium"
                      placeholder="🎉"
                    />
                    <button
                      type="button"
                      onClick={generateRandomEmoji}
                      className="px-6 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <Shuffle className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-bold text-violet-700 mb-2">
                  Event Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  className={`w-full px-6 py-4 bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-violet-500/30 focus:border-violet-500 transition-all duration-300 placeholder-violet-400 font-medium min-h-[120px] ${
                    errors.description ? "border-red-400 ring-red-500/30" : ""
                  }`}
                  rows={4}
                  placeholder="Describe your event in detail..."
                />
                {errors.description && (
                  <p className="text-red-500 text-sm font-semibold flex items-center gap-2">
                    <X className="w-4 h-4" />
                    {errors.description}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-violet-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                    className={`w-full px-6 py-4 bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-violet-500/30 focus:border-violet-500 transition-all duration-300 font-medium ${
                      errors.category ? "border-red-400 ring-red-500/30" : ""
                    }`}
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-sm font-semibold flex items-center gap-2">
                      <X className="w-4 h-4" />
                      {errors.category}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-bold text-violet-700 mb-2">
                    Popularity Level
                  </label>
                  <select
                    value={formData.popularity}
                    onChange={(e) => setFormData((prev) => ({ ...prev, popularity: e.target.value }))}
                    className={`w-full px-6 py-4 bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-violet-500/30 focus:border-violet-500 transition-all duration-300 font-medium ${
                      errors.popularity ? "border-red-400 ring-red-500/30" : ""
                    }`}
                  >
                    <option value="">Select popularity</option>
                    {popularityOptions.map((pop) => (
                      <option key={pop} value={pop}>{pop}</option>
                    ))}
                  </select>
                  {errors.popularity && (
                    <p className="text-red-500 text-sm font-semibold flex items-center gap-2">
                      <X className="w-4 h-4" />
                      {errors.popularity}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-violet-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.datetime}
                    onChange={(e) => setFormData((prev) => ({ ...prev, datetime: e.target.value }))}
                    className={`w-full px-6 py-4 bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-violet-500/30 focus:border-violet-500 transition-all duration-300 font-medium ${
                      errors.datetime ? "border-red-400 ring-red-500/30" : ""
                    }`}
                  />
                  {errors.datetime && (
                    <p className="text-red-500 text-sm font-semibold flex items-center gap-2">
                      <X className="w-4 h-4" />
                      {errors.datetime}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-bold text-violet-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Organizer
                  </label>
                  <input
                    type="text"
                    value={formData.organizer}
                    onChange={(e) => setFormData((prev) => ({ ...prev, organizer: e.target.value }))}
                    className={`w-full px-6 py-4 bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-violet-500/30 focus:border-violet-500 transition-all duration-300 placeholder-violet-400 font-medium ${
                      errors.organizer ? "border-red-400 ring-red-500/30" : ""
                    }`}
                    placeholder="Enter organizer name"
                  />
                  {errors.organizer && (
                    <p className="text-red-500 text-sm font-semibold flex items-center gap-2">
                      <X className="w-4 h-4" />
                      {errors.organizer}
                    </p>
                  )}
                </div>
              </div>

              {/* Tags Section */}
              <div className="space-y-4">
                <label className="block text-sm font-bold text-violet-700 mb-2">
                  Event Tags
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 px-6 py-4 bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-violet-500/30 focus:border-violet-500 transition-all duration-300 placeholder-violet-400 font-medium"
                    placeholder="Add a tag and press Enter"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-6 py-4 bg-gradient-to-r from-violet-600 to-purple-700 text-white rounded-2xl hover:from-violet-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 rounded-xl text-sm font-semibold border border-violet-200 shadow-lg"
                    >
                      <Music className="w-4 h-4" />
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-violet-900 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
                {errors.tags && (
                  <p className="text-red-500 text-sm font-semibold flex items-center gap-2">
                    <X className="w-4 h-4" />
                    {errors.tags}
                  </p>
                )}
              </div>
            </section>

            {/* Venue Information Section */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 pb-4 border-b border-pink-200">
                <div className="p-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl shadow-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-700 to-orange-700 bg-clip-text text-transparent">
                  Venue Information
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-pink-700 mb-2">
                    <Building className="w-4 h-4 inline mr-2" />
                    Venue Name
                  </label>
                  <input
                    type="text"
                    value={formData.venue.name}
                    onChange={(e) => setFormData((prev) => ({
                      ...prev,
                      venue: { ...prev.venue, name: e.target.value },
                    }))}
                    className={`w-full px-6 py-4 bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-pink-500/30 focus:border-pink-500 transition-all duration-300 placeholder-pink-400 font-medium ${
                      errors["venue.name"] ? "border-red-400 ring-red-500/30" : ""
                    }`}
                    placeholder="Enter venue name"
                  />
                  {errors["venue.name"] && (
                    <p className="text-red-500 text-sm font-semibold flex items-center gap-2">
                      <X className="w-4 h-4" />
                      {errors["venue.name"]}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-bold text-pink-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Capacity
                  </label>
                  <input
                    type="number"
                    value={formData.venue.capacity || ""}
                    onChange={(e) => setFormData((prev) => ({
                      ...prev,
                      venue: {
                        ...prev.venue,
                        capacity: parseInt(e.target.value) || 0,
                      },
                    }))}
                    className={`w-full px-6 py-4 bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-pink-500/30 focus:border-pink-500 transition-all duration-300 placeholder-pink-400 font-medium ${
                      errors["venue.capacity"] ? "border-red-400 ring-red-500/30" : ""
                    }`}
                    placeholder="Enter capacity"
                  />
                  {errors["venue.capacity"] && (
                    <p className="text-red-500 text-sm font-semibold flex items-center gap-2">
                      <X className="w-4 h-4" />
                      {errors["venue.capacity"]}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-bold text-pink-700 mb-2">
                  Street Address
                </label>
                <input
                  type="text"
                  value={formData.venue.address.street}
                  onChange={(e) => setFormData((prev) => ({
                    ...prev,
                    venue: {
                      ...prev.venue,
                      address: {
                        ...prev.venue.address,
                        street: e.target.value,
                      },
                    },
                  }))}
                  className={`w-full px-6 py-4 bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-pink-500/30 focus:border-pink-500 transition-all duration-300 placeholder-pink-400 font-medium ${
                    errors["venue.address.street"] ? "border-red-400 ring-red-500/30" : ""
                  }`}
                  placeholder="Enter street address"
                />
                {errors["venue.address.street"] && (
                  <p className="text-red-500 text-sm font-semibold flex items-center gap-2">
                    <X className="w-4 h-4" />
                    {errors["venue.address.street"]}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-pink-700 mb-2">
                    State/Region
                  </label>
                  <select
                    value={formData.venue.address.state}
                    onChange={(e) => setFormData((prev) => ({
                      ...prev,
                      venue: {
                        ...prev.venue,
                        address: {
                          ...prev.venue.address,
                          state: e.target.value,
                          city: "",
                        },
                      },
                    }))}
                    className={`w-full px-6 py-4 bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-pink-500/30 focus:border-pink-500 transition-all duration-300 font-medium ${
                      errors["venue.address.state"] ? "border-red-400 ring-red-500/30" : ""
                    }`}
                  >
                    <option value="">Select state/region</option>
                    {states.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  {errors["venue.address.state"] && (
                    <p className="text-red-500 text-sm font-semibold flex items-center gap-2">
                      <X className="w-4 h-4" />
                      {errors["venue.address.state"]}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-bold text-pink-700 mb-2">
                    City
                  </label>
                  <select
                    value={formData.venue.address.city}
                    onChange={(e) => setFormData((prev) => ({
                      ...prev,
                      venue: {
                        ...prev.venue,
                        address: {
                          ...prev.venue.address,
                          city: e.target.value,
                        },
                      },
                    }))}
                    className={`w-full px-6 py-4 bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-pink-500/30 focus:border-pink-500 transition-all duration-300 font-medium ${
                      errors["venue.address.city"] ? "border-red-400 ring-red-500/30" : ""
                    }`}
                    disabled={!formData.venue.address.state}
                  >
                    <option value="">Select city</option>
                    {getAvailableCities().map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  {errors["venue.address.city"] && (
                    <p className="text-red-500 text-sm font-semibold flex items-center gap-2">
                      <X className="w-4 h-4" />
                      {errors["venue.address.city"]}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-bold text-pink-700 mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    value={formData.venue.address.zipCode}
                    onChange={(e) => setFormData((prev) => ({
                      ...prev,
                      venue: {
                        ...prev.venue,
                        address: {
                          ...prev.venue.address,
                          zipCode: e.target.value,
                        },
                      },
                    }))}
                    className={`w-full px-6 py-4 bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-pink-500/30 focus:border-pink-500 transition-all duration-300 placeholder-pink-400 font-medium ${
                      errors["venue.address.zipCode"] ? "border-red-400 ring-red-500/30" : ""
                    }`}
                    placeholder="Enter ZIP code"
                  />
                  {errors["venue.address.zipCode"] && (
                    <p className="text-red-500 text-sm font-semibold flex items-center gap-2">
                      <X className="w-4 h-4" />
                      {errors["venue.address.zipCode"]}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Ticket Information Section */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 pb-4 border-b border-orange-200">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl shadow-lg">
                  <Ticket className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-700 to-amber-700 bg-clip-text text-transparent">
                  Ticket Information
                </h2>
              </div>

              <div className="p-8 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-3xl shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-orange-700 mb-2">
                      <Trophy className="w-4 h-4 inline mr-2" />
                      Ticket Name
                    </label>
                    <input
                      type="text"
                      value={formData.ticketTypes.name}
                      onChange={(e) => updateTicketType("name", e.target.value)}
                      className={`w-full px-6 py-4 bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-orange-500/30 focus:border-orange-500 transition-all duration-300 placeholder-orange-400 font-medium ${
                        errors["ticketTypes.name"] ? "border-red-400 ring-red-500/30" : ""
                      }`}
                      placeholder="Enter ticket name"
                    />
                    {errors["ticketTypes.name"] && (
                      <p className="text-red-500 text-sm font-semibold flex items-center gap-2">
                        <X className="w-4 h-4" />
                        {errors["ticketTypes.name"]}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-orange-700 mb-2">
                      Ticket Type
                    </label>
                    <select
                      value={formData.ticketTypes.type}
                      onChange={(e) => updateTicketType("type", e.target.value)}
                      className="w-full px-6 py-4 bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-orange-500/30 focus:border-orange-500 transition-all duration-300 font-medium"
                    >
                      <option value="GENERAL">General</option>
                      <option value="VIP">VIP</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-orange-700 mb-2">
                      Price (EGP)
                    </label>
                    <input
                      type="number"
                      value={formData.ticketTypes.price || ""}
                      onChange={(e) => updateTicketType("price", parseFloat(e.target.value) || 0)}
                      className={`w-full px-6 py-4 bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-orange-500/30 focus:border-orange-500 transition-all duration-300 placeholder-orange-400 font-medium ${
                        errors["ticketTypes.price"] ? "border-red-400 ring-red-500/30" : ""
                      }`}
                      placeholder="Enter price"
                      min="0"
                      step="0.01"
                    />
                    {errors["ticketTypes.price"] && (
                      <p className="text-red-500 text-sm font-semibold flex items-center gap-2">
                        <X className="w-4 h-4" />
                        {errors["ticketTypes.price"]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Submit Button */}
            <div className="flex justify-center pt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-12 py-6 bg-gradient-to-r from-violet-600 via-pink-600 to-orange-600 hover:from-violet-700 hover:via-pink-700 hover:to-orange-700 text-white font-bold text-xl rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-4"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    Creating Event...
                  </>
                ) : (
                  <>
                    <Zap className="w-6 h-6" />
                    Create Amazing Event
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventForm;
