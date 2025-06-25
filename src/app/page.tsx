'use client';

import { heroData } from '@/data/hero';
import { aboutData } from '@/data/about';
import { experience } from '@/data/experience';
import { skills } from '@/data/skills';
import { education } from '@/data/education';
import { projects } from '@/data/projects';
import { contactData } from '@/data/contact';
import { achievements } from '@/data/achievements';
import { IconMail, IconPhone, IconBrandGithub } from '@tabler/icons-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-2xl mx-auto bg-white md:shadow-lg">
        <div className="p-4 sm:p-6 md:p-8">
          {/* 헤더 섹션 */}
          <header className="border-b-2 border-primary pb-4 sm:pb-6 mb-6 sm:mb-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start space-y-4 md:space-y-0">
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">{heroData.name}</h1>
                <h2 className="text-lg sm:text-xl mb-3">{heroData.title}</h2>
                <p className="text-gray text-sm leading-relaxed max-w-2xl">
                  {heroData.description}
                </p>
              </div>
              <div className="text-left md:text-right text-sm space-y-1">
                <div className="flex items-center gap-2">
                  <IconMail size={16} />
                  <span className="break-all">{contactData.email.value}</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconPhone size={16} />
                  <span>{contactData.phone.value}</span>
                </div>
                {contactData.social.map((social, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {social.icon && <social.icon size={16} />}
                    <a href={social.url} target="_blank" rel="noopener noreferrer" className="hover:text-gray break-all">
                      {social.url.replace(/^https?:\/\//, '').replace(/^www\./, '')}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </header>

          <main className="space-y-6 sm:space-y-8">
            {/* 자기소개 */}
            <section>
              <h3 className="text-lg sm:text-xl font-bold border-b pb-2 mb-4 sm:mb-6">
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

            {/* 경력사항 */}
            <section>
              <h3 className="text-lg sm:text-xl font-bold border-b pb-2 mb-4 sm:mb-6">
                경력사항
              </h3>
              {experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-dark pl-4 sm:pl-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 space-y-1 sm:space-y-0">
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold">{exp.position}</h4>
                      <p>{exp.company}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {exp.startedAt} - {exp.endedAt || '현재'}
                    </span>
                  </div>
                  <p className="text-sm mb-4">{exp.description}</p>
                  <ul className="text-sm space-y-2 ml-4 mb-4">
                    {exp.details.map((detail, idx) => (
                      <li key={idx} className="list-disc">{detail}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {exp.keywords.map((keyword, idx) => (
                      <span key={idx} className="px-2 sm:px-3 py-1 bg-gray-100 text-xs sm:text-sm rounded">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            {/* 주요 프로젝트 */}
            <section>
              <h3 className="text-lg sm:text-xl font-bold border-b pb-2 mb-4 sm:mb-6">
                주요 프로젝트
              </h3>
              <div className="space-y-6">
                {projects.map((project, index) => (
                  <div key={index} className="border-l-4 border-gray pl-4 sm:pl-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 space-y-1 sm:space-y-0">
                      <h4 className="text-base sm:text-lg font-semibold">{project.title}</h4>
                      <span className="text-sm text-gray-500">
                        {project.startedAt} - {project.endedAt || '진행중'}
                      </span>
                    </div>
                    <p className="text-sm mb-2">{project.description}</p>
                    {project.scale && (
                      <p className="text-sm mb-3 font-medium">
                        {project.scale}
                      </p>
                    )}
                    {project.details && (
                      <ul className="text-sm space-y-2 ml-4 mb-3">
                        {project.details.map((detail, idx) => (
                          <li key={idx} className="list-disc">{detail}</li>
                        ))}
                      </ul>
                    )}
                    {project.achievements && (
                      <div className="bg-success/10 p-3 rounded-lg mb-3 border border-success">
                        <h5 className="text-sm font-semibold text-green-800 mb-2">주요 성과</h5>
                        <ul className="text-sm text-green-700 space-y-1">
                          {project.achievements.map((achievement, idx) => (
                            <li key={idx}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, idx) => (
                        <span key={idx} className="px-2 sm:px-3 py-1 bg-blue-50 text-xs sm:text-sm text-blue-700 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 기타 */}
            <section>
              <h3 className="text-lg sm:text-xl font-bold border-b pb-2 mb-4 sm:mb-6">
                기타
              </h3>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="border-l-4 border-green-500 pl-4 sm:pl-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 space-y-1 sm:space-y-0">
                      <h4 className="text-base sm:text-lg font-semibold">{achievement.title}</h4>
                      <span className="text-sm text-gray-500">{achievement.date}</span>
                    </div>
                    <p className="text-sm">{achievement.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 교육/활동 */}
            <section>
              <h3 className="text-lg sm:text-xl font-bold border-b pb-2 mb-4 sm:mb-6">
                교육/활동
              </h3>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4 sm:pl-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 space-y-1 sm:space-y-0">
                      <h4 className="font-semibold">{edu.institution}</h4>
                      <span className="text-sm text-gray-500">{edu.period}</span>
                    </div>
                    <p className="text-sm">{edu.activity}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 기술스택 */}
            <section>
              <h3 className="text-lg sm:text-xl font-bold border-b pb-2 mb-4 sm:mb-6">
                기술스택
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <h4 className="font-semibold mb-3 capitalize">
                      {skill.category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skill.tech.map((tech, idx) => (
                        <span key={idx} className="px-2 sm:px-3 py-1 text-xs sm:text-sm rounded flex items-center gap-1 bg-gray-100">
                          {tech.icon && <tech.icon className="w-3 h-3 sm:w-4 sm:h-4" />} {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
