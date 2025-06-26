import { aboutData } from '@/data/about';

export default function About() {
  return (
    <section className="print:break-inside-avoid">
      <h3 className="text-lg sm:text-xl font-bold border-b pb-2 mb-4 sm:mb-6 print:mb-2">
        자기소개
      </h3>
      <div className="text-sm space-y-4">
        {aboutData.description.map((desc, index) => (
          <p key={index} className="leading-relaxed">
            {desc}
          </p>
        ))}
      </div>
    </section>
  );
}
