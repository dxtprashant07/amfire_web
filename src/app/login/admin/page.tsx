import type { Metadata } from "next";
import { LoginView } from "../LoginView";

export const metadata: Metadata = {
  title: "Admin sign-in | amfire",
  robots: "noindex, nofollow",
};

export default function AdminLoginPage() {
  return <LoginView initialMode="team" />;
}
