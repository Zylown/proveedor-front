interface CardProps {
  title?: string;
  subtitle?: string;
  value?: string | number;
  footer?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  color?: string;
}

export default function Card({
  title,
  subtitle,
  value,
  footer,
  icon,
  children,
  className = "",
  color,
}: CardProps) {
  const customColor = color || "#6b7280";
  return (
    <div
      className={`w-full bg-white rounded-xl shadow p-5 border ${className}`}
      style={{
        borderColor: customColor,
        color: customColor,
      }}
    >
      <div className="flex justify-between items-start">
        <div>
          {title && (
            <h3 className="text-sm font-semibold" style={{ color: customColor }}>
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-xs opacity-80" style={{ color: customColor }}>
              {subtitle}
            </p>
          )}
        </div>
        {icon && (
          <div className="text-xl" style={{ color: customColor }}>
            {icon}
          </div>
        )}
      </div>

      {value && (
        <div className="mt-4 text-2xl font-bold" style={{ color: customColor }}>
          {value}
        </div>
      )}

      {children && (
        <div className="mt-4 text-sm opacity-80" style={{ color: customColor }}>
          {children}
        </div>
      )}

      {footer && (
        <div className="mt-4 text-xs opacity-60" style={{ color: customColor }}>
          {footer}
        </div>
      )}
    </div>
  );
}
