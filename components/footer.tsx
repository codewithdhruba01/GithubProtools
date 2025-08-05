"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Heart, ExternalLink } from 'lucide-react';

const footerLinks = {
  "Tools": [
    { name: "Follower Counter", href: "/follower-counter" },
    { name: "README Designer", href: "/readme-designer" },
    { name: "Following Analysis", href: "/following-analysis" },
    { name: "Profile Compare", href: "/profile-compare" },
  ],
  "Resources": [
    { name: "Documentation", href: "/documentation" },
    { name: "FAQ", href: "/faq" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  "Community": [
    { name: "GitHub", href: "https://github.com/codewithdhruba01", external: true },
    { name: "Discord", href: "dhrubarajpati", external: true },
    { name: "Twitter", href: "https://x.com/codewithdhruba", external: true },
    { name: "Linkedin", href: "https://www.linkedin.com/in/dhrubaraj-pati/", external: true },
  ]
};

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="rounded-full bg-primary p-2"
              >
                <Github className="h-5 w-5 text-primary-foreground" />
              </motion.div>
              <span className="font-bold text-lg">GitHub Tools Pro</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Complete suite of GitHub tools for developers. Analyze followers, design profiles, and enhance your GitHub experience.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h3 className="font-semibold">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                      {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                    >
                      {link.name}
                      {link.external && <ExternalLink className="h-3 w-3" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border/40 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-red-500" /> by Dhrubaraj Pati, for developers
          </p>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0">
            © 2025 GitHub Tools Pro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}