export default function ProgressSteps({ steps, currentStep }) {
  return (
    <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${step.completed
                    ? 'bg-blue-600 border-blue-600'
                    : step.active
                      ? 'bg-blue-600 border-blue-600'
                      : 'border-gray-600 bg-gray-800'
                    }`}>
                    <step.icon className={`w-5 h-5 ${step.completed || step.active ? 'text-white' : 'text-gray-400'
                      }`} />
                  </div>
                  <span className={`ml-3 text-sm font-medium ${step.completed || step.active ? 'text-white' : 'text-gray-400'
                    }`}>
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 ml-4 ${steps[index + 1].completed || steps[index + 1].active
                    ? 'bg-blue-600'
                    : 'bg-gray-600'
                    }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}