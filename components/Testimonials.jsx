"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Star } from "lucide-react";
import "swiper/css";

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Musa Musa K",
      role: "Final Year Student",
      feedback:
        "SmartDrill has made studying so much easier! Accessing past questions and taking mock tests has boosted my confidence for exams.",
      avatar: "/avatar1.jpg",
      rating: 5,
    },
    {
      id: 2,
      name: "Ibrahim Mubarak",
      role: "2nd Year Student",
      feedback:
        "The AI explanations are amazing! They make complex topics easy to understand. I recommend SmartDrill to every student.",
      avatar: "/avatar2.jpg",
      rating: 4,
    },
    {
      id: 3,
      name: "Fayeye Ezekiel",
      role: "Graduate Student",
      feedback:
        "SmartDrill is a lifesaver. It helped me prepare effectively for my exams by organizing past questions and tracking my progress.",
      avatar: "/avatar3.jpg",
      rating: 5,
    },
  ];

  return (
    <section className="bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center">
        {/* Section Header */}
        <h2 className="text-4xl font-extrabold text-blue-900 dark:text-white">
          What Our <span className="text-blue-500">Users Say</span>
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Our customers love using SmartDrill to simplify their lives and boost
          productivity.
        </p>

        {/* Swiper Carousel */}
        <div className="mt-12">
          <Swiper
            spaceBetween={50}
            slidesPerView={3}
            loop={true}
            autoplay={{ delay: 4000 }}
            breakpoints={{
              1024: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 1,
              },
            }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="p-6 mx-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow text-left">
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-blue-900 dark:text-white">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-600 dark:text-gray-300">
                    {testimonial.feedback}
                  </p>
                  <div className="mt-4 flex items-center">
                    {[...Array(testimonial.rating)].map((_, index) => (
                      <Star
                        key={index}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                      />
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
