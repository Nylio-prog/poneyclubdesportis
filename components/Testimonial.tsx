import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "@/components/ui/Star";

interface TestimonialProps {
  name: string;
  text: string;
}

export function Testimonial({ name, text }: TestimonialProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div>
            <p className="font-semibold text-lg text-gray-800">{name}</p>
          </div>
        </div>
        <p className="text-gray-600 italic mb-4">"{text}"</p>
        <div className="mt-4 flex">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
