// Ported verbatim from design_handoff_alphanet_website/Product.dc.html (`P` object).
export type FeatureGroup = { t: string; d: string; items: string[]; note: string };
export type FeatureSection = { cat: string; d?: string; groups: FeatureGroup[] };
export type ProductKey = "aquila" | "credentialing" | "ticketing" | "personic" | "woundwise";
export type Product = {
  name: string;
  accent: string;
  glow: string;
  spot: string;
  tagline: string;
  intro: string[];
  badges: string[];
  closingKicker: string;
  closing: string[];
  sections: FeatureSection[];
};

const G = (t: string, d: string, items: string, note?: string): FeatureGroup => ({
  t,
  d: d || "",
  items: items.split("|"),
  note: note || "",
});

export const PRODUCTS: Record<ProductKey, Product> = {
    aquila: {
      name: 'Aquila EHR/PMS', accent: '#00F0FF', glow: 'rgba(0,240,255,.26)', spot: 'rgba(0,240,255,.13)',
      tagline: 'Introduction to our AquilaEHR/PMS Software',
      intro: [
        'Aquila EHR / PMS is a comprehensive healthcare technology platform designed to help medical practices manage clinical care, administrative workflows, patient engagement, billing, and revenue cycle operations through a single integrated solution.',
        'The platform combines a powerful Electronic Health Record (EHR), Practice Management System (PMS), patient engagement tools, interoperability, billing capabilities, and intelligent AI-powered workflow automation to help healthcare organizations improve efficiency, reduce administrative workload, and deliver a better patient experience.',
        'Built to support multiple specialties and healthcare workflows, Aquila EHR / PMS provides configurable clinical templates, secure integrations, advanced reporting, automated workflows, and scalable cloud infrastructure.'
      ],
      badges: ['Cloud-based', 'HL7 · FHIR · EDI', 'HIPAA-aligned workflows'],
      closingKicker: 'One Integrated Healthcare Platform',
      closing: [
        'Aquila EHR / PMS brings together clinical documentation, practice management, patient engagement, interoperability, billing, revenue cycle workflows, AI, and automation within one connected ecosystem.',
        'By reducing fragmented systems and automating repetitive processes, Aquila helps healthcare organizations improve operational efficiency, streamline clinical workflows, strengthen patient engagement, and maintain greater visibility across both clinical and financial operations.'
      ],
      sections: [
        { cat: 'Clinical', groups: [
          G('Electronic Health Records (EHR)', 'Aquila EHR provides healthcare professionals with a centralized clinical platform for documenting, managing, and accessing patient information throughout the care journey.', 'Comprehensive electronic patient records|Encounter and SOAP note documentation|Specialty-specific clinical templates|Customizable clinical workflows|Problem lists and diagnosis management|Medication management|Allergies and medical history|Clinical care plans|Vital signs and patient assessments|Structured and free-text documentation|Document and attachment management|Electronic signatures and provider sign-off|Clinical dashboards|Patient history and encounter timeline', 'The system is designed to make documentation easier while ensuring that critical clinical information remains organized and accessible.'),
          G('Specialty-Specific & Customizable Templates', 'Aquila EHR supports customizable templates designed around the workflows of different medical specialties. Organizations can configure:', 'Clinical documentation templates|SOAP note structures|Assessments|Treatment plans|Procedure documentation|Specialty-specific questionnaires|Intake forms|Clinical data fields|Provider-specific workflows', 'This allows practices to configure the EHR around their operational requirements rather than forcing providers to follow rigid software workflows.'),
          G('E-Prescribing', 'Aquila supports integrated electronic prescribing workflows, allowing providers to manage prescriptions directly from the patient chart.', 'Electronic prescriptions|Medication history|Prescription renewal workflows|Pharmacy selection|Medication management|Controlled substance prescribing through supported integrations|Prescription status tracking', 'Integrated prescribing helps reduce manual processes and improves medication workflow efficiency.'),
          G('Laboratory Integrations', 'Aquila supports integration with laboratory providers to streamline the ordering and result-management process.', 'Electronic laboratory orders|Manual laboratory orders|Lab result retrieval|Result tracking|Patient-specific laboratory history|Provider notifications|Integration through APIs or healthcare interfaces', 'Lab results can be incorporated directly into the patient record for faster clinical review.'),
          G('Telehealth', 'Aquila supports virtual care workflows that allow healthcare organizations to provide remote services to patients.', 'Virtual appointment scheduling|Telehealth session management|Patient notifications|Secure access links|Clinical documentation during virtual visits|Follow-up workflows', 'Telehealth functionality can be integrated directly into the patient and appointment workflow.'),
          G('Referral Management', 'The platform supports structured referral workflows for both incoming and outgoing referrals.', 'Referral creation|Referral tracking|Referral documentation|Provider information|Referral status management|Supporting document attachments|Referral communication', 'This allows organizations to maintain better visibility throughout the referral lifecycle.'),
          G('Document Management', 'Aquila provides centralized document management for patient records and practice documentation.', 'Upload documents|Store patient records|Categorize files|Attach documents to patient profiles|Access clinical paperwork|Maintain supporting documentation|Retrieve documents securely', 'This helps practices maintain organized digital records while reducing dependency on paper-based documentation.')
        ]},
        { cat: 'Practice & Patients', groups: [
          G('Practice Management System (PMS)', 'The integrated Practice Management system provides tools for managing the operational and administrative side of healthcare practices.', 'Patient registration|Patient demographics|Provider management|Location management|Appointment scheduling|Multi-provider scheduling|Multi-location scheduling|Appointment status management|Insurance information|Eligibility verification|Billing workflows|Claims management|Payment tracking|Patient balances|Reporting and analytics', 'By combining the EHR and PMS, Aquila enables clinical and administrative teams to work from the same connected platform.'),
          G('Patient Scheduling & Appointment Management', 'Aquila provides flexible scheduling tools for healthcare organizations operating across multiple providers and locations.', 'Provider calendars|Multi-location scheduling|Appointment creation and management|Appointment status tracking|Recurring appointments|Patient appointment history|Online appointment requests|Appointment reminders|Automated SMS and email notifications', 'Automated reminders can help practices reduce missed appointments and improve patient engagement.'),
          G('Patient Portal', 'The integrated Patient Portal provides patients with secure access to their healthcare information and practice services.', 'View medical records|Access clinical summaries|Review appointments|Request or schedule appointments|View documents|Communicate securely with providers|Complete intake forms|Access telehealth sessions|Review account information|Receive practice communications', 'The portal helps reduce administrative workload while improving patient access and engagement.'),
          G('Patient Intake & Digital Forms', 'Aquila helps healthcare organizations reduce paper-based processes through digital patient intake and form management.', 'Online intake forms|Electronic patient registration|Digital questionnaires|Consent forms|Electronic signatures|Custom forms|Pre-visit documentation|Website-based registration links', 'Patients can complete required information before arriving at the clinic, improving front-desk efficiency.'),
          G('Secure Clinical Communication', 'The platform supports secure communication between patients, healthcare professionals, and internal staff.', 'Provider-to-patient messaging|Internal staff communication|Clinical notifications|Secure document sharing|Patient portal messaging|Workflow notifications', 'This reduces reliance on fragmented communication channels and keeps relevant information within the healthcare platform.')
        ]},
        { cat: 'Integrations', groups: [
          G('Healthcare Interoperability', 'Aquila is designed to support healthcare data exchange between providers, laboratories, pharmacies, clearinghouses, and other healthcare systems.', 'HL7|FHIR|APIs|CCDA / CDA|EDI|SFTP|Secure healthcare interfaces', 'These capabilities enable healthcare organizations to exchange information securely and support continuity of care.'),
          G('Electronic Eligibility Verification', 'Integrated eligibility verification enables practices to verify insurance coverage before services are provided.', 'Real-time eligibility checks|Insurance coverage verification|Benefits information|Eligibility responses|Patient insurance validation', 'Automated eligibility workflows help reduce billing issues and claim rejections.'),
          G('E-Faxing', 'Integrated electronic faxing allows healthcare organizations to send and receive documents directly from the platform.', 'Outbound electronic fax|Incoming fax management|Document attachments|Patient-record association|Fax status tracking|Secure healthcare communication', 'This eliminates the need for separate fax systems and improves document management.'),
          G('Payment Processing', 'Aquila can integrate with secure payment platforms such as Stripe to simplify patient payment collection.', 'Credit card payments|Online patient payments|Payment tracking|Patient balances|Payment history|Integrated billing workflows', 'This provides patients with convenient payment options while helping practices streamline collections.'),
          G('Third-Party Integrations', 'Aquila can connect with external healthcare and business platforms through APIs, healthcare standards, SFTP, and other integration methods.', 'Pharmacies|E-Prescribing platforms|Laboratories|Clearinghouses|Payment processors|E-Fax providers|AI platforms|Patient communication platforms|Healthcare interoperability networks|External EHR and PMS systems')
        ]},
        { cat: 'Revenue Cycle', d: 'Aquila PMS includes revenue cycle functionality designed to support healthcare billing and claims workflows.', groups: [
          G('Electronic Claims Processing', 'The platform can support major healthcare EDI transactions, including:', '837P – Professional Claims|837I – Institutional Claims|837D – Dental Claims|999 – Batch-Level Acknowledgment|277CA – Claim-Level Acknowledgment|835 – Electronic Remittance Advice', 'These transactions support automated claim submission, acknowledgment tracking, payment processing, and revenue-cycle workflows.'),
          G('Clearinghouse Integration', 'Aquila can integrate with clearinghouses using:', 'SFTP|APIs', 'The platform can automate claim transmission and receive acknowledgment and remittance files from connected clearinghouses.'),
          G('Claims Management', 'Claims can be managed throughout the billing lifecycle, including:', 'Claim creation|Claim validation|Claim submission|Claim status tracking|Rejection handling|Resubmission workflows|Payment reconciliation|Secondary claims|Tertiary claims'),
          G('Paper Claim Support', 'Aquila can support standard paper claim formats, including:', 'CMS-1500 / HCFA 1500|UB-04|ADA (American Dental Association) Claim Form', 'This provides flexibility for payers or workflows that still require paper submissions.'),
          G('Denial Management', 'Aquila includes tools to help billing teams identify, organize, and resolve denied or rejected claims.', 'Denial tracking|Rejection management|Denial categorization|Follow-up workflows|Appeal tracking|Claim correction|Resubmission|AR follow-up', 'This allows billing teams to maintain better visibility into outstanding revenue.'),
          G('ERA & Payment Posting', 'Electronic Remittance Advice workflows can help automate payment processing.', '835 ERA processing|Payment posting|Adjustment posting|Claim-level payment reconciliation|Patient responsibility calculations|Payment history'),
          G('Patient Statements', 'Aquila supports patient billing and statement workflows to simplify patient collections.', 'Generate patient statements|Print statements|Send statements electronically|Track patient balances|Manage outstanding patient responsibility')
        ]},
        { cat: 'AI & Automation', d: 'Aquila EHR / PMS incorporates AI and workflow automation capabilities designed to reduce repetitive administrative tasks and improve operational efficiency. Rather than adding AI as a standalone feature, Aquila integrates intelligent automation directly into clinical and administrative workflows.', groups: [
          G('AI Clinical Documentation', 'AI-powered documentation capabilities can assist healthcare professionals in creating structured clinical notes more efficiently.', 'AI-assisted SOAP note generation|Clinical note summarization|Documentation suggestions|Structured data extraction|Clinical text organization|Automated draft generation|Provider review and approval workflows', 'The provider maintains control of the final clinical documentation while AI assists with repetitive documentation tasks.'),
          G('AI Scribe', 'Aquila can support AI Scribe integrations that help transform provider-patient conversations into structured clinical documentation.', 'Conversation transcription|Clinical summary generation|SOAP note drafting|Identification of relevant clinical information|Provider review and approval|Integration with encounter documentation', 'This can significantly reduce the amount of time providers spend manually documenting patient visits.'),
          G('Intelligent Workflow Automation', 'Aquila can automate repetitive clinical, administrative, and billing processes, including:', 'Appointment reminders|Patient notifications|Eligibility checks|Claims submission|Claim acknowledgment processing|ERA processing|Document routing|Clinical notifications|Referral workflows|Task creation|Follow-up reminders|Data synchronization between systems', 'Automation allows staff to focus on higher-value activities instead of repetitive operational tasks.'),
          G('AI-Powered Data Processing', 'AI can also be used to extract and organize information from documents and healthcare data.', 'Document data extraction|Clinical information classification|Structured data generation|Form processing|Document summarization|Workflow routing', 'These capabilities help organizations process large volumes of information more efficiently.'),
          G('Conversational AI', 'Aquila can integrate conversational AI capabilities for healthcare and administrative workflows.', 'Patient assistance|Appointment-related inquiries|Practice information|Workflow assistance|Internal staff support|Automated patient communication', 'AI integrations can be implemented through secure APIs while maintaining appropriate healthcare security controls.')
        ]},
        { cat: 'Platform', groups: [
          G('Advanced Reporting & Analytics', 'Aquila provides reporting capabilities across clinical, operational, and financial workflows.', 'Appointment reports|Patient reports|Provider productivity|Clinical activity|Claims reports|Payment reports|Denial reports|Accounts Receivable reports|Revenue analysis|Operational performance|Practice financial reporting', 'Dashboards and reports help healthcare organizations monitor performance and make data-driven operational decisions.'),
          G('Security & Compliance', 'Protecting healthcare data is a fundamental part of Aquila\u2019s architecture. The platform is designed around healthcare security principles and supports HIPAA-aligned workflows, including:', 'Role-based access controls|Secure authentication|User permissions|Audit logging|Encrypted data communication|Secure cloud hosting|Data backups|Controlled system access|Secure APIs|Infrastructure monitoring', 'Cloud deployment can be configured across secure environments such as AWS or Microsoft Azure, depending on organizational requirements.'),
          G('Cloud-Based & Scalable Architecture', 'Aquila is designed to support healthcare organizations ranging from individual practices to multi-provider and multi-location organizations.', 'Cloud deployment|Multi-location organizations|Multiple providers|Scalable infrastructure|Secure APIs|Third-party integrations|Automated CI/CD deployments|Backup and disaster recovery|Environment-based configuration|Performance monitoring')
        ]}
      ]
    },

    credentialing: {
      name: 'Credentialing Management System', accent: '#8B7CFF', glow: 'rgba(139,124,255,.30)', spot: 'rgba(139,124,255,.15)',
      tagline: 'Centralized healthcare credentialing platform',
      intro: [
        'The Credentialing Management System is a centralized healthcare credentialing platform designed to simplify and automate the process of managing provider credentials, enrollment activities, licenses, certifications, payer participation, and compliance documentation.',
        'The system helps healthcare organizations reduce manual tracking, avoid credential expirations, improve provider onboarding, and maintain complete visibility across the credentialing lifecycle.'
      ],
      badges: ['Provider credentials', 'Payer enrollment', 'Expiration alerts'],
      closingKicker: 'Credentialing Management System',
      closing: ['The platform provides healthcare organizations with a structured, transparent, and scalable approach to provider credentialing and payer enrollment.'],
      sections: [
        { cat: 'Providers', groups: [
          G('Provider Credential Management', 'Maintain comprehensive provider profiles containing all required credentialing information in one secure location.', 'Provider demographic information|Professional licenses|Board certifications|DEA information|NPI information|Education and training history|Employment history|Malpractice insurance|Professional references|Hospital affiliations|Provider documents|Credential expiration dates'),
          G('Credentialing Workflow Management', 'The platform enables organizations to manage credentialing activities through structured workflows.', 'New provider credentialing|Re-credentialing|Credential verification|Application tracking|Credential review|Approval workflows|Provider onboarding|Task assignments|Credentialing status management|Internal notes and follow-ups')
        ]},
        { cat: 'Enrollment & Compliance', groups: [
          G('Payer Enrollment Management', 'Manage provider enrollment activities across commercial and government payers.', 'Payer enrollment tracking|Medicare and Medicaid enrollment|Commercial insurance enrollment|Application submission tracking|Enrollment status monitoring|Effective-date tracking|Provider-payer association|Contract participation status|Follow-up management'),
          G('Expiration & Compliance Tracking', 'Automated expiration management helps prevent credentialing gaps. The system can track:', 'Medical licenses|DEA certificates|Board certifications|Professional liability insurance|State registrations|Contracts|Other time-sensitive credentials', 'Automated notifications and reminders can alert staff before important documents expire.'),
          G('Document Management', 'Store credentialing documents securely within provider profiles.', 'Document uploads|Document categorization|Expiration tracking|Version management|Provider-specific document storage|Secure retrieval|Compliance documentation')
        ]},
        { cat: 'Operations', groups: [
          G('Dashboard & Reporting', 'Credentialing teams can monitor provider onboarding, pending applications, expiring credentials, and enrollment status from centralized dashboards.', 'Providers pending credentialing|Credential expiration reports|Payer enrollment status|Re-credentialing schedules|Outstanding documents|Credentialing productivity|Compliance reports'),
          G('Workflow Automation', 'The Credentialing Management System can automate repetitive credentialing activities, including:', 'Expiration reminders|Follow-up tasks|Provider document requests|Status notifications|Re-credentialing reminders|Payer enrollment follow-ups|Internal assignments')
        ]}
      ]
    },

    ticketing: {
      name: 'Ticketing Management System', accent: '#4BE3A6', glow: 'rgba(75,227,166,.24)', spot: 'rgba(75,227,166,.12)',
      tagline: 'Centralized support, service management, and issue resolution platform',
      intro: [
        'The Ticketing Management System is a centralized support and service-management platform designed to help organizations efficiently receive, organize, assign, track, prioritize, and resolve customer and internal support requests.',
        'It provides complete visibility into support operations while improving communication, accountability, response times, and issue resolution across teams.'
      ],
      badges: ['SLA monitoring', 'Automated routing', 'Support analytics'],
      closingKicker: 'Ticketing Management System',
      closing: ['The Ticketing Management System helps organizations deliver more organized, measurable, and responsive support while maintaining accountability across every customer and internal service request.'],
      sections: [
        { cat: 'Tickets', groups: [
          G('Ticket Creation & Management', '', 'Ticket creation with unique ticket numbers|Ticket categorization and issue descriptions|File and document attachments|Priority assignment and status tracking|Department and support-agent assignment|Internal notes and customer responses|Complete ticket activity history'),
          G('Ticket Assignment & Routing', '', 'Manual and automated ticket assignment|Department-based routing|Team and individual agent assignment|Ticket reassignment and ownership tracking|Escalation workflows for critical or overdue issues'),
          G('Status & Priority Management', '', 'Configurable stages such as New, Open, In Progress, Pending, Waiting for Customer, Resolved, and Closed|Priority levels to identify urgent and business-critical requests|Clear ownership and progress visibility throughout the ticket lifecycle')
        ]},
        { cat: 'Communication & SLA', groups: [
          G('Customer & Internal Communication', '', 'Customer replies and agent responses|Internal staff notes|File attachments and supporting evidence|Activity timeline and communication history|Email and in-system notifications|Status-change communication'),
          G('SLA & Escalation Management', '', 'Response-time tracking|Resolution-time tracking|SLA monitoring|Escalation alerts|Overdue-ticket identification|Priority escalation and follow-up management')
        ]},
        { cat: 'Insight & Automation', groups: [
          G('Dashboard & Analytics', '', 'Open, pending, resolved, and closed ticket dashboards|Tickets by department, category, priority, or agent|Average response and resolution times|High-priority and overdue ticket monitoring|SLA performance and support trend reporting|Agent and team productivity visibility'),
          G('Knowledge & Issue Tracking', '', 'Identification of recurring product or operational issues|Known-issue tracking|Issue categorization and trend analysis|Support history for future troubleshooting|Insights that help improve product quality and reduce repeated requests'),
          G('Notifications & Workflow Automation', '', 'Automatic ticket acknowledgments|Assignment notifications|Status-change notifications|Escalation alerts|Customer follow-up reminders|Resolution notifications|Overdue-ticket reminders')
        ]}
      ]
    },

    personic: {
      name: 'PersonicEMR', accent: '#C77DFF', glow: 'rgba(199,125,255,.28)', spot: 'rgba(199,125,255,.14)',
      tagline: 'Modern, configurable Electronic Medical Record and Practice Management platform',
      intro: [
        'PersonicEMR is a modern Electronic Medical Record and Practice Management platform designed to support the complete clinical and administrative workflow of healthcare organizations.',
        'The platform combines patient management, encounter documentation, scheduling, practice operations, configurable clinical templates, and healthcare integrations within a streamlined and adaptable system.'
      ],
      badges: ['Template designer', 'HL7 · FHIR', 'White-label ready'],
      closingKicker: 'PersonicEMR',
      closing: ['PersonicEMR provides healthcare organizations with a configurable digital platform that brings clinical documentation, patient management, practice operations, and healthcare integrations together in one modern environment.'],
      sections: [
        { cat: 'Clinical', groups: [
          G('Patient Management', '', 'Patient registration and demographics|Insurance and contact information|Medical and clinical history|Encounter history|Patient documents and attachments|Appointments and provider information|Patient account information'),
          G('Encounter & SOAP Note Management', '', 'Subjective documentation|Objective findings|Assessment and Plan|Review of Systems|Physical Examination|Diagnoses and medications|Procedures and clinical instructions|Allergies and medical notes|Structured fields with free-text documentation support'),
          G('Specialty-Specific Clinical Templates', '', 'Specialty-specific SOAP notes|Configurable clinical templates|Structured clinical forms|Procedure documentation|Assessment and treatment templates|Custom clinical fields|Template-based encounter workflows'),
          G('Advanced Template Designer', '', 'Configurable clinical sections and layouts|Text fields, dropdowns, checkboxes, and structured responses|Required-field configuration|Custom field and value management|Specialty and organization-specific workflows|Reusable templates for different encounter types'),
          G('Clinical Workflow Management', '', 'Patient registration and appointment scheduling|Encounter creation|Template selection|Clinical documentation|Provider review and note completion|Electronic sign-off|Superbill generation|Billing workflow initiation')
        ]},
        { cat: 'Practice', groups: [
          G('Practice Management', '', 'Appointment scheduling|Provider management|Location management|Patient registration|Insurance management|Visit management|Multi-provider and multi-location workflows|Clinical and administrative dashboards'),
          G('Document & Communication Management', '', 'Patient document storage|Clinical attachments|Electronic fax workflows|Secure messaging|Provider and staff communication|Referral documentation|Internal notes')
        ]},
        { cat: 'Platform', groups: [
          G('Healthcare Integrations', '', 'E-Prescribing integrations|Laboratory integrations|Electronic faxing|Clearinghouse connectivity|Payment gateways|Healthcare APIs|HL7 and FHIR interfaces|EDI and SFTP-based integrations'),
          G('Modern UI & Product Customization', '', 'Modern responsive user interface|Organization and product branding|Logo and color-theme customization|Navigation configuration|Custom clinical templates|Organization-specific workflows and terminology'),
          G('Cloud Deployment & Scalability', '', 'Development, testing, and production environments|Cloud hosting and infrastructure configuration|Database setup and migration|CI/CD pipelines|Secure environment configuration|Monitoring and backups|Scalable deployment architecture')
        ]}
      ]
    },

    woundwise: {
      name: 'WoundWise EHR/PMS', accent: '#FF7A93', glow: 'rgba(255,122,147,.26)', spot: 'rgba(255,122,147,.13)',
      tagline: 'Specialized Electronic Health Record and Practice Management platform for wound care',
      intro: [
        'WoundWise EHR / PMS is a specialized Electronic Health Record and Practice Management platform designed for wound-care organizations, providers, and clinics managing complex and long-term wound-treatment workflows.',
        'The platform combines detailed wound documentation, clinical assessments, treatment tracking, procedure management, scheduling, billing, revenue-cycle workflows, and intelligent automation within one specialized healthcare solution.'
      ],
      badges: ['Wound photography', '837P · 835', 'AI Scribe'],
      closingKicker: 'WoundWise EHR / PMS',
      closing: ['WoundWise EHR / PMS brings specialized wound documentation, treatment management, clinical workflows, practice management, billing, AI assistance, and workflow automation into one connected platform for the complete wound-care journey.'],
      sections: [
        { cat: 'Wound Care', groups: [
          G('Comprehensive Wound Assessment', '', 'Wound location and type|Length, width, depth, surface area, and volume|Wound stage and tissue type|Drainage, odor, and periwound condition|Wound edges, undermining, and tunneling|Pain level and infection indicators|Healing status and clinical observations|Independent documentation of multiple wounds for the same patient'),
          G('Wound Progress Tracking', '', 'Historical wound measurements|Wound-size and healing comparisons|Previous assessment review|Treatment history|Clinical progress notes|Wound-status monitoring over multiple visits'),
          G('Wound Photography', '', 'Wound image capture and upload|Date-based wound photographs|Wound-specific image association|Historical image comparison|Secure image storage within the patient record'),
          G('Wound Debridement Documentation', '', 'Debridement type and selected wound|Tissue removed and instruments used|Pre- and post-procedure measurements|Anesthesia information|Procedure notes|Provider documentation and procedure outcome'),
          G('Cellular & Tissue-Based Product Management', '', 'Product and manufacturer selection|Product size and quantity applied|Amount discarded|Application site|Lot and expiration information|Procedure documentation|Supporting clinical details'),
          G('Factors Affecting Wound Healing', '', 'Diabetes and vascular disease|Infection and nutritional factors|Smoking|Mobility limitations|Pressure-related factors|Comorbid conditions|Medication-related factors')
        ]},
        { cat: 'Clinical', groups: [
          G('Wound-Specific SOAP Notes', '', 'Subjective information|Review of Systems|Objective findings|Physical Examination|Wound Assessment|Assessment and diagnoses|Plan and wound-care procedures|Patient instructions and follow-up plan'),
          G('Treatment Planning', '', 'Dressing selection|Wound-care instructions|Treatment frequency|Offloading instructions|Compression therapy|Medication recommendations|Follow-up schedules|Patient education and care-plan documentation'),
          G('AI-Assisted Wound Documentation', '', 'AI-assisted SOAP note generation|Wound-note summarization|Structured data extraction|Clinical documentation suggestions|Visit-summary generation|AI Scribe integration with provider review and approval')
        ]},
        { cat: 'Practice & Revenue', groups: [
          G('Practice Management', '', 'Patient registration|Provider and location management|Appointment scheduling|Visit management|Insurance information|Eligibility verification|Billing workflows|Claims and payment tracking|Operational reporting'),
          G('Revenue Cycle & Billing', '', 'Superbill creation|CPT and ICD-10 coding workflows|Claim generation and electronic submission|Claim status tracking|ERA processing and payment posting|Denial management|Accounts Receivable follow-up|Patient balances|EDI workflows including 837P, 837I, 999, 277CA, and 835'),
          G('Patient Portal', '', 'Appointment information|Clinical summaries|Patient documents|Digital intake forms|Provider communication|Patient education|Account and billing information')
        ]},
        { cat: 'Platform', groups: [
          G('Workflow Automation', '', 'Appointment reminders|Patient follow-up workflows|Wound reassessment reminders|Document routing|Insurance verification|Claim submission and acknowledgment processing|Provider task creation|Treatment follow-up notifications'),
          G('Reporting & Analytics', '', 'Wound-healing progress reports|Patient treatment history|Provider activity and procedure utilization|Appointment statistics|Claims, denials, and payments|Accounts Receivable and revenue-cycle performance'),
          G('Security & Scalable Architecture', '', 'Role-based access and user permissions|Secure authentication|Audit logging|Encrypted communication|Cloud hosting|Automated backups|Secure APIs|Multi-location support|Scalable infrastructure')
        ]}
      ]
    }
};

export type ProductLink = {
  key: ProductKey;
  slug: string;
  href: string;
  /** One-line tag used in the header dropdown and "More from AlphaNet". */
  tag: string;
};

export const PRODUCT_LINKS: ProductLink[] = [
  { key: "aquila", slug: "aquila-ehr", href: "/products/aquila-ehr", tag: "EHR, practice management, patient engagement, billing and RCM in one platform." },
  { key: "credentialing", slug: "credentialing", href: "/products/credentialing", tag: "Provider credentials, payer enrollment and compliance tracking." },
  { key: "ticketing", slug: "ticketing", href: "/products/ticketing", tag: "Centralized support, service management and issue resolution." },
  { key: "personic", slug: "personic-emr", href: "/products/personic-emr", tag: "Modern, configurable EMR and practice management platform." },
  { key: "woundwise", slug: "woundwise", href: "/products/woundwise", tag: "Specialized EHR and practice management for wound care." },
];

export const productBySlug = (slug: string) => PRODUCT_LINKS.find((l) => l.slug === slug);

/**
 * Claim-form theme: each product is printed in its own dropout ink (like multi-part form copies).
 * All inks pass 4.5:1 on paper (#FCFDFC) for small caption text.
 */
export const PRODUCT_INK: Record<ProductKey, { ink: string; tint: string }> = {
  aquila: { ink: "#D3343B", tint: "#FDF3F2" },
  credentialing: { ink: "#2F5D9E", tint: "#F1F5FB" },
  ticketing: { ink: "#1D6E74", tint: "#EFF7F7" },
  personic: { ink: "#7A3E8E", tint: "#F7F1F9" },
  woundwise: { ink: "#B04A12", tint: "#FCF3EE" },
};
