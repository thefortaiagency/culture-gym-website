import Navbar from '../components/Navbar'
import BottomNav from '../components/BottomNav'
import Membership from '../components/Membership'

export default function MembershipPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Membership />
      </main>
      <BottomNav />
    </>
  )
}