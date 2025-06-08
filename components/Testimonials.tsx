import { Star } from 'lucide-react';

const Testimonials = () => {
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
        <>
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            What our customers say
                        </h2>
                        <p className="md:text-xl text-gray-600">
                            See why thousands of businesses trust Cuttly for their link management.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-gray-50 p-8 rounded-xl shadow-lg">
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
        </>
    )
}

export default Testimonials
