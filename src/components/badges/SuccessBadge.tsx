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
        'inline-block px-2 py-0.5 rounded-md text-sm bg-gradient-to-r from-success to-info text-white',
        className
      )}
    >
      {label}
    </span>
  );
};
