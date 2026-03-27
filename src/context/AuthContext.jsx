import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  // Load users and current user from localStorage on mount
  useEffect(() => {
    try {
      // Load all registered users
      const savedUsers = localStorage.getItem("users");
      if (savedUsers) {
        setUsers(JSON.parse(savedUsers));
      } else {
        // Create default admin user if no users exist
        const defaultUsers = [
          {
            id: "1",
            name: "Admin User",
            email: "admin@example.com",
            password: "admin123",
            profilePicture:
              "https://ui-avatars.com/api/?background=5f774f&color=fff&size=128&name=Admin",
            joinDate: new Date().toISOString(),
            role: "admin",
          },
        ];
        setUsers(defaultUsers);
        localStorage.setItem("users", JSON.stringify(defaultUsers));
      }

      // Load current logged in user
      const savedUser = localStorage.getItem("currentUser");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Error loading auth data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save users to localStorage whenever they change
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]);

  // Save current user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [user]);

  const register = (name, email, password, profilePicture = null) => {
    return new Promise((resolve, reject) => {
      // Check if user already exists
      const userExists = users.some((u) => u.email === email);
      if (userExists) {
        toast.error("User already exists with this email");
        reject(new Error("User already exists"));
        return;
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        profilePicture:
          profilePicture ||
          `https://ui-avatars.com/api/?background=5f774f&color=fff&size=128&name=${encodeURIComponent(name)}`,
        joinDate: new Date().toISOString(),
        role: "user",
      };

      setUsers((prev) => [...prev, newUser]);
      setUser(newUser);
      toast.success("Registration successful!");
      resolve(newUser);
    });
  };

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      const foundUser = users.find(
        (u) => u.email === email && u.password === password,
      );

      if (foundUser) {
        // Remove password from user object before storing
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        toast.success(`Welcome back, ${foundUser.name}!`);
        resolve(userWithoutPassword);
      } else {
        toast.error("Invalid email or password");
        reject(new Error("Invalid credentials"));
      }
    });
  };

  const logout = () => {
    setUser(null);
    toast.success("Logged out successfully");
  };

  const updateProfile = (updatedData) => {
    return new Promise((resolve, reject) => {
      try {
        // Update in users array
        const updatedUsers = users.map((u) => {
          if (u.id === user.id) {
            return { ...u, ...updatedData };
          }
          return u;
        });
        setUsers(updatedUsers);

        // Update current user
        const updatedUser = { ...user, ...updatedData };
        setUser(updatedUser);

        toast.success("Profile updated successfully");
        resolve(updatedUser);
      } catch (error) {
        toast.error("Failed to update profile");
        reject(error);
      }
    });
  };

  const updateProfilePicture = (pictureUrl) => {
    return updateProfile({ profilePicture: pictureUrl });
  };

  const changePassword = (oldPassword, newPassword) => {
    return new Promise((resolve, reject) => {
      const userInDb = users.find((u) => u.id === user.id);

      if (userInDb.password !== oldPassword) {
        toast.error("Current password is incorrect");
        reject(new Error("Incorrect password"));
        return;
      }

      const updatedUsers = users.map((u) => {
        if (u.id === user.id) {
          return { ...u, password: newPassword };
        }
        return u;
      });

      setUsers(updatedUsers);
      toast.success("Password changed successfully");
      resolve();
    });
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    updateProfile,
    updateProfilePicture,
    changePassword,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
