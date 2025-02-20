import { ref } from 'vue';
import { User, MessageType, IMessage } from './types';
import { env } from '@/config/env';

export const me = ref<User>({
  id: 'user',
  name: 'You',
});
export const bot = ref<User>({
  id: 'assistant',
  // eslint-disable-next-line global-require, @typescript-eslint/no-unsafe-assignment
  avatar: true,
  name: 'Bot',
});

export const inactivityMessageDelay = 60000;
export const queryTextDelay = 3000;


// write property always in lowercase !important
export const links = {
  // products
  'administration panel': {
    attributes: { topic: 'Administration Panel', step: '' },
    message: { type: 'choice', value: 'tell me about Administration Panel' },
  },
  'filer service': {
    attributes: { topic: 'Filer Service', step: '' },
    message: { type: 'choice', value: 'tell me about Filer Service' },
  },
  'filer management': {
    attributes: { topic: 'Filer Service', step: '' },
    message: { type: 'choice', value: 'tell me about Filer Service' },
  },
  filer: {
    attributes: { topic: 'Filer Service', step: '' },
    message: { type: 'choice', value: 'tell me about Filer Service' },
  },
  'schema migration service': {
    attributes: { topic: 'Schema Migration Service', step: '' },
    message: { type: 'choice', value: 'tell me about Schema Migration Service' },
  },
  'electronic signatures': {
    attributes: { topic: 'Electronic Signature', step: '' },
    message: { type: 'choice', value: 'tell me about Electronic Signature' },
  },
  'electronic signature': {
    attributes: { topic: 'Electronic Signature', step: '' },
    message: { type: 'choice', value: 'tell me about Electronic Signature' },
  },
  'user service': {
    attributes: { topic: 'User service', step: '' },
    message: { type: 'choice', value: 'tell me about User Management' },
  },
  'user management': {
    attributes: { topic: 'User Service', step: '' },
    message: { type: 'choice', value: 'tell me about User Service' },
  },
  'notification service': {
    attributes: { topic: 'Notification System', step: '' },
    message: { type: 'choice', value: 'tell me about Notification System' },
  },
  'notification system': {
    attributes: { topic: 'Notification System', step: '' },
    message: { type: 'choice', value: 'tell me about Notification System' },
  },
  'payment system': {
    attributes: { topic: 'Payment System', step: '' },
    message: { type: 'choice', value: 'tell me about Payment System' },
  },
  'email system': {
    attributes: { topic: 'Email System', step: '' },
    message: { type: 'choice', value: 'tell me about Email System' },
  },
  'email service': {
    attributes: { topic: 'Email service', step: '' },
    message: { type: 'choice', value: 'tell me about Email System' },
  },
  'escrow management': {
    attributes: { topic: 'Escrow Management', step: '' },
    message: { type: 'choice', value: 'tell me about Escrow Management' },
  },
  'investment system': {
    attributes: { topic: 'Investment System', step: '' },
    message: { type: 'choice', value: 'tell me about Investment System' },
  },
  'offer service': {
    attributes: { topic: 'Offer Service', step: '' },
    message: { type: 'choice', value: 'tell me about Offer Service' },
  },
  'offer management': {
    attributes: { topic: 'Offer Service', step: '' },
    message: { type: 'choice', value: 'tell me about Offer Service' },
  },
  'KYC (Know Your Customer) verification': {
    attributes: { topic: 'KYC Verification', step: '' },
    message: { type: 'choice', value: 'tell me about KYC Verification' },
  },
  'KYC (Know Your Customer)': {
    attributes: { topic: 'KYC Verification', step: '' },
    message: { type: 'choice', value: 'tell me about KYC Verification' },
  },
  'kyc verification service': {
    attributes: { topic: 'KYC Verification', step: '' },
    message: { type: 'choice', value: 'tell me about KYC Verification' },
  },
  'kyc verification': {
    attributes: { topic: 'KYC Verification', step: '' },
    message: { type: 'choice', value: 'tell me about KYC Verification' },
  },
  'third-party service': {
    attributes: { topic: 'third-party service', step: '' },
    message: { type: 'choice', value: 'tell me about third-party service integration' },
  },
  'logging system': {
    attributes: { topic: 'Logging System', step: '' },
    message: { type: 'choice', value: 'tell me about Logging System' },
  },
  'queue system': {
    attributes: { topic: 'Queue System', step: '' },
    message: { type: 'choice', value: 'tell me about Queue System' },
  },
  'security suite': {
    attributes: { topic: 'Security Solutions', step: '' },
    message: { type: 'choice', value: 'tell me about Security Solutions' },
  },
  'security solutions': {
    attributes: { topic: 'Security Solutions', step: '' },
    message: { type: 'choice', value: 'tell me about Security Solutions' },
  },
  'security solution': {
    attributes: { topic: 'Security Solutions', step: '' },
    message: { type: 'choice', value: 'tell me about Security Solutions' },
  },
  'seo solutions': {
    attributes: { topic: 'SEO Solutions', step: '' },
    message: { type: 'choice', value: 'tell me about SEO Solutions' },
  },
  'seo solution': {
    attributes: { topic: 'SEO Solutions', step: '' },
    message: { type: 'choice', value: 'tell me about SEO Solutions' },
  },
  'digital ecosystem': {
    attributes: { topic: 'Digital Ecosystem', step: '' },
    message: { type: 'choice', value: 'tell me about Digital Ecosystem' },
  },
  'bank as a service': {
    attributes: { topic: 'Bank as a Service', step: '' },
    message: { type: 'choice', value: 'tell me about Bank as a Service' },
  },
  'bank as a service (baas)': {
    attributes: { topic: 'Bank as a Service', step: '' },
    message: { type: 'choice', value: 'tell me about Bank as a Service' },
  },
  'web portals': {
    attributes: { topic: 'Web portals', step: '' },
    message: { type: 'choice', value: 'tell me about Web portals' },
  },
  'embedded finance': {
    attributes: { topic: 'Embedded finance', step: '' },
    message: { type: 'choice', value: 'tell me about Embedded finance' },
  },
  'sophisticated ai products': {
    attributes: { topic: 'ai solutions', step: '' },
    message: { type: 'choice', value: 'tell me about sophisticated AI products' },
  },
  'ai products': {
    attributes: { topic: 'ai solutions', step: '' },
    message: { type: 'choice', value: 'tell me about AI products' },
  },
  'iot integrations': {
    attributes: { topic: 'iot solutions', step: '' },
    message: { type: 'choice', value: 'tell me about IoT services' },
  },
  'iot services': {
    attributes: { topic: 'iot solutions', step: '' },
    message: { type: 'choice', value: 'tell me about IoT services' },
  },
  'iot software': {
    attributes: { topic: 'iot solutions', step: '' },
    message: { type: 'choice', value: 'tell me about IoT services' },
  },
  'Internet of Things': {
    attributes: { topic: 'iot solutions', step: '' },
    message: { type: 'choice', value: 'tell me about IoT services' },
  },
  'payment service': {
    attributes: { topic: 'payment service', step: '' },
    message: { type: 'choice', value: 'tell me about payments' },
  },
  payments: {
    attributes: { topic: 'payment service', step: '' },
    message: { type: 'choice', value: 'tell me about payments' },
  },
  'user engagement': {
    attributes: { topic: 'design', step: '' },
    message: { type: 'choice', value: 'tell me about user engagement' },
  },
  company: {
    attributes: { topic: 'company', step: '' },
    message: { type: 'choice', value: 'tell me about company' },
  },
  testimonials: {
    attributes: { topic: 'testimonials', step: '' },
    message: { type: 'choice', value: 'testimonials' },
  },
  products: {
    attributes: { topic: 'products', step: '' },
    message: { type: 'choice', value: 'products' },
  },
  services: {
    attributes: { topic: 'services', step: '' },
    message: { type: 'choice', value: 'services' },
  },
  'contact us': {
    attributes: { topic: 'company', step: '' },
    message: { type: 'choice', value: 'contact us' },
  },
  'book a call': {
    attributes: { topic: 'company', step: '' },
    message: { type: 'choice', value: 'book a call' },
  },
  'send a message': {
    attributes: { topic: 'company', step: '' },
    message: { type: 'choice', value: 'send a message' },
  },
  'send us a message': {
    attributes: { topic: 'company', step: '' },
    message: { type: 'choice', value: 'send us a message' },
  },
  // end products
};

export const chatSideInfo: IMessage[] = [
  {
    type: 'title',
    value: 'Get in Touch with Us:',
  },
  {
    type: 'text',
    value: `${env.email}`,
  },
  {
    type: 'text',
    value: `${env.phone}`,
  },
  {
    type: 'button',
    value: 'Book a Call',
  },
  {
    type: 'button',
    value: 'Send Us a Message',
  },
  {
    type: 'subtitle',
    value: 'About Webdevelop PRO:',
  },
  {
    type: 'button',
    value: 'Company',
  },
  {
    type: 'button',
    value: 'Core Principles',
  },
  {
    type: 'button',
    value: 'Testimonials',
  },
  {
    type: 'button',
    value: 'How We Can Assist',
  },
];

export const chatSideInfoMobileText: IMessage[] = [
  {
    type: 'title',
    value: 'Get in Touch with Us:',
  },
  {
    type: 'text',
    value: `${env.email}`,
  },
  {
    type: 'text',
    value: `${env.phone}`,
  },
];


export const chatSideInfoMobileButtons: IMessage[] = [
  {
    type: 'button',
    value: 'Book a Call',
  },
  {
    type: 'button',
    value: 'Send Us a Message',
  },
];


export const defaultMessages: IMessage[] = [
  {
    type: MessageType.text,
    value: 'Book a Call',
    answear: [
      {
        type: MessageType.embedCode,
        value: '<h3>Book a Call ☎️</h3>Save the date and time for 30min chat with our manager.',
        code: `${env.bookACall}`,
        event: 'meetingCreated',
        disableLinkReplace: true,
      },
    ],
  },
  {
    type: MessageType.text,
    value: 'Request a Demo',
    answear: [
      {
        type: MessageType.embedCode,
        value: '<h3>Book a Call ☎️</h3>Save the date and time for 30min chat with our manager.',
        code: `${env.bookACall}`,
        event: 'meetingCreated',
        disableLinkReplace: true,
      },
    ],
  },
  {
    type: MessageType.text,
    value: 'Send Us a Message',
    answear: [
      {
        type: MessageType.hsForm,
        value: '<h3>Send Us a Message 📮</h3>We’re happy to continue the conversation. Please fill the form below and I’ll redirect it promptly to our manager.',
        code: `${env.sendAMessage}`,
        event: 'messageSent',
        disableLinkReplace: true,
      },
    ],
  },
  {
    type: MessageType.text,
    value: 'Send a Message',
    answear: [
      {
        type: MessageType.hsForm,
        value: '<h3>Send Us a Message 📮</h3>We’re happy to continue the conversation. Please fill the form below and I’ll redirect it promptly to our manager.',
        code: `${env.sendAMessage}`,
        event: 'messageSent',
        disableLinkReplace: true,
      },
    ],
  },
  {
    type: MessageType.text,
    value: 'Leave Us Your Email',
    answear: [
      {
        type: MessageType.hsForm,
        value: '<h3>Leave Us Your Email 📧</h3>We’re happy to continue the conversation. Please leave your email below and we will get in touch.',
        code: `${env.leaveEmail}`,
        event: 'emailSent',
        disableLinkReplace: true,
      },
    ],
  },
  {
    type: MessageType.text,
    value: 'Thanks for booking a call! Talk to you soon.',
    event: 'meetingCreated',
  },
  {
    type: MessageType.text,
    value: 'Thanks for your message. We will contact you back ASAP 🧘🏽‍♀️',
    event: 'messageSent',
  },
  {
    type: MessageType.text,
    value: 'Thanks for your email. We will contact you back ASAP 🧘🏽‍♀️',
    event: 'emailSent',
  },
  {
    type: MessageType.text,
    value: 'Let me know your question or search topic below and I will try to assist best.',
    choices: [
      '👨🏻‍💻 About AI Assistant',
      '🛒 Webdevelop Products',
      '🌐 Digital Ecosystem',
      '🤝 How We Work',
    ],
    event: 'inactivity',
  },
  {
    type: MessageType.text,
    value: 'Let me know your question or search topic below and I will try to assist best.',
    choices: [
      '💼 Company',
      '🌟 Core Principles',
      '👏 Testimonials',
      '🤝 How Can We Assist',
    ],
    event: 'inactivity2',
  },
  {
    type: MessageType.text,
    value: 'Company',
    answear: [
      {
        type: MessageType.text,
        value: '<h3>Let’s get to know each other 🤝</h3>'
          + 'At Webdevelop PRO, we are dedicated to providing '
          + 'innovative software solutions and expert consulting services to help businesses thrive in '
          + 'the digital age. With a team of skilled professionals and a commitment to excellence, we '
          + 'empower our clients to achieve their goals and stay ahead of the competition.<br/><br/>'
          + '<h5>Our Story</h5>'
          + 'Founded in 2010, Webdevelop Pro has rapidly grown from a small startup to a trusted partner '
          + 'for businesses across industries. Our journey began with a vision to revolutionize the way '
          + 'organizations leverage technology to drive growth and efficiency. Since then, we have'
          + ' continuously evolved and adapted to meet the ever-changing needs of our clients and the industry.<br/><br/>'
          + '<h5>What We Do</h5>'
          + 'We specialize in custom software development for web, mobile, and enterprise needs. Our '
          + 'consulting services optimize technology strategies, streamline processes, and deliver tangible'
          + ' results. Whether advising on architecture, implementing new technologies, or providing support,'
          + ' we ensure impactful outcomes for our clients',
      },
    ],
  },
  {
    type: MessageType.text,
    value: 'Core Principles',
    answear: [
      {
        type: MessageType.text,
        value: '<h3>Our Core Values 💎</h3>'
          + 'At the heart of Webdevelop PRO are our core values: innovation, integrity, collaboration, and '
          + 'excellence. These values guide everything we do, from how we work with clients and partners '
          + 'to how we interact with each other as a team. We believe in transparency, honesty, and a '
          + 'customer-centric approach to business that fosters long-term relationships built on trust '
          + 'and mutual success.<br/><br/>'
          + '<h5>Our Mission</h5>'
          + 'Our mission is to transform innovative concepts into market-ready solutions. Leveraging a '
          + 'suite of pre-engineered components, alongside our extensive expertise and experience, we aim '
          + 'to expedite the launch of your projects, ensuring you achieve remarkable success within your sector.<br/><br/>'
          + '<h5>Our Team</h5>'
          + 'Our team embodies our core values: expertise, diversity, and dedication. With skilled professionals'
          + ' in software development, design, project management, and more, we\'re passionate about technology '
          + 'and continuous improvement. Staying ahead of industry trends, we deliver innovative solutions '
          + 'driving tangible value for our clients',
      },
    ],
  },
  {
    type: MessageType.text,
    value: 'How We Can Assist',
    answear: [
      {
        type: MessageType.text,
        value: '<h3>How We Can Assist 👨🏻‍💻</h3>'
          + '<br/>'
          + '<ul><li><span class="is--h5__title">Streamlining Technical Recruitment:</span> Finding the right software engineer is tough. '
          + 'We deliver quality outcomes, ensuring a perfect fit for your project\'s needs, budget, and timeline.</li>'
          + '<br/><li><span class="is--h5__title">Providing Pre-Developed Components and Tools: </span>Access refined tools '
          + 'to speed up project development, saving time and resources.</li>'
          + '<br/><li><span class="is--h5__title">Navigating Prototype and MVP Development: </span>We guide you through tech '
          + 'options for optimal prototype and MVP results, efficiently and cost-effectively.</li>'
          + '<br/><li><span class="is--h5__title">Facilitating Product Launch: </span>We seamlessly integrate with your '
          + 'teams for flawless product launches, ensuring continuous functionality and bug-free deployment.</li>'
          + '<br/><li><span class="is--h5__title">Elevating to Enterprise-Grade Standards: </span>We boost security, sustainability, '
          + 'and updates to elevate your company, fostering scalable growth and success.</li>',
      },
    ],
  },
  {
    type: MessageType.text,
    value: 'Testimonials',
    answear: [
      {
        type: MessageType.text,
        value: '<h3>Testimonials ⭐️⭐️⭐️⭐️⭐️</h3>'
          + 'Discover what our clients and partners have to say.',
        disableLinkReplace: true,
      },
      {
        type: MessageType.text,
        value: '<i>“Outstanding partnership with Webdevelop. Exceptional full-stack expertise tailored to our '
          + 'crypto needs. On-time delivery, cost-efficient, and superb post-launch support. A crucial asset'
          + ' for our growth. Highly recommend for any complex project.”</i><h5>Howard Krieger, CEO '
          + 'at Unfederal Reserve</h5>',
        disableLinkReplace: true,
      },
      {
        type: MessageType.text,
        value: '<i>“The development work delivered by Webdevelop PRO completely exceeded the client’s '
          + 'expectations for the project and enabled them to successfully launch and maintain their '
          + 'platform. Their team is dedicated to the long-term quality of what they create and put '
          + 'effort into meeting all deadlines.”</i><h5>Ken Staut, Head of Corporate Development at Yieldstreet</h5>',
        disableLinkReplace: true,
        button: {
          text: 'Show More Testimonials',
          block: true,
          type: 'link',
          size: 'medium',
        },
      },
    ],
  },
  {
    type: MessageType.text,
    value: 'Show More Testimonials',
    answear: [
      {
        type: MessageType.text,
        value: '<i>“Webdevelop PRO help us to build platform from scratch, affordably and efficiently. '
          + 'Their approach ensured that tech solutions perfectly aligned with our operational needs. '
          + 'Their helped us to allocate resources smartly. A transformative partnership we highly '
          + 'recommend.”</i><h5>Leon Stiel, Head of Equities Risk Technology at Millennium</h5>',
        disableLinkReplace: true,
      },
      {
        type: MessageType.text,
        value: '<i>“High-quality tech solutions at great value. Made complex tech simple for us, '
          + 'boosting our retail operations. A game-changer in quality-to-cost ratio.”</i>'
          + '<h5>Ulrich Kratz, Co-Founder & CEO unybrands</h5>',
        disableLinkReplace: true,
      },
      {
        type: MessageType.text,
        value: '<i>“Exceptional full-stack capabilities enabled rapid project completion. '
          + 'Their end-to-end solution saved time, letting us focus on AI innovations. '
          + 'Essential partner for accelerated growth.”</i>'
          + '<h5>Ryan Medlin, Speechlab.ai Head of Engineering</h5>',
        disableLinkReplace: true,
      },
      {
        type: MessageType.text,
        value: '<i>“As a result of Webdevelop PRO’s work, I saw an improvement in page load time '
          + 'and a reduction in the bounce rate. Team was quick to act, understanding, and innovative. '
          + 'They brought great ideas to the table that added value to the project.”</i>'
          + '<h5>Rick Richman, CEO at FirePie</h5>',
        disableLinkReplace: true,
      },
    ],
  },
];


