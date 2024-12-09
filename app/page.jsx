import FeaturesSection from '@/components/Features';
import Footer from '@/components/Footer';
import HeroSection from '@/components/Hero';
import PricingSection from '@/components/Pricing';
import TestimonialSection from '@/components/Testimonials';
import React from 'react'

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <TestimonialSection />
      <Footer />
    </div>
  )
}

export default Home;