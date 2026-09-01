"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { clearUser, setUser } from "@/lib/redux/features/auth/authSlice";
import { getMyProfile } from "@/lib/api/user.api";

export default function AuthInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const data = await getMyProfile();

        if (data.success && data.user) {
          dispatch(setUser(data.user));
        } else {
          dispatch(clearUser());
        }
      } catch {
        dispatch(clearUser());
      }
    };

    initializeAuth();
  }, [dispatch]);

  return null;
}