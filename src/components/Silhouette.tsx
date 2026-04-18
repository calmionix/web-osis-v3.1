interface SilhouetteProps {
  size?: number;
  className?: string;
}

export default function Silhouette({ size = 80, className = '' }: SilhouetteProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="40" cy="26" r="14" fill="#e2e8f0" />
      <rect x="16" y="42" width="48" height="30" rx="15" fill="#e2e8f0" />
    </svg>
  );
}
