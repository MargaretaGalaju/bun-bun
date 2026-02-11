'use client';

interface StepperProps {
  steps: { label: string }[];
  currentStep: number; // 0-based
}

export default function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <nav aria-label="Progress" className="mb-8">
      <ol className="flex items-center w-full">
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStep;
          const isCurrent = idx === currentStep;
          const isLast = idx === steps.length - 1;

          return (
            <li
              key={idx}
              className={`flex items-center ${isLast ? '' : 'flex-1'}`}
            >
              {/* Circle + label */}
              <div className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center w-9 h-9 rounded-full border-2 text-sm font-semibold transition-colors ${
                    isCompleted
                      ? 'bg-green-700 border-green-700 text-white'
                      : isCurrent
                        ? 'border-green-700 text-green-700 bg-white'
                        : 'border-gray-300 text-gray-400 bg-white'
                  }`}
                >
                  {isCompleted ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    idx + 1
                  )}
                </div>
                <span
                  className={`mt-1.5 text-xs font-medium whitespace-nowrap ${
                    isCompleted || isCurrent ? 'text-green-700' : 'text-gray-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line */}
              {!isLast && (
                <div
                  className={`flex-1 h-0.5 mx-3 mt-[-1.25rem] ${
                    isCompleted ? 'bg-green-700' : 'bg-gray-300'
                  }`}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
