import { BarChart3, QrCode, Zap } from 'lucide-react';

const FeaturesSection = () => {

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
          icon: Zap,
          title: "Fast Performance",
          description: "Lightning-fast redirects with 99.9% uptime guarantee."
        }
      ];
    
  return (
    <div>
       <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful features for modern teams
            </h2>
            <p className="md:text-xl text-gray-600 max-w-3xl mx-auto ">
              Everything you need to create, manage, and track your shortened links with enterprise-grade reliability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl hover:shadow-md transition-shadow feature-card shadow-lg">
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

    </div>
  )
}

export default FeaturesSection
