import { achievements } from '@/data/achievements';

export default function Achievements() {
  return (
    <section>
      <h3 className="text-lg sm:text-xl font-bold border-b pb-2 mb-4 sm:mb-6 print:mb-2">기타</h3>
      <div className="space-y-4">
        {achievements.map((achievement, index) => (
          <div key={index}>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 space-y-1 sm:space-y-0 print:mb-0">
              <h4 className="sm:text-lg font-semibold print:text-base">{achievement.title}</h4>
              <span className="text-sm">{achievement.date}</span>
            </div>
            <p className="text-sm print:leading-tight">{achievement.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
