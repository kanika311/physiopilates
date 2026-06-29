import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileClient from "@/components/account/ProfileClient";

export const metadata = { title: "My Profile" };

export default function ProfilePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[60vh]">
        <ProfileClient />
      </main>
      <Footer />
    </>
  );
}
