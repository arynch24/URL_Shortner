import React, { useState } from 'react';
import { BarChart3, QrCode, Shield, Zap, Users, Globe, Eye, Copy, Check, Star, ArrowRight, Menu, X } from 'lucide-react';

export default function CuttlyWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const handleShortenUrl = () => {
    if (urlInput) {
      setShortenedUrl('cuttly.try/' + Math.random().toString(36).substr(2, 8));
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortenedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const features = [
    {
      icon: BarChart3,
      title: "Analytics",
      description: "Track your link performance with detailed analytics and insights."
    },
    {
      icon: QrCode,
      title: "QR Codes",
      description: "Generate QR codes for your short links instantly."
    },
    {
      icon: Shield,
      title: "Security",
      description: "Enterprise-grade security to protect your links and data."
    },
    {
      icon: Zap,
      title: "Fast Performance",
      description: "Lightning-fast redirects with 99.9% uptime guarantee."
    },
    {
      icon: Users,
      title: "Team Management",
      description: "Collaborate with your team and manage permissions easily."
    },
    {
      icon: Globe,
      title: "Global CDN",
      description: "Worldwide content delivery for optimal performance."
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: ["1,000 links/month", "Basic analytics", "QR codes", "Email support"],
      popular: false
    },
    {
      name: "Pro",
      price: "$9",
      period: "per month",
      features: ["10,000 links/month", "Advanced analytics", "Custom domains", "Team collaboration", "Priority support"],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$29",
      period: "per month",
      features: ["Unlimited links", "White-label solution", "API access", "Custom integrations", "Dedicated support"],
      popular: false
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechStart Inc.",
      content: "Cuttly has revolutionized how we track our marketing campaigns. The analytics are incredibly detailed.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Social Media Manager",
      company: "BrandFlow",
      content: "Best URL shortener I've used. The QR code feature saves us so much time in our campaigns.",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "Content Creator",
      company: "Creative Hub",
      content: "Clean interface, powerful features. Cuttly makes link management effortless.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="bg-blue-600 text-white p-2 rounded-lg mr-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5z"></path>
                  <path d="M7.414 15.414a2 2 0 01-2.828-2.828l3-3a2 2 0 012.828 0 1 1 0 001.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5z"></path>
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900">Cuttly</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">Reviews</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
              <button className="text-gray-700 hover:text-blue-600 transition-colors">Login</button>
              <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                SignUp
              </button>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-2">
              <a href="#features" className="block py-2 text-gray-700">Features</a>
              <a href="#pricing" className="block py-2 text-gray-700">Pricing</a>
              <a href="#testimonials" className="block py-2 text-gray-700">Reviews</a>
              <a href="#contact" className="block py-2 text-gray-700">Contact</a>
              <button className="block py-2 text-gray-700">Login</button>
              <button className="block bg-black text-white px-4 py-2 rounded-lg mt-2">SignUp</button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full inline-flex items-center mb-6">
                <span className="text-sm font-medium">🔗 Introducing Cuttly - Smart, short links made simple.</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Create short links
                <span className="text-blue-600 block">with superpowers</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Cuttly is a URL shortening service that lets you create custom short links, track clicks, and manage your links easily — perfect for marketers, businesses, or anyone sharing links.
              </p>
              
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </div>
            
            <div className="flex-1 w-full max-w-md">
              <div className="bg-white p-8 rounded-2xl shadow-xl border">
                <div className="flex items-center mb-4">
                  <Zap className="w-6 h-6 text-blue-600 mr-2" />
                  <span className="text-lg font-semibold">Try it out</span>
                </div>
                
                <div className="space-y-4">
                  <input
                    type="url"
                    placeholder="Paste your long URL here..."
                    className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                  />
                  
                  <button 
                    onClick={handleShortenUrl}
                    className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Shorten URL
                  </button>
                  
                  {shortenedUrl && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-blue-600 text-white p-2 rounded mr-3">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5z"></path>
                            </svg>
                          </div>
                          <span className="font-mono text-sm">{shortenedUrl}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500 flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            62.6K Clicks
                          </span>
                          <button 
                            onClick={handleCopy}
                            className="text-blue-600 hover:text-blue-700 p-1"
                          >
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful features for modern teams
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create, manage, and track your shortened links with enterprise-grade reliability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow feature-card">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-lg w-fit mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by millions worldwide
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of businesses that rely on Cuttly for their link management needs.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">5M+</div>
              <div className="text-gray-600">Links Created</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">100K+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">150+</div>
              <div className="text-gray-600">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that fits your needs. Upgrade or downgrade at any time.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`bg-white p-8 rounded-xl shadow-sm ${plan.popular ? 'ring-2 ring-blue-600 relative' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-1">{plan.price}</div>
                  <div className="text-gray-600">{plan.period}</div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  plan.popular 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What our customers say
            </h2>
            <p className="text-xl text-gray-600">
              See why thousands of businesses trust Cuttly for their link management.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  <div className="text-gray-600 text-sm">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      

      {/* Footer */}
      
    </div>
  );
}