import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Wire CareerAutoFillFloatingButton in CreateOpportunityView.jsx
const careerViewPath = path.join(__dirname, '../src/views/CreateOpportunityView.jsx');
let careerContent = fs.readFileSync(careerViewPath, 'utf8');

if (!careerContent.includes('CareerAutoFillFloatingButton')) {
  careerContent = careerContent.replace(
    "import JobAccommodationsHiringScreen from './JobAccommodationsHiringScreen';",
    "import JobAccommodationsHiringScreen from './JobAccommodationsHiringScreen';\nimport CareerAutoFillFloatingButton from '../components/CareerAutoFillFloatingButton';"
  );

  const applyMethod = `  const applyCareerPreset = (p) => {
    setJobData(prev => ({
      ...prev,
      title: p.title,
      dept: p.department,
      type: p.type,
      location: p.location,
      salary: p.salary,
      experience: p.experience,
      desc: p.description,
      requirements: p.requirements,
      accommodations: p.accommodations,
      hiringStages: p.hiringStages,
      perks: p.perks,
      faqs: p.faqs,
      presetId: p.id
    }));
    setSelectedPerks(p.perks);
    showToast('Autofilled: ' + p.title, 'success');
  };

  const clearCareerForm = () => {
    setJobData({
      title: '',
      dept: 'Product & Design',
      type: 'Full-time',
      location: '',
      salary: '',
      experience: '',
      desc: '',
      requirements: [],
      accommodations: [],
      hiringStages: [],
      perks: [],
      faqs: []
    });
    setSelectedPerks([]);
    showToast('Form cleared', 'info');
  };
`;

  careerContent = careerContent.replace('const handlePublish = (customFormConfig) => {', applyMethod + '\n  const handlePublish = (customFormConfig) => {');

  // Add the FAB right before closing div in Stage 1
  careerContent = careerContent.replace(
    '</section>\n    </div>',
    `</section>\n      <CareerAutoFillFloatingButton onApplyPreset={applyCareerPreset} onClearForm={clearCareerForm} currentPresetId={jobData.presetId} />\n    </div>`
  );

  fs.writeFileSync(careerViewPath, careerContent, 'utf8');
  console.log('✅ Wired CareerAutoFillFloatingButton into CreateOpportunityView.jsx');
}

// 2. Wire CareerAutoFillFloatingButton into JobAccommodationsHiringScreen.jsx
const jobAccPath = path.join(__dirname, '../src/views/JobAccommodationsHiringScreen.jsx');
let jobAccContent = fs.readFileSync(jobAccPath, 'utf8');

if (!jobAccContent.includes('CareerAutoFillFloatingButton')) {
  jobAccContent = jobAccContent.replace(
    "import BackButton from '../components/common/BackButton';",
    "import BackButton from '../components/common/BackButton';\nimport CareerAutoFillFloatingButton from '../components/CareerAutoFillFloatingButton';"
  );

  const fabCode = `
      <CareerAutoFillFloatingButton
        onApplyPreset={(p) => {
          setAccommodations(p.accommodations);
          setHiringStages(p.hiringStages);
          setPerks(p.perks);
          setFaqs(p.faqs);
          showToast('Autofilled stage 2 from ' + p.title, 'success');
        }}
        onClearForm={() => {
          setAccommodations([]);
          setHiringStages([]);
          setPerks([]);
          setFaqs([]);
        }}
      />
    </div>
  );
}`;

  jobAccContent = jobAccContent.replace('    </div>\n  );\n}', fabCode);
  fs.writeFileSync(jobAccPath, jobAccContent, 'utf8');
  console.log('✅ Wired CareerAutoFillFloatingButton into JobAccommodationsHiringScreen.jsx');
}

// 3. Wire SchemeAutoFillFloatingButton into CreateSchemeView.jsx
const schemeViewPath = path.join(__dirname, '../src/views/CreateSchemeView.jsx');
let schemeContent = fs.readFileSync(schemeViewPath, 'utf8');

if (!schemeContent.includes('SchemeAutoFillFloatingButton')) {
  schemeContent = schemeContent.replace(
    "import SchemeApplicationFormBuilder from './SchemeApplicationFormBuilder';",
    "import SchemeApplicationFormBuilder from './SchemeApplicationFormBuilder';\nimport SchemeAutoFillFloatingButton from '../components/SchemeAutoFillFloatingButton';"
  );

  const applySchemeMethod = `  const applySchemePreset = (p) => {
    setTitle(p.title);
    setCategory(p.category);
    setValue(p.grantAmount);
    setDeadline(p.deadline);
    setRegion(p.region);
    setOrgName(p.providerName);
    setDesc(p.description);
    setPortalUrl(p.officialPortalUrl);
    setEmailSupport(p.supportEmail);
    setHelpline(p.supportPhone);
    setEligibilityCriteria(p.eligibilityCriteria);
    setRequirements(p.documentsRequired);
    setApplicationSteps(p.applicationSteps);
    setFaqs(p.faqs);
    showToast('Autofilled: ' + p.title, 'success');
  };

  const clearSchemeForm = () => {
    setTitle('');
    setCategory('');
    setValue('');
    setDeadline('');
    setRegion('Pan India');
    setDesc('');
    setPortalUrl('');
    setEmailSupport('');
    setHelpline('');
    setEligibilityCriteria([]);
    setRequirements([]);
    setApplicationSteps([]);
    setFaqs([]);
    showToast('Form cleared', 'info');
  };
`;

  schemeContent = schemeContent.replace('const handlePublish = (customFormConfig) => {', applySchemeMethod + '\n  const handlePublish = (customFormConfig) => {');

  // Add FAB to bottom of Stage 1
  schemeContent = schemeContent.replace(
    '</section>\n    </div>\n  );',
    `</section>\n      <SchemeAutoFillFloatingButton onApplyPreset={applySchemePreset} onClearForm={clearSchemeForm} />\n    </div>\n  );`
  );

  fs.writeFileSync(schemeViewPath, schemeContent, 'utf8');
  console.log('✅ Wired SchemeAutoFillFloatingButton into CreateSchemeView.jsx');
}

// 4. Wire SchemeAutoFillFloatingButton into SchemeEligibilityProcess.jsx
const schemeEligPath = path.join(__dirname, '../src/views/SchemeEligibilityProcess.jsx');
let schemeEligContent = fs.readFileSync(schemeEligPath, 'utf8');

if (!schemeEligContent.includes('SchemeAutoFillFloatingButton')) {
  schemeEligContent = schemeEligContent.replace(
    "import SchemeFaqsCard from './SchemeFaqsCard';",
    "import SchemeFaqsCard from './SchemeFaqsCard';\nimport SchemeAutoFillFloatingButton from '../components/SchemeAutoFillFloatingButton';"
  );

  const eligFab = `
      <SchemeAutoFillFloatingButton
        onApplyPreset={(p) => {
          setEligibilityCriteria(p.eligibilityCriteria);
          setRequirements(p.documentsRequired);
          setApplicationSteps(p.applicationSteps);
          setFaqs(p.faqs);
          showToast('Autofilled stage 2 from ' + p.title, 'success');
        }}
        onClearForm={() => {
          setEligibilityCriteria([]);
          setRequirements([]);
          setApplicationSteps([]);
          setFaqs([]);
        }}
      />
    </div>
  );
}`;

  schemeEligContent = schemeEligContent.replace('    </div>\n  );\n}', eligFab);
  fs.writeFileSync(schemeEligPath, schemeEligContent, 'utf8');
  console.log('✅ Wired SchemeAutoFillFloatingButton into SchemeEligibilityProcess.jsx');
}

