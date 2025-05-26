import clsx from 'clsx';

export const SuccessBadge = ({
  label,
  className,
}: {
  label: string;
  className?: string;
}) => {
  return (
    <span
      className={clsx(
        'inline-block px-2 py-0.5 rounded-md text-sm text-white bg-gradient-to-r from-success to-success/80',
        className
      )}
    >
      {label}
    </span>
  );
};
