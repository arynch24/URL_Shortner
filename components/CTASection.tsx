import React from 'react'

const CTASection = () => {
    return (
        <div>
            <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready to get started?
                    </h2>
                    <p className="md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of businesses already using Cuttly to manage their links more effectively.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="text-sm md:text-base bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                            Start Free Trial
                        </button>
                        <button className="text-sm md:text-base border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                            View Demo
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CTASection
