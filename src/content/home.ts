// Ported verbatim from design_handoff_alphanet_website/AlphaNet Solutions.dc.html (Component class data).
export type Service = { title: string; glyph: string; body: string[]; chips: string[]; isRcm?: boolean };
export type PipelineStage = { n: string; name: string; note: string; detail: string };
export type Scope = { key: string; name: string; hint: string; w: number };

export const SERVICES: Service[] = [
  { title: 'Custom Software Development', glyph: '</>', body: ['We design and develop secure, scalable, and high-performance software solutions tailored to your business requirements. From initial planning and architecture to development, integration, and production deployment, we transform complex business workflows into reliable digital products.'], chips: ['Planning & architecture', 'Development', 'Integration', 'Production deployment'] },
  { title: 'Web & Mobile Application Development', glyph: '▢', body: ['We build modern, responsive, and user-friendly web and mobile applications designed for performance, scalability, and seamless user experiences across devices. Our development approach combines modern technologies with maintainable architecture built for long-term growth.'], chips: ['Responsive web apps', 'Mobile apps', 'Performance', 'Maintainable architecture'] },
  { title: 'Healthcare Software & EHR/PM Solutions', glyph: '+', body: ['We provide specialized healthcare technology services covering Electronic Health Records (EHR), Practice Management (PM/PMS), Revenue Cycle Management workflows, patient portals, clinical applications, healthcare APIs, and interoperability solutions.', 'Our healthcare expertise includes HL7, FHIR, EDI, clearinghouse integrations, ePrescribing, laboratory integrations, eFax, patient engagement, and healthcare workflow automation.'], chips: ['HL7', 'FHIR', 'EDI', 'Clearinghouse integrations', 'ePrescribing', 'Laboratory integrations', 'eFax', 'Patient engagement'] },
  { title: 'EHR/PM Deployment, Customization & Re-branding', glyph: '⇪', body: ['Already have an EHR or Practice Management system? AlphaNet Solutions can help transform it into a deployment-ready solution for your organization.', 'We provide existing EHR/PM application deployment, environment configuration, database setup and migration, API configuration, cloud hosting, UI customization, logo replacement, color/theme customization, product naming, company branding, and white-label implementation.', 'This allows healthcare organizations and technology companies to launch a branded EHR/PM solution without rebuilding an entire platform from scratch.'], chips: ['Environment configuration', 'Database migration', 'Cloud hosting', 'UI customization', 'White-label implementation'] },
  { title: 'Cloud & DevOps Services', glyph: '☁', body: ['We provide end-to-end DevOps and cloud infrastructure services across AWS, Microsoft Azure, and DigitalOcean, helping organizations deploy, automate, monitor, and scale their applications reliably.', 'Our capabilities include cloud infrastructure setup, application deployment, database deployment and migration, CI/CD pipelines, GitHub integration, environment configuration, domain and SSL configuration, monitoring, backups, production releases, and infrastructure optimization.'], chips: ['AWS', 'Microsoft Azure', 'DigitalOcean', 'CI/CD pipelines', 'GitHub integration', 'Monitoring & backups'] },
  { title: 'API & System Integration', glyph: '⇄', body: ['We connect applications, healthcare platforms, third-party services, and business systems through secure APIs and integration workflows.', 'Our integration services include REST APIs, healthcare interfaces, payment systems, e Prescribing, laboratories, clearinghouses, e Faxing, AI services, and other third-party platforms.'], chips: ['REST APIs', 'Healthcare interfaces', 'Payment systems', 'Laboratories', 'Clearinghouses', 'AI services'] },
  { title: 'AI & Workflow Automation', glyph: '◎', body: ['We help businesses incorporate practical AI capabilities into existing and new software products, including AI-assisted documentation, AI Scribes, intelligent workflow automation, data processing, conversational interfaces, and API-based AI integrations.', 'The focus is not simply adding AI—it is using automation where it can reduce repetitive work and improve operational efficiency.'], chips: ['AI-assisted documentation', 'AI Scribes', 'Workflow automation', 'Data processing', 'Conversational interfaces'] },
  { title: 'UI/UX Design & Product Modernization', glyph: '◐', body: ['We transform outdated applications into modern digital experiences through intuitive UI/UX design, responsive interfaces, workflow improvements, and frontend modernization.', 'For existing products, we can retain the underlying business functionality while redesigning the user experience and visual identity around a modern product architecture.'], chips: ['UI/UX design', 'Responsive interfaces', 'Workflow improvements', 'Frontend modernization'] },
  { title: 'Branding & Logo Design', glyph: 'Aa', body: ['We create professional digital brand identities that complement your software products and business presence, including logo design, product branding, color systems, typography, application themes, and digital brand assets.', 'For software products, branding can also be integrated directly into the application\u2019s UI.'], chips: ['Logo design', 'Product branding', 'Color systems', 'Typography', 'Application themes'] },
  { title: 'Software Support & Maintenance', glyph: '↻', body: ['Our relationship does not end at deployment. We provide ongoing technical support, maintenance, troubleshooting, application monitoring, enhancements, bug fixes, release management, and infrastructure assistance to keep software reliable and up to date.'], chips: ['Technical support', 'Monitoring', 'Enhancements', 'Bug fixes', 'Release management'] },
  { title: 'End-to-End Revenue Cycle Management (RCM)', glyph: '$', isRcm: true, body: ['We provide comprehensive Revenue Cycle Management services designed to optimize the complete financial lifecycle of healthcare organizations—from patient registration and insurance verification to claim submission, payment posting, denial management, and accounts receivable follow-up.'], chips: ['Billing', 'Coding', 'Claims', 'ERA', 'Denials', 'AR & Collections'] }
];

export const RCM: string[] = ['Patient Registration & Demographic Verification', 'Insurance Eligibility & Benefits Verification', 'Prior Authorization', 'Medical Coding & Charge Entry', 'Claim Creation & Scrubbing', 'Electronic Claims Submission|837P / 837I / 837D', 'Clearinghouse & Payer Connectivity', 'Claim Acknowledgment & Rejection Management|999 / 277CA', 'Payment Posting & ERA Processing|835', 'Denial Management & Appeals', 'Accounts Receivable (A/R) Follow-Up', 'Patient Billing & Statements', 'Secondary & Tertiary Claims', 'Credentialing & Enrollment Support', 'Revenue Cycle Reporting & Analytics', 'RCM Workflow Automation & System Integration'];

export const FEED: { code: string; label: string }[] = [
  { code: 'SOAP', label: 'Encounter documented & signed' },
  { code: '837P', label: 'Claim scrubbed & submitted' },
  { code: '999', label: 'Batch-level acknowledgment received' },
  { code: '277CA', label: 'Claim-level acknowledgment accepted' },
  { code: '835', label: 'ERA received · payment posted' }
];

export const PIPELINE: PipelineStage[] = [
  { n: '01', name: 'Discovery', note: 'Workshops, scope, success metrics.', detail: 'We map your workflows, users and goals, then turn them into a written scope, a prioritised backlog and a clear proposal.' },
  { n: '02', name: 'Architecture', note: 'Data model, stack, integrations.', detail: 'System design, data model, integration contracts (HL7, FHIR, EDI, REST) and a security review, with cloud hosting planned on AWS, Azure or DigitalOcean.' },
  { n: '03', name: 'Sprint Development', note: 'Short cycles, a demo every sprint.', detail: 'Working software at the end of every sprint on a staging environment, with regular demos so your feedback shapes the product as it is built.' },
  { n: '04', name: 'QA & Deployment', note: 'Testing, CI/CD release, support.', detail: 'Testing, CI/CD-driven production release, domain and SSL configuration, monitoring and backups, followed by ongoing support and maintenance.' }
];

export const SCOPES: Scope[] = [
  { key: 'custom', name: 'Custom Software', hint: 'Business workflows, internal systems', w: 16 },
  { key: 'app', name: 'Web & Mobile App', hint: 'Responsive web, iOS & Android', w: 14 },
  { key: 'ehr', name: 'Healthcare / EHR-PM', hint: 'EHR, PMS, portal, interoperability', w: 20 },
  { key: 'whitelabel', name: 'EHR/PM Deployment', hint: 'Deploy, customize, re-brand', w: 8 },
  { key: 'ai', name: 'AI & Automation', hint: 'AI Scribe, workflow automation', w: 12 },
  { key: 'cloud', name: 'Cloud & DevOps', hint: 'AWS, Azure, CI/CD', w: 6 },
  { key: 'design', name: 'UI/UX & Branding', hint: 'Modernization, logo, identity', w: 6 },
  { key: 'rcm', name: 'RCM Services', hint: 'Billing, claims, AR follow-up', w: 4 }
];
export const BUDGETS = ['Under $25k', '$25k – $75k', '$75k – $200k', '$200k+'];
export const TIMELINES = ['Immediately', 'Within a quarter', 'Still planning'];

export const MARQUEE = ['HL7', 'FHIR', 'EDI', '837P · 837I · 837D', '999 · 277CA', '835 ERA', 'CCDA / CDA', 'SFTP', 'ePrescribing', 'Lab integrations', 'eFax', 'Stripe', 'AWS', 'Microsoft Azure', 'DigitalOcean', 'CI/CD', 'GitHub', 'AI Scribe', 'REST APIs', 'Telehealth'];

export const HOME_PRODUCTS = [
  { name: 'Credentialing Management System', tag: 'Centralized healthcare credentialing platform for provider credentials, enrollment and compliance documentation.', href: '/products/credentialing', accent: '#8B7CFF', spot: 'rgba(139,124,255,.15)', mods: ['Provider profiles', 'Payer enrollment', 'Expiration tracking'] },
  { name: 'Ticketing Management System', tag: 'Centralized support, service management, and issue resolution platform.', href: '/products/ticketing', accent: '#4BE3A6', spot: 'rgba(75,227,166,.13)', mods: ['Routing', 'SLA & escalation', 'Analytics'] },
  { name: 'PersonicEMR', tag: 'Modern, configurable Electronic Medical Record and Practice Management platform.', href: '/products/personic-emr', accent: '#C77DFF', spot: 'rgba(199,125,255,.15)', mods: ['Template designer', 'SOAP notes', 'Integrations'] },
  { name: 'WoundWise EHR/PMS', tag: 'Specialized Electronic Health Record and Practice Management platform for wound care.', href: '/products/woundwise', accent: '#FF7A93', spot: 'rgba(255,122,147,.14)', mods: ['Wound assessment', 'Photography', 'Debridement'] }
];
