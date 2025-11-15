"use client"
import React, { useState, useEffect } from 'react';
import { Sparkles, Video, Phone, Calendar, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const router = useRouter();

  const handleButtonOnclick = () => {
    router.push("/signin")
  }

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id^="animate-"]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Video className="w-7 h-7" />,
      title: "Create New Interview",
      description: "Create AI Interviews and schedule them with Candidates",
      color: "bg-blue-600"
    },
    {
      icon: <Phone className="w-7 h-7" />,
      title: "Phone Screening Call",
      description: "Schedule phone screening call with Candidates",
      color: "bg-blue-600"
    },
    {
      icon: <Calendar className="w-7 h-7" />,
      title: "Easy Scheduling",
      description: "Simple scheduling system for managing candidate interviews",
      color: "bg-blue-600"
    },
    {
      icon: <Sparkles className="w-7 h-7" />,
      title: "AI-Powered",
      description: "Let AI handle the initial screening conversations",
      color: "bg-blue-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 pt-4 px-6">
        <div className="max-w-[1400px] mx-auto backdrop-blur-md bg-white/30 border border-white/50 rounded-2xl shadow-xl px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Image src={"/homelogo.png"} alt='ai-interview-recruiter' width="30" height="30" className='brightness-50' />
              </div>
              <span className="text-xl font-semibold text-blue-600">AI Recruiter</span>
            </div>
            <button className="px-6 py-2.5 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium shadow-sm" onClick={handleButtonOnclick}>
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div 
          id="animate-hero"
          className={`text-center transition-all duration-1000 ${
            isVisible['animate-hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-block mb-6 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-sm text-blue-700 font-medium">
            AI-Driven Interviews, Hassle-Free Hiring
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Simplify Your Hiring
            <br />
            <span className="text-blue-600">With AI Interviews</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            A simple tool to help with candidate screening. Create interviews, 
            schedule calls, and let AI assist with initial conversations.
          </p>

          <div className="flex items-center justify-center space-x-4">
            <button className="group px-8 py-3.5 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium shadow-sm flex items-center space-x-2" onClick={handleButtonOnclick}>
              <span>Try It Out</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-3.5 cursor-pointer bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium">
              Learn More
            </button>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div 
          id="animate-preview"
          className={`mt-16 transition-all duration-1000 delay-200 ${
            isVisible['animate-preview'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{
            transform: `translateY(${scrollY * 0.1}px)`
          }}
        >
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 max-w-4xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-500">AI-Driven Interviews, Hassle-Free Hiring</p>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-4">Dashboard</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200 group">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Create New Interview</h4>
                <p className="text-sm text-gray-600">Create AI Interviews and schedule them with Candidates</p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200 group">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Create Phone Screening Call</h4>
                <p className="text-sm text-gray-600">Schedule phone screening call with Candidates</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div 
          id="animate-features-title"
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible['animate-features-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What You Can Do
          </h2>
          <p className="text-gray-600 text-lg">Simple tools to help with your interview process</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              id={`animate-feature-${index}`}
              className={`bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
                isVisible[`animate-feature-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-4 text-white`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div 
          id="animate-cta"
          className={`bg-blue-600 rounded-2xl p-12 text-center text-white shadow-xl transition-all duration-1000 ${
            isVisible['animate-cta'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            This is a hobby project exploring how AI can help with interview screening. 
            Give it a try and see how it works.
          </p>
          <button className="group px-8 py-3.5 cursor-pointer bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200 font-semibold flex items-center space-x-2 mx-auto shadow-lg" onClick={handleButtonOnclick}> 
            <span>Start Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center text-gray-600">
            <p>A hobby project exploring AI × Recruiting</p>
            <p className="mt-2 text-sm text-gray-500">Built with Next.js</p>
          </div>
        </div>
      </footer>
    </div>
  );
}