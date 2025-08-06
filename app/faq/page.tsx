"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  HelpCircle, 
  Search, 
  Github, 
  Shield, 
  Zap, 
  Users,
  FileText,
  GitCompare,
  BookOpen
} from 'lucide-react';

const faqCategories = [
  {
    id: 'general',
    title: 'General',
    icon: HelpCircle,
    faqs: [
      {
        question: 'What is GitHub Tools Pro?',
        answer: 'GitHub Tools Pro is a comprehensive suite of tools designed to help developers analyze their GitHub profiles, track followers, create professional READMEs, and learn Git/GitHub through detailed documentation. All tools are free to use and require no registration.'
      },
      {
        question: 'Do I need to create an account to use the tools?',
        answer: 'No! All our tools are completely free and don\'t require any account creation or login. Simply enter a GitHub username and start using any of our features immediately.'
      },
      {
        question: 'Is GitHub Tools Pro open source?',
        answer: 'Yes, we believe in the open source community. Our source code is available on GitHub, and we welcome contributions from developers worldwide. Check our GitHub repository for contribution guidelines.'
      },
      {
        question: 'How often is the data updated?',
        answer: 'All data is fetched in real-time directly from GitHub\'s public API. This means you always get the most current information about followers, repositories, and profile statistics.'
      }
    ]
  },
  {
    id: 'privacy',
    title: 'Privacy & Security',
    icon: Shield,
    faqs: [
      {
        question: 'Do you store my GitHub data?',
        answer: 'No, we don\'t store any of your GitHub data on our servers. All information is fetched directly from GitHub\'s public API in real-time and displayed to you. Once you close the browser, no data is retained.'
      },
      {
        question: 'Is my personal information safe?',
        answer: 'Absolutely. We only access publicly available information through GitHub\'s official API. We never ask for passwords, tokens, or any private information. All data requests are made using public endpoints only.'
      },
      {
        question: 'Can you access my private repositories?',
        answer: 'No, we cannot and do not access any private repositories. Our tools only work with publicly available data that anyone can see on your GitHub profile.'
      },
      {
        question: 'Do you use cookies or tracking?',
        answer: 'We use minimal, non-tracking cookies only for essential website functionality like theme preferences. We don\'t use any analytics or tracking cookies that could compromise your privacy.'
      }
    ]
  },
  {
    id: 'follower-counter',
    title: 'Follower Counter',
    icon: Users,
    faqs: [
      {
        question: 'How accurate is the follower count?',
        answer: 'The follower count is 100% accurate as it\'s fetched directly from GitHub\'s official API in real-time. The data you see is exactly what GitHub reports for that user account.'
      },
      {
        question: 'Can I track follower growth over time?',
        answer: 'Currently, our tool shows real-time data. For historical tracking, you would need to check back periodically. We\'re considering adding growth tracking features in future updates.'
      },
      {
        question: 'Why does the follower count sometimes differ from what I see on GitHub?',
        answer: 'If you see differences, it\'s likely due to caching. GitHub\'s API and website might have slight delays in synchronization. Refresh the page and the numbers should match GitHub\'s current display.'
      },
      {
        question: 'Can I analyze private accounts?',
        answer: 'You can only analyze accounts that have public profiles. If a GitHub account is private or doesn\'t exist, our tool will show an appropriate error message.'
      }
    ]
  },
  {
    id: 'readme-designer',
    title: 'README Designer',
    icon: FileText,
    faqs: [
      {
        question: 'How do I use the generated README on GitHub?',
        answer: 'After downloading your README.md file, create a new repository with the same name as your GitHub username (e.g., if your username is "johndoe", create a repository named "johndoe"). Upload the README.md file to this repository, and it will automatically appear on your profile.'
      },
      {
        question: 'Can I customize the README further after downloading?',
        answer: 'Absolutely! The generated README is standard Markdown format. You can edit it in any text editor, add more sections, modify the styling, or include additional content before uploading to GitHub.'
      },
      {
        question: 'Why aren\'t my GitHub stats showing up?',
        answer: 'GitHub stats widgets require your username to be correctly entered and your profile to be public. Also, newly created accounts might take some time before stats services can generate meaningful data.'
      },
      {
        question: 'Can I add custom skills not in the predefined list?',
        answer: 'Currently, we provide a curated list of popular technologies. If you need a custom skill icon, you can manually edit the downloaded README and add your own icon URLs using the same format.'
      }
    ]
  },
  {
    id: 'following-analysis',
    title: 'Following Analysis',
    icon: Users,
    faqs: [
      {
        question: 'How does the "not following back" analysis work?',
        answer: 'We fetch your following list and followers list from GitHub\'s API, then compare them to identify users you follow who don\'t follow you back. This analysis is done in real-time and nothing is stored.'
      },
      {
        question: 'Is there a limit to how many users can be analyzed?',
        answer: 'Due to GitHub API rate limits and performance considerations, we analyze up to 100 users in each list (following/followers). This covers most users, but accounts with thousands of connections might not see complete results.'
      },
      {
        question: 'Can I bulk unfollow users who don\'t follow back?',
        answer: 'Our tool only provides analysis and insights. We don\'t offer bulk unfollow functionality as this would require write access to your account, which goes against our privacy principles.'
      },
      {
        question: 'How often should I run this analysis?',
        answer: 'You can run the analysis as often as you like since it uses real-time data. Many users find it helpful to check monthly or quarterly to maintain relevant connections.'
      }
    ]
  },
  {
    id: 'profile-compare',
    title: 'Profile Compare',
    icon: GitCompare,
    faqs: [
      {
        question: 'What metrics are included in the profile comparison?',
        answer: 'We compare followers, following count, public repositories, account age, and calculate an overall profile score based on engagement ratios and activity levels.'
      },
      {
        question: 'How is the overall score calculated?',
        answer: 'The score is based on multiple factors: follower count (max 50 points), repository count (max 30 points), and follower-to-following ratio (max 20 points). This gives a holistic view of profile strength.'
      },
      {
        question: 'Can I compare my profile with multiple users?',
        answer: 'Currently, our tool supports comparing two profiles at a time. For multiple comparisons, you would need to run separate comparisons for each pair of users.'
      },
      {
        question: 'Are the improvement suggestions personalized?',
        answer: 'Yes! Based on the comparison results, we provide specific suggestions tailored to each profile\'s weaknesses, such as increasing repository count or improving follower engagement.'
      }
    ]
  },
  {
    id: 'documentation',
    title: 'Documentation',
    icon: BookOpen,
    faqs: [
      {
        question: 'Is the documentation suitable for beginners?',
        answer: 'Yes! Our documentation starts with absolute basics like "What is Git?" and progressively covers more advanced topics. Each section includes practical examples and common use cases.'
      },
      {
        question: 'Can I suggest new topics for the documentation?',
        answer: 'Absolutely! We welcome community input. You can suggest new topics, improvements, or corrections through our GitHub repository or contact us directly.'
      },
      {
        question: 'Are the code examples tested?',
        answer: 'Yes, all command examples and code snippets in our documentation are tested and verified to work with current versions of Git and GitHub.'
      },
      {
        question: 'Can I contribute to the documentation?',
        answer: 'We encourage contributions! You can submit pull requests with improvements, new content, or corrections. Check our contribution guidelines on GitHub for more details.'
      }
    ]
  },
  {
    id: 'technical',
    title: 'Technical Issues',
    icon: Zap,
    faqs: [
      {
        question: 'What should I do if I get a "User not found" error?',
        answer: 'This error occurs when the GitHub username doesn\'t exist or the account is private. Double-check the spelling and ensure the account exists and is public.'
      },
      {
        question: 'Why am I seeing "Rate limit exceeded" errors?',
        answer: 'GitHub API has rate limits to prevent abuse. If you encounter this, wait a few minutes before trying again. The limit resets every hour.'
      },
      {
        question: 'The website seems slow or unresponsive. What can I do?',
        answer: 'Try refreshing the page or clearing your browser cache. If problems persist, it might be due to high traffic or GitHub API delays. Wait a moment and try again.'
      },
      {
        question: 'Can I use the tools on mobile devices?',
        answer: 'Yes! Our website is fully responsive and works on all devices including smartphones and tablets. The interface adapts to provide the best experience on any screen size.'
      }
    ]
  }
];

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFAQs, setFilteredFAQs] = useState(faqCategories);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredFAQs(faqCategories);
      return;
    }

    const filtered = faqCategories.map(category => ({
      ...category,
      faqs: category.faqs.filter(faq =>
        faq.question.toLowerCase().includes(term.toLowerCase()) ||
        faq.answer.toLowerCase().includes(term.toLowerCase())
      )
    })).filter(category => category.faqs.length > 0);

    setFilteredFAQs(filtered);
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about GitHub Tools Pro and learn how to get the most out of our platform
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        {/* FAQ Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <AnimatePresence>
            {filteredFAQs.map((category, categoryIndex) => {
              const Icon = category.icon;
              
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <Icon className="h-5 w-5" />
                        {category.title}
                        <Badge variant="secondary" className="ml-auto">
                          {category.faqs.length} questions
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {category.faqs.map((faq, faqIndex) => (
                          <AccordionItem key={faqIndex} value={`${category.id}-${faqIndex}`}>
                            <AccordionTrigger className="text-left">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredFAQs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 space-y-4"
            >
              <Search className="h-16 w-16 mx-auto text-muted-foreground" />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">No Results Found</h3>
                <p className="text-muted-foreground">
                  Try searching with different keywords or browse all categories above.
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl mx-auto mt-16"
        >
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Still Have Questions?</CardTitle>
              <CardDescription>
                Cant find the answer you are looking for? We are here to help!
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                Our team is always happy to help with any questions, suggestions, or issues you might have.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors p-2">
                  📧 Contact Support
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors p-2">
                  💬 Join Community
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors p-2">
                  🐛 Report Bug
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}