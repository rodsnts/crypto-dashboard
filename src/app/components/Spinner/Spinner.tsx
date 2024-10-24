interface SpinnerProps {
  size?: "sm" | "md" | "lg"
  fullscreen?: boolean
}

function Spinner({ size = "md", fullscreen = false }: SpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-4",
    lg: "w-12 h-12 border-4"
  }
  const containerClasses = fullscreen
    ? "fixed inset-0 bg-black bg-opacity-50 z-50"
    : "absolute inset-0"

  return (
    <div className={`${containerClasses} flex items-center justify-center`}>
      <div
        className={`${sizeClasses[size]} border-ctp-sapphire border-t-transparent rounded-full animate-spin`}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export default Spinner
