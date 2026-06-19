import { IconBrandGithub, IconBrandVimeo } from '@tabler/icons-react';

export interface SocialLink {
  label: string;
  icon?: React.ElementType;
  url: string;
}

export interface ContactInfo {
  email: {
    label: string;
    value: string;
  };
  social: SocialLink[];
}

export const contactData: ContactInfo = {
  email: {
    label: '이메일',
    value: 'resume@work.imgh.dev',
  },
  social: [
    {
      label: 'GitHub',
      icon: IconBrandGithub,
      url: 'https://github.com/mental-disaster',
    },
    {
      label: 'Velog',
      icon: IconBrandVimeo,
      url: 'https://velog.io/@dummy618234/posts',
    },
  ],
};
