import { aboutData } from '@/data/about';

export default function About() {
  return (
    <section>
      <h3 className="text-lg sm:text-xl font-bold border-b pb-2 mb-4 sm:mb-6">자기소개</h3>
      <div className="text-sm space-y-4">
        {aboutData.strengths.map((desc, index) => (
          <p key={index} className="leading-relaxed whitespace-pre-line">
            {desc}
          </p>
        ))}
      </div>
    </section>
  );
}
