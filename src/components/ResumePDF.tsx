/**
 * ResumePDF.tsx — Professional single-page A4 resume.
 *
 * SINGLE PAGE RULE: This document must always fit on one A4 page.
 * If content grows, trim limits at the bottom of this file before
 * adding more sections or increasing font sizes / spacing.
 *
 * NOTE: @react-pdf/renderer uses Helvetica (PDF built-in) which does NOT
 * support Unicode emoji. Every icon here is plain ASCII/text.
 */

import {
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
} from '@react-pdf/renderer';
import {
  personal as _personal,
  skills as _skills,
  experiences as _experiences,
  projects as _projects,
  education as _education,
  accomplishments as _accomplishments,
} from '@/data/portfolio';
import type { PersonalInfo, SkillCategory, Experience, Project, EducationInfo, Accomplishment } from '@/types';

export interface ResumeData {
  personal: PersonalInfo;
  skills: SkillCategory[];
  experiences: Experience[];
  projects: Project[];
  education: EducationInfo;
  accomplishments: Accomplishment[];
}

// ─── Palette ─────────────────────────────────────────────────────────────────
const C = {
  primary:  '#4F46E5',
  accent:   '#059669',
  text:     '#111827',
  muted:    '#6B7280',
  border:   '#E5E7EB',
  tagBg:    '#EEF2FF',
  tagText:  '#4338CA',
  badgeBg:  '#D1FAE5',
  badgeText:'#065F46',
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  // Page — comfortable margins, fills full A4
  page: {
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    paddingBottom: 28,
    paddingHorizontal: 36,
    fontSize: 9,
    color: C.text,
    lineHeight: 1.5,
  },

  // Header
  header: {
    marginBottom: 10,
    borderBottomWidth: 1.5,
    borderBottomColor: C.primary,
    paddingBottom: 9,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  name: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    color: C.text,
    letterSpacing: 0.3,
  },
  titleTagline: {
    textAlign: 'right',
  },
  title: {
    fontSize: 10,
    color: C.primary,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 0.2,
  },
  tagline: {
    fontSize: 8,
    color: C.muted,
    marginTop: 2,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  contactSep: {
    fontSize: 8,
    color: C.muted,
    marginHorizontal: 6,
  },
  contactItem: {
    fontSize: 8,
    color: C.muted,
  },
  contactLink: {
    fontSize: 8,
    color: C.primary,
    textDecoration: 'none',
  },

  // Two-column body — fills full remaining height
  body: {
    flexDirection: 'row',
    gap: 18,
    flexGrow: 1,
  },
  mainCol: { flex: 70 },
  sideCol: {
    flex: 28,
    borderLeftWidth: 0.75,
    borderLeftColor: C.border,
    paddingLeft: 14,
  },

  // Section
  section: { marginBottom: 11 },
  sectionTitle: {
    fontSize: 8.5,
    fontFamily: 'Helvetica-Bold',
    color: C.primary,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 5,
    paddingBottom: 2,
    borderBottomWidth: 0.5,
    borderBottomColor: C.border,
  },

  // Summary
  summary: {
    fontSize: 8.5,
    color: C.text,
    lineHeight: 1.55,
    marginBottom: 11,
    paddingLeft: 7,
    paddingVertical: 3,
    borderLeftWidth: 2.5,
    borderLeftColor: C.primary,
  },

  // Experience
  expEntry: { marginBottom: 8 },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  expTitleRow: { flexDirection: 'row', alignItems: 'center' },
  expTitle: {
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
    color: C.text,
  },
  currentBadge: {
    backgroundColor: C.badgeBg,
    color: C.badgeText,
    fontSize: 6.5,
    paddingHorizontal: 4,
    paddingVertical: 1.5,
    borderRadius: 2,
    fontFamily: 'Helvetica-Bold',
    marginLeft: 5,
  },
  expPeriod: {
    fontSize: 8,
    color: C.muted,
    fontFamily: 'Helvetica-Oblique',
  },
  expCompany: {
    fontSize: 8.5,
    color: C.accent,
    marginBottom: 4,
    fontFamily: 'Helvetica-Oblique',
  },

  // Bullets
  bulletRow: { flexDirection: 'row', marginBottom: 2.5 },
  bullet: { fontSize: 8.5, color: C.muted, marginRight: 4, marginTop: 1 },
  bulletText: { fontSize: 8.5, color: C.text, flex: 1, lineHeight: 1.45 },

  // Tags
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 4 },
  tag: {
    backgroundColor: C.tagBg,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagLabel: {
    color: C.tagText,
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    lineHeight: 1,
  },

  // Projects
  projEntry: { marginBottom: 7 },
  projHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  projTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: C.text,
  },
  projCategory: {
    fontSize: 8,
    color: C.accent,
    fontFamily: 'Helvetica-Oblique',
  },

  // Sidebar — Skills
  skillGroup: { marginBottom: 6 },
  skillGroupTitle: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: C.text,
    marginBottom: 2,
  },
  skillItems: { fontSize: 8, color: C.muted, lineHeight: 1.5 },

  // Sidebar — Education
  eduDegree: {
    fontSize: 8.5,
    fontFamily: 'Helvetica-Bold',
    color: C.text,
    marginBottom: 2,
  },
  eduInstitution: {
    fontSize: 8,
    color: C.accent,
    fontFamily: 'Helvetica-Oblique',
    marginBottom: 2,
  },
  eduMeta: { fontSize: 8, color: C.muted },

  // Sidebar — Accomplishments
  accomplishRow: { flexDirection: 'row', marginBottom: 5 },
  accomplishDot: {
    fontSize: 9,
    color: C.primary,
    marginRight: 5,
    marginTop: 1,
  },
  accomplishContent: { flex: 1 },
  accomplishTitle: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: C.text,
    marginBottom: 2,
  },
  accomplishDesc: { fontSize: 7.5, color: C.muted, lineHeight: 1.45 },
});

// ─── Helpers ─────────────────────────────────────────────────────────────────
function BulletList({ items }: { items: string[] }) {
  return (
    <>
      {items.map((item, i) => (
        <View key={i} style={s.bulletRow}>
          <Text style={s.bullet}>-</Text>
          <Text style={s.bulletText}>{item}</Text>
        </View>
      ))}
    </>
  );
}

function ContactSeparator() {
  return <Text style={s.contactSep}>|</Text>;
}

// ─── Document ─────────────────────────────────────────────────────────────────
export default function ResumePDF({ data }: { data?: ResumeData }) {
  // Use override data if supplied, otherwise fall back to portfolio defaults.
  // Original portfolio data is never mutated.
  const personal        = data?.personal        ?? _personal;
  const skills          = data?.skills          ?? _skills;
  const experiences     = data?.experiences     ?? _experiences;
  const projects        = data?.projects        ?? _projects;
  const education       = data?.education       ?? _education;
  const accomplishments = data?.accomplishments ?? _accomplishments;

  const sidebarSkills = skills.filter((sk) => sk.category !== 'Soft Skills');

  const hasLinkedin = personal.linkedin && personal.linkedin !== '#';
  const hasGithub   = personal.github   && personal.github   !== '#';

  return (
    <Document
      title={`${personal.name} — Resume`}
      author={personal.name}
      subject="Software Engineer Resume"
      creator="Portfolio"
    >
      <Page size="A4" style={s.page}>

        {/* ── Header ── */}
        <View style={s.header}>
          <View style={s.headerTop}>
            <Text style={s.name}>{personal.name}</Text>
            <View style={s.titleTagline}>
              <Text style={s.title}>{personal.title}</Text>
              {personal.tagline ? <Text style={s.tagline}>{personal.tagline}</Text> : null}
            </View>
          </View>

          <View style={s.contactRow}>
            {personal.location && (
              <Text style={s.contactItem}>{personal.location}</Text>
            )}
            {personal.email && (
              <>
                <ContactSeparator />
                <Link src={`mailto:${personal.email}`} style={s.contactLink}>
                  {personal.email}
                </Link>
              </>
            )}
            {personal.phone && (
              <>
                <ContactSeparator />
                <Text style={s.contactItem}>{personal.phone}</Text>
              </>
            )}
            {hasLinkedin && (
              <>
                <ContactSeparator />
                <Link src={personal.linkedin} style={s.contactLink}>LinkedIn</Link>
              </>
            )}
            {hasGithub && (
              <>
                <ContactSeparator />
                <Link src={personal.github} style={s.contactLink}>GitHub</Link>
              </>
            )}
          </View>
        </View>

        {personal.summary && (
          <Text style={s.summary}>{personal.summary}</Text>
        )}

        {/* ── Two-column body — flows across pages as needed ── */}
        <View style={s.body}>

          {/* ════ Main column (62%) ════ */}
          <View style={s.mainCol}>

            {/* Work Experience */}
            <View style={s.section}>
              <Text style={s.sectionTitle}>Work Experience</Text>
              {experiences.map((exp) => (
                <View key={exp.id} style={s.expEntry}>
                  <View style={s.expHeader}>
                    <View style={s.expTitleRow}>
                      <Text style={s.expTitle}>{exp.title}</Text>
                      {exp.current && <Text style={s.currentBadge}>CURRENT</Text>}
                    </View>
                    <Text style={s.expPeriod}>{exp.period}</Text>
                  </View>
                  <Text style={s.expCompany}>{exp.company}</Text>
                  <BulletList items={exp.highlights} />
                  {exp.tags.length > 0 && (
                    <View style={s.tagsRow}>
                      {exp.tags.map((tag) => (
                        <View key={tag} style={s.tag}>
                          <Text style={s.tagLabel}>{tag}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>

            {/* Key Projects */}
            <View style={s.section}>
              <Text style={s.sectionTitle}>Key Projects</Text>
              {projects.map((proj) => (
                <View key={proj.id} style={s.projEntry}>
                  <View style={s.projHeader}>
                    <Text style={s.projTitle}>{proj.title}</Text>
                    <Text style={s.projCategory}>{proj.category}</Text>
                  </View>
                  <BulletList items={proj.highlights} />
                  {proj.tags.length > 0 && (
                    <View style={s.tagsRow}>
                      {proj.tags.map((tag) => (
                        <View key={tag} style={s.tag}>
                          <Text style={s.tagLabel}>{tag}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>

          </View>
          {/* ════ End main column ════ */}

          {/* ════ Sidebar (36%) ════ */}
          <View style={s.sideCol}>

            {/* Skills */}
            <View style={s.section}>
              <Text style={s.sectionTitle}>Skills</Text>
              {sidebarSkills.map((cat) => (
                <View key={cat.category} style={s.skillGroup}>
                  <Text style={s.skillGroupTitle}>{cat.category}</Text>
                  <Text style={s.skillItems}>{cat.items.join(' · ')}</Text>
                </View>
              ))}
            </View>

            {/* Education */}
            <View style={s.section}>
              <Text style={s.sectionTitle}>Education</Text>
              <Text style={s.eduDegree}>{education.degree}</Text>
              <Text style={s.eduInstitution}>{education.institution}</Text>
              <Text style={s.eduMeta}>{education.location} · {education.year}</Text>
            </View>

            {/* Accomplishments */}
            <View style={s.section}>
              <Text style={s.sectionTitle}>Accomplishments</Text>
              {accomplishments.map((acc) => (
                <View key={acc.id} style={s.accomplishRow}>
                  <Text style={s.accomplishDot}>*</Text>
                  <View style={s.accomplishContent}>
                    <Text style={s.accomplishTitle}>{acc.title}</Text>
                    <Text style={s.accomplishDesc}>{acc.description}</Text>
                  </View>
                </View>
              ))}
            </View>

          </View>
          {/* ════ End sidebar ════ */}

        </View>
      </Page>
    </Document>
  );
}

