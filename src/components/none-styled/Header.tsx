import { contactData } from '@/data/contact';
import { heroData } from '@/data/hero';
import { IconMail, IconPhone } from '@tabler/icons-react';

export default function Header() {
  return (
    <header className="border-b-2 border-primary pb-4 sm:pb-6 mb-6 sm:mb-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start space-y-4 md:space-y-0">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">{heroData.name}</h1>
          <h2 className="text-lg sm:text-xl mb-3">{heroData.title}</h2>
          <p className="text-gray text-sm leading-relaxed max-w-2xl">{heroData.description}</p>
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
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray break-all"
              >
                {social.url.replace(/^https?:\/\//, '').replace(/^www\./, '')}
              </a>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
