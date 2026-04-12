/**
 * Card
 *
 * Reusable card surface with optional hover lift effect.
 * Renders a semantic `article` when content is standalone,
 * or a plain `div` wrapper otherwise.
 *
 * @param {Object}  props
 * @param {boolean} [props.hoverable=true] - Enable hover animation
 * @param {string}  [props.className]      - Extra className
 * @param {string}  [props.as='div']       - Underlying HTML element
 * @param {React.ReactNode} props.children
 */
const Card = ({ hoverable = true, className = '', as: Tag = 'div', children, ...rest }) => {
  const classes = ['card', hoverable ? 'card--hoverable' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
};

export default Card;
