import { Card, CardContent } from "@/components/ui/card";

interface TestimonialProps {
  name: string;
  text: string;
}

export function Testimonial({ name, text }: TestimonialProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="mb-4 italic">"{text}"</p>
        <p className="text-right font-semibold">- {name}</p>
      </CardContent>
    </Card>
  );
}
