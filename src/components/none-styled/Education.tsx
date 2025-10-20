import { education } from '@/data/education';

export default function Education() {
  return (
    <section>
      <h3 className="text-lg sm:text-xl font-bold border-b pb-2 mb-4 sm:mb-6">교육/활동</h3>
      <div className="space-y-4">
        {education.map((edu, index) => (
          <div key={index}>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 space-y-1 sm:space-y-0">
              <h4 className="font-semibold">{edu.institution}</h4>
              <span className="text-sm">{edu.period}</span>
            </div>
            <p className="text-sm">{edu.activity}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
