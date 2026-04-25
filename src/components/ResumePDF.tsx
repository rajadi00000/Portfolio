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
import { personal, skills, experiences, projects, education, accomplishments } from '@/data/portfolio';

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
  // Page — tight margins to maximise usable area
  page: {
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
    paddingTop: 26,
    paddingBottom: 22,
    paddingHorizontal: 32,
    fontSize: 8.5,
    color: C.text,
    lineHeight: 1.38,
  },

  // Header
  header: {
    marginBottom: 8,
    borderBottomWidth: 1.5,
    borderBottomColor: C.primary,
    paddingBottom: 7,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  name: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    color: C.text,
    letterSpacing: 0.3,
  },
  titleTagline: {
    textAlign: 'right',
  },
  title: {
    fontSize: 9.5,
    color: C.primary,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 0.2,
  },
  tagline: {
    fontSize: 7.5,
    color: C.muted,
    marginTop: 1,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  contactSep: {
    fontSize: 7.5,
    color: C.muted,
    marginHorizontal: 5,
  },
  contactItem: {
    fontSize: 7.5,
    color: C.muted,
  },
  contactLink: {
    fontSize: 7.5,
    color: C.primary,
    textDecoration: 'none',
  },

  // Two-column body
  body: {
    flexDirection: 'row',
    gap: 14,
  },
  mainCol: { flex: 62 },
  sideCol: {
    flex: 36,
    borderLeftWidth: 0.75,
    borderLeftColor: C.border,
    paddingLeft: 12,
  },

  // Section
  section: { marginBottom: 9 },
  sectionTitle: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: C.primary,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 4,
    paddingBottom: 2,
    borderBottomWidth: 0.5,
    borderBottomColor: C.border,
  },

  // Summary
  summary: {
    fontSize: 8,
    color: C.text,
    lineHeight: 1.45,
    marginBottom: 9,
    paddingLeft: 6,
    borderLeftWidth: 2,
    borderLeftColor: C.primary,
  },

  // Experience
  expEntry: { marginBottom: 7 },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 1,
  },
  expTitleRow: { flexDirection: 'row', alignItems: 'center' },
  expTitle: {
    fontSize: 8.5,
    fontFamily: 'Helvetica-Bold',
    color: C.text,
  },
  currentBadge: {
    backgroundColor: C.badgeBg,
    color: C.badgeText,
    fontSize: 6,
    paddingHorizontal: 3,
    paddingVertical: 1,
    borderRadius: 2,
    fontFamily: 'Helvetica-Bold',
    marginLeft: 4,
  },
  expPeriod: {
    fontSize: 7.5,
    color: C.muted,
    fontFamily: 'Helvetica-Oblique',
  },
  expCompany: {
    fontSize: 8,
    color: C.accent,
    marginBottom: 3,
    fontFamily: 'Helvetica-Oblique',
  },

  // Bullets
  bulletRow: { flexDirection: 'row', marginBottom: 1.5 },
  bullet: { fontSize: 8, color: C.muted, marginRight: 3, marginTop: 0.5 },
  bulletText: { fontSize: 8, color: C.text, flex: 1 },

  // Tags
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 3, marginTop: 3 },
  tag: {
    backgroundColor: C.tagBg,
    color: C.tagText,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 2,
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
  },

  // Projects
  projEntry: { marginBottom: 6 },
  projHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 1,
  },
  projTitle: {
    fontSize: 8.5,
    fontFamily: 'Helvetica-Bold',
    color: C.text,
  },
  projCategory: {
    fontSize: 7.5,
    color: C.accent,
    fontFamily: 'Helvetica-Oblique',
  },

  // Sidebar — Skills
  skillGroup: { marginBottom: 5 },
  skillGroupTitle: {
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    color: C.text,
    marginBottom: 1.5,
  },
  skillItems: { fontSize: 7.5, color: C.muted, lineHeight: 1.4 },

  // Sidebar — Education
  eduDegree: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: C.text,
    marginBottom: 1,
  },
  eduInstitution: {
    fontSize: 7.5,
    color: C.accent,
    fontFamily: 'Helvetica-Oblique',
    marginBottom: 1,
  },
  eduMeta: { fontSize: 7.5, color: C.muted },

  // Sidebar — Accomplishments
  accomplishRow: { flexDirection: 'row', marginBottom: 4 },
  accomplishDot: {
    fontSize: 8,
    color: C.primary,
    marginRight: 4,
    marginTop: 0.5,
  },
  accomplishContent: { flex: 1 },
  accomplishTitle: {
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    color: C.text,
    marginBottom: 1,
  },
  accomplishDesc: { fontSize: 7, color: C.muted, lineHeight: 1.35 },
});

// ─── Single-page content limits ───────────────────────────────────────────────
// Adjust these numbers if you add more data to portfolio.ts.
const LIMITS = {
  currentRoleHighlights: 4,   // bullets for the current/most-recent role
  otherRoleHighlights:   1,   // bullets for older roles
  projects:              2,   // how many projects to show
  projectHighlights:     2,   // bullets per project
  accomplishments:       4,   // rows in the sidebar
};

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
export default function ResumePDF() {
  const expItems = experiences.map((exp, i) => ({
    ...exp,
    highlights: exp.highlights.slice(
      0,
      i === 0 ? LIMITS.currentRoleHighlights : LIMITS.otherRoleHighlights
    ),
  }));

  const topProjects = projects.slice(0, LIMITS.projects).map((p) => ({
    ...p,
    highlights: p.highlights.slice(0, LIMITS.projectHighlights),
  }));

  const sidebarSkills = skills.filter((sk) => sk.category !== 'Soft Skills');
  const topAccomplishments = accomplishments.slice(0, LIMITS.accomplishments);

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

        {/* ── Two-column body ── */}
        <View style={s.body}>

          {/* ════ Main column (62%) ════ */}
          <View style={s.mainCol}>

            {personal.summary && (
              <Text style={s.summary}>{personal.summary}</Text>
            )}

            {/* Work Experience */}
            <View style={s.section}>
              <Text style={s.sectionTitle}>Work Experience</Text>
              {expItems.map((exp) => (
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
                        <Text key={tag} style={s.tag}>{tag}</Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>

            {/* Key Projects */}
            <View style={s.section}>
              <Text style={s.sectionTitle}>Key Projects</Text>
              {topProjects.map((proj) => (
                <View key={proj.id} style={s.projEntry}>
                  <View style={s.projHeader}>
                    <Text style={s.projTitle}>{proj.title}</Text>
                    <Text style={s.projCategory}>{proj.category}</Text>
                  </View>
                  <BulletList items={proj.highlights} />
                  {proj.tags.length > 0 && (
                    <View style={s.tagsRow}>
                      {proj.tags.map((tag) => (
                        <Text key={tag} style={s.tag}>{tag}</Text>
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
              {topAccomplishments.map((acc) => (
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

