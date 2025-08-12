"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Download, 
  Eye, 
  Plus, 
  Trash2, 
  Code2, 
  WandSparkles,
  User,
  Star,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Mail
} from 'lucide-react';
import { toast } from 'sonner';

interface Profile {
  name: string;
  title: string;
  description: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
  twitter: string;
  email: string;
}

interface Skill {
  name: string;
  icon: string;
}

interface Social {
  platform: string;
  url: string;
  icon: string;
}

const skillIcons = [
  { name: 'JavaScript', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg' },
  { name: 'React', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg' },
  { name: 'Node.js', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg' },
  { name: 'Python', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg' },
  { name: 'Java', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg' },
  { name: 'HTML5', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg' },
  { name: 'CSS3', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg' },
  { name: 'Vue.js', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg' },
  { name: 'Angular', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/angularjs/angularjs-original.svg' },
];

export default function ReadmeDesigner() {
  const [profile, setProfile] = useState<Profile>({
    name: '',
    title: '',
    description: '',
    location: '',
    website: '',
    github: '',
    linkedin: '',
    twitter: '',
    email: ''
  });

  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [includeStats, setIncludeStats] = useState(true);
  const [includeWidgets, setIncludeWidgets] = useState(true);
  const previewRef = useRef<HTMLDivElement>(null);

  const addSkill = (skill: { name: string; icon: string }) => {
    if (!selectedSkills.find(s => s.name === skill.name)) {
      setSelectedSkills([...selectedSkills, skill]);
      toast.success(`${skill.name} added to skills`);
    } else {
      toast.error(`${skill.name} is already added`);
    }
  };

  const removeSkill = (skillName: string) => {
    setSelectedSkills(selectedSkills.filter(s => s.name !== skillName));
    toast.success('Skill removed');
  };

  const generateReadmeContent = () => {
    let content = `<h1 align="center">Hi 👋, I'm ${profile.name || 'Your Name'}</h1>\n`;
    
    if (profile.title) {
      content += `<h3 align="center">${profile.title}</h3>\n\n`;
    }

    if (profile.description) {
      content += `<p align="center">${profile.description}</p>\n\n`;
    }

    // Contact Info
    const contacts = [];
    if (profile.location) contacts.push(`📍 ${profile.location}`);
    if (profile.website) contacts.push(`🌐 [Website](${profile.website})`);
    if (profile.email) contacts.push(`📧 ${profile.email}`);
    
    if (contacts.length > 0) {
      content += `<p align="center">${contacts.join(' • ')}</p>\n\n`;
    }

    // Social Links
    const socials = [];
    if (profile.github) socials.push(`<a href="https://github.com/${profile.github}"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>`);
    if (profile.linkedin) socials.push(`<a href="https://linkedin.com/in/${profile.linkedin}"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>`);
    if (profile.twitter) socials.push(`<a href="https://twitter.com/${profile.twitter}"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter"/></a>`);

    if (socials.length > 0) {
      content += `<p align="center">\n${socials.join('\n')}\n</p>\n\n`;
    }

    // Skills
    if (selectedSkills.length > 0) {
      content += `## 🛠️ Technologies & Tools\n\n`;
      content += `<p align="center">\n`;
      selectedSkills.forEach(skill => {
        content += `  <img src="${skill.icon}" alt="${skill.name}" width="40" height="40"/>\n`;
      });
      content += `</p>\n\n`;
    }

    // GitHub Stats
    if (includeStats && profile.github) {
      content += `## 📊 GitHub Stats\n\n`;
      content += `<div align="center">\n`;
      content += `  <img src="https://github-readme-stats.vercel.app/api?username=${profile.github}&theme=dark&hide_border=false&include_all_commits=true&count_private=true" alt="GitHub Stats"/>\n`;
      content += `  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${profile.github}&theme=dark&hide_border=false" alt="GitHub Streak"/>\n`;
      content += `  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${profile.github}&theme=dark&hide_border=false&include_all_commits=true&count_private=true&layout=compact" alt="Top Languages"/>\n`;
      content += `</div>\n\n`;
    }

    // Widgets
    if (includeWidgets && profile.github) {
      content += `## 🏆 GitHub Trophies\n\n`;
      content += `<div align="center">\n`;
      content += `  <img src="https://github-profile-trophy.vercel.app/?username=${profile.github}&theme=darkhub&no-frame=false&no-bg=false&margin-w=4" alt="GitHub Trophies"/>\n`;
      content += `</div>\n\n`;

      content += `## 📈 Contribution Graph\n\n`;
      content += `<div align="center">\n`;
      content += `  <img src="https://github-readme-activity-graph.vercel.app/graph?username=${profile.github}&theme=github-compact" alt="Contribution Graph"/>\n`;
      content += `</div>\n\n`;
    }

    // Visitor Badge
    if (profile.github) {
      content += `---\n\n`;
      content += `<div align="center">\n`;
      content += `  <img src="https://komarev.com/ghpvc/?username=${profile.github}&label=Profile%20views&color=0e75b6&style=flat" alt="Profile Views"/>\n`;
      content += `</div>\n`;
    }

    return content;
  };

  const downloadReadme = () => {
    const content = generateReadmeContent();
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('README.md downloaded successfully!');
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
            README{" "}
            <span className="bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
              Designer
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create stunning GitHub profile READMEs with skills, stats, and social icons
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Design Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <WandSparkles className="h-5 w-5" />
                  Design Your Profile
                </CardTitle>
                <CardDescription>
                  Customize your GitHub profile README
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="profile" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                    <TabsTrigger value="widgets">Widgets</TabsTrigger>
                  </TabsList>

                  <TabsContent value="profile" className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="text-sm font-medium">Name</label>
                        <Input
                          placeholder="Your Name"
                          value={profile.name}
                          onChange={(e) => setProfile({...profile, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Title</label>
                        <Input
                          placeholder="Full Stack Developer"
                          value={profile.title}
                          onChange={(e) => setProfile({...profile, title: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Description</label>
                        <Textarea
                          placeholder="A passionate developer from..."
                          value={profile.description}
                          onChange={(e) => setProfile({...profile, description: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-sm font-medium">Location</label>
                          <Input
                            placeholder="New York, USA"
                            value={profile.location}
                            onChange={(e) => setProfile({...profile, location: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Website</label>
                          <Input
                            placeholder="https://yoursite.com"
                            value={profile.website}
                            onChange={(e) => setProfile({...profile, website: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-sm font-medium">GitHub Username</label>
                          <Input
                            placeholder="yourusername"
                            value={profile.github}
                            onChange={(e) => setProfile({...profile, github: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Email</label>
                          <Input
                            placeholder="your@email.com"
                            value={profile.email}
                            onChange={(e) => setProfile({...profile, email: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-sm font-medium">LinkedIn</label>
                          <Input
                            placeholder="linkedin-username"
                            value={profile.linkedin}
                            onChange={(e) => setProfile({...profile, linkedin: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Twitter</label>
                          <Input
                            placeholder="twitter-handle"
                            value={profile.twitter}
                            onChange={(e) => setProfile({...profile, twitter: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="skills" className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Available Skills</h4>
                      <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                        {skillIcons.map((skill) => (
                          <Button
                            key={skill.name}
                            variant="outline"
                            size="sm"
                            onClick={() => addSkill(skill)}
                            className="justify-start"
                          >
                            <img src={skill.icon} alt={skill.name} className="w-4 h-4 mr-2" />
                            {skill.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-medium mb-2">Selected Skills</h4>
                      <div className="space-y-2">
                        {selectedSkills.map((skill) => (
                          <div key={skill.name} className="flex items-center justify-between p-2 bg-muted rounded">
                            <div className="flex items-center gap-2">
                              <img src={skill.icon} alt={skill.name} className="w-4 h-4" />
                              <span className="text-sm">{skill.name}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSkill(skill.name)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        {selectedSkills.length === 0 && (
                          <p className="text-sm text-muted-foreground">No skills selected</p>
                        )}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="widgets" className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">GitHub Stats</h4>
                          <p className="text-sm text-muted-foreground">Include GitHub statistics widgets</p>
                        </div>
                        <Button
                          variant={includeStats ? "default" : "outline"}
                          size="sm"
                          onClick={() => setIncludeStats(!includeStats)}
                        >
                          {includeStats ? "Enabled" : "Disabled"}
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Additional Widgets</h4>
                          <p className="text-sm text-muted-foreground">Include trophies and contribution graph</p>
                        </div>
                        <Button
                          variant={includeWidgets ? "default" : "outline"}
                          size="sm"
                          onClick={() => setIncludeWidgets(!includeWidgets)}
                        >
                          {includeWidgets ? "Enabled" : "Disabled"}
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex gap-2 mt-6">
                  <Button onClick={() => setShowPreview(!showPreview)} className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    {showPreview ? "Hide Preview" : "Show Preview"}
                  </Button>
                  <Button onClick={downloadReadme} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Preview Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="h-fit max-h-[800px]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Live Preview
                </CardTitle>
                <CardDescription>
                  See how your README will look
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AnimatePresence>
                  {showPreview ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      ref={previewRef}
                      className="border rounded-lg p-4 bg-background"
                    >
                      <ScrollArea className="h-[600px]">
                        <div 
                          className="prose prose-sm max-w-none dark:prose-invert"
                          dangerouslySetInnerHTML={{ 
                            __html: generateReadmeContent()
                              .replace(/\n/g, '<br>')
                              .replace(/## (.*?)(<br>)/g, '<h2>$1</h2>')
                              .replace(/# (.*?)(<br>)/g, '<h1>$1</h1>')
                              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                              .replace(/\*(.*?)\*/g, '<em>$1</em>')
                          }}
                        />
                      </ScrollArea>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="h-[600px] flex items-center justify-center text-muted-foreground"
                    >
                      <div className="text-center space-y-2">
                        <Eye className="h-12 w-12 mx-auto opacity-50" />
                        <p>Preview will appear here</p>
                        <p className="text-sm">Click Show Preview to see your README</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto mt-12"
        >
          <Card>
            <CardHeader>
              <CardTitle>How to Use</CardTitle>
              <CardDescription>
                Steps to create and use your custom README
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center space-y-2">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto font-bold">1</div>
                  <h4 className="font-semibold">Fill Profile</h4>
                  <p className="text-sm text-muted-foreground">Add your personal information and social links</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto font-bold">2</div>
                  <h4 className="font-semibold">Select Skills</h4>
                  <p className="text-sm text-muted-foreground">Choose your technologies and tools</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto font-bold">3</div>
                  <h4 className="font-semibold">Preview & Download</h4>
                  <p className="text-sm text-muted-foreground">Review your README and download the file</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto font-bold">4</div>
                  <h4 className="font-semibold">Upload to GitHub</h4>
                  <p className="text-sm text-muted-foreground">Create a repository with your username and upload</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}