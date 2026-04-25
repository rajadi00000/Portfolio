/**
 * ResumePreviewModal.tsx
 *
 * Full-screen modal that renders a live PDF preview of the resume.
 * The user can download from here or dismiss with Cancel / Escape / backdrop click.
 */

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import ResumePDF from '@/components/ResumePDF';
import { personal } from '@/data/portfolio';

interface Props {
  open: boolean;
  onClose: () => void;
}

// ── Resume skeleton loader ────────────────────────────────────────────────────
function ResumeLoader() {
  return (
    <div className="resume-loader">
      {/* Animated document icon */}
      <div className="resume-loader__doc">
        <div className="resume-loader__scan-line" />
        {/* Simulated header */}
        <div className="resume-loader__block resume-loader__block--header" />
        <div className="resume-loader__block resume-loader__block--subtitle" />
        <div className="resume-loader__divider" />
        {/* Simulated two-column body */}
        <div className="resume-loader__columns">
          <div className="resume-loader__col resume-loader__col--main">
            <div className="resume-loader__line resume-loader__line--label" />
            <div className="resume-loader__line" />
            <div className="resume-loader__line resume-loader__line--short" />
            <div className="resume-loader__line" />
            <div className="resume-loader__line resume-loader__line--med" />
            <div className="resume-loader__gap" />
            <div className="resume-loader__line resume-loader__line--label" />
            <div className="resume-loader__line" />
            <div className="resume-loader__line resume-loader__line--med" />
            <div className="resume-loader__line resume-loader__line--short" />
          </div>
          <div className="resume-loader__col resume-loader__col--side">
            <div className="resume-loader__line resume-loader__line--label" />
            <div className="resume-loader__line resume-loader__line--short" />
            <div className="resume-loader__line resume-loader__line--med" />
            <div className="resume-loader__gap" />
            <div className="resume-loader__line resume-loader__line--label" />
            <div className="resume-loader__line resume-loader__line--short" />
            <div className="resume-loader__line" />
          </div>
        </div>
      </div>

      {/* Status text */}
      <div className="resume-loader__status">
        <span className="resume-loader__dots">
          <span /><span /><span />
        </span>
        <span className="resume-loader__text">Generating PDF</span>
      </div>
    </div>
  );
}

// ─── Modal ───────────────────────────────────────────────────────────────────
export default function ResumePreviewModal({ open, onClose }: Props) {
  const fileName = `${personal.name.replace(/\s+/g, '_')}_Resume.pdf`;
  const [pdfLoaded, setPdfLoaded] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);

  // Reset loaded state each time modal opens
  useEffect(() => {
    if (open) setPdfLoaded(false);
  }, [open]);

  // Attach load listener to the iframe PDFViewer renders
  useEffect(() => {
    if (!open) return;
    let cleanup: (() => void) | undefined;

    // PDFViewer renders the iframe asynchronously — poll until it appears
    const interval = setInterval(() => {
      const iframe = viewerRef.current?.querySelector('iframe');
      if (!iframe) return;
      clearInterval(interval);
      const onLoad = () => setPdfLoaded(true);
      iframe.addEventListener('load', onLoad);
      cleanup = () => iframe.removeEventListener('load', onLoad);
    }, 50);

    return () => {
      clearInterval(interval);
      cleanup?.();
    };
  }, [open]);

  // Lock body scroll while open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="resume-modal__backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Resume preview"
        >
          <motion.div
            className="resume-modal__panel"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Header bar ── */}
            <div className="resume-modal__header">
              <span className="resume-modal__title">Resume Preview</span>
              <div className="resume-modal__header-actions">
                <PDFDownloadLink
                  document={<ResumePDF />}
                  fileName={fileName}
                  className="resume-modal__download-btn"
                  aria-label="Download resume as PDF"
                >
                  {({ loading }) => (loading ? 'Generating…' : '↓ Download PDF')}
                </PDFDownloadLink>
                <button
                  className="resume-modal__close-btn"
                  onClick={onClose}
                  aria-label="Close preview"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* ── Viewer area ── */}
            <div className="resume-modal__viewer" ref={viewerRef}>
              {/* Loader — fades out once iframe fires load */}
              <AnimatePresence>
                {!pdfLoaded && (
                  <motion.div
                    className="resume-modal__loader-wrap"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ResumeLoader />
                  </motion.div>
                )}
              </AnimatePresence>

              <PDFViewer width="100%" height="100%" showToolbar={false}>
                <ResumePDF />
              </PDFViewer>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


