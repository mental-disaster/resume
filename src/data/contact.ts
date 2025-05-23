import { IconBrandGithub, IconBrandLinkedin, IconBrandX } from "@tabler/icons-react";

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
  phone: {
    label: string;
    value: string;
  };
  social: SocialLink[];
}

export const contactData: ContactInfo = {
  email: {
    label: "이메일",
    value: "dummy618234@email.com"
  },
  phone: {
    label: "전화번호",
    value: ""
  },
  social: [
    {
      label: "GitHub",
      icon: IconBrandGithub,
      url: "https://github.com"
    },
    {
      label: "LinkedIn",
      icon: IconBrandLinkedin,
      url: "https://linkedin.com"
    },
    {
      label: "Twitter",
      icon: IconBrandX,
      url: "https://x.com"
    }
  ]
};