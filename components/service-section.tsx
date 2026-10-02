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
    <section className="bg-background text-foreground px-6 my-12">
      <div className="max-w-4xl mx-auto border-t border-b border-border py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col space-y-4">
              <span className="text-sm font-medium text-muted-foreground">{step.number}</span>
              <h3 className="text-xl font-bold text-foreground tracking-wide">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm pr-4">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
