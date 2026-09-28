// Visual Asset Helpers
export function getEventPoster(ev) {
  if (ev && ev.poster) return ev.poster;
  const posterMap = {
    'ev-1': 'assets/posters/poster-tech-summit.svg',
    'ev-2': 'assets/posters/poster-climate-hack.svg',
    'ev-3': 'assets/posters/poster-entrepreneur-forum.svg',
    'ev-4': 'assets/posters/poster-healthcare-ai.svg',
    'ev-5': 'assets/posters/poster-wellness-drive.svg',
    'ev-6': 'assets/posters/poster-design-systems.svg'
  };
  if (ev && posterMap[ev.id]) return posterMap[ev.id];
  if (ev && ev.name) {
    const n = ev.name.toLowerCase();
    if (n.includes('tech') || n.includes('youth')) return 'assets/posters/poster-tech-summit.svg';
    if (n.includes('climate') || n.includes('hack')) return 'assets/posters/poster-climate-hack.svg';
    if (n.includes('entrepreneur') || n.includes('forum')) return 'assets/posters/poster-entrepreneur-forum.svg';
    if (n.includes('health') && n.includes('ai')) return 'assets/posters/poster-healthcare-ai.svg';
    if (n.includes('wellness') || n.includes('drive')) return 'assets/posters/poster-wellness-drive.svg';
    if (n.includes('design') || n.includes('systems')) return 'assets/posters/poster-design-systems.svg';
  }
  return 'assets/posters/poster-default.svg';
}

export function getJobPoster(job) {
  if (job && job.poster) return job.poster;
  const posterMap = {
    'job-1': 'assets/hiring/hiring-product-designer.svg',
    'job-2': 'assets/hiring/hiring-fullstack-engineer.svg',
    'job-3': 'assets/hiring/hiring-community-manager.svg',
    'job-4': 'assets/hiring/hiring-climate-associate.svg',
    'job-5': 'assets/hiring/hiring-ai-fellow.svg',
    'job-6': 'assets/hiring/hiring-devops-security.svg',
    'job-7': 'assets/hiring/hiring-program-manager.svg',
    'job-8': 'assets/hiring/hiring-systems-architect.svg'
  };
  if (job && posterMap[job.id]) return posterMap[job.id];
  if (job && (job.title || job.role)) {
    const t = (job.title || job.role).toLowerCase();
    if (t.includes('design') || t.includes('ux') || t.includes('ui')) return 'assets/hiring/hiring-product-designer.svg';
    if (t.includes('full stack') || t.includes('fullstack') || t.includes('frontend') || t.includes('backend') || t.includes('engineer')) return 'assets/hiring/hiring-fullstack-engineer.svg';
    if (t.includes('community') || t.includes('volunteer') || t.includes('manager')) return 'assets/hiring/hiring-community-manager.svg';
    if (t.includes('climate') || t.includes('sustainability') || t.includes('research associate')) return 'assets/hiring/hiring-climate-associate.svg';
    if (t.includes('ai') || t.includes('fellow') || t.includes('machine learning')) return 'assets/hiring/hiring-ai-fellow.svg';
    if (t.includes('devops') || t.includes('security') || t.includes('infra')) return 'assets/hiring/hiring-devops-security.svg';
    if (t.includes('program') || t.includes('pm') || t.includes('product manager')) return 'assets/hiring/hiring-program-manager.svg';
    if (t.includes('architect') || t.includes('systems') || t.includes('lead')) return 'assets/hiring/hiring-systems-architect.svg';
  }
  return 'assets/hiring/hiring-default.svg';
}

export function getUserAvatar(userOrReg, idx = 0) {
  if (userOrReg && userOrReg.avatar) return userOrReg.avatar;
  const num = (idx % 12) + 1;
  return 'assets/avatars/avatar-' + num + '.jpg';
}

export const initialEvents = [
  {
    id: 'ev-1',
    name: 'Annual Youth Tech Summit 2026',
    poster: 'assets/posters/poster-tech-summit.svg',
    date: 'Oct 15-18, 2026',
    location: 'Moscone Center, San Francisco & Virtual',
    category: 'Technology',
    capacity: 1000,
    registered: 840,
    status: 'upcoming',
    description: 'The flagship annual summit gathering 1,000+ emerging tech leaders, open-source contributors, and founders to explore AI ethics and cloud scaling.',
    speakers: ['Elena Vance (OpenAI)', 'Dr. Marcus Sterling (Stanford)', 'Arthur Taylor (Knotbox)']
  },
  {
    id: 'ev-2',
    name: 'Climate Action Hackathon',
    poster: 'assets/posters/poster-climate-hack.svg',
    date: 'Nov 05-07, 2026',
    location: 'Hybrid (Berlin & Online)',
    category: 'Environment',
    capacity: 500,
    registered: 462,
    status: 'upcoming',
    description: 'A 48-hour global sprint engineering open hardware and software for local clean water sensing and microgrid monitoring.',
    speakers: ['Sophia Meyer (Climate Tech Alliance)', 'Leo Zhang (Knotbox Lab)']
  },
  {
    id: 'ev-3',
    name: 'Global Entrepreneurship Forum',
    poster: 'assets/posters/poster-entrepreneur-forum.svg',
    date: 'Sep 12-14, 2026',
    location: 'Palais des Congrès, Paris',
    category: 'Community',
    capacity: 750,
    registered: 750,
    status: 'ongoing',
    description: 'Empowering early-stage social impact founders with venture funding workshops, mentorship clinics, and legal toolkits.',
    speakers: ['Camille Dupont', 'Jean Moreau']
  },
  {
    id: 'ev-4',
    name: 'AI in Healthcare Symposium',
    poster: 'assets/posters/poster-healthcare-ai.svg',
    date: 'Aug 20-21, 2026',
    location: 'Boston Medical Innovation Hub',
    category: 'Healthcare',
    capacity: 300,
    registered: 300,
    status: 'completed',
    description: 'Deep dive into computer vision diagnostic pipelines and patient data privacy standards for clinical trials.',
    speakers: ['Dr. Aris Thorne', 'Claire Wu']
  },
  {
    id: 'ev-5',
    name: 'Community Health & Wellness Drive',
    poster: 'assets/posters/poster-wellness-drive.svg',
    date: 'Dec 01-03, 2026',
    location: 'Central Community Center, Austin',
    category: 'Community',
    capacity: 400,
    registered: 180,
    status: 'upcoming',
    description: 'Free preventative screenings, nutrition workshops, and pediatric health checkups for under-resourced families.',
    speakers: ['Austin Medical Volunteers']
  },
  {
    id: 'ev-6',
    name: 'Design Systems Conference 2026',
    poster: 'assets/posters/poster-design-systems.svg',
    date: 'Jul 10-11, 2026',
    location: 'Seattle Convention Hall',
    category: 'Technology',
    capacity: 600,
    registered: 600,
    status: 'completed',
    description: 'Industry conference exploring component tokens, cross-platform UI architectures, and design governance.',
    speakers: ['Arthur Taylor', 'Maya Lin']
  }
];

export const initialRegistrations = [
  { id: 'reg-1', regId: '#KNT-8401', txnId: 'TXN-8401-HDFC', name: 'Sophia Chen', email: 'sophia.c@stanford.edu', phone: '+91 98401 24789', org: 'Stanford AI Lab · Research Fellow', city: 'Bengaluru, KA', payment: 'Fixed ₹550 · Paid', paymentMethod: 'Card (HDFC)', paymentType: 'paid', source: 'Online Direct', event: 'Annual Youth Tech Summit 2026', date: '12 Sep 2026', type: 'VIP All-Access', status: 'Confirmed', checkedIn: true, avatar: 'assets/avatars/avatar-1.jpg' },
  { id: 'reg-2', regId: '#KNT-8402', txnId: 'TXN-8402-GPAY', name: 'Marcus Brody', email: 'marcus@brodytech.io', phone: '+91 98840 31256', org: 'Brody Technologies · Lead Dev', city: 'Chennai, TN', payment: 'Fixed ₹550 · Paid', paymentMethod: 'UPI (GPay)', paymentType: 'paid', source: 'Online Direct', event: 'Annual Youth Tech Summit 2026', date: '14 Sep 2026', type: 'Full Delegate', status: 'Confirmed', checkedIn: false, avatar: 'assets/avatars/avatar-2.jpg' },
  { id: 'reg-3', regId: '#KNT-8403', txnId: 'TXN-8403-UPI', name: 'Elena Rostova', email: 'e.rostova@berkeley.edu', phone: '+91 97910 84321', org: 'UC Berkeley · PhD Scholar', city: 'Hyderabad, TS', payment: 'Fixed ₹550 · Paid', paymentMethod: 'UPI (Gov Grant)', paymentType: 'paid', source: 'Campus Partner', event: 'Annual Youth Tech Summit 2026', date: '15 Sep 2026', type: 'Student', status: 'Confirmed', checkedIn: true, avatar: 'assets/avatars/avatar-3.jpg' },
  { id: 'reg-4', regId: '#KNT-8404', txnId: 'TXN-8404-ICICI', name: 'David Kim', email: 'david@hypercloud.io', phone: '+91 94441 52890', org: 'HyperCloud · Staff SRE', city: 'Mumbai, MH', payment: 'Fixed ₹550 · Paid', paymentMethod: 'NetBanking (ICICI)', paymentType: 'paid', source: 'Corporate Invite', event: 'Annual Youth Tech Summit 2026', date: '16 Sep 2026', type: 'VIP All-Access', status: 'Confirmed', checkedIn: true, avatar: 'assets/avatars/avatar-4.jpg' },
  { id: 'reg-5', regId: '#KNT-8405', txnId: 'TXN-8405-PHONEPE', name: 'Priya Sharma', email: 'priya.s@knotbox.org', phone: '+91 98201 44582', org: 'Knotbox Labs · Core Contributor', city: 'Pune, MH', payment: 'Fixed ₹550 · Paid', paymentMethod: 'UPI (PhonePe)', paymentType: 'paid', source: 'Online Direct', event: 'Annual Youth Tech Summit 2026', date: '17 Sep 2026', type: 'Full Delegate', status: 'Confirmed', checkedIn: true, avatar: 'assets/avatars/avatar-5.jpg' },
  { id: 'reg-6', regId: '#KNT-8406', txnId: 'TXN-8406-AXIS', name: 'Alexandre Dubois', email: 'alex@parisventures.eu', phone: '+91 98112 67890', org: 'Paris Seed Capital · Partner', city: 'New Delhi, DL', payment: 'Fixed ₹550 · Paid', paymentMethod: 'Card (Axis)', paymentType: 'paid', source: 'Investor Pass', event: 'Annual Youth Tech Summit 2026', date: '18 Sep 2026', type: 'VIP All-Access', status: 'Confirmed', checkedIn: false, avatar: 'assets/avatars/avatar-6.jpg' },
  { id: 'reg-7', regId: '#KNT-8407', txnId: 'TXN-8407-PAYTM', name: 'Chloe Bennett', email: 'c.bennett@vectorai.tech', phone: '+91 99620 18452', org: 'Vector AI · Senior ML Engineer', city: 'Kochi, KL', payment: 'Fixed ₹550 · Paid', paymentMethod: 'UPI (Paytm)', paymentType: 'paid', source: 'Online Direct', event: 'Annual Youth Tech Summit 2026', date: '19 Sep 2026', type: 'Full Delegate', status: 'Confirmed', checkedIn: true, avatar: 'assets/avatars/avatar-7.jpg' },
  { id: 'reg-8', regId: '#KNT-8408', txnId: 'TXN-8408-UPI', name: 'Lucas Vance', email: 'lucas@mit.edu', phone: '+91 97104 33219', org: 'MIT CSAIL · Graduate Fellow', city: 'Ahmedabad, GJ', payment: 'Fixed ₹550 · Paid', paymentMethod: 'UPI (Scholar)', paymentType: 'paid', source: 'Campus Partner', event: 'Annual Youth Tech Summit 2026', date: '20 Sep 2026', type: 'Student', status: 'Confirmed', checkedIn: false, avatar: 'assets/avatars/avatar-8.jpg' },
  { id: 'reg-9', regId: '#KNT-8409', txnId: 'TXN-8409-GPAY', name: 'Aisha Patel', email: 'aisha@synthetix.io', phone: '+91 98711 20456', org: 'Synthetix Foundation · Architect', city: 'Gurugram, HR', payment: 'Fixed ₹550 · Paid', paymentMethod: 'UPI (GPay)', paymentType: 'paid', source: 'Referral Link', event: 'Annual Youth Tech Summit 2026', date: '21 Sep 2026', type: 'Full Delegate', status: 'Confirmed', checkedIn: true, avatar: 'assets/avatars/avatar-9.jpg' },
  { id: 'reg-10', regId: '#KNT-8410', txnId: 'TXN-8410-CRED', name: 'Samuel Green', email: 'sam@greentech.org', phone: '+91 94450 78123', org: 'EcoGrid · Director of Engineering', city: 'Kolkata, WB', payment: 'Fixed ₹550 · Paid', paymentMethod: 'UPI (Cred)', paymentType: 'paid', source: 'Online Direct', event: 'Annual Youth Tech Summit 2026', date: '22 Sep 2026', type: 'Full Delegate', status: 'Confirmed', checkedIn: true, avatar: 'assets/avatars/avatar-10.jpg' },
  { id: 'reg-11', regId: '#KNT-8411', txnId: 'TXN-8411-HACK', name: 'Alina Petrov', email: 'alina.p@berlinklima.de', phone: '+91 98410 99876', org: 'Climate Tech Alliance', city: 'Bengaluru, KA', payment: 'Fixed ₹550 · Paid', paymentMethod: 'UPI (Hackathon)', paymentType: 'paid', source: 'Hackathon Lead', event: 'Climate Action Hackathon', date: '10 Sep 2026', type: 'Student', status: 'Confirmed', checkedIn: false, avatar: 'assets/avatars/avatar-11.jpg' },
  { id: 'reg-12', regId: '#KNT-8412', txnId: 'TXN-8412-AMEX', name: 'Julian Davies', email: 'julian@daviescapital.com', phone: '+91 98841 22334', org: 'Davies Capital · Principal', city: 'Mumbai, MH', payment: 'Fixed ₹550 · Paid', paymentMethod: 'Card (Amex)', paymentType: 'paid', source: 'Corporate Partner', event: 'Global Entrepreneurship Forum', date: '08 Sep 2026', type: 'VIP All-Access', status: 'Confirmed', checkedIn: true, avatar: 'assets/avatars/avatar-12.jpg' }
];

export const initialCampaigns = [
  {
    id: 'camp-1',
    title: 'Clean Water for Rural Schools',
    goal: 50000,
    raised: 42500,
    supporters: 1240,
    audience: 'Rural Community Schools',
    status: 'active',
    desc: 'Deploying solar-powered multi-stage water filtration units in 40 underserved primary schools across the province.'
  },
  {
    id: 'camp-2',
    title: 'Digital Literacy for Underprivileged Youth',
    goal: 100000,
    raised: 78000,
    supporters: 2850,
    audience: 'Students aged 12-18',
    status: 'active',
    desc: 'Furnishing 15 open learning laboratories with refurbished laptops, high-speed fiber internet, and coding tutors.'
  },
  {
    id: 'camp-3',
    title: 'Tree Planting Initiative 2026',
    goal: 15000,
    raised: 15000,
    supporters: 910,
    audience: 'Urban Communities',
    status: 'completed',
    desc: 'Planting 10,000 indigenous shade trees along degraded river basins and city greenbelts.'
  },
  {
    id: 'camp-4',
    title: 'Elder Care Support Fund',
    goal: 30000,
    raised: 22400,
    supporters: 680,
    audience: 'Seniors & Assisted Centers',
    status: 'active',
    desc: 'Providing emergency medication delivery, warm meals, and companion visits for isolated elderly citizens.'
  },
  {
    id: 'camp-5',
    title: 'Scholarships for Girls in STEM',
    goal: 80000,
    raised: 64000,
    supporters: 1720,
    audience: 'High School Graduates',
    status: 'active',
    desc: 'Tuition grants and 1-on-1 industry mentorship for high-achieving women pursuing degrees in engineering and robotics.'
  },
  {
    id: 'camp-6',
    title: 'Disaster Relief Emergency Response',
    goal: 150000,
    raised: 110000,
    supporters: 3950,
    audience: 'Coastal Flood Zones',
    status: 'active',
    desc: 'Stockpiling emergency shelter kits, clean water bladders, and mobile satellite comms for typhoon seasons.'
  }
];

export const initialJobs = [
  { id: 'job-1', title: 'Senior Product Designer', poster: 'assets/hiring/hiring-product-designer.svg', dept: 'Product & Design', type: 'Full-time', location: 'Remote (US/Global)', applications: 18, status: 'active' },
  { id: 'job-2', title: 'Full Stack Staff Engineer', poster: 'assets/hiring/hiring-fullstack-engineer.svg', dept: 'Engineering', type: 'Full-time', location: 'San Francisco, CA / Remote', applications: 24, status: 'active' },
  { id: 'job-3', title: 'Community & Volunteer Manager', poster: 'assets/hiring/hiring-community-manager.svg', dept: 'Community & Growth', type: 'Full-time', location: 'Berlin / Hybrid', applications: 12, status: 'active' },
  { id: 'job-4', title: 'Climate Research Associate', poster: 'assets/hiring/hiring-climate-associate.svg', dept: 'Operations', type: 'Contract', location: 'Remote', applications: 9, status: 'active' },
  { id: 'job-5', title: 'AI Research Fellow', poster: 'assets/hiring/hiring-ai-fellow.svg', dept: 'AI & Ethics', type: 'Fellowship', location: 'Boston, MA / Hybrid', applications: 15, status: 'active' },
  { id: 'job-6', title: 'DevOps & Security Engineer', poster: 'assets/hiring/hiring-devops-security.svg', dept: 'Infrastructure', type: 'Full-time', location: 'Bengaluru / Hybrid', applications: 21, status: 'active' },
  { id: 'job-7', title: 'Technical Program Manager', poster: 'assets/hiring/hiring-program-manager.svg', dept: 'Operations', type: 'Full-time', location: 'Seattle, WA', applications: 14, status: 'active' },
  { id: 'job-8', title: 'Lead Systems Architect', poster: 'assets/hiring/hiring-systems-architect.svg', dept: 'Engineering', type: 'Full-time', location: 'Seattle, WA', applications: 6, status: 'closed' }
];

export const initialApplications = [
  { id: 'app-1', name: 'Elena Rostova', role: 'Senior Product Designer', experience: '6 yrs (Figma, Design Systems)', date: '14 Sep 2026', status: 'shortlisted' },
  { id: 'app-2', name: 'Julian Thorne', role: 'Full Stack Staff Engineer', experience: '8 yrs (React, Node, Go)', date: '13 Sep 2026', status: 'interview' },
  { id: 'app-3', name: 'Amara Okafor', role: 'Community & Volunteer Manager', experience: '4 yrs (Global NGOs)', date: '11 Sep 2026', status: 'review' },
  { id: 'app-4', name: 'Dr. Rajiv Menon', role: 'AI Research Fellow', experience: 'PhD (Stanford AI Lab, Computer Vision)', date: '10 Sep 2026', status: 'shortlisted' },
  { id: 'app-5', name: 'Devon Price', role: 'Senior Product Designer', experience: '3 yrs (Mobile UX, Prototyping)', date: '09 Sep 2026', status: 'rejected' },
  { id: 'app-6', name: 'Hanna Lindqvist', role: 'Climate Research Associate', experience: '5 yrs (GIS & Sensor Data Pipelines)', date: '08 Sep 2026', status: 'shortlisted' },
  { id: 'app-7', name: 'Priya Sundaram', role: 'DevOps & Security Engineer', experience: '6 yrs (AWS, Kubernetes, Terraform)', date: '07 Sep 2026', status: 'interview' },
  { id: 'app-8', name: 'Liam Chen', role: 'Full Stack Staff Engineer', experience: '7 yrs (Cloud Infra, Distributed Systems)', date: '05 Sep 2026', status: 'review' },
  { id: 'app-9', name: 'Carlos Mendez', role: 'Technical Program Manager', experience: '5 yrs (Agile Coaching, Cross-functional)', date: '04 Sep 2026', status: 'review' }
];

export const initialSchemes = [
  { id: 'sch-1', title: 'State Innovation Grant 2026', category: 'Technology & R&D', value: '₹25,00,000 Grant', eligibility: 'Early-stage deep tech teams working on climate, health, or education', deadline: '30 Nov 2026', status: 'active' },
  { id: 'sch-2', title: 'Solar Rooftop Subsidy Scheme', category: 'Renewable Energy', value: '50% Capital Subsidy (₹18L Max)', eligibility: 'Community institutions and public schools installing solar microgrids', deadline: '15 Dec 2026', status: 'active' },
  { id: 'sch-3', title: 'Rural Entrepreneurship Fellowship', category: 'Economic Empowerment', value: '₹12,00,000 Stipend + Mentorship', eligibility: 'Youth aged 20-30 launching localized sustainable agribusiness', deadline: '20 Oct 2026', status: 'active' },
  { id: 'sch-4', title: 'Women in Tech Micro-Loan', category: 'Financial Inclusion', value: '₹5,00,000 Zero-Interest Loan', eligibility: 'Women-led technology and manufacturing micro-enterprises', deadline: 'Rolling 2026', status: 'active' },
  { id: 'sch-5', title: 'Clean Water Tech Fellowship', category: 'Sustainability', value: '₹15,00,000 Seed Grant', eligibility: 'Open hardware innovators deploying IoT clean water testing hubs', deadline: '25 Nov 2026', status: 'active' },
  { id: 'sch-6', title: 'Skill Upgrade Stipend Program', category: 'Workforce Development', value: '₹1,50,000 Course Sponsorship', eligibility: 'Displaced workers seeking certified technical credentials', deadline: '10 Jan 2027', status: 'upcoming' },
  { id: 'sch-7', title: 'Green Campus Environmental Award', category: 'Sustainability', value: '₹10,00,000 Project Grant', eligibility: 'Colleges achieving net-zero carbon or zero waste certification', deadline: '31 Dec 2026', status: 'active' },
  { id: 'sch-8', title: 'Digital Health Innovation Fund', category: 'Healthcare', value: '₹40,00,000 Research Grant', eligibility: 'Clinical trial data pipelines and AI diagnostic algorithms', deadline: '28 Feb 2027', status: 'active' }
];

export const initialSchemeApplications = [
  { id: 'sap-1', applicant: 'Verde Clean Water Alliance', scheme: 'State Innovation Grant 2026', funding: '₹24,50,000', date: '14 Sep 2026', stage: 'Final Board Review', status: 'Under Review' },
  { id: 'sap-2', applicant: 'Solarize Public Schools Initiative', scheme: 'Solar Rooftop Subsidy Scheme', funding: '₹18,00,000', date: '12 Sep 2026', stage: 'Technical Verification', status: 'Approved' },
  { id: 'sap-3', applicant: 'AgriTech Youth Collective', scheme: 'Rural Entrepreneurship Fellowship', funding: '₹12,00,000', date: '10 Sep 2026', stage: 'Interview Scheduled', status: 'Shortlisted' },
  { id: 'sap-4', applicant: 'FemmeForward Micro-Enterprise', scheme: 'Women in Tech Micro-Loan', funding: '₹5,00,000', date: '08 Sep 2026', stage: 'Compliance Complete', status: 'Disbursed' },
  { id: 'sap-5', applicant: 'EcoSensor Labs India', scheme: 'Clean Water Tech Fellowship', funding: '₹15,00,000', date: '06 Sep 2026', stage: 'Technical Verification', status: 'Approved' },
  { id: 'sap-6', applicant: 'TechSkills Retooling Institute', scheme: 'Skill Upgrade Stipend Program', funding: '₹9,00,000', date: '05 Sep 2026', stage: 'Initial Screening', status: 'Under Review' },
  { id: 'sap-7', applicant: 'Pacific Rim Net-Zero College', scheme: 'Green Campus Environmental Award', funding: '₹10,00,000', date: '01 Sep 2026', stage: 'Site Audit Passed', status: 'Approved' },
  { id: 'sap-8', applicant: 'BioPulse MedTech', scheme: 'Digital Health Innovation Fund', funding: '₹38,00,000', date: '29 Aug 2026', stage: 'Clinical Review', status: 'Under Review' }
];

export const initialTickets = [
  {
    id: 'tkt-1',
    ticketNumber: '#ISS-9042',
    user: {
      name: 'Elena Vance',
      email: 'elena.v@openai.com',
      phone: '+91 98401 89201',
      org: 'OpenAI · Research Fellow',
      avatar: 'assets/avatars/avatar-1.jpg'
    },
    event: 'Annual Youth Tech Summit 2026',
    bookingId: 'BK-99402',
    category: 'payment_failed',
    categoryLabel: 'Payment Failed',
    priority: 'critical',
    amount: '₹1,200',
    paymentRef: 'TXN_8849204 · HDFC UPI',
    createdAt: '14 Sep 2026, 10:24 AM',
    lastUpdated: '14 Sep 2026, 11:30 AM',
    status: 'updated',
    statusLabel: 'Updated by Knotnex Admin',
    title: 'Payment debited via UPI but booking timed out with ERR_PG_TIMEOUT',
    description: 'I attempted to book the VIP Delegate Pass for the Youth Tech Summit. Amount of ₹1,200 was successfully debited from my HDFC bank account (UPI Ref: 4892019284), but the booking page showed "Gateway Timeout" and no ticket confirmation was received on my dashboard.',
    logs: [
      { timestamp: '14 Sep 2026, 10:24 AM', author: 'Elena Vance (User)', role: 'user', action: 'Ticket Raised', message: 'User raised issue from Attendee Dashboard: ₹1,200 debited via UPI, booking timed out with ERR_PG_TIMEOUT.' },
      { timestamp: '14 Sep 2026, 11:15 AM', author: 'Ravi Prasanth (Knotnex Admin)', role: 'admin', action: 'Gateway Verification', message: 'Investigated Razorpay transaction TXN_8849204. Gateway confirmed payment captured at 10:25 AM. Reconciled payment with Knotnex ledger.' },
      { timestamp: '14 Sep 2026, 11:30 AM', author: 'Ravi Prasanth (Knotnex Admin)', role: 'admin', action: 'Pass Generated & Dispatched', message: 'Generated VIP Delegate Pass #VIP-9042 and mapped to elena.v@openai.com. Sent confirmation email to user. Status set to Updated by Admin.' }
    ]
  },
  {
    id: 'tkt-2',
    ticketNumber: '#ISS-8911',
    user: {
      name: 'Marcus Brody',
      email: 'marcus@brodytech.io',
      phone: '+91 97910 34988',
      org: 'Brody Technologies · Lead Dev',
      avatar: 'assets/avatars/avatar-2.jpg'
    },
    event: 'Global Entrepreneurship Forum',
    bookingId: 'BK-77291',
    category: 'refund_request',
    categoryLabel: 'Refund Request',
    priority: 'high',
    amount: '₹750',
    paymentRef: 'STRIPE_PI_9940219',
    createdAt: '13 Sep 2026, 04:12 PM',
    lastUpdated: '13 Sep 2026, 04:12 PM',
    status: 'pending',
    statusLabel: 'Pending Review',
    title: 'Travel cancellation refund request due to international visa delay',
    description: 'Due to an unforeseen consular visa delay, I am unable to attend the Global Entrepreneurship Forum in Paris. Requesting a full refund of the General Delegate ticket (₹750) as per the 14-day cancellation policy.',
    logs: [
      { timestamp: '13 Sep 2026, 04:12 PM', author: 'Marcus Brody (User)', role: 'user', action: 'Refund Requested', message: 'User submitted cancellation and refund request of ₹750 due to visa delay.' }
    ]
  },
  {
    id: 'tkt-3',
    ticketNumber: '#ISS-7823',
    user: {
      name: 'Priya Sharma',
      email: 'priya.s@knotbox.org',
      phone: '+91 98450 12891',
      org: 'Knotbox Labs · Core Contributor',
      avatar: 'assets/avatars/avatar-5.jpg'
    },
    event: 'Climate Action Hackathon',
    bookingId: 'BK-66102',
    category: 'double_charge',
    categoryLabel: 'Double Charged',
    priority: 'high',
    amount: '₹500',
    paymentRef: 'UPI/88219034/Paytm',
    createdAt: '12 Sep 2026, 02:45 PM',
    lastUpdated: '12 Sep 2026, 02:45 PM',
    status: 'pending',
    statusLabel: 'Pending Review',
    title: 'Double charge on Paytm UPI during hackathon registration',
    description: 'While booking the registration for Climate Action Hackathon, my first UPI attempt failed on screen but ₹500 was debited. I retried and succeeded, but now my bank statement shows two debits of ₹500 each for the same ticket. Please refund duplicate debit.',
    logs: [
      { timestamp: '12 Sep 2026, 02:45 PM', author: 'Priya Sharma (User)', role: 'user', action: 'Ticket Raised', message: 'User reported double deduction of ₹500 on UPI/88219034/Paytm.' }
    ]
  },
  {
    id: 'tkt-4',
    ticketNumber: '#ISS-6510',
    user: {
      name: 'David Kim',
      email: 'david@hypercloud.io',
      phone: '+91 94441 88130',
      org: 'HyperCloud · Staff SRE',
      avatar: 'assets/avatars/avatar-4.jpg'
    },
    event: 'Annual Youth Tech Summit 2026',
    bookingId: 'BK-55201',
    category: 'refund_request',
    categoryLabel: 'Refund Request',
    priority: 'medium',
    amount: '₹1,200',
    paymentRef: 'RZP_ORD_7719284',
    createdAt: '10 Sep 2026, 09:15 AM',
    lastUpdated: '10 Sep 2026, 02:30 PM',
    status: 'refund_approved',
    statusLabel: 'Refund Approved',
    title: 'Duplicate ticket purchased by corporate sponsor - refund approved',
    description: 'My employer HyperCloud purchased a group pass for our engineering team including me. I had already purchased an individual pass earlier. Requesting refund of my individual ₹1,200 pass.',
    logs: [
      { timestamp: '10 Sep 2026, 09:15 AM', author: 'David Kim (User)', role: 'user', action: 'Refund Requested', message: 'User requested refund of ₹1,200 due to corporate pass duplication.' },
      { timestamp: '10 Sep 2026, 02:30 PM', author: 'Ravi Prasanth (Knotnex Admin)', role: 'admin', action: 'Refund Approved', message: 'Verified corporate roster. Approved refund of ₹1,200 via Razorpay gateway payout. Funds expected to credit in 3-5 business days.' }
    ]
  },
  {
    id: 'tkt-5',
    ticketNumber: '#ISS-5491',
    user: {
      name: 'Alina Petrov',
      email: 'alina.p@berlinklima.de',
      phone: '+49 30 901820',
      org: 'Berlin Klima · Research Fellow',
      avatar: 'assets/avatars/avatar-11.jpg'
    },
    event: 'Climate Action Hackathon',
    bookingId: 'BK-44192',
    category: 'pass_delivery',
    categoryLabel: 'Pass Not Received',
    priority: 'medium',
    amount: '₹500',
    paymentRef: 'SEPA_DE_8819203',
    createdAt: '08 Sep 2026, 11:30 AM',
    lastUpdated: '08 Sep 2026, 01:20 PM',
    status: 'updated',
    statusLabel: 'Updated by Knotnex Admin',
    title: 'Pass QR code corrupted / blank on user dashboard',
    description: 'My payment for the Hackathon went through successfully, but whenever I click "View Pass" in my user dash, the QR code shows a broken image icon and the scanner ID is missing.',
    logs: [
      { timestamp: '08 Sep 2026, 11:30 AM', author: 'Alina Petrov (User)', role: 'user', action: 'Ticket Raised', message: 'Reported corrupted QR pass asset on attendee dashboard.' },
      { timestamp: '08 Sep 2026, 01:20 PM', author: 'Ravi Prasanth (Knotnex Admin)', role: 'admin', action: 'Regenerated Pass', message: 'Re-rendered SVG gate pass QR payload. Sent direct PDF credential to user email. Status set to Updated by Admin.' }
    ]
  },
  {
    id: 'tkt-6',
    ticketNumber: '#ISS-4102',
    user: {
      name: 'Tanya Morales',
      email: 'tanya@austinhealth.org',
      phone: '+91 98840 99188',
      org: 'Austin Health Initiative · Director',
      avatar: 'assets/avatars/avatar-7.jpg'
    },
    event: 'Community Health & Wellness Drive',
    bookingId: 'BK-33019',
    category: 'refund_request',
    categoryLabel: 'Refund Request',
    priority: 'medium',
    amount: '₹400',
    paymentRef: 'STRIPE_CH_3391024',
    createdAt: '06 Sep 2026, 05:00 PM',
    lastUpdated: '06 Sep 2026, 05:00 PM',
    status: 'pending',
    statusLabel: 'Pending Review',
    title: 'Accidental registration for wrong regional chapter',
    description: 'Registered for the Central Texas chapter instead of Austin local hub. Requesting refund of ₹400 registration contribution.',
    logs: [
      { timestamp: '06 Sep 2026, 05:00 PM', author: 'Tanya Morales (User)', role: 'user', action: 'Refund Requested', message: 'User requested ₹400 refund due to accidental wrong chapter registration.' }
    ]
  },
  {
    id: 'tkt-7',
    ticketNumber: '#ISS-3120',
    user: {
      name: 'Samuel Green',
      email: 'sam@greentech.org',
      phone: '+91 98412 77290',
      org: 'EcoGrid · Director of Engineering',
      avatar: 'assets/avatars/avatar-10.jpg'
    },
    event: 'Design Systems Conference 2026',
    bookingId: 'BK-22194',
    category: 'double_charge',
    categoryLabel: 'Double Charged',
    priority: 'critical',
    amount: '₹600',
    paymentRef: 'UPI/99201482/Axis',
    createdAt: '01 Sep 2026, 03:20 PM',
    lastUpdated: '01 Sep 2026, 05:00 PM',
    status: 'resolved',
    statusLabel: 'Resolved',
    title: 'Multiple credit card pending authorizations resolved',
    description: 'Card was charged twice during checkout surge. Bank notified of duplicate authorization.',
    logs: [
      { timestamp: '01 Sep 2026, 03:20 PM', author: 'Samuel Green (User)', role: 'user', action: 'Ticket Raised', message: 'Reported duplicate ₹600 pending authorization.' },
      { timestamp: '01 Sep 2026, 04:45 PM', author: 'Ravi Prasanth (Knotnex Admin)', role: 'admin', action: 'Voided Authorization', message: 'Voided duplicate authorization auth_99214. Second transaction released by issuing bank.' },
      { timestamp: '01 Sep 2026, 05:00 PM', author: 'Ravi Prasanth (Knotnex Admin)', role: 'admin', action: 'Resolved', message: 'Resolved. Confirmed single charge of ₹600 with user.' }
    ]
  },
  {
    id: 'tkt-8',
    ticketNumber: '#ISS-2084',
    user: {
      name: 'Alexandre Dubois',
      email: 'alex@parisventures.eu',
      phone: '+33 1 42 68 55 00',
      org: 'Paris Seed Capital · Partner',
      avatar: 'assets/avatars/avatar-6.jpg'
    },
    event: 'Global Entrepreneurship Forum',
    bookingId: 'BK-11029',
    category: 'general_inquiry',
    categoryLabel: 'General Inquiry',
    priority: 'low',
    amount: '—',
    paymentRef: 'BK-88291 · Corporate',
    createdAt: '28 Aug 2026, 10:15 AM',
    lastUpdated: '28 Aug 2026, 11:30 AM',
    status: 'resolved',
    statusLabel: 'Resolved',
    title: 'VIP lounge access and badge name change request',
    description: 'Requesting to update the attendee name from Alexandre Dubois to colleague Jean-Luc Mercier for VIP networking session.',
    logs: [
      { timestamp: '28 Aug 2026, 10:15 AM', author: 'Alexandre Dubois (User)', role: 'user', action: 'Inquiry Raised', message: 'Requested attendee name transfer to Jean-Luc Mercier.' },
      { timestamp: '28 Aug 2026, 11:30 AM', author: 'Ravi Prasanth (Knotnex Admin)', role: 'admin', action: 'Transfer Executed', message: 'Badge name updated and credentials re-issued. Resolved.' }
    ]
  }
];

export const initialNotifications = [
  { id: 'nt-1', title: 'Payment captured: Sophia Chen (₹550)', time: '10 min ago', category: 'txn', read: false, icon: 'payments', desc: 'VIP All-Access Pass booked for Youth Tech Summit.' },
  { id: 'nt-2', title: 'Gate check-in: Marcus Brody', time: '25 min ago', category: 'gate', read: false, icon: 'qr_code_scanner', desc: 'Scanned at Gate A (VIP Concourse).' },
  { id: 'nt-3', title: 'New ticket raised: #ISS-9042', time: '1 hour ago', category: 'txn', read: false, icon: 'confirmation_number', desc: 'Payment timeout issue reported by Elena Vance.' },
  { id: 'nt-4', title: 'Grant Application Submitted', time: '3 hours ago', category: 'gate', read: true, icon: 'account_balance', desc: 'Verde Clean Water Alliance applied for State Innovation Grant.' }
];

export const knowledgeCategories = [
  { id: 'cat-1', title: 'Getting Started & Onboarding', count: '8 guides', desc: 'Account configuration, workspace setup, and administrator permissions.', icon: 'rocket_launch' },
  { id: 'cat-2', title: 'Event Ticketing & QR Gate Passes', count: '14 guides', desc: 'Conference badge templates, attendee check-in scanners, and seating.', icon: 'confirmation_number' },
  { id: 'cat-3', title: 'Campaigns & Payout Setup', count: '11 guides', desc: 'Fundraising goals, tax compliance receipts, and Stripe connection.', icon: 'payments' },
  { id: 'cat-4', title: 'Career Portal & Candidate Pipeline', count: '9 guides', desc: 'Publishing job opportunities, reviewing resumes, and interview stages.', icon: 'work' },
  { id: 'cat-5', title: 'Grant Schemes & Subsidies', count: '7 guides', desc: 'Application review workflows, grant milestones, and audit compliance.', icon: 'account_balance' },
  { id: 'cat-6', title: 'Security, SSO & API Webhooks', count: '12 guides', desc: 'REST API keys, OAuth2, 2FA enforcement, and SAML directory sync.', icon: 'lock' }
];

export const helpArticles = [
  { title: 'How to generate and export attendance reports in CSV/Excel', meta: '4 min read · Event Management · Updated 2 days ago', helpful: '98% helpful' },
  { title: 'Configuring role-based access control (RBAC) for organization staff', meta: '6 min read · Security & Governance · Updated 1 week ago', helpful: '95% helpful' },
  { title: 'Customizing event badge templates and pass QR codes for gate scanners', meta: '3 min read · Ticketing & Passes · Updated 3 days ago', helpful: '99% helpful' },
  { title: 'Connecting custom payout gateways for organizational fundraising campaigns', meta: '5 min read · Billing & Finance · Updated 5 days ago', helpful: '92% helpful' }
];
