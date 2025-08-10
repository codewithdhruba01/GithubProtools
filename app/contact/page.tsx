"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { 
  Mail, 
  Send, 
  MessageSquare, 
  Github, 
  Twitter, 
  MapPin,
  Linkedin,
  Clock,
  Phone,
  Loader2
} from 'lucide-react';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
}

export default function Contact() {
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const categories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'bug', label: 'Bug Report' },
    { value: 'feature', label: 'Feature Request' },
    { value: 'support', label: 'Technical Support' },
    { value: 'business', label: 'Business Inquiry' },
    { value: 'other', label: 'Other' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    
    try {
      // In a real application, you would replace this with your FORMSPREE endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          category: form.category,
          message: form.message,
          _replyto: form.email,
          _subject: `GitHub Tools Contact: ${form.subject}`,
        })
      });

      if (response.ok) {
        toast.success('Message sent successfully! We\'ll get back to you soon.');
        setForm({
          name: '',
          email: '',
          subject: '',
          category: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container py-8 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Contact <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Us</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Have questions, suggestions, or need help? We d love to hear from you!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Send us a message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={form.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={form.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="Brief description of your inquiry"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={form.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Please provide as much detail as possible..."
                    rows={6}
                    required
                  />
                </div>

                <Button type="submit" size="lg" disabled={loading} className="w-full">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-sm text-muted-foreground">pati.dhrubaraj@outlook.com</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Response Time</div>
                  <div className="text-sm text-muted-foreground">Within 24 hours</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Location</div>
                  <div className="text-sm text-muted-foreground">India</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Connect With Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-6 bg-[#161616] p-3 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <Github className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-medium">GitHub</div>
                  <div className="text-sm text-muted-foreground">Follow our projects</div>
                </div>
              </a>

              <a 
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-6 p-3 bg-[#161616] rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform text-[#407cff]" />
                <div>
                  <div className="font-medium">Linkedin</div>
                  <div className="text-sm text-muted-foreground">Latest Tech updates</div>
                </div>
              </a>
              <a 
                href="https://twitter.com"
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-6 p-3 bg-[#161616] rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <Twitter className="h-5 w-5 group-hover:scale-110 transition-transform text-[#2eb5f3]" />
                <div>
                  <div className="font-medium">Twitter</div>
                  <div className="text-sm text-muted-foreground">Latest updates</div>
                </div>
              </a>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <MessageSquare className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-900 dark:text-green-100 mb-1">
                    Quick Response Tips
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-200 mb-2">
                    To help us respond faster, please include:
                  </p>
                  <ul className="text-sm text-green-700 dark:text-green-200 space-y-1">
                    <li>• Browser and OS information</li>
                    <li>• Steps to reproduce issues</li>
                    <li>• Screenshots if applicable</li>
                    <li>• Your use case or goal</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ Link */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-muted rounded-full">
          <span className="text-sm text-muted-foreground">
            Looking for quick answers? Check our
          </span>
          <a href="/faq" className="text-sm font-medium text-primary hover:text-[#036e03]">
            FAQ section
          </a>
        </div>
      </div>
    </div>
  );
}