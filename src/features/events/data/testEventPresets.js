/**
 * Knotnex Organization Dashboard - Realistic Test Event Presets for Auto-Fill
 */

export const EVENT_PRESETS = [
  {
    id: 'preset-tech-summit',
    name: 'Tech & AI Innovators Global Summit 2026',
    badge: 'Flagship Summit',
    tag: 'Technology',
    icon: '🚀',
    category: 'Technology',
    eventDate: 'November 18, 2026',
    eventTime: '09:30 AM',
    location: 'Bengaluru International Exhibition Centre (BIEC), Bengaluru',
    capacity: '750',
    ticketPrice: '₹499',
    coverImage: '/assets/posters/poster-tech-summit.svg',
    originalCoverImage: '/assets/posters/poster-tech-summit.svg',
    description: 'The premier annual summit bringing together leading AI researchers, ML architects, founders, and engineers. Explore cutting-edge breakthroughs in Agentic AI, Autonomous Systems, and Scalable Cloud Architectures with live keynote demos, hands-on workshop tracks, and executive networking lounges.',
    speakers: 'Dr. Arvind Raman (Lead AI Scientist), Priya Sharma (VP Product @ TechCorp), Rohan Verma (Systems Architect)',
    organizerName: 'Knotnex Innovation Labs',
    organizerEmail: 'events@knotnex.org',
    organizerPhone: '+91 98765 43210',
    organizerData: {
      name: 'Knotnex Innovation Labs',
      subtitle: 'Organizing Partner',
      initials: 'KN',
      verified: true
    },
    chiefGuests: [
      { id: 'spk-1', name: 'Dr. Arvind Raman', role: 'Lead AI Scientist @ DeepMind', initials: 'AR', verified: true },
      { id: 'spk-2', name: 'Priya Sharma', role: 'VP Product @ TechCorp', initials: 'PS', verified: true },
      { id: 'spk-3', name: 'Rohan Verma', role: 'Chief Systems Architect @ CloudNet', initials: 'RV', verified: true }
    ],
    sponsors: [
      { id: 'spn-1', name: 'Google Cloud', tier: 'Title Partner' },
      { id: 'spn-2', name: 'NVIDIA AI', tier: 'Compute Partner' },
      { id: 'spn-3', name: 'GitHub Enterprise', tier: 'Developer Partner' }
    ],
    volunteersNeeded: true,
    volunteerRole: 'Delegate Experience & Technical Track Host',
    volunteerOpenings: 15,
    contact: {
      email: 'events@knotnex.org',
      phone: '+91 98765 43210',
      helpDesk: 'Hall 3 Info Desk & Knotnex Help App'
    },
    eligibilityCriteria: [
      'Open to engineers, developers, researchers, and tech entrepreneurs',
      'Valid Government or Student ID required at registration turnstile',
      'Personal laptop recommended for afternoon hands-on breakout sessions'
    ],
    faqs: [
      { id: 'faq-1', q: 'Will workshop code and slide decks be shared?', a: 'Yes! All registered participants will receive GitHub repository access and presentation slides post-event.', question: 'Will workshop code and slide decks be shared?', answer: 'Yes! All registered participants will receive GitHub repository access and presentation slides post-event.' },
      { id: 'faq-2', q: 'Are meals and refreshments included?', a: 'Yes, morning barista coffee, buffet networking lunch, and high-tea are complimentary with all passes.', question: 'Are meals and refreshments included?', answer: 'Yes, morning barista coffee, buffet networking lunch, and high-tea are complimentary with all passes.' },
      { id: 'faq-3', q: 'Is parking available at the venue?', a: 'Yes, designated free visitor parking is available at BIEC Gate 2 with EV charging bays.', question: 'Is parking available at the venue?', answer: 'Yes, designated free visitor parking is available at BIEC Gate 2 with EV charging bays.' }
    ],
    sessions: [
      {
        id: 'sess-1',
        title: 'Opening Keynote: State of Agentic Intelligence',
        time: '09:30 AM - 11:00 AM',
        date: 'November 18, 2026',
        speaker: 'Dr. Arvind Raman',
        location: 'Main Auditorium',
        category: 'Keynote',
        description: 'Exploring multi-agent orchestration, cognitive architectures, and real-world enterprise deployments.'
      },
      {
        id: 'sess-2',
        title: 'Deep Dive: Low-Latency Model Serving at Scale',
        time: '11:30 AM - 01:00 PM',
        date: 'November 18, 2026',
        speaker: 'Rohan Verma',
        location: 'Hall B',
        category: 'Workshop',
        description: 'Practical strategies for sub-50ms inference on distributed GPU clusters and edge nodes.'
      },
      {
        id: 'sess-3',
        title: 'Hands-on Lab: Building Production AI Agents',
        time: '02:00 PM - 04:30 PM',
        date: 'November 18, 2026',
        speaker: 'Priya Sharma & Eng Team',
        location: 'Lab Room 3',
        category: 'Workshop',
        description: 'Guided coding session implementing autonomous agents with tool-calling, persistence, and guardrails.'
      }
    ]
  },
  {
    id: 'preset-climate-hack',
    name: 'ClimateTech 2026: Green Innovation & Hackathon',
    badge: 'Free Hackathon',
    tag: 'Environment',
    icon: '🌿',
    category: 'Environment',
    eventDate: 'December 05, 2026',
    eventTime: '10:00 AM',
    location: 'Palace Grounds, Grand Ballroom, Bengaluru',
    capacity: '500',
    ticketPrice: 'Free',
    coverImage: '/assets/posters/poster-climate-hack.svg',
    originalCoverImage: '/assets/posters/poster-climate-hack.svg',
    description: 'A 48-hour global hackathon and sustainability summit bringing together software engineers, environmental scientists, and climate innovators. Build open-source software and IoT prototypes addressing renewable energy, carbon monitoring, and circular economies.',
    speakers: 'Dr. Meera Iyer (Environmental Scientist), Alex Chen (CleanTech Founder)',
    organizerName: 'GreenPlanet Alliance',
    organizerEmail: 'hackathon@greenplanet.org',
    organizerPhone: '+91 91234 56789',
    organizerData: {
      name: 'GreenPlanet Alliance',
      subtitle: 'Sustainability Partner',
      initials: 'GP',
      verified: true
    },
    chiefGuests: [
      { id: 'spk-1', name: 'Dr. Meera Iyer', role: 'Director @ EarthInstitute', initials: 'MI', verified: true },
      { id: 'spk-2', name: 'Alex Chen', role: 'CleanTech Ventures Partner', initials: 'AC', verified: true }
    ],
    sponsors: [
      { id: 'spn-1', name: 'GreenGrid Global', tier: 'Lead Partner' },
      { id: 'spn-2', name: 'EcoVenture Fund', tier: 'Impact Sponsor' }
    ],
    volunteersNeeded: true,
    volunteerRole: 'Green Logistics & Waste Sorting Coordinator',
    volunteerOpenings: 20,
    contact: {
      email: 'hackathon@greenplanet.org',
      phone: '+91 91234 56789',
      helpDesk: 'Green Hub Desk 1'
    },
    eligibilityCriteria: [
      'Open to students, working professionals, and independent hackers',
      'Teams can consist of 2 to 4 members',
      'All code built must be open-source under MIT or Apache 2.0 license'
    ],
    faqs: [
      { id: 'faq-1', q: 'What is the prize pool?', a: '₹10,00,000 in equity-free grants and seed incubation support for the top 3 teams.', question: 'What is the prize pool?', answer: '₹10,00,000 in equity-free grants and seed incubation support for the top 3 teams.' },
      { id: 'faq-2', q: 'Is overnight stay permitted at the venue?', a: 'Yes, 24/7 security, rest pods, and catering are provided for the entire 48 hours.', question: 'Is overnight stay permitted at the venue?', answer: 'Yes, 24/7 security, rest pods, and catering are provided for the entire 48 hours.' }
    ],
    sessions: [
      {
        id: 'sess-1',
        title: 'Problem Statement Briefing & Challenge Release',
        time: '10:00 AM - 11:30 AM',
        date: 'December 05, 2026',
        speaker: 'Dr. Meera Iyer',
        location: 'Stage 1',
        category: 'Keynote',
        description: 'Unveiling challenge tracks across Clean Energy, Circular Economy, and Smart Water Systems.'
      },
      {
        id: 'sess-2',
        title: '1-on-1 Mentor Office Hours & Pitch Clinics',
        time: '02:00 PM - 05:00 PM',
        date: 'December 05, 2026',
        speaker: 'Alex Chen & Mentors',
        location: 'Mentorship Zone',
        category: 'Panel Discussion',
        description: 'Direct feedback on system design and business viability from venture investors.'
      }
    ]
  },
  {
    id: 'preset-design-systems',
    name: 'DesignCraft: National UI/UX & Design Systems Conclave',
    badge: 'Design Forum',
    tag: 'Design',
    icon: '🎨',
    category: 'Design',
    eventDate: 'October 28, 2026',
    eventTime: '11:00 AM',
    location: 'Cyber Hub Arena, Cyber City, Gurugram',
    capacity: '350',
    ticketPrice: '₹299',
    coverImage: '/assets/posters/poster-design-systems.svg',
    originalCoverImage: '/assets/posters/poster-design-systems.svg',
    description: 'An immersive symposium focusing on multi-platform design tokens, accessible design architectures, micro-interactions, and AI-accelerated Figma workflows for enterprise product teams and product leaders.',
    speakers: 'Ananya Roy (Principal Design Lead), Vikram Malhotra (Design Architect)',
    organizerName: 'DesignCraft Collective',
    organizerEmail: 'hello@designcraft.org',
    organizerPhone: '+91 98111 22334',
    organizerData: {
      name: 'DesignCraft Collective',
      subtitle: 'Design Community',
      initials: 'DC',
      verified: true
    },
    chiefGuests: [
      { id: 'spk-1', name: 'Ananya Roy', role: 'Principal Design Lead @ StudioGrid', initials: 'AR', verified: true },
      { id: 'spk-2', name: 'Vikram Malhotra', role: 'Head of Product Design @ FinNext', initials: 'VM', verified: true }
    ],
    sponsors: [
      { id: 'spn-1', name: 'Figma Community', tier: 'Community Partner' },
      { id: 'spn-2', name: 'FontSmith', tier: 'Typography Partner' }
    ],
    volunteersNeeded: true,
    volunteerRole: 'Portfolio Review Room Host',
    volunteerOpenings: 8,
    contact: {
      email: 'hello@designcraft.org',
      phone: '+91 98111 22334',
      helpDesk: 'Registration Bay 2'
    },
    eligibilityCriteria: [
      'Open to UI/UX Designers, Product Managers, and Frontend Engineers',
      'Bring digital design portfolios for live peer-critique rooms'
    ],
    faqs: [
      { id: 'faq-1', q: 'Will there be portfolio review sessions?', a: 'Yes, 15-minute 1-on-1 critique slots with Design Directors are included with all tickets.', question: 'Will there be portfolio review sessions?', answer: 'Yes, 15-minute 1-on-1 critique slots with Design Directors are included with all tickets.' }
    ],
    sessions: [
      {
        id: 'sess-1',
        title: 'Keynote: Scaling Design Systems Across 50+ Apps',
        time: '11:00 AM - 12:30 PM',
        date: 'October 28, 2026',
        speaker: 'Ananya Roy',
        location: 'Hall A',
        category: 'Keynote',
        description: 'Architecting token hierarchies and synchronizing design components with React and Flutter codebases.'
      },
      {
        id: 'sess-2',
        title: 'Interactive Clinic: Design System Audits & Accessibility',
        time: '02:00 PM - 04:00 PM',
        date: 'October 28, 2026',
        speaker: 'Vikram Malhotra',
        location: 'Workshop Lab',
        category: 'Workshop',
        description: 'Hands-on auditing for contrast, keyboard navigation, and screen reader compatibility.'
      }
    ]
  },
  {
    id: 'preset-startup-forum',
    name: 'Global Startup & Venture Capital Summit 2026',
    badge: 'Executive Pass',
    tag: 'Business',
    icon: '💼',
    category: 'Business',
    eventDate: 'December 18, 2026',
    eventTime: '09:00 AM',
    location: 'Jio World Convention Centre, BKC, Mumbai',
    capacity: '1000',
    ticketPrice: '₹899',
    coverImage: '/assets/posters/poster-entrepreneur-forum.svg',
    originalCoverImage: '/assets/posters/poster-entrepreneur-forum.svg',
    description: "India's premier entrepreneurship and venture capital gathering. 50+ VC funds, 200+ angel investors, and hundreds of high-growth founders convening for keynote fireside chats, pitch battles, and private LP networking.",
    speakers: 'Kabir Singhania (Managing Partner), Sneha Kapoor (Founder & CEO)',
    organizerName: 'VentureBridge India',
    organizerEmail: 'summit@venturebridge.in',
    organizerPhone: '+91 98200 11223',
    organizerData: {
      name: 'VentureBridge India',
      subtitle: 'Investor Network',
      initials: 'VB',
      verified: true
    },
    chiefGuests: [
      { id: 'spk-1', name: 'Kabir Singhania', role: 'Managing Partner @ Apex Ventures', initials: 'KS', verified: true },
      { id: 'spk-2', name: 'Sneha Kapoor', role: 'Founder & CEO @ ScaleFin', initials: 'SK', verified: true }
    ],
    sponsors: [
      { id: 'spn-1', name: 'HDFC Bank Private Banking', tier: 'Title Partner' },
      { id: 'spn-2', name: 'AWS Startups', tier: 'Cloud Partner' }
    ],
    volunteersNeeded: true,
    volunteerRole: 'Investor Lounge Host & Speaker Liaison',
    volunteerOpenings: 10,
    contact: {
      email: 'summit@venturebridge.in',
      phone: '+91 98200 11223',
      helpDesk: 'VIP Hall Concierge'
    },
    eligibilityCriteria: [
      'Open to Founders, CXOs, Venture Investors, and Tech Executives',
      'Business badge credentials checked at VIP entrance'
    ],
    faqs: [
      { id: 'faq-1', q: 'How can founders apply for the Pitch Arena?', a: 'Pitch Arena applications close 10 days before the event. Selected top 12 startups pitch on main stage.', question: 'How can founders apply for the Pitch Arena?', answer: 'Pitch Arena applications close 10 days before the event. Selected top 12 startups pitch on main stage.' }
    ],
    sessions: [
      {
        id: 'sess-1',
        title: 'Fireside Chat: Macro Tech Trends & VC Valuations in 2026',
        time: '09:30 AM - 11:00 AM',
        date: 'December 18, 2026',
        speaker: 'Kabir Singhania',
        location: 'Grand Ballroom',
        category: 'Keynote',
        description: 'Deep analysis of market liquidity, growth multiples, and AI infra funding.'
      },
      {
        id: 'sess-2',
        title: 'Live Pitch Competition: Top 12 Seed Innovators',
        time: '02:00 PM - 04:30 PM',
        date: 'December 18, 2026',
        speaker: 'Investor Jury',
        location: 'Stage 2',
        category: 'Presentation',
        description: '12 curated seed startups pitch for ₹5 Crore in on-the-spot term sheet commitments.'
      }
    ]
  }
];

export function getNextPreset(currentId) {
  if (!currentId) return EVENT_PRESETS[0];
  const idx = EVENT_PRESETS.findIndex(p => p.id === currentId);
  if (idx === -1 || idx === EVENT_PRESETS.length - 1) {
    return EVENT_PRESETS[0];
  }
  return EVENT_PRESETS[idx + 1];
}
