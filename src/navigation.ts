import { BUSINESS } from 'astrowind:config';

export const headerData = {
  links: [
    // {
    //   text: 'About',
    //   href: getPermalink('/about'),
    // },
    // {
    //   text: 'Services',
    //   href: getPermalink('/services'),
    // },
    // {
    //   text: 'Reviews',
    //   href: getPermalink('/reviews'),
    // },
    // {
    //   text: 'SAT Resources',
    //   href: getPermalink('/sat-resources'),
    // },
    // {
    //   text: 'Contact',
    //   href: getPermalink('/contact'),
    // },
  ],
  actions: [{ text: 'Call Today', href: 'tel:8329009422' }],
};

export const footerData = {
  links: [
    // {
    //   title: 'Pages',
    //   links: [
    //     { text: 'About', href: getPermalink('/about') },
    //     { text: 'Services', href: getPermalink('/services') },
    //     { text: 'Reviews', href: getPermalink('/reviews') },
    //     { text: 'Contact', href: getPermalink('/contact') },
    //   ],
    // },
    // {
    //   title: 'Tutoring Packages',
    //   links: [
    //     { text: 'A La Carte', href: '/#pricing' },
    //     { text: '4-Hour Starter', href: '/#pricing' },
    //     { text: '12-Hour Accelerator', href: '/#pricing' },
    //     { text: '18-Hour Elite', href: '/#pricing' },
    //   ],
    // },
    // {
    //   title: 'Resources',
    //   links: [
    //     { text: 'Free SAT Resources', href: getPermalink('/sat-resources') },
    //     { text: 'Book a Consultation', href: getPermalink('/contact') },
    //   ],
    // },
    // {
    //   title: 'Legal',
    //   links: [
    //     { text: 'Privacy Policy', href: getPermalink('/privacy') },
    //     { text: 'Terms of Service', href: getPermalink('/terms') },
    //   ],
    // },
  ],
  secondaryLinks: [],
  socialLinks: [],
  footNote: `
    © ${new Date().getFullYear()} ${BUSINESS.name}. All rights reserved.
  `,
};
