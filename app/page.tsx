import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import NearbyFriends from "@/components/nearby-friends"
import Footer from "@/components/footer"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <NearbyFriends />
      </main>
      <Footer />
    </div>
  )
}
