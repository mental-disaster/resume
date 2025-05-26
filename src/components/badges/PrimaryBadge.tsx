import clsx from 'clsx';

export const PrimaryBadge = ({
  label,
  className,
}: {
  label: string;
  className?: string;
}) => {
  return (
    <span
      className={clsx(
        'inline-block px-2 py-0.5 rounded-md text-sm bg-gradient-to-r from-primary to-accent text-white',
        className
      )}
    >
      {label}
    </span>
  );
};
