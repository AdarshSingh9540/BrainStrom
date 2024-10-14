import { cookies } from 'next/headers';
import LandingPageClient from '@/components/HeroSection';

export default async function LandingPage() {
  // Retrieve cookies
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access_token')?.value;
  const idToken = cookieStore.get('id_token')?.value;
  const isUserAuthenticated = !!accessToken || !!idToken;
  return <LandingPageClient isUserAuthenticated={isUserAuthenticated} />;
}
