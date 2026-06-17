import { contactData } from '@/data/contact';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">연락처</h2>
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <h3 className="font-semibold mb-2">{contactData.email.label}</h3>
            <a href={`mailto:${contactData.email.value}`} className="text-primary hover:underline">
              {contactData.email.value}
            </a>
          </div>
          <div className="flex justify-center space-x-6">
            {contactData.social.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-grey"
              >
                {social.icon ? <social.icon className="w-6 h-6" /> : social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
