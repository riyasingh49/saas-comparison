function ToolkitResult({ label, value, description }) {
    return (
      <div className="rounded-lg bg-gray-50 p-3">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="mt-1 text-lg font-semibold tabular-nums text-gray-900">
          {value}
        </p>
        {description && (
          <p className="mt-1 text-xs text-gray-500">{description}</p>
        )}
      </div>
    )
  }
  
  export default ToolkitResult
  