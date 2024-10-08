"use client"

import Header from '@/app/ui/header'
import Hero from './ui/hero';
import Shortner from './ui/shortner';
import Features from './ui/features';
import Pricing from './ui/pricing';
import Faq from './ui/faq';
import Footer from './ui/footer';


export default function Home() {
  return (
    <main className='px-[5%] md:px-[10%] '>
      <div className='md:max-w-screen-xl mx-auto'>
        <div className='sticky top-2 bg-slate-200 dark:bg-slate-400 rounded-[20px]'>
          <Header />
        </div>
        <Hero />
        <Shortner />
        <Features />
        <Pricing />
        <Faq />
        <Footer />
      </div>
    </main>
  );
}
