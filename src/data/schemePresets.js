export const SCHEME_PRESETS = [
  {
    id: 'scheme-preset-1',
    name: 'ADIP Scheme — Free Assistive Devices & Appliances',
    title: 'ADIP Scheme — Free Assistive Devices & Appliances',
    badge: 'Central Welfare Grant',
    tag: 'Assistive Tech',
    icon: '🦽',
    providerName: 'Ministry of Social Justice & Empowerment',
    type: 'Government',
    category: 'Assistive Tech Grant',
    description: `The main objective of the Assistance to Disabled Persons (ADIP) Scheme is to assist needy persons with disabilities in procuring durable, sophisticated, and scientifically manufactured modern assistive aids and appliances to promote their physical, social, and psychological rehabilitation.\n\nBenefits Provided:\n• Motorized Tricycles, Smart Wheelchairs, Prosthetics & Orthotics.\n• Daisy Players, Braille slates, and Smart Canes for visually impaired.\n• Digital Hearing Aids and cochlear implant subsidies.`,
    grantAmount: 'Up to ₹1,50,000 / Free Device',
    fundingAmount: '150000',
    deadline: '2026-12-31',
    officialPortalUrl: 'https://adip.depwd.gov.in',
    region: 'Pan India',
    supportEmail: 'adip-support@depwd.gov.in',
    supportPhone: '1800-11-2001',
    eligibilityCriteria: [
      'Indian citizen holding a valid UDID Card or Certificate with 40%+ disability',
      'Monthly family income not exceeding ₹30,000 (100% grant) or ₹30,001 - ₹50,000 (50% grant)',
      'Must not have received the same aid/appliance from government/NGO in the last 3 years',
      'Prescription from empanelled government medical officer'
    ],
    documentsRequired: [
      'Copy of UDID / Unique Disability Identity Card (or Hospital Certificate)',
      'Income Certificate issued by Revenue Authority / BPL Ration Card',
      'Aadhaar Card (Linked with Mobile number)',
      'Medical Recommendation / Prescription for the specific assistive device',
      'Recent passport-size colored photographs'
    ],
    applicationSteps: [
      { step: 1, title: 'Document Verification & Registration', desc: 'Submit application online on Knotnex or the ADIP portal with UDID and income proof.' },
      { step: 2, title: 'Medical Assessment Camp', desc: 'Attend district assessment camp by ALIMCO / Artificial Limbs Manufacturing Corporation.' },
      { step: 3, title: 'Sanction & Device Allotment', desc: 'Fitment and delivery of personalized assistive equipment.' }
    ],
    faqs: [
      { q: 'Is there any application fee for ADIP?', a: 'No, applying for the ADIP scheme is completely free of cost.' },
      { q: 'Can children under 14 apply?', a: 'Yes! Assistive devices for children (including specialized strollers and sensory aids) are prioritized.' }
    ]
  },
  {
    id: 'scheme-preset-2',
    name: 'National Fellowship for Persons with Disabilities (NFPwD)',
    title: 'National Fellowship for Persons with Disabilities (NFPwD)',
    badge: 'Education Fellowship',
    tag: 'Higher Education',
    icon: '🎓',
    providerName: 'Department of Empowerment of Persons with Disabilities',
    type: 'Government',
    category: 'Education Scholarship',
    description: `Provides financial support to students with disabilities pursuing M.Phil and Ph.D. degrees in Indian universities and institutions recognized by UGC.\n\nFellowship Coverage:\n• JRF: ₹31,000 per month for the first 2 years.\n• SRF: ₹35,000 per month for remaining tenure.\n• Annual contingency grant of ₹20,500 and escorts/reader allowance.`,
    grantAmount: '₹35,000 / month + Contingency',
    fundingAmount: '420000',
    deadline: '2026-11-15',
    officialPortalUrl: 'https://scholarships.gov.in',
    region: 'Pan India',
    supportEmail: 'nfpwd.fellowship@ugc.ac.in',
    supportPhone: '011-23604446',
    eligibilityCriteria: [
      'Candidate must have a valid UDID card with 40% or more disability',
      'Enrolled in regular, full-time M.Phil / Ph.D. program in a recognized university',
      'Postgraduate degree with minimum 50% aggregate marks'
    ],
    documentsRequired: [
      'UDID Card copy',
      'Admission confirmation letter from University',
      'Postgraduate degree marks card and certificate',
      'Aadhaar card copy',
      'Bank passbook copy with IFSC code'
    ],
    applicationSteps: [
      { step: 1, title: 'Online Application Submission', desc: 'Register and submit fellowship documents on National Scholarship Portal.' },
      { step: 2, title: 'University Nodal Officer Verification', desc: 'Institutional verification by university registrar.' },
      { step: 3, title: 'Direct Benefit Transfer (DBT)', desc: 'Monthly fellowship deposited directly into bank account via PFMS.' }
    ],
    faqs: [
      { q: 'Are distance education students eligible?', a: 'No, the fellowship is strictly for regular full-time research scholars.' }
    ]
  },
  {
    id: 'scheme-preset-3',
    name: 'Divyangjan Swavalamban Concessional Micro-Loan Scheme',
    title: 'Divyangjan Swavalamban Concessional Micro-Loan Scheme',
    badge: 'Self-Employment Loan',
    tag: 'Entrepreneurship',
    icon: '💼',
    providerName: 'National Handicapped Finance and Development Corporation (NHFDC)',
    type: 'Government',
    category: 'Self-Employment Loan',
    description: `Concessional credit scheme for persons with disabilities to start micro-enterprises, small businesses, agricultural ventures, or professional self-employment units with interest rebates for prompt repayment.\n\nLoan Terms:\n• Loans up to ₹5,00,000 at highly subsidized 4% interest rate.\n• Special 0.5% additional rebate for women with disabilities.\n• Repayment tenure up to 7 years with 6-month moratorium period.`,
    grantAmount: 'Up to ₹5,00,000 Loan at 4% Interest',
    fundingAmount: '500000',
    deadline: '2026-12-31',
    officialPortalUrl: 'https://nhfdc.nic.in',
    region: 'Pan India',
    supportEmail: 'nhfdc97@gmail.com',
    supportPhone: '0129-2226910',
    eligibilityCriteria: [
      'Indian citizen with 40% or more disability certified by medical authority or UDID',
      'Age between 18 and 60 years',
      'Feasible micro-business or self-employment project proposal'
    ],
    documentsRequired: [
      'UDID Card / Disability Certificate',
      'Detailed Business / Project Proposal or Quotation',
      'Aadhaar and PAN Card copy',
      'Resident / Domicile Certificate',
      'Bank Account details with 6-month statement'
    ],
    applicationSteps: [
      { step: 1, title: 'Project Proposal Submission', desc: 'Submit business proposal through State Channelising Agency (SCA) or Knotnex.' },
      { step: 2, title: 'Technical Feasibility Review', desc: 'District screening committee evaluates loan proposal and viability.' },
      { step: 3, title: 'Sanction & Fund Disbursement', desc: 'Direct credit of loan amount to entrepreneur bank account.' }
    ],
    faqs: [
      { q: 'Is collateral security required for small loans?', a: 'For loans up to ₹25,000, no collateral is required. For loans above ₹50,000, standard hypothecation applies.' }
    ]
  }
];

export function getNextSchemePreset(currentId) {
  if (!currentId) return SCHEME_PRESETS[0];
  const idx = SCHEME_PRESETS.findIndex((p) => p.id === currentId);
  if (idx === -1 || idx === SCHEME_PRESETS.length - 1) return SCHEME_PRESETS[0];
  return SCHEME_PRESETS[idx + 1];
}
