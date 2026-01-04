import { create } from "zustand";
import type {
  MockUser,
  MockSession,
  UserProfile,
  UserDashboard,
  UserStats
} from "@/lib/mockData";

// Réexporter les types pour la compatibilité
export type { UserProfile, UserDashboard, UserStats };

interface UserState {
  // Auth state
  user: MockUser | null;
  session: MockSession | null;
  isLoading: boolean;

  // User data (multi-tenant isolated)
  profile: UserProfile | null;
  dashboard: UserDashboard | null;
  stats: UserStats | null;

  // Actions
  setUser: (user: MockUser | null) => void;
  setSession: (session: MockSession | null) => void;
  setLoading: (loading: boolean) => void;
  setProfile: (profile: UserProfile | null) => void;
  setDashboard: (dashboard: UserDashboard | null) => void;
  setStats: (stats: UserStats | null) => void;

  // Reset all user data on logout
  clearUserData: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  // Initial state
  user: null,
  session: null,
  isLoading: true,
  profile: null,
  dashboard: null,
  stats: null,

  // Actions
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setLoading: (isLoading) => set({ isLoading }),
  setProfile: (profile) => set({ profile }),
  setDashboard: (dashboard) => set({ dashboard }),
  setStats: (stats) => set({ stats }),

  // Clear all user data on logout
  clearUserData: () => set({
    user: null,
    session: null,
    profile: null,
    dashboard: null,
    stats: null,
  }),
}));
