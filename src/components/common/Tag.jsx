/**
 * Tag
 *
 * Reusable pill-shaped label for technologies, skills, or categories.
 * The `variant` prop maps to a CSS class that sets its colour theme
 * (see `.tag--{variant}` declarations in globals.css).
 *
 * @param {Object}  props
 * @param {string}  props.label               - Text to display
 * @param {string}  [props.variant='default'] - Colour variant
 * @param {string}  [props.className]         - Extra className
 */
const Tag = ({ label, variant = 'default', className = '' }) => {
  return (
    <span className={`tag tag--${variant} ${className}`.trim()}>
      {label}
    </span>
  );
};

export default Tag;
