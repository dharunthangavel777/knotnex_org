/**
 * Knotnex Organization Admin - Asset Mappings & Poster Resolvers
 * Strictly pure helper utilities. All mock business arrays have been purged.
 */

export function getEventPoster(ev) {
  if (ev && ev.poster) return ev.poster;
  const posterMap = {
    'ev-1': '/assets/posters/poster-tech-summit.svg',
    'ev-2': '/assets/posters/poster-climate-hack.svg',
    'ev-3': '/assets/posters/poster-entrepreneur-forum.svg',
    'ev-4': '/assets/posters/poster-healthcare-ai.svg',
    'ev-5': '/assets/posters/poster-wellness-drive.svg',
    'ev-6': '/assets/posters/poster-design-systems.svg'
  };
  if (ev && posterMap[ev.id]) return posterMap[ev.id];
  if (ev && ev.name) {
    const n = ev.name.toLowerCase();
    if (n.includes('tech') || n.includes('youth')) return '/assets/posters/poster-tech-summit.svg';
    if (n.includes('climate') || n.includes('hack')) return '/assets/posters/poster-climate-hack.svg';
    if (n.includes('entrepreneur') || n.includes('forum')) return '/assets/posters/poster-entrepreneur-forum.svg';
    if (n.includes('health') && n.includes('ai')) return '/assets/posters/poster-healthcare-ai.svg';
    if (n.includes('wellness') || n.includes('drive')) return '/assets/posters/poster-wellness-drive.svg';
    if (n.includes('design') || n.includes('systems')) return '/assets/posters/poster-design-systems.svg';
  }
  return '/assets/posters/poster-default.svg';
}

export function getJobPoster(job) {
  if (job && job.poster) return job.poster;
  const posterMap = {
    'job-1': '/assets/hiring/hiring-product-designer.svg',
    'job-2': '/assets/hiring/hiring-fullstack-engineer.svg',
    'job-3': '/assets/hiring/hiring-community-manager.svg',
    'job-4': '/assets/hiring/hiring-climate-associate.svg',
    'job-5': '/assets/hiring/hiring-ai-fellow.svg',
    'job-6': '/assets/hiring/hiring-devops-security.svg',
    'job-7': '/assets/hiring/hiring-program-manager.svg',
    'job-8': '/assets/hiring/hiring-systems-architect.svg'
  };
  if (job && posterMap[job.id]) return posterMap[job.id];
  if (job && (job.title || job.role)) {
    const t = (job.title || job.role).toLowerCase();
    if (t.includes('design') || t.includes('ux') || t.includes('ui')) return '/assets/hiring/hiring-product-designer.svg';
    if (t.includes('full stack') || t.includes('fullstack') || t.includes('frontend') || t.includes('backend') || t.includes('engineer')) return '/assets/hiring/hiring-fullstack-engineer.svg';
    if (t.includes('community') || t.includes('volunteer') || t.includes('manager')) return '/assets/hiring/hiring-community-manager.svg';
    if (t.includes('climate') || t.includes('sustainability') || t.includes('research associate')) return '/assets/hiring/hiring-climate-associate.svg';
    if (t.includes('ai') || t.includes('fellow') || t.includes('machine learning')) return '/assets/hiring/hiring-ai-fellow.svg';
    if (t.includes('devops') || t.includes('security') || t.includes('infra')) return '/assets/hiring/hiring-devops-security.svg';
    if (t.includes('program') || t.includes('pm') || t.includes('product manager')) return '/assets/hiring/hiring-program-manager.svg';
    if (t.includes('architect') || t.includes('systems') || t.includes('lead')) return '/assets/hiring/hiring-systems-architect.svg';
  }
  return '/assets/hiring/hiring-default.svg';
}

export function getUserAvatar(userOrReg, idx = 0) {
  const av = userOrReg?.avatar || userOrReg?.user?.avatar;
  if (av) {
    if (av.startsWith('/assets/')) return av;
    if (av.startsWith('assets/')) return '/' + av;
    return av;
  }
  const num = (idx % 12) + 1;
  return '/assets/avatars/avatar-' + num + '.jpg';
}
