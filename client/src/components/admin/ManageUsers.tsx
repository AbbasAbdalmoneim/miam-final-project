import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Users,
  Shield,
  ShieldOff,
  Eye,
  MoreHorizontal,
  Calendar,
  Mail,
  User,
  Filter,
  Crown,
  Activity,
  X,
} from "lucide-react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
  status?: "active" | "blocked";
}



const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "blocked">("all");
  const [roleFilter, setRoleFilter] = useState<"all" | "USER" | "ADMIN">("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);


  const BASE_URL = "{{BASE_URL}}";

  useEffect(() => {
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const url = BASE_URL.includes("{{") 
        ? "http://localhost:5000/api/users"
        : `${BASE_URL}/api/users`;

      // Read and parse token
      const storedToken = localStorage.getItem("accessToken");
      const token = storedToken ? JSON.parse(storedToken) : null;

      if (!token) {
        throw new Error("No access token found. Please log in again.");
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const usersFromDb: User[] = await response.json();

        const usersWithStatus = usersFromDb.map(user => ({
          ...user,
          status: (user.status || "active") as "active" | "blocked",
        }));

        setUsers(usersWithStatus);
      } else {
        throw new Error(`Failed to fetch users: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(error instanceof Error ? error.message : "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  fetchUsers();
}, [BASE_URL]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || user.status === statusFilter;
      const matchesRole = roleFilter === "all" || user.role === roleFilter;

      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [users, searchTerm, statusFilter, roleFilter]);

  const toggleUserStatus = async (userId: string) => {
    try {
      const user = users.find((u) => u._id === userId);
      if (!user) return;
      
      const newStatus = user.status === "active" ? "blocked" : "active";

      const url = BASE_URL.includes("{{") 
        ? `https://api.example.com/users/${userId}/status` 
        : `${BASE_URL}/users/${userId}/status`;
      
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',

        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setUsers((prev) =>
          prev.map((user) =>
            user._id === userId ? { ...user, status: newStatus } : user
          )
        );
      } else {
        console.error("Failed to update user status");
      }
    } catch (error) {
      console.error("Error updating user status:", error);
    
      const user = users.find((u) => u._id === userId);
      if (user) {
        const newStatus = user.status === "active" ? "blocked" : "active";
        setUsers((prev) =>
          prev.map((u) =>
            u._id === userId ? { ...u, status: newStatus } : u
          )
        );
      }
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === "active") {
      return (
        <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          Active
        </span>
      );
    }
    return (
      <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border border-red-200">
        <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
        Blocked
      </span>
    );
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      ADMIN: {
        colors: "bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 border-violet-200",
        icon: Crown,
      },
      USER: {
        colors: "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700 border-gray-200",
        icon: User,
      },
    };

    const config = roleConfig[role as keyof typeof roleConfig];
    const IconComponent = config.icon;

    return (
      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold border ${config.colors}`}>
        <IconComponent className="w-3 h-3 mr-2" />
        {role === "ADMIN" ? "Admin" : "User"}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const generateAvatar = (name: string) => {
    const colors = ["violet", "purple", "pink", "orange", "blue", "green"];
    const colorIndex = name.charCodeAt(0) % colors.length;
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

    return (
      <div className={`w-12 h-12 rounded-full bg-gradient-to-r from-${colors[colorIndex]}-400 to-${colors[colorIndex]}-600 flex items-center justify-center text-white font-bold text-lg`}>
        {initials}
      </div>
    );
  };

  const stats = useMemo(() => {
    const activeUsers = users.filter((u) => u.status === "active").length;
    const blockedUsers = users.filter((u) => u.status === "blocked").length;
    const adminUsers = users.filter((u) => u.role === "ADMIN").length;

    return { activeUsers, blockedUsers, adminUsers };
  }, [users]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-violet-600 mx-auto mb-4"></div>
          <p className="text-violet-600 font-semibold">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error && users.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-2xl font-bold text-violet-700 mb-2">Failed to load users</h3>
          <p className="text-violet-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold rounded-2xl hover:shadow-lg transition-all duration-300"
          >
            Try Again
          </button>
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

      <div className="relative max-w-7xl mx-auto p-6 space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-700 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-4">
            User Management
          </h1>
          <p className="text-violet-600 text-lg font-medium mb-8">
            Monitor and manage user accounts across your platform
          </p>

          {error && (
            <div className="bg-yellow-100 border border-yellow-300 rounded-2xl p-4 mb-6">
              <p className="text-yellow-700 text-sm">
                ⚠️ API connection failed. Showing demo data. Error: {error}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-xl shadow-slate-900/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-violet-600 font-semibold text-sm mb-1">TOTAL USERS</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-violet-700 to-purple-700 bg-clip-text text-transparent">
                    {users.length}
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-xl shadow-slate-900/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 font-semibold text-sm mb-1">ACTIVE USERS</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
                    {stats.activeUsers}
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl">
                  <Activity className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-xl shadow-slate-900/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 font-semibold text-sm mb-1">BLOCKED USERS</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-orange-700 to-red-700 bg-clip-text text-transparent">
                    {stats.blockedUsers}
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl">
                  <ShieldOff className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-xl shadow-slate-900/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-600 font-semibold text-sm mb-1">ADMINS</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-pink-700 to-purple-700 bg-clip-text text-transparent">
                    {stats.adminUsers}
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl">
                  <Crown className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl shadow-xl shadow-slate-900/10 p-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-violet-400" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl focus:ring-2 focus:ring-violet-500 focus:border-transparent font-medium"
              />
            </div>

            <div className="flex items-center gap-3">
              <Filter className="h-5 w-5 text-violet-600" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as "all" | "active" | "blocked")}
                className="px-4 py-3 bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl focus:ring-2 focus:ring-violet-500 font-medium text-violet-700"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as "all" | "USER" | "ADMIN")}
                className="px-4 py-3 bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl focus:ring-2 focus:ring-violet-500 font-medium text-violet-700"
              >
                <option value="all">All Roles</option>
                <option value="ADMIN">Admin</option>
                <option value="USER">User</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl shadow-xl shadow-slate-900/10 hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      {user.profileImage ? (
                        <img
                          src={user.profileImage}
                          alt={user.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      <div className={user.profileImage ? "hidden" : ""}>
                        {generateAvatar(user.name)}
                      </div>
                      <div
                        className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-md ${
                          user.status === "active" ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-violet-700">{user.name}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        {getStatusBadge(user.status || "active")}
                        {getRoleBadge(user.role)}
                      </div>
                    </div>
                  </div>

                  <button className="p-2 hover:bg-white/50 rounded-xl transition-all duration-200">
                    <MoreHorizontal className="h-5 w-5 text-violet-600" />
                  </button>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-violet-600">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{user.email}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-violet-600">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {formatDate(user.createdAt)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-white/30">
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-white/60 to-white/40 backdrop-blur-md border border-white/30 rounded-2xl hover:from-white/80 hover:to-white/60 transition-all duration-300 font-semibold text-violet-700"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </button>

                  <button
                    onClick={() => toggleUserStatus(user._id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-bold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                      user.status === "active"
                        ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                        : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    }`}
                  >
                    {user.status === "active" ? (
                      <>
                        <ShieldOff className="h-4 w-4" />
                        Block
                      </>
                    ) : (
                      <>
                        <Shield className="h-4 w-4" />
                        Unblock
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-2xl font-bold text-violet-700 mb-2">No users found</h3>
            <p className="text-violet-600 mb-6">
              {searchTerm ? `No users match "${searchTerm}"` : "No users available"}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold rounded-2xl hover:shadow-lg transition-all duration-300"
              >
                Clear Search
              </button>
            )}
          </div>
        )}

        {selectedUser && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/90 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-700 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                    User Details
                  </h2>
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="p-2 hover:bg-white/50 rounded-xl transition-all duration-200"
                  >
                    <X className="h-6 w-6 text-violet-600" />
                  </button>
                </div>

                <div className="text-center mb-8">
                  {selectedUser.profileImage ? (
                    <img
                      src={selectedUser.profileImage}
                      alt={selectedUser.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className={`w-24 h-24 mx-auto mb-4 ${selectedUser.profileImage ? 'hidden' : ''}`}>
                    {generateAvatar(selectedUser.name)}
                  </div>
                  <h3 className="text-2xl font-bold text-violet-700 mb-2">{selectedUser.name}</h3>
                  <div className="flex items-center justify-center gap-3">
                    {getStatusBadge(selectedUser.status || "active")}
                    {getRoleBadge(selectedUser.role)}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="text-sm font-bold text-violet-600 block mb-2">Email</label>
                      <p className="text-sm text-violet-700 break-all">{selectedUser.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-bold text-violet-600 block mb-2">Join Date</label>
                      <p className="text-sm text-violet-700">{formatDate(selectedUser.createdAt)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-bold text-violet-600 block mb-2">Last Updated</label>
                      <p className="text-sm text-violet-700">{formatDate(selectedUser.updatedAt)}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-violet-600 block mb-2">User ID</label>
                    <p className="text-sm text-violet-700 font-mono break-all">{selectedUser._id}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;