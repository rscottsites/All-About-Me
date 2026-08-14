import { describe, it, expect } from 'vitest';
import {
  freelanceIdentity,
  homepageContent,
  coreServices,
  servicePackages,
  aboutContent,
  caseStudies,
  expertBio,
} from './businessData';

describe('businessData Integrity Tests', () => {
  it('expertBio contains name, role, bioSummary, and highlights', () => {
    expect(expertBio.name).toBe('Ryan Scott');
    expect(expertBio.role).toBe('Senior Digital Accessibility Engineer');
    expect(expertBio.bioSummary).toContain('enterprise');
    expect(expertBio.highlights.length).toBeGreaterThan(0);
  });
  it('freelanceIdentity contains title and summary', () => {
    expect(freelanceIdentity.title).toBe('End-to-End Accessibility Engineer');
    expect(freelanceIdentity.summary).toContain('WCAG compliance');
  });

  it('homepageContent contains valid headline, subheadline, and 3 value pillars', () => {
    expect(homepageContent.headline).toContain('End-to-End Digital Accessibility Engineering.');
    expect(homepageContent.pillars).toHaveLength(3);
    const pillarIds = homepageContent.pillars.map((p) => p.id);
    expect(pillarIds).toEqual(['audit', 'remediate', 'maintain']);
  });

  it('coreServices contains Audits, Remediation, and Testing with pricing & timeframes', () => {
    expect(coreServices).toHaveLength(3);
    coreServices.forEach((service) => {
      expect(service.id).toBeDefined();
      expect(service.title).toBeDefined();
      expect(service.pricing).toBeDefined();
      expect(service.timeframe).toBeDefined();
      expect(service.highlights.length).toBeGreaterThan(0);
    });
  });

  it('servicePackages contains Package A, B, and C with pricing and scopes', () => {
    expect(servicePackages).toHaveLength(3);
    const packageIds = servicePackages.map((p) => p.id);
    expect(packageIds).toEqual(['package-a', 'package-b', 'package-c']);
    servicePackages.forEach((pkg) => {
      expect(pkg.name).toBeDefined();
      expect(pkg.investment).toBeDefined();
      expect(pkg.timeline).toBeDefined();
      expect(pkg.features.length).toBeGreaterThan(0);
    });
  });

  it('aboutContent includes bio paragraphs, enterprise experience, and Year Up foundation', () => {
    expect(aboutContent.headline).toBe('Bridging the gap between compliance and code.');
    const fullText = aboutContent.paragraphs.join(' ');
    expect(fullText).toContain('enterprise scale');
    expect(fullText).toContain('Year Up');
    expect(fullText).toContain('NVDA, VoiceOver, and TalkBack');
  });

  it('caseStudies includes critical WCAG violation case studies with business impact and metrics', () => {
    expect(caseStudies.length).toBeGreaterThanOrEqual(3);
    caseStudies.forEach((study) => {
      expect(study.id).toBeDefined();
      expect(study.title).toBeDefined();
      expect(study.wcag).toBeDefined();
      expect(study.severity).toBeDefined();
      expect(study.severity).toMatch(/Severity$/);
      expect(study.problem).toBeDefined();
      expect(study.businessImpact).toBeDefined();
      expect(study.metrics).toBeDefined();
    });
  });
});
