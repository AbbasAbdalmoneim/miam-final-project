import React, { useState, useEffect } from "react";
import { Plus, Tag, Trash2, Shuffle, Edit2, Save, X } from "lucide-react";

interface Category {
  _id: string;
  name: string;
  emoji: string;
  createdAt: Date;
  eventsCount?: number;
}

const EventCategory: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  const categoryEmojis = [
    "🎵",
    "🎭",
    "🎪",
    "🎨",
    "🎬",
    "🎤",
    "🎸",
    "🥁",
    "🎺",
    "🎻",
    "🍕",
    "🍔",
    "🍰",
    "🍱",
    "🍜",
    "🍷",
    "☕",
    "🍺",
    "🥂",
    "🍸",
    "🏠",
    "🏢",
    "🏛️",
    "🏰",
    "⛪",
    "🕌",
    "🏟️",
    "🎢",
    "🎡",
    "🎠",
    "💰",
    "💎",
    "💳",
    "🛒",
    "🎁",
    "💝",
    "🏆",
    "🥇",
    "🌟",
    "⭐",
    "🚗",
    "✈️",
    "🚢",
    "🚂",
    "🚁",
    "🏍️",
    "🚲",
    "🛵",
    "🛴",
    "🛹",
    "⚕️",
    "💊",
    "🩺",
    "🏥",
    "🧬",
    "🔬",
    "🧪",
    "💉",
    "🩹",
    "🦷",
    "📚",
    "📖",
    "📝",
    "✏️",
    "🖊️",
    "📐",
    "🔍",
    "💡",
    "🧠",
    "🎓",
    "💻",
    "📱",
    "⌚",
    "🖥️",
    "⌨️",
    "🖱️",
    "💾",
    "📷",
    "📹",
    "🎮",
    "🌍",
    "🌎",
    "🌏",
    "🌟",
    "🌙",
    "☀️",
    "⭐",
    "🌈",
    "🔥",
    "❄️",
    "❤️",
    "💚",
    "💙",
    "💜",
    "🧡",
    "💛",
    "🖤",
    "🤍",
    "💖",
    "✨",
  ];

  const [formData, setFormData] = useState({
    name: "",
    emoji: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    emoji: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/categories`
        );
        if (response.ok) {
          const data = await response.json();
          setCategories(data.categories || data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([
          {
            _id: "1",
            name: "Music Festivals",
            emoji: "🎵",
            createdAt: new Date(),
            eventsCount: 12,
          },
          {
            _id: "2",
            name: "Food & Dining",
            emoji: "🍕",
            createdAt: new Date(),
            eventsCount: 8,
          },
          {
            _id: "3",
            name: "Art & Culture",
            emoji: "🎭",
            createdAt: new Date(),
            eventsCount: 15,
          },
          {
            _id: "4",
            name: "Sports Events",
            emoji: "🏆",
            createdAt: new Date(),
            eventsCount: 6,
          },
          {
            _id: "5",
            name: "Technology",
            emoji: "💻",
            createdAt: new Date(),
            eventsCount: 4,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const generateRandomEmoji = () => {
    const randomIndex = Math.floor(Math.random() * categoryEmojis.length);
    const randomEmoji = categoryEmojis[randomIndex];
    setFormData((prev) => ({ ...prev, emoji: randomEmoji }));
    if (errors.emoji) {
      setErrors((prev) => ({ ...prev, emoji: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = { name: "", emoji: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Category name is required";
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Category name must be at least 2 characters";
      isValid = false;
    }

    if (!formData.emoji.trim()) {
      newErrors.emoji = "Emoji is required";
      isValid = false;
    }

    
    if (
      categories.some(
        (cat) => cat.name.toLowerCase() === formData.name.trim().toLowerCase()
      )
    ) {
      newErrors.name = "Category name already exists";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const newCategory = {
        name: formData.name.trim(),
        emoji: formData.emoji.trim(),
      };

      
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/categories`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCategory),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setCategories((prev) => [...prev, data.category]);
        setFormData({ name: "", emoji: "" });
        setErrors({ name: "", emoji: "" });
      }
    } catch (error) {
      console.error("Error creating category:", error);
     
      const localCategory: Category = {
        _id: Date.now().toString(),
        name: formData.name.trim(),
        emoji: formData.emoji.trim(),
        createdAt: new Date(),
        eventsCount: 0,
      };
      setCategories((prev) => [...prev, localCategory]);
      setFormData({ name: "", emoji: "" });
      setErrors({ name: "", emoji: "" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/categories/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setCategories((prev) => prev.filter((cat) => cat._id !== id));
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
    }
  };

  const handleEdit = (category: Category) => {
    setEditingId(category._id);
    setFormData({ name: category.name, emoji: category.emoji });
  };

  const handleSaveEdit = async (id: string) => {
    if (!validateForm()) return;

    try {
      const updatedCategory = {
        name: formData.name.trim(),
        emoji: formData.emoji.trim(),
      };

      
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/categories/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCategory),
        }
      );

      if (response.ok) {
        setCategories((prev) =>
          prev.map((cat) =>
            cat._id === id ? { ...cat, ...updatedCategory } : cat
          )
        );
        setEditingId(null);
        setFormData({ name: "", emoji: "" });
        setErrors({ name: "", emoji: "" });
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ name: "", emoji: "" });
    setErrors({ name: "", emoji: "" });
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-violet-600 mx-auto mb-4"></div>
          <p className="text-violet-600 font-semibold">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-orange-50">
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
      </div>

      <div className="relative max-w-6xl mx-auto p-6 space-y-8">
        
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-700 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-4">
            Category Manager
          </h1>
          <p className="text-violet-600 text-lg font-medium">
            Create and manage event categories with beautiful emojis
          </p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-xl shadow-slate-900/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-violet-600 font-semibold text-sm mb-1">
                  TOTAL CATEGORIES
                </p>
                <p className="text-3xl font-bold bg-gradient-to-r from-violet-700 to-purple-700 bg-clip-text text-transparent">
                  {categories.length}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl">
                <Tag className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-xl shadow-slate-900/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-600 font-semibold text-sm mb-1">
                  TOTAL EVENTS
                </p>
                <p className="text-3xl font-bold bg-gradient-to-r from-pink-700 to-orange-700 bg-clip-text text-transparent">
                  {categories.reduce(
                    (sum, cat) => sum + (cat.eventsCount || 0),
                    0
                  )}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl">
                <Plus className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-xl shadow-slate-900/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 font-semibold text-sm mb-1">
                  AVG PER CATEGORY
                </p>
                <p className="text-3xl font-bold bg-gradient-to-r from-orange-700 to-violet-700 bg-clip-text text-transparent">
                  {categories.length > 0
                    ? Math.round(
                        categories.reduce(
                          (sum, cat) => sum + (cat.eventsCount || 0),
                          0
                        ) / categories.length
                      )
                    : 0}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-orange-500 to-violet-500 rounded-2xl">
                <Shuffle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        
        <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl shadow-xl shadow-slate-900/10 overflow-hidden">
          <div className="bg-gradient-to-r from-violet-500/10 via-pink-500/10 to-orange-500/10 px-8 py-6 border-b border-white/30">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-700 via-pink-600 to-orange-600 bg-clip-text text-transparent flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl">
                <Plus className="h-6 w-6 text-white" />
              </div>
              Add New Category
            </h2>
          </div>

          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-3">
                <label className="text-sm font-bold text-violet-700">
                  Category Name
                </label>
                <div className="relative">
                  <Tag className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-violet-400" />
                  <input
                    type="text"
                    placeholder="Enter category name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 bg-white/60 backdrop-blur-md border rounded-2xl focus:ring-2 focus:ring-violet-500 focus:border-transparent font-medium ${
                      errors.name
                        ? "border-red-500 focus:ring-red-500"
                        : "border-white/30"
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-red-600 font-semibold">
                    {errors.name}
                  </p>
                )}
              </div>

            
              <div className="space-y-3">
                <label className="text-sm font-bold text-violet-700">
                  Category Emoji
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="🏷️"
                    value={formData.emoji}
                    onChange={(e) => handleInputChange("emoji", e.target.value)}
                    className={`flex-1 px-4 py-3 bg-white/60 backdrop-blur-md border rounded-2xl focus:ring-2 focus:ring-violet-500 focus:border-transparent text-center text-2xl ${
                      errors.emoji
                        ? "border-red-500 focus:ring-red-500"
                        : "border-white/30"
                    }`}
                    maxLength={4}
                  />
                  <button
                    type="button"
                    onClick={generateRandomEmoji}
                    className="px-4 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-2xl hover:shadow-lg transition-all duration-300 font-bold"
                    title="Generate random emoji"
                  >
                    <Shuffle className="h-5 w-5" />
                  </button>
                </div>
                {errors.emoji && (
                  <p className="text-sm text-red-600 font-semibold">
                    {errors.emoji}
                  </p>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="px-8 py-4 bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 hover:from-violet-700 hover:to-orange-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3"
            >
              <Plus className="h-5 w-5" />
              Add Category
            </button>
          </div>
        </div>

       
        <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl shadow-xl shadow-slate-900/10 overflow-hidden">
          <div className="bg-gradient-to-r from-violet-500/10 via-pink-500/10 to-orange-500/10 px-8 py-6 border-b border-white/30">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-700 via-pink-600 to-orange-600 bg-clip-text text-transparent flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl">
                <Tag className="h-6 w-6 text-white" />
              </div>
              All Categories ({categories.length})
            </h2>
          </div>

          <div className="p-8">
            {categories.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🏷️</div>
                <h3 className="text-2xl font-bold text-violet-700 mb-2">
                  No categories yet
                </h3>
                <p className="text-violet-600 mb-6">
                  Create your first category to get started
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <div
                    key={category._id}
                    className="group bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl p-6 hover:scale-105 hover:shadow-xl transition-all duration-300"
                  >
                    {editingId === category._id ? (
                     
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <input
                            type="text"
                            value={formData.emoji}
                            onChange={(e) =>
                              handleInputChange("emoji", e.target.value)
                            }
                            className="w-16 h-16 text-2xl text-center bg-white/60 border border-white/30 rounded-xl"
                            maxLength={4}
                          />
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                              handleInputChange("name", e.target.value)
                            }
                            className="flex-1 px-3 py-2 bg-white/60 border border-white/30 rounded-xl font-bold text-violet-700"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSaveEdit(category._id)}
                            className="flex-1 px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold hover:shadow-lg transition-all duration-300"
                          >
                            <Save className="h-4 w-4 inline mr-2" />
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="flex-1 px-3 py-2 bg-gradient-to-r from-gray-500 to-slate-500 text-white rounded-xl font-bold hover:shadow-lg transition-all duration-300"
                          >
                            <X className="h-4 w-4 inline mr-2" />
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      
                      <>
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="text-4xl p-3 bg-gradient-to-r from-violet-100 to-purple-100 rounded-2xl">
                              {category.emoji}
                            </div>
                            <div>
                              <h3 className="font-bold text-lg text-violet-700">
                                {category.name}
                              </h3>
                              <p className="text-sm text-violet-600">
                                {new Date(
                                  category.createdAt
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleEdit(category)}
                              className="p-2 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors"
                              title="Edit category"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(category._id)}
                              className="p-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                              title="Delete category"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-white/30">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-semibold text-green-600">
                              Active
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-violet-700">
                              {category.eventsCount || 0} events
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCategory;
