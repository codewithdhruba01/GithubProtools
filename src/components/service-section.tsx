import React from 'react';
import { Link } from 'react-router-dom';

export function ServiceSection() {
  const steps = [
    {
      number: "01",
      title: "Follower Analytics",
      description: "Track your GitHub followers in real-time and discover who isn't following you back.",
      href: "/follower-counter"
    },
    {
      number: "02",
      title: "README Designer",
      description: "Create stunning GitHub profile READMEs with skills, stats, and social icons.",
      href: "/readme-designer"
    },
    {
      number: "03",
      title: "Profile Compare",
      description: "Compare GitHub profiles head-to-head and get actionable insights.",
      href: "/profile-compare"
    }
  ];

  return (
    <section className="bg-background text-foreground px-6 my-12">
      <div className="max-w-4xl mx-auto border-t border-b border-border py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {steps.map((step, index) => (
            <Link to={step.href} key={index} className="flex flex-col space-y-4 group cursor-pointer">
              <span className="text-sm font-medium text-muted-foreground">{step.number}</span>
              <h3 className="text-lg font-medium text-foreground tracking-wide group-hover:text-primary transition-colors">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm pr-4 group-hover:text-foreground transition-colors">
                {step.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
