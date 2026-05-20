import { getPermalink, getBlogPermalink } from './utils/permalinks';
import { BUSINESS } from 'astrowind:config';

export const headerData = {
  links: [
    {
      text: 'About',
      href: getPermalink('/about'),
    },
    {
      text: 'Services',
      href: getPermalink('/services'),
    },
    {
      text: 'Reviews',
      href: getPermalink('/reviews'),
    },
    {
      text: 'Pricing',
      href: getPermalink('/pricing'),
    },
    {
      text: 'Blog',
      href: getBlogPermalink(),
    },
    {
      text: 'Contact',
      href: getPermalink('contact'),
    },
  ],
  actions: [{ text: 'Get Started', href: getPermalink('/contact'), target: '_self' }],
};

export const footerData = {
  links: [
    {
      title: 'Company',
      links: [
        { text: 'About Us', href: getPermalink('/about') },
        { text: 'Our Services', href: getPermalink('/services') },
        { text: 'Reviews', href: getPermalink('/reviews') },
        { text: 'Pricing', href: getPermalink('/pricing') },
      ],
    },
    {
      title: 'Services',
      links: [{ text: 'Our Services', href: getPermalink('/services') }],
    },
    {
      title: 'Resources',
      links: [
        { text: 'Blog', href: getBlogPermalink() },
        { text: 'Contact', href: getPermalink('/contact') },
        { text: 'Get Started', href: getPermalink('/contact') },
      ],
    },
    {
      title: 'Legal',
      links: [
        { text: 'Privacy Policy', href: getPermalink('/privacy') },
        { text: 'Terms of Service', href: getPermalink('/terms') },
      ],
    },
  ],
  secondaryLinks: [],
  socialLinks: [
    { ariaLabel: 'Instagram', icon: 'lucide:instagram', href: BUSINESS.socialMedia?.instagram },
    { ariaLabel: 'Facebook', icon: 'lucide:facebook', href: BUSINESS.socialMedia?.facebook },
    ...(BUSINESS.socialMedia?.linkedin
      ? [{ ariaLabel: 'LinkedIn', icon: 'lucide:linkedin', href: BUSINESS.socialMedia.linkedin }]
      : []),
    ...(BUSINESS.socialMedia?.github
      ? [{ ariaLabel: 'Github', icon: 'lucide:github', href: BUSINESS.socialMedia.github }]
      : []),
  ],
  footNote: `
    © ${new Date().getFullYear()} ${BUSINESS.name}. All rights reserved.
  `,
};
