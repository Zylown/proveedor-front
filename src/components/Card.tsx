interface CardProps {
  title?: string
  subtitle?: string
  value?: string | number
  footer?: string
  icon?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

export default function Card({
  title,
  subtitle,
  value,
  footer,
  icon,
  children,
  className = ''
}: CardProps) {
  return (
    <div
      className={`w-full bg-white rounded-xl shadow p-5 border border-gristransparente ${className}`}
    >
      <div className="flex justify-between items-start">
        <div>
          {title && (
            <h3 className="text-gray-700 text-sm font-semibold">{title}</h3>
          )}
          {subtitle && <p className="text-gray-500 text-xs">{subtitle}</p>}
        </div>
        {icon && <div className="text-gray-400 text-xl">{icon}</div>}
      </div>

      {value && (
        <div className="mt-4 text-2xl font-bold text-gray-800">{value}</div>
      )}

      {children && <div className="mt-4 text-sm text-gray-600">{children}</div>}

      {footer && <div className="mt-4 text-xs text-gray-400">{footer}</div>}
    </div>
  )
}
