import clsx from 'clsx';

export const ShadowBadge = ({
  label,
  className,
}: {
  label: string;
  className?: string;
}) => {
  return (
    <span
      className={clsx(
        'inline-block px-1 py-0.5 rounded-md text-xs text-white bg-gray/80',
        className
      )}
    >
      {label}
    </span>
  );
};
