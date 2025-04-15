import Header from '@/components/header'
import HeroSection from '@/components/hero-section'
import NearbyFriends from '@/components/nearby-friends'
import Footer from '@/components/footer'

export default function LandingPage() {
    return (
        <div className='flex flex-col min-h-screen items-center justify-center'>
            <Header />
            <main className='flex flex-col'>
                <HeroSection />
                <NearbyFriends />
            </main>
            <Footer />
        </div>
    )
}
