import { contactData } from '@/data/contact';
import { heroData } from '@/data/hero';

export default function Header() {
  return (
    <header className="mb-6 border-b border-slate-300 pb-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-normal text-slate-950 sm:text-3xl">
            {heroData.name}
          </h1>
          <p className="mt-1 text-base font-semibold text-slate-700 sm:text-lg">{heroData.title}</p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{heroData.description}</p>
        </div>
        <div className="space-y-1 text-left text-xs leading-5 text-slate-600 sm:min-w-52 sm:text-right sm:text-sm">
          <a className="break-all hover:text-slate-950" href={`mailto:${contactData.email.value}`}>
            {contactData.email.value}
          </a>
          {contactData.social.map((social, index) => (
            <div key={index}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all hover:text-slate-950"
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
