import React from 'react';

export function ServiceSection() {
  const steps = [
    {
      number: "01",
      title: "Follower Analytics",
      description: "Track your GitHub followers in real-time and discover who isn't following you back."
    },
    {
      number: "02",
      title: "README Designer",
      description: "Create stunning GitHub profile READMEs with skills, stats, and social icons."
    },
    {
      number: "03",
      title: "Profile Compare",
      description: "Compare GitHub profiles head-to-head and get actionable insights for improvement."
    }
  ];

  return (
    <section className="bg-black text-white py-16 px-6 border-t border-b border-white/5 my-12">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col space-y-4">
              <span className="text-sm font-medium text-gray-500">{step.number}</span>
              <h3 className="text-xl font-bold text-white tracking-wide">{step.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm pr-4">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
