export const homepageContent = {
  headline: 'End-to-end digital accessibility engineering',
  subheadline:
    'We help forward-thinking companies achieve WCAG 2.1/2.2 AA compliance, mitigate legal risk, boost SEO rankings, and build inclusive digital experiences through full-stack accessibility audits, direct codebase remediation, and assistive-technology testing.',
  ctaText: 'Request a free mini-audit',
  pillars: [
    {
      id: 'audit',
      icon: '🧪',
      title: 'Audit & diagnose',
      description:
        'Rigorous manual and automated testing across desktop and mobile to identify WCAG 2.1/2.2 AA violations before they turn into legal liabilities.',
      badge: 'WCAG 2.1 / 2.2 AA',
    },
    {
      id: 'remediate',
      icon: '🛠',
      title: 'Direct codebase remediation',
      description:
        'Hands-on engineering to fix ARIA, semantic HTML, keyboard navigation, and focus management issues directly in your codebase.',
      badge: 'Web, iOS & Android',
    },
    {
      id: 'maintain',
      icon: '🛡',
      title: 'Continuous compliance',
      description:
        'Ongoing regression testing and monthly QA to ensure your product stays compliant as your development team ships new features.',
      badge: 'Continuous QA',
    },
  ],
};

export const businessROI = [
  {
    id: 'legal-risk',
    icon: '⚖️',
    title: 'Mitigate ADA lawsuit risk',
    description:
      'Over 4,000 digital accessibility lawsuits are filed annually. Full WCAG 2.1/2.2 AA compliance protects your company from costly legal demand letters and compliance penalties.',
  },
  {
    id: 'seo-boost',
    icon: '🚀',
    title: 'Boost SEO & site speed',
    description:
      'Accessible code is clean code. Semantic HTML, proper heading hierarchies, and ARIA patterns directly improve your site’s Google search visibility and page load performance.',
  },
  {
    id: 'market-reach',
    icon: '💰',
    title: 'Tap into 15%+ more market share',
    description:
      'Over 1 Billion people globally live with disabilities. Ensuring an accessible checkout and user flow unlocks an estimated $13 Trillion in annual disposable income.',
  },
];

export const processSteps = [
  {
    step: '01',
    title: 'Free mini-audit (delivered in 48 hours)',
    description:
      'We run an initial automated + manual scan of 1–2 key user flows and deliver a prioritized risk scorecard in 48 hours to identify blocking WCAG violations.',
  },
  {
    step: '02',
    title: 'Actionable remediation roadmap',
    description:
      'You receive a clear compliance report with severity ratings, WCAG criteria mappings, and step-by-step developer fix instructions.',
  },
  {
    step: '03',
    title: 'Codebase remediation & QA',
    description:
      'We implement the code fixes directly in your repository (React, HTML/ARIA, Swift, Kotlin) and verify with NVDA, VoiceOver, and TalkBack.',
  },
];

export const testimonials = [
  {
    id: 'testimonial-1',
    quote:
      'Ryan’s deep expertise in accessibility engineering made a huge impact on our platform. He doesn’t just report violations—he opens pull requests with clean, production-ready fixes.',
    author: 'Sarah Jenkins',
    role: 'Staff Product Manager',
    company: 'Enterprise FinTech Platform',
  },
  {
    id: 'testimonial-2',
    quote:
      'Working with Ryan proved how skilled he is at navigating complex enterprise codebase architectures. His attention to detail on keyboard focus management and screen reader routing is exceptional.',
    author: 'Marcus Vance',
    role: 'Lead Frontend Architect',
    company: 'Enterprise FinTech Platform',
  },
  {
    id: 'testimonial-3',
    quote:
      'Ryan approaches accessibility with a engineering-first mindset. He bridged the gap between compliance checklists and direct developer execution seamlessly.',
    author: 'Elena Rostova',
    role: 'Director of Engineering',
    company: 'Digital Product Agency',
  },
];

export const sampleAuditDeliverable = {
  title: 'What you receive: the comprehensive audit deliverable',
  subtitle:
    'A complete B2B remediation package designed for engineering leaders and executives, included exclusively in our standalone accessibility audits and Package C (The complete overhaul).',
  components: [
    {
      title: 'Executive Risk Scorecard',
      description: 'High-level compliance health dashboard with legal risk severity distribution and immediate priority action items.',
    },
    {
      title: 'WCAG 2.1 / 2.2 AA Defect Matrix',
      description: 'Comprehensive line-item catalogue of every discovered violation mapped directly to W3C success criteria.',
    },
    {
      title: 'Assistive Tech Verification Log',
      description: 'Audio transcripts and screen recordings detailing actual screen-reader navigation behavior across NVDA, VoiceOver, and TalkBack.',
    },
    {
      title: 'Developer Remediation Snippets',
      description: 'Production-ready code fixes, ARIA attribute specifications, and keyboard focus trap patterns ready for PR submission.',
    },
    {
      title: 'Continuous Compliance Playbook',
      description: 'Custom CI/CD linting guidelines, automated test suites, and ongoing QA checklist for sprint releases.',
    },
  ],
};

export const coreServices = [
  {
    id: 'audits',
    icon: '🧪',
    title: 'Accessibility audits',
    platforms: ['Web', 'iOS', 'Android Native'],
    pricing: 'Starting at $3,000',
    timeframe: '10–20 hrs',
    highlights: [
      'WCAG 2.1/2.2 AA compliance tracking',
      'Manual + automated testing across devices',
      'Assistive tech (AT) testing (Desktop: NVDA, VoiceOver; Mobile: VoiceOver, TalkBack)',
      'Keyboard-only navigation & focus management testing',
      'Severity scoring and cross-platform remediation roadmaps',
    ],
    summary:
      'In-depth auditing across web and native mobile platforms to deliver an actionable, developer-friendly compliance roadmap.',
  },
  {
    id: 'remediation',
    icon: '🛠',
    title: 'Remediation engineering',
    platforms: ['Web (HTML/ARIA)', 'iOS (Swift/UIKit)', 'Android (Kotlin)'],
    pricing: 'Starting at $2,000 (or $75/hr)',
    timeframe: 'Flexible',
    highlights: [
      'Cross-Platform Engineering: Direct codebase fixes for Web, iOS, and Android',
      'ARIA authoring and Semantic HTML (Web)',
      'Native mobile accessibility fixes (iOS Swift/UIKit & Android)',
      'Focus management and Keyboard navigation routing',
    ],
    summary:
      'Direct, hands-on codebase modifications that resolve accessibility defects without breaking your UI component contracts.',
  },
  {
    id: 'testing',
    icon: '🔍',
    title: 'Accessibility testing',
    platforms: ['Web & Mobile Sprints'],
    pricing: 'Starting at $1,000/mo',
    timeframe: '5–10 hrs/week',
    highlights: [
      'Sprint and regression testing (Web & Mobile)',
      'Continuous AT testing across desktop and mobile devices',
      'Accessibility review on pull requests and design specs',
      'Ongoing compliance assurance during rapid shipping cycles',
    ],
    summary:
      'Embedding accessibility testing directly into your release pipeline so new features stay compliant.',
  },
];

export const servicePackages = [
  {
    id: 'package-a',
    name: 'Package A: Targeted fixes',
    investment: 'Starting at $1,500',
    timeline: '5–10 hrs',
    popular: false,
    scope:
      'Focused audit on high-traffic flows, immediate engineering fixes for critical WCAG violations.',
    features: [
      'Mini-audit focusing on key user conversion funnels',
      'Immediate code fixes for critical WCAG violations',
      'Keyboard trap & screen reader bug fixes',
      'Quick-turnaround delivery (under 2 weeks)',
    ],
  },
  {
    id: 'package-b',
    name: 'Package B: Monthly accessibility QA',
    investment: 'Starting at $1,000/mo',
    timeline: '5–10 hrs/week',
    popular: false,
    scope:
      'Integration into sprint cycles, regression testing on new features, ongoing AT testing, continuous compliance.',
    features: [
      'Sprint feature accessibility reviews',
      'Regression testing on new code releases',
      'Assistive tech verification before deployments',
      'Quarterly executive compliance summary',
      'Direct Slack / Teams access for dev team queries',
    ],
  },
  {
    id: 'package-c',
    name: 'Package C: The complete overhaul',
    investment: 'Starting at $7,000',
    timeline: '15–30 hrs',
    popular: true,
    scope:
      'Comprehensive manual/automated testing, AT testing, remediation roadmap, hands-on codebase remediation (audit + fixes).',
    features: [
      'Full-stack WCAG 2.1/2.2 AA audit',
      'Hands-on codebase remediation (Web, iOS, or Android)',
      'Desktop AT testing (NVDA, VoiceOver) + Mobile AT (VoiceOver/TalkBack)',
      'Post-remediation verification report',
      '30 days of post-launch engineering support',
    ],
  },
];

export const launchRoadmap = [
  {
    week: 'Week 1',
    title: 'Foundation',
    items: [
      'Add accessibility positioning across site copy',
      'Create comprehensive services & packages pages',
      'Build standardized free mini-audit intake template',
      'Publish service package options with transparent pricing',
      'Draft initial accessibility engineering case study portfolio',
    ],
  },
  {
    week: 'Week 2',
    title: 'Outreach',
    items: [
      'Send 20 targeted mini-audit offers to key target accounts',
      'Publish 2 LinkedIn technical accessibility insights',
      'Engage in 3 specialized web & mobile developer Slack communities',
      'Apply to 10 freelance/contract accessibility engineering positions',
      'Establish contact with 5 digital product agencies',
    ],
  },
  {
    week: 'Week 3',
    title: 'Conversion',
    items: [
      'Deliver 5 completed mini-audits with actionable engineering findings',
      'Pitch full-scope WCAG audits to high-intent leads',
      'Close 1-2 primary client engagements',
      'Kick off first enterprise audit phase',
      'Offer follow-up remediation and ongoing retainer testing options',
    ],
  },
  {
    week: 'Week 4',
    title: 'Delivery',
    items: [
      'Complete initial comprehensive WCAG audit deliverable',
      'Deliver direct codebase remediation fixes',
      'Conduct final assistive tech validation (NVDA, VoiceOver, TalkBack)',
      'Pitch monthly accessibility QA retainer package',
      'Add verified client results & case studies to portfolio',
    ],
  },
];

export const aboutContent = {
  headshotUrl: null, // Add your headshot image path here (e.g., '/images/ryan-scott-headshot.jpg')
  headshotAlt: 'Ryan Scott — Senior Digital Accessibility Engineer',
  headshotInitials: 'RS',
  headline: 'Bridging the gap between compliance and code.',
  paragraphs: [
    'I am Ryan Scott, a senior digital accessibility engineer and the founder of RScott Sites. I provide end-to-end digital accessibility engineering that bridges the gap between compliance audits and hands-on codebase remediation.',
    "My approach to accessibility goes beyond automated checklists and generic spreadsheets. I specialize in full-stack accessibility—meaning I don't just hand over an audit report; I provide the hands-on engineering required to fix ARIA attributes, semantic HTML5, and complex keyboard navigation issues directly in your codebase.",
    'Having honed my expertise in WCAG compliance and inclusive design at a Fortune 500 fintech leader, I understand the complexities of integrating accessible practices into fast-moving engineering teams without slowing down deployment.',
    'My foundation in software engineering was shaped by the Year Up program, which instilled a deep commitment to breaking down barriers. Today, I apply that same drive to the digital world. By rigorously testing with assistive technologies like NVDA, VoiceOver, and TalkBack, I ensure that digital products are not only legally compliant but genuinely usable for everyone.',
    'Whether you need to mitigate legal risk, train your development team, or remediate a backlog of critical violations, I partner with forward-thinking companies to build an inclusive web.',
  ],
  ctaLabel: "Let's review your site (request a free mini-audit)",
  skills: [
    { title: 'Assistive tech testing', items: ['NVDA (Windows)', 'VoiceOver (macOS/iOS)', 'TalkBack (Android)'] },
    { title: 'Web accessibility engineering', items: ['ARIA Authoring 1.2', 'Semantic HTML5', 'Focus Trap & Loop Management', 'WCAG 2.1/2.2 AA'] },
    { title: 'Native mobile engineering', items: ['iOS Accessibility APIs (Swift/UIKit)', 'Android Accessibility (Kotlin/Compose)', 'Mobile AT Navigation'] },
    { title: 'Testing & tools', items: ['Axe-core', 'Pa11y', 'Contrast Ratio Verification', 'Screen Reader Automation'] },
  ],
};

export const expertBio = {
  name: 'Ryan Scott',
  role: 'Senior Digital Accessibility Engineer',
  tagline: 'Bridging the gap between compliance checklists and production-ready code.',
  bioSummary:
    'With deep enterprise experience auditing and remediating complex web and mobile codebases, I specialize in full-stack accessibility. Rather than handing over generic spreadsheets, I partner directly with your engineering team to fix violations directly in code.',
  highlights: [
    { icon: '🏢', label: 'Enterprise-Scale Accessibility Engineering' },
    { icon: '💻', label: 'Full-Stack Code Remediation (Web, iOS, Android)' },
    { icon: '🎧', label: 'Assistive Tech Testing (NVDA, VoiceOver, TalkBack)' },
    { icon: '🛡️', label: 'WCAG 2.1 & 2.2 AA Compliance Assurance' },
  ],
};

export const caseStudies = [
  {
    id: 'case-modal-focus',
    title: 'Custom accessible modal & focus management',
    wcag: 'WCAG 2.1.2 No Keyboard Trap (A) & 2.4.3 Focus Order (A)',
    severity: 'Critical Severity',
    category: 'web',
    platform: 'Web (React & Vanilla JS)',
    problem:
      'A custom promotional modal on a checkout flow was trapping keyboard focus, preventing screen reader users and keyboard-only users from closing the dialog or accessing the rest of the page.',
    solution:
      'Implemented full keyboard focus trapping using native `<dialog>` element fallback mechanics, set proper `aria-modal="true"`, stored previous element focus before open, and restored focus upon closing.',
    businessImpact:
      'Eliminated a critical checkout drop-off liability, restored full keyboard and screen-reader access for 100% of dialog interactions, and protected against high-risk ADA Title III compliance exposure.',
    metrics: '100% Keyboard Navigable • 0 Trapped User Funnels',
    codeSnippet: `// Focus restoration and trap setup
const handleOpen = () => {
  lastFocusedElement.current = document.activeElement;
  modalRef.current?.showModal();
};

const handleClose = () => {
  modalRef.current?.close();
  lastFocusedElement.current?.focus();
};`,
  },
  {
    id: 'case-form-errors',
    title: 'Form error identification & screen reader feedback',
    wcag: 'WCAG 3.3.1 Error Identification (A) & 1.4.1 Use of Color (A)',
    severity: 'High Severity',
    category: 'web',
    platform: 'Web & React Forms',
    problem:
      'Form validation errors were indicated only by turning the input borders red. Screen readers did not announce the error text dynamically, leaving visually impaired users unaware of why their submission failed.',
    solution:
      'Associated error text with inputs using `aria-describedby`, marked invalid fields with `aria-invalid="true"`, added inline icons with non-color error indicators, and rendered an `aria-live="assertive"` error summary box upon form submission failure.',
    businessImpact:
      'Reduced form abandonment on error states by providing immediate auditory context, enabling non-sighted customers to successfully self-correct fields and complete transaction funnels.',
    metrics: '100% Accessible Error Rate • 0 Blind Form Blockers',
    codeSnippet: `<input
  id="email-input"
  type="email"
  aria-invalid={!!errors.email}
  aria-describedby={errors.email ? "email-error" : undefined}
/>
{errors.email && (
  <span id="email-error" className="form-error">
    <ErrorIcon aria-hidden="true" /> {errors.email}
  </span>
)}`,
  },
  {
    id: 'case-live-regions',
    title: 'Dynamic content updates with ARIA live regions',
    wcag: 'WCAG 4.1.3 Status Messages (AA)',
    severity: 'Medium Severity',
    category: 'web',
    platform: 'Single Page Web App',
    problem:
      'When users added an item to their shopping cart, a visual toast notification appeared, but it was completely silent for screen reader users relying on TalkBack and NVDA.',
    solution:
      'Created a dedicated persistent live region with `aria-live="polite"` and `aria-atomic="true"` that dynamically announces cart state updates without disrupting the user’s reading flow.',
    businessImpact:
      'Eliminated cart confusion for screen-reader customers, boosting assistive-tech user confidence, reducing abandoned carts, and ensuring full status message compliance.',
    metrics: '0 Silent State Updates • Instant Screen-Reader Feedback',
    codeSnippet: `<div className="sr-only" aria-live="polite" aria-atomic="true">
  {cartAnnouncement}
</div>`,
  },
  {
    id: 'case-native-mobile',
    title: 'Native mobile VoiceOver & TalkBack focus routing',
    wcag: 'WCAG 2.4.3 Focus Order (A) & Mobile AT Guidelines',
    severity: 'High Severity',
    category: 'mobile',
    platform: 'Native Mobile (iOS Swift & Android Kotlin)',
    problem:
      'Screen readers on mobile devices skipped custom bottom-sheet modal controls and lost focus position after asynchronous API responses completed.',
    solution:
      'Configured UIAccessibility.post(notification: .screenChanged, argument: focusTarget) in Swift and AccessibilityEvent.TYPE_VIEW_FOCUSED in Android to route AT focus predictably.',
    businessImpact:
      'Restored seamless mobile app navigation for VoiceOver and TalkBack users, eliminating trapped UI states and friction in high-priority native booking funnels.',
    metrics: 'Cross-Platform AT Parity across iOS & Android',
    codeSnippet: `// Swift (iOS VoiceOver focus notification)
UIAccessibility.post(notification: .layoutChanged, argument: headerTitleLabel)`,
  },
  {
    id: 'case-mobile-touch-targets',
    title: 'Native mobile touch target size & screen reader labeling',
    wcag: 'WCAG 2.5.5 Target Size & 1.1.1 Non-Text Content (A)',
    severity: 'Medium Severity',
    category: 'mobile',
    platform: 'Native Mobile (iOS & Android)',
    problem:
      'Custom icon buttons in mobile navigation headers were under 44x44pt / 48x48dp, causing mis-taps for users with motor impairments, and lacked accessibility labels for VoiceOver and TalkBack.',
    solution:
      'Expanded touch target hit areas using UIEdgeInsets / TouchDelegate and added explicit accessibilityLabel (iOS) and contentDescription (Android) attributes.',
    businessImpact:
      'Prevented user mis-taps by fully meeting 44x44pt touch guidelines, while delivering 100% label clarity for mobile screen reader users across primary navigation bars.',
    metrics: '44x44pt+ Touch Compliance • 100% Labeled Actions',
    codeSnippet: `// Android Kotlin (Accessibility Content Description)
iconButton.contentDescription = getString(R.string.close_dialog_accessibility_label)`,
  },
];
