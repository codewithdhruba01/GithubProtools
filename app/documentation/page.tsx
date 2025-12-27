"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  BookOpen,
  GitBranch,
  Github,
  Terminal,
  Users,
  Settings,
  ChevronRight,
  Play,
  Code,
  Zap
} from 'lucide-react';

type Command = {
  command: string;
  description: string;
};

type Chapter = {
  content: string;
  commands?: Command[];
};

type ChapterContent = Record<string, Record<string, Chapter>>;

const documentationSections = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: Play,
    description: 'Learn the basics of Git and GitHub',
    chapters: [
      'Introduction',
      'What is Git?',
      'What is GitHub?',
      'Installing Git',
      'Setting up GitHub account',
      'First repository'
    ]
  },
  {
    id: 'git-basics',
    title: 'Git Basics',
    icon: GitBranch,
    description: 'Master fundamental Git commands',
    chapters: [
      'Git init and clone',
      'Adding and committing',
      'Viewing history',
      'Working with remotes',
      'Branching basics'
    ]
  },
  {
    id: 'github-features',
    title: 'GitHub Features',
    icon: Github,
    description: 'Explore GitHub\'s powerful features',
    chapters: [
      'Issues and Pull Requests',
      'GitHub Actions',
      'Pages and Wikis',
      'Organizations and Teams',
      'Security features'
    ]
  },
  {
    id: 'advanced-git',
    title: 'Advanced Git',
    icon: Terminal,
    description: 'Advanced Git techniques and workflows',
    chapters: [
      'Merging strategies',
      'Rebasing and squashing',
      'Git hooks',
      'Submodules',
      'Advanced branching'
    ]
  },
  {
    id: 'collaboration',
    title: 'Collaboration',
    icon: Users,
    description: 'Working effectively with teams',
    chapters: [
      'Git workflows',
      'Code reviews',
      'Conflict resolution',
      'Team practices',
      'Open source contribution'
    ]
  },
  {
    id: 'tools-config',
    title: 'Tools & Configuration',
    icon: Settings,
    description: 'Optimize your Git and GitHub setup',
    chapters: [
      'Git configuration',
      'SSH keys',
      'GitHub CLI',
      'IDE integrations',
      'Productivity tips'
    ]
  }
];

const chapterContent: ChapterContent = {
  'getting-started': {
    'Introduction': {
      content: `Welcome to the Ultimate Git Guide, your go-to resource for mastering Git, the industry-standard version control system. Inside, you’ll find clear explanations of Git commands 
       with detailed flags and real-world examples. Learn not just how to use commands like git add, git commit, and git rebase, but also when and why to apply them in real-world scenarios—whether you're working solo, collaborating with a team, or contributing to open-source projects. We’ve included tips and tricks for maintaining a clean 
       commit history, resolving merge conflicts, and using Git’s reset and revert features to undo mistakes and fix bugs. You’ll also explore advanced Git features that can boost your productivity and make troubleshooting easier  With practical advice and best practices, this guide will help you streamline your Git workflow and use Git like a pro. 
       Let’s get started!
      `,
      commands: [
        { command: "git --version", description: "Check installed Git version" },
        { command: "git help", description: "Get help with Git commands" },
        { command: "git init", description: "Initialize a new Git repository in the current folder" },
        { command: "git status", description: "Check which files are changed and ready to commit" },
        { command: "git add <file>", description: "Stage specific file(s) for commit" },
        { command: "git add .", description: "Stage all changes for commit" },
        { command: 'git commit -m "message"', description: "Save staged changes with a message" },
        { command: "git log", description: "View commit history" },
        { command: "git branch", description: "List all branches" },
        { command: "git checkout -b <branch-name>", description: "Create and switch to a new branch" },
        { command: "git merge <branch-name>", description: "Merge changes from another branch into the current branch" },
        { command: "git remote add origin <repo-url>", description: "Connect local repo to remote repository" },
        { command: "git push origin main", description: "Push changes to the main branch on remote" },
        { command: "git pull", description: "Fetch and merge changes from remote repository" }
      ]
    },
    'What is Git?': {
      content: `<p>Git is a <strong>distributed version control system (DVCS)</strong> used to track changes in files and coordinate work between multiple people.</p>
      <p><strong>What Git does:</strong></p>
    <ul>
       Keeps a complete history of every change made to your files Allows you to go back to previous versions at any time</li>
       Lets multiple developers work together without overwriting each other's work makes branching easy so you can experiment without breaking the main code</li>
   </ul>
    <p><strong>Why developers use Git:</strong></p>
   <ul>
    <li>• <strong>Collaboration:</strong> Teams can work on the same codebase efficiently</li>
    <li>• <strong>Backup:</strong> Your history is stored locally and can also be pushed to remote servers like GitHub</li>
    <li>• <strong>Experimentation:</strong> Try new features safely in branches</li>
    <li>• <strong>Version tracking:</strong> See exactly who changed what and when</li>
   </ul>
      `,
      commands: [
        { command: "git --version", description: "Check installed Git version" },
        { command: "git help", description: "Get help with Git commands" },
        { command: "git init", description: "Initialize a new Git repository in the current folder" },
        { command: "git status", description: "Check which files are changed and ready to commit" },
        { command: "git add <file>", description: "Stage specific file(s) for commit" },
        { command: "git add .", description: "Stage all changes for commit" },
        { command: 'git commit -m "message"', description: "Save staged changes with a message" },
        { command: "git log", description: "View commit history" },
        { command: "git branch", description: "List all branches" },
        { command: "git checkout -b <branch-name>", description: "Create and switch to a new branch" },
        { command: "git merge <branch-name>", description: "Merge changes from another branch into the current branch" },
        { command: "git remote add origin <repo-url>", description: "Connect local repo to remote repository" },
        { command: "git push origin main", description: "Push changes to the main branch on remote" },
        { command: "git pull", description: "Fetch and merge changes from remote repository" }
      ]
    },
    'What is GitHub?': {
      content: `GitHub is an online platform where developers store, share, and collaborate on code projects.
       It’s built around Git, which is a version control system that keeps track of changes in your code over time.
       <p><strong>breakdown:</strong></p>
      <ul>
          <li>• <strong>Code Hosting - </strong> You can upload your projects (repositories) so they’re stored safely online </li>
          <li>• <strong>Version Control - </strong> Every change you make is tracked, so you can roll back if something breaks. </li>
          <li>• <strong>Collaboration - </strong> Multiple people can work on the same project without overwriting each other’s work. </li>
          <li>• <strong>Pull Requests - </strong> A way to propose changes to a project, review them, and merge them in when approved.</li>
          <li>• <strong>Issues & Project Boards - </strong> Tools for reporting bugs, tracking tasks, and organizing work.</li>
          <li>• <strong>Community - </strong> You can explore open-source projects, contribute to others’ code, or showcase your own.</li>
      </ul>
       `,
      commands: [
        { command: 'git remote -v', description: 'View configured remotes' },
        { command: 'git push origin main', description: 'Push to GitHub repository' }
      ]
    },
    'Installing Git': {
      content: `
      <p>To use Git, you first need to install it on your system. Git is available for Windows, macOS, and Linux.</p>

      <h3> <strong> Installing Git on Different Platforms: </strong> </h3>

      <strong>1. Windows: </strong>
      <div class="mb-4">
      <img src="https://media.geeksforgeeks.org/wp-content/uploads/20220513224110/1.PNG" class="rounded-lg shadow-md" />
      </div>
      <ul>
        <li>• Go to the official Git website: <a href="https://git-scm.com/downloads/win" target="_blank">Link</a> Click "Downlode" and wait for the process to complete. </li>
        <li>• The download should start automatically. </li>
      </ul>
      <h3>  Double-click the <code> .exe </code> file. </h3>
      <div class="mb-4">
      <img src="https://media.geeksforgeeks.org/wp-content/uploads/20220513225003/2.png" class="rounded-lg shadow-md" />
      </div>
      <ul>
      <ul>
        <li>• Step 3: Check the GNU General Public License and click Next. </li>
        <div class="mb-4">
      <img src="https://media.geeksforgeeks.org/wp-content/uploads/20220513230934/4.PNG" class="rounded-lg shadow-md" />
      </div>
        <li>• A screen for component selection will display. Leave the settings as it is and click Next. </li>

         <div class="mb-4">
      <img src="https://media.geeksforgeeks.org/wp-content/uploads/20220513231157/5.PNG" class="rounded-lg shadow-md" />
      </div>
        </ul>
      <h3> <strong> Important choices: </strong> </h3>
      <ul>
        <li>• <strong> Editor selection: </strong> You can choose Nano (default) or VS Code if installed. </li>
        <li>• <strong> PATH environment: </strong> Choose "Git from the command line and also from 3rd-party software". </li>
        <li>• <strong> Line endings: </strong> Choose "Checkout Windows-style, commit Unix-style" (recommended). </li>
        <li>• Leave other default options unless you know you need a specific setup.</li>
      </ul>

      <h3> <strong> Finish Installation: </strong> </h3>
      <ul>
        <li>• Click Finish. </li>
        <li>• Open Command Prompt or PowerShell.</li>
      </ul>
       `,
      commands: [
        { command: "git --version", description: "Check installed Windows Git version" },
        { command: "brew install git", description: "Install Git on macOS with Homebrew" },
        { command: "sudo apt install git", description: "Install Git on Ubuntu/Debian" }
      ]
    },
    'Setting up GitHub account': {
      content: `GitHub is an online platform where developers store, share, and collaborate on code projects.
  It’s built around Git, which is a version control system that keeps track of changes in your code over time.
  
  <p><strong>Step 1 — Create a GitHub Account</strong></p>
  <ul>
      <li>• Go to <a href="https://github.com" target="_blank">https://github.com</a>.</li>
      <li>• Click <strong>Sign up</strong> (top-right corner).</li>
      <li>• Fill in your username, email address, and password.</li>
      <li>• Solve the CAPTCHA and click <strong>Create account</strong>.</li>
      <li>• Verify your email by clicking the link GitHub sends you.</li>
  </ul>

  <p><strong>Step 2 — Choose Your Plan</strong></p>
  <ul>
      <li>• Select the <strong>Free</strong> plan (perfect for beginners).</li>
      <li>• Paid plans have more features, but Free allows unlimited public and private repositories.</li>
  </ul>

  <p><strong>Step 3 — Set Up Your Profile</strong></p>
  <ul>
      <li>• Add a profile picture and short bio.</li>
      <li>• Optionally, include your website or portfolio link.</li>
  </ul>

  <p><strong>Step 4 — Install Git on Your Computer</strong></p>
  <ul>
      <li>• Windows: Download from <a href="https://git-scm.com/downloads" target="_blank">git-scm.com</a> and install.</li>
      <li>• Mac: Run <code>brew install git</code> in Terminal.</li>
      <li>• Linux (Debian/Ubuntu): Run <code>sudo apt install git</code>.</li>
  </ul>

  <p><strong>Step 5 — Configure Git</strong></p>

  <p><strong>Step 6 — Connect GitHub to Your Computer</strong></p>
  <ul>
      <li>• <strong>HTTPS Method</strong> (simple) — Use Personal Access Token as password when pushing code.</li>
      <li>• <strong>SSH Method</strong> (no password every time) — Add your SSH key in GitHub settings.</li>
  </ul>
  `,
      commands: [
        { command: 'git remote -v', description: 'View configured remotes' },
        { command: 'git push origin main', description: 'Push to GitHub repository' },
        { command: 'git config --global user.name "Your Name"', description: 'Set your Git username' },
        { command: 'git config --global user.email "youremail@example.com"', description: 'Set your Git email' }
      ]
    },

    'First repository': {
      content: `
  <p><strong>Step 1 — Open GitHub and Log In</strong></p>
  <ul>
      <li>• Go to <a href="https://github.com" target="_blank">https://github.com</a> and log in with your account.</li>
  </ul>
  <img src="https://community.cyberpanel.net/uploads/default/original/2X/1/127e91b046805771274ed8936250082fd5e282d9.jpeg" alt="GitHub Home Page" style="max-width: 100%; border: 1px solid #ddd; border-radius: 6px; margin: 10px 0;">

  <p><strong>Step 2 — Click the <code>+</code> Button</strong></p>
  <ul>
      <li>• On the top-right corner, click the <code>+</code> icon and select <strong>New repository</strong>.</li>
  </ul>
  <img src="https://kinsta.com/wp-content/uploads/2023/02/create-github-repository-1024x505.png" alt="New Repository Button" style="max-width: 100%; border: 1px solid #ddd; border-radius: 6px; margin: 10px 0;">

  <p><strong>Step 3 — Fill in Repository Details</strong></p>
  <ul>
      <li>• <strong>Repository name:</strong> Choose a unique name (e.g., <code>my-first-project</code>).</li>
      <li>• <strong>Description:</strong> (Optional) Write a short description of your project.</li>
      <li>• <strong>Visibility:</strong> Choose <em>Public</em> (anyone can see it) or <em>Private</em> (only you & collaborators can see it).</li>
      <li>• (Optional) Tick <strong>Initialize this repository with a README</strong> so GitHub creates a default README file.</li>
  </ul>
  <img src="https://www.w3schools.com/git/img_github_new_repo_create.png" alt="Create Repository Form" style="max-width: 100%; border: 1px solid #ddd; border-radius: 6px; margin: 10px 0;">

  <p><strong>Step 4 — Create the Repository</strong></p>
  <ul>
      <li>• Scroll down and click the green <strong>Create repository</strong> button.</li>
  </ul>

  <p><strong>Step 5 — Next Steps</strong></p>
  <ul>
      <li>• GitHub will show you instructions to upload code from your computer.</li>
      <li>• Copy the repository link for use in your terminal (HTTPS or SSH).</li>
  </ul>
  <img src="https://leading-bell-3e1c02e64d.media.strapiapp.com/Z_4jtk_b774c7fd29.png" alt="New Repository Page" style="max-width: 100%; border: 1px solid #ddd; border-radius: 6px; margin: 10px 0;">
  `,
      commands: [
        { command: 'git init', description: 'Initialize a local Git repository' },
        { command: 'git add .', description: 'Stage all changes' },
        { command: 'git commit -m "First commit"', description: 'Commit changes with a message' },
        { command: 'git branch -M main', description: 'Rename default branch to main' },
        { command: 'git remote add origin <repo-link>', description: 'Connect local repo to GitHub' },
        { command: 'git push -u origin main', description: 'Push local code to GitHub' }
      ]
    }

  },
  'git-basics': {
    'Git init and clone': {
      content: `
    <p><strong>Step 1 — Initialize a New Repository (Local to GitHub)</strong></p>
    <ul>
        <li>• Navigate to your project folder in your terminal.</li>
        <li>• Run <code>git init</code> to create a new local Git repository.</li>
        <li>• Add files with <code>git add .</code>.</li>
        <li>• Commit your changes with <code>git commit -m "First commit"</code>.</li>
        <li>• Create a new repository on GitHub (without initializing with README if already have files locally).</li>
        <li>• Link your local repository to GitHub with:
            <pre><code>git remote add origin &lt;repo-link&gt;</code></pre>
        </li>
        <li>• Push your local code to GitHub:
            <pre><code>git push -u origin main</code></pre>
        </li>
    </ul>

    <p><strong>Step 2 — Clone an Existing Repository (GitHub to Local)</strong></p>
    <ul>
        <li>• Go to the repository page on GitHub.</li>
        <li>• Click the green <strong>Code</strong> button and copy the HTTPS or SSH link.</li>
        <li>• In your terminal, navigate to the folder where you want to save the project.</li>
        <li>• Run:
            <pre><code>git clone &lt;repo-link&gt;</code></pre>
        </li>
        <li>• This will create a new folder with all the repository files.</li>
        <li>• Navigate into it:
            <pre><code>cd &lt;repository-folder&gt;</code></pre>
        </li>
    </ul>

    <p><strong>Notes:</strong></p>
    <ul>
        <li>• Use <code>git status</code> to check your current changes.</li>
        <li>• Always commit changes before pushing to avoid errors.</li>
        <li>• Ensure you have permission to push if it’s a private or shared repository.</li>
    </ul>
  `,
      commands: [
        { command: 'git add <file>', description: 'Stage a specific file' },
        { command: 'git add .', description: 'Stage all changed files in the current directory' },
        { command: 'git commit -m "message"', description: 'Save staged changes with a message' },
        { command: 'git status', description: 'Show which files are staged, modified, or untracked' }
      ]
    },

    'Adding and committing': {
      content: `
    <p><strong>1. What is "Adding" in Git?</strong></p>
    <ul>
        <li>• When you create or change files in your project, Git notices the changes but doesn't save them yet.</li>
        <li>• <code>git add</code> tells Git which changes you want to include in the next commit.</li>
        <li>• This is called <em>staging</em> your changes.</li>
        </li>
    </ul>

    <p><strong>2. What is "Committing" in Git?</strong></p>
    <ul>
        <li>• After staging your changes, you "commit" them to permanently save a snapshot in the repository’s history.</li>
        <li>• A commit has a unique ID and includes a message describing the change.</li>
        <li> Example:
            <pre><code>git commit -m "Added new feature"</code></pre>
        </li>
        <li>• The commit message should be short but meaningful, so others know what was changed.</li>
    </ul>

    <p><strong>4. Tips:</strong></p>
    <ul>
        <li>• Always review staged changes with <code>git status</code> before committing.</li>
        <li>• Commit small, logical changes instead of one big commit.</li>
        <li>• Use clear commit messages (e.g., "Fixed navbar bug" instead of "update").</li>
    </ul>
  `,
      commands: [
        { command: 'git init', description: 'Initialize a new local repository' },
        { command: 'git add .', description: 'Stage all changes' },
        { command: 'git commit -m "message"', description: 'Commit staged changes' },
        { command: 'git remote add origin <repo-link>', description: 'Link local repository to remote' },
        { command: 'git push -u origin main', description: 'Push code to GitHub main branch' },
        { command: 'git clone <repo-link>', description: 'Clone a repository from GitHub' },
        { command: 'git status', description: 'Check status of your repository' }
      ]
    },
    'Viewing history': {
      content: `
    <p><strong>1. Why View Git History?</strong></p>
    <ul>
        <li>• Git history lets you see all past commits, who made them, when they were made, and what changes they included.</li>
        <li>• Useful for tracking changes, debugging, and understanding project evolution.</li>
    </ul>

    <p><strong>2. Basic Commands to View History</strong></p>
    <ul>
        <li>• <code>git log</code> — Shows a full list of commits in reverse order (latest first).</li>
        <li>• <code>git log --oneline</code> — Shorter view with one commit per line.</li>
        <li>• <code>git log --graph --oneline --decorate</code> — Shows commits with branch/merge history in a visual graph.</li>
    </ul>

    <p><strong>3. Viewing Specific File History</strong></p>
    <ul>
        <li>• To see only commits affecting a specific file:
            <pre><code>git log -- file.txt</code></pre>
        </li>
    </ul>

    <p><strong>4. Viewing Commit Details</strong></p>
    <ul>
        <li>• <code>git show &lt;commit-hash&gt;</code> — Shows the changes made in a specific commit.</li>
    </ul>

    <p><strong>5. Tips:</strong></p>
    <ul>
        <li>• Press <code>q</code> to exit the log viewer.</li>
        <li>• Use <code>git diff</code> to compare changes between commits.</li>
        <li>• Combine filters for targeted searches, e.g.:
            <pre><code>git log --author="Your Name" --since="2 weeks ago"</code></pre>
        </li>
    </ul>
  `,
      commands: [
        { command: 'git log', description: 'View detailed commit history' },
        { command: 'git log --oneline', description: 'Compact commit history view' },
        { command: 'git log --graph --oneline --decorate', description: 'Visual commit history with branches' },
        { command: 'git log -- file.txt', description: 'View history for a specific file' },
        { command: 'git show <commit-hash>', description: 'Show details of a specific commit' }
      ]
    },
    'Working with remotes': {
      content: `
    <p><strong>1. What are Git Remotes?</strong></p>
    <ul>
        <li>• Remotes are versions of your repository hosted on the internet (like GitHub, GitLab).</li>
        <li>• They allow collaboration and backup of your code.</li>
        <li>• Common remote name is <code>origin</code> (points to the original repository).</li>
    </ul>

    <p><strong>2. Adding Remotes</strong></p>
    <ul>
        <li>• Add a remote repository:
            <pre><code>git remote add origin https://github.com/user/repo.git</code></pre>
        </li>
        <li>• Add upstream remote (for forked repositories):
            <pre><code>git remote add upstream https://github.com/original/repo.git</code></pre>
        </li>
    </ul>

    <p><strong>3. Managing Remotes</strong></p>
    <ul>
        <li>• View all remotes: <code>git remote -v</code></li>
        <li>• Rename remote: <code>git remote rename old-name new-name</code></li>
        <li>• Remove remote: <code>git remote remove origin</code></li>
        <li>• Change remote URL: <code>git remote set-url origin new-url</code></li>
    </ul>

    <p><strong>4. Pushing and Pulling</strong></p>
    <ul>
        <li>• Push local commits: <code>git push origin main</code></li>
        <li>• Pull latest changes: <code>git pull origin main</code></li>
        <li>• Fetch without merging: <code>git fetch origin</code></li>
        <li>• Push new branch: <code>git push -u origin feature-branch</code></li>
    </ul>

    <p><strong>5. Working with Multiple Remotes</strong></p>
    <ul>
        <li>• Sync with upstream: <code>git fetch upstream && git merge upstream/main</code></li>
        <li>• Push to multiple remotes: Configure multiple push URLs</li>
        <li>• Check remote branches: <code>git branch -r</code></li>
    </ul>
  `,
      commands: [
        { command: 'git remote add origin <url>', description: 'Add remote repository' },
        { command: 'git remote -v', description: 'View all remotes' },
        { command: 'git push origin main', description: 'Push to main branch' },
        { command: 'git pull origin main', description: 'Pull latest changes' },
        { command: 'git fetch origin', description: 'Fetch without merging' }
      ]
    },
    'Branching basics': {
      content: `
    <p><strong>1. What are Branches?</strong></p>
    <ul>
        <li>• Branches allow you to work on different versions of your code simultaneously.</li>
        <li>• Main branch (<code>main</code> or <code>master</code>) contains production-ready code.</li>
        <li>• Feature branches isolate development work.</li>
        <li>• Branches are lightweight and fast to create/switch.</li>
    </ul>

    <p><strong>2. Creating Branches</strong></p>
    <ul>
        <li>• Create new branch: <code>git branch feature-name</code></li>
        <li>• Create and switch: <code>git checkout -b feature-name</code></li>
        <li>• Switch to existing: <code>git checkout branch-name</code></li>
        <li>• List all branches: <code>git branch</code> (current branch marked with *)</li>
    </ul>

    <p><strong>3. Branch Operations</strong></p>
    <ul>
        <li>• Rename branch: <code>git branch -m old-name new-name</code></li>
        <li>• Delete branch: <code>git branch -d branch-name</code></li>
        <li>• Force delete: <code>git branch -D branch-name</code></li>
        <li>• View remote branches: <code>git branch -r</code></li>
    </ul>

    <p><strong>4. Merging Branches</strong></p>
    <ul>
        <li>• Merge feature into main:
            <pre><code>git checkout main
git merge feature-branch</code></pre>
        </li>
        <li>• Fast-forward vs. merge commit</li>
        <li>• Resolve merge conflicts when they occur</li>
    </ul>

    <p><strong>5. Branching Best Practices</strong></p>
    <ul>
        <li>• Use descriptive branch names (feature/user-auth, bugfix/navbar)</li>
        <li>• Keep branches short-lived</li>
        <li>• Regularly sync with main branch</li>
        <li>• Delete merged branches</li>
        <li>• Use pull requests for code review</li>
    </ul>
  `,
      commands: [
        { command: 'git branch', description: 'List all branches' },
        { command: 'git checkout -b feature-name', description: 'Create and switch to new branch' },
        { command: 'git checkout branch-name', description: 'Switch to existing branch' },
        { command: 'git merge branch-name', description: 'Merge branch into current branch' },
        { command: 'git branch -d branch-name', description: 'Delete merged branch' }
      ]
    }
  },
  'github-features': {
    'Issues and Pull Requests': {
      content: `
    <p><strong>1. GitHub Issues</strong></p>
    <ul>
        <li>• Issues are used to track bugs, features, and tasks.</li>
        <li>• Each issue has a title, description, labels, and assignees.</li>
        <li>• Can include checklists, images, and code snippets.</li>
        <li>• Supports Markdown formatting and mentions (@username).</li>
    </ul>

    <p><strong>2. Creating Issues</strong></p>
    <ul>
        <li>• Click "New issue" button on repository</li>
        <li>• Use issue templates if available</li>
        <li>• Add labels (bug, enhancement, documentation, etc.)</li>
        <li>• Assign to team members and set milestones</li>
        <li>• Link related issues and pull requests</li>
    </ul>

    <p><strong>3. Pull Requests (PRs)</strong></p>
    <ul>
        <li>• PRs propose changes from one branch to another</li>
        <li>• Shows diff of all changes</li>
        <li>• Allows code review and discussion</li>
        <li>• Can be merged, closed, or converted to draft</li>
    </ul>

    <p><strong>4. Creating Pull Requests</strong></p>
    <ul>
        <li>• Push your feature branch to GitHub</li>
        <li>• Click "Compare & pull request"</li>
        <li>• Add title and description</li>
        <li>• Request reviewers</li>
        <li>• Link related issues</li>
        <li>• Add labels and assign to project</li>
    </ul>

    <p><strong>5. Code Review Process</strong></p>
    <ul>
        <li>• Reviewers comment on specific lines</li>
        <li>• Request changes or approve</li>
        <li>• Use suggestions for quick fixes</li>
        <li>• Check CI/CD status</li>
        <li>• Squash and merge or merge commit</li>
    </ul>
  `,
      commands: [
        { command: 'git checkout -b feature-branch', description: 'Create feature branch' },
        { command: 'git push origin feature-branch', description: 'Push branch to GitHub' },
        { command: 'git pull origin main', description: 'Sync with latest changes' }
      ]
    },
    'GitHub Actions': {
      content: `
    <p><strong>1. What are GitHub Actions?</strong></p>
    <ul>
        <li>• GitHub Actions is a CI/CD platform built into GitHub</li>
        <li>• Automates workflows triggered by GitHub events</li>
        <li>• Uses YAML files stored in <code>.github/workflows/</code></li>
        <li>• Runs on GitHub's servers or self-hosted runners</li>
    </ul>

    <p><strong>2. Workflow Structure</strong></p>
    <ul>
        <li>• <strong>Events:</strong> Triggers like push, pull_request, schedule</li>
        <li>• <strong>Jobs:</strong> Groups of steps that run in parallel or sequence</li>
        <li>• <strong>Steps:</strong> Individual tasks using actions or shell commands</li>
        <li>• <strong>Actions:</strong> Reusable workflow components</li>
    </ul>

    <p><strong>3. Basic Workflow Example</strong></p>
    <pre><code>name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm test</code></pre>

    <p><strong>4. Common Actions</strong></p>
    <ul>
        <li>• <code>actions/checkout</code> - Clone repository</li>
        <li>• <code>actions/setup-node</code> - Setup Node.js</li>
        <li>• <code>actions/setup-python</code> - Setup Python</li>
        <li>• <code>actions/cache</code> - Cache dependencies</li>
        <li>• <code>codecov/codecov-action</code> - Upload coverage</li>
    </ul>

    <p><strong>5. Advanced Features</strong></p>
    <ul>
        <li>• Matrix builds for multiple environments</li>
        <li>• Secrets management</li>
        <li>• Self-hosted runners</li>
        <li>• Reusable workflows</li>
        <li>• Manual triggers with workflow_dispatch</li>
    </ul>
  `,
      commands: [
        { command: 'mkdir -p .github/workflows', description: 'Create workflows directory' },
        { command: 'touch .github/workflows/ci.yml', description: 'Create workflow file' }
      ]
    },
    'Pages and Wikis': {
      content: `
    <p><strong>1. GitHub Pages</strong></p>
    <ul>
        <li>• Free hosting for static websites directly from GitHub</li>
        <li>• Supports Jekyll, HTML, CSS, JavaScript</li>
        <li>• Custom domains and HTTPS included</li>
        <li>• Perfect for project documentation and portfolios</li>
    </ul>

    <p><strong>2. Setting up GitHub Pages</strong></p>
    <ul>
        <li>• Go to repository Settings → Pages</li>
        <li>• Choose source branch (main, gh-pages, or docs folder)</li>
        <li>• Select folder (/root for Jekyll, /docs for static)</li>
        <li>• Custom domain option available</li>
    </ul>

    <p><strong>3. Using Jekyll</strong></p>
    <ul>
        <li>• Ruby-based static site generator</li>
        <li>• Supports themes and plugins</li>
        <li>• Automatic builds on GitHub Pages</li>
        <li>• Markdown support with front matter</li>
    </ul>

    <p><strong>4. GitHub Wikis</strong></p>
    <ul>
        <li>• Separate repository for documentation</li>
        <li>• Markdown-based pages</li>
        <li>• Version controlled</li>
        <li>• Accessible via repository sidebar</li>
    </ul>

    <p><strong>5. Wiki Features</strong></p>
    <ul>
        <li>• Page linking and table of contents</li>
        <li>• Image and file attachments</li>
        <li>• Clone wiki as separate Git repository</li>
        <li>• Search functionality</li>
        <li>• Revision history</li>
    </ul>

    <p><strong>6. Alternatives</strong></p>
    <ul>
        <li>• README.md for simple documentation</li>
        <li>• docs/ folder for complex documentation</li>
        <li>• External documentation sites</li>
        <li>• GitBook or Docusaurus for advanced docs</li>
    </ul>
  `,
      commands: [
        { command: 'git checkout -b gh-pages', description: 'Create gh-pages branch' },
        { command: 'git push origin gh-pages', description: 'Deploy to GitHub Pages' }
      ]
    },
    'Organizations and Teams': {
      content: `
    <p><strong>1. GitHub Organizations</strong></p>
    <ul>
        <li>• Shared accounts for teams and open source projects</li>
        <li>• Unlimited repositories and collaborators</li>
        <li>• Advanced permissions and access controls</li>
        <li>• Organization-wide settings and policies</li>
    </ul>

    <p><strong>2. Creating Organizations</strong></p>
    <ul>
        <li>• Click "+" → "New organization"</li>
        <li>• Choose plan (Free or paid)</li>
        <li>• Set organization name and contact email</li>
        <li>• Invite members and set roles</li>
    </ul>

    <p><strong>3. Organization Roles</strong></p>
    <ul>
        <li>• <strong>Owner:</strong> Full administrative access</li>
        <li>• <strong>Member:</strong> Standard access to repositories</li>
        <li>• <strong>Billing Manager:</strong> Manage billing settings</li>
        <li>• <strong>Outside Collaborator:</strong> Limited access to specific repos</li>
    </ul>

    <p><strong>4. Teams</strong></p>
    <ul>
        <li>• Subgroups within organizations</li>
        <li>• Granular permissions per repository</li>
        <li>• Mention teams in issues and PRs</li>
        <li>• Team discussions and shared projects</li>
    </ul>

    <p><strong>5. Repository Permissions</strong></p>
    <ul>
        <li>• <strong>Read:</strong> View and clone repository</li>
        <li>• <strong>Triage:</strong> Read + manage issues and PRs</li>
        <li>• <strong>Write:</strong> Triage + push to repository</li>
        <li>• <strong>Maintain:</strong> Write + manage repository settings</li>
        <li>• <strong>Admin:</strong> Full repository access</li>
    </ul>

    <p><strong>6. Best Practices</strong></p>
    <ul>
        <li>• Use descriptive team names</li>
        <li>• Implement least-privilege access</li>
        <li>• Regular access reviews</li>
        <li>• Use organization secrets for Actions</li>
        <li>• Enable branch protection rules</li>
    </ul>
  `,
      commands: [
        { command: 'git remote set-url origin https://github.com/org/repo.git', description: 'Update remote for organization repo' }
      ]
    },
    'Security features': {
      content: `
    <p><strong>1. Repository Security</strong></p>
    <ul>
        <li>• Branch protection rules</li>
        <li>• Required pull request reviews</li>
        <li>• Required status checks</li>
        <li>• CODEOWNERS file for automatic reviews</li>
        <li>• Security advisories for vulnerabilities</li>
    </ul>

    <p><strong>2. Dependabot</strong></p>
    <ul>
        <li>• Automated dependency updates</li>
        <li>• Security vulnerability alerts</li>
        <li>• Version update PRs</li>
        <li>• Configurable via dependabot.yml</li>
    </ul>

    <p><strong>3. CodeQL and Security Scanning</strong></p>
    <ul>
        <li>• Automated code security analysis</li>
        <li>• Supports 15+ languages</li>
        <li>• Custom security queries</li>
        <li>• SARIF upload support</li>
    </ul>

    <p><strong>4. Secret Scanning</strong></p>
    <ul>
        <li>• Detects accidentally committed secrets</li>
        <li>• Supports API keys, tokens, certificates</li>
        <li>• Partner pattern matching</li>
        <li>• Push protection for high-risk secrets</li>
    </ul>

    <p><strong>5. Security Advisories</strong></p>
    <ul>
        <li>• Private vulnerability disclosure</li>
        <li>• CVE ID assignment</li>
        <li>• Credit attribution</li>
        <li>• Coordinated disclosure</li>
    </ul>

    <p><strong>6. Two-Factor Authentication (2FA)</strong></p>
    <ul>
        <li>• Required for organization members</li>
        <li>• Recovery codes for account access</li>
        <li>• App-based or SMS authentication</li>
        <li>• Security keys support</li>
    </ul>
  `,
      commands: [
        { command: 'echo "node_modules/" > .gitignore', description: 'Ignore dependencies' }
      ]
    }
  },
  'advanced-git': {
    'Merging strategies': {
      content: `
    <p><strong>1. Git Merge Strategies</strong></p>
    <ul>
        <li>• <strong>Fast-forward:</strong> Moves branch pointer forward when no divergent commits</li>
        <li>• <strong>Merge commit:</strong> Creates new commit with two parents</li>
        <li>• <strong>Squash merge:</strong> Combines all commits into single commit</li>
        <li>• <strong>Rebase merge:</strong> Replays commits on top of target branch</li>
    </ul>

    <p><strong>2. Fast-Forward Merge</strong></p>
    <pre><code>git checkout main
git merge feature-branch  # No merge commit created</code></pre>

    <p><strong>3. Merge Commit (Default)</strong></p>
    <pre><code>git checkout main
git merge --no-ff feature-branch  # Always creates merge commit</code></pre>

    <p><strong>4. Squash Merge</strong></p>
    <pre><code>git checkout main
git merge --squash feature-branch
git commit -m "Squashed feature"</code></pre>

    <p><strong>5. Resolving Merge Conflicts</strong></p>
    <ul>
        <li>• Edit conflicting files manually</li>
        <li>• Remove conflict markers (<<<<<<<, =======, >>>>>>>)</li>
        <li>• Stage resolved files with <code>git add</code></li>
        <li>• Complete merge with <code>git commit</code></li>
    </ul>

    <p><strong>6. Merge Tools</strong></p>
    <ul>
        <li>• <code>git mergetool</code> - Launch configured merge tool</li>
        <li>• Configure tool: <code>git config --global merge.tool vimdiff</code></li>
        <li>• Common tools: vimdiff, meld, kdiff3, vscode</li>
    </ul>
  `,
      commands: [
        { command: 'git merge --no-ff branch', description: 'Merge with merge commit' },
        { command: 'git merge --squash branch', description: 'Squash merge' },
        { command: 'git mergetool', description: 'Resolve conflicts with merge tool' }
      ]
    },
    'Rebasing and squashing': {
      content: `
    <p><strong>1. Git Rebase</strong></p>
    <ul>
        <li>• Replays commits from one branch onto another</li>
        <li>• Creates linear history instead of merge commits</li>
        <li>• Interactive rebase allows editing commit history</li>
        <li>• Dangerous on public branches</li>
    </ul>

    <p><strong>2. Basic Rebase</strong></p>
    <pre><code>git checkout feature-branch
git rebase main</code></pre>

    <p><strong>3. Interactive Rebase</strong></p>
    <pre><code>git rebase -i HEAD~3</code></pre>
    <p>Commands: pick, reword, edit, squash, fixup, drop</p>

    <p><strong>4. Squashing Commits</strong></p>
    <ul>
        <li>• Combine multiple commits into one</li>
        <li>• Clean up messy commit history</li>
        <li>• Use during interactive rebase</li>
    </ul>

    <p><strong>5. Rebase vs Merge</strong></p>
    <ul>
        <li>• <strong>Rebase:</strong> Linear history, cleaner but rewrites history</li>
        <li>• <strong>Merge:</strong> Preserves history, shows merge points</li>
        <li>• Use rebase for feature branches, merge for main branches</li>
    </ul>

    <p><strong>6. Rebase Best Practices</strong></p>
    <ul>
        <li>• Never rebase public/shared branches</li>
        <li>• Rebase frequently to avoid conflicts</li>
        <li>• Use --force-with-lease when pushing rebased branches</li>
        <li>• Test thoroughly after rebasing</li>
    </ul>
  `,
      commands: [
        { command: 'git rebase main', description: 'Rebase current branch on main' },
        { command: 'git rebase -i HEAD~5', description: 'Interactive rebase last 5 commits' },
        { command: 'git push --force-with-lease', description: 'Push rebased branch safely' }
      ]
    },
    'Git hooks': {
      content: `
    <p><strong>1. What are Git Hooks?</strong></p>
    <ul>
        <li>• Scripts that run automatically on Git events</li>
        <li>• Located in <code>.git/hooks/</code> directory</li>
        <li>• Client-side and server-side hooks</li>
        <li>• Executable scripts with specific names</li>
    </ul>

    <p><strong>2. Common Client-Side Hooks</strong></p>
    <ul>
        <li>• <strong>pre-commit:</strong> Runs before commit creation</li>
        <li>• <strong>prepare-commit-msg:</strong> Before commit message editor</li>
        <li>• <strong>commit-msg:</strong> Validate commit message</li>
        <li>• <strong>post-commit:</strong> After commit creation</li>
        <li>• <strong>pre-push:</strong> Before push to remote</li>
        <li>• <strong>post-merge:</strong> After successful merge</li>
    </ul>

    <p><strong>3. Setting up Hooks</strong></p>
    <pre><code># Make hook executable
chmod +x .git/hooks/pre-commit

# Example pre-commit hook
#!/bin/sh
npm run lint
npm run test
if [ $? -ne 0 ]; then
  echo "Tests failed. Commit aborted."
  exit 1
fi</code></pre>

    <p><strong>4. Husky (Modern Hook Management)</strong></p>
    <ul>
        <li>• Manages hooks in package.json</li>
        <li>• Shareable across team</li>
        <li>• Works with any package manager</li>
    </ul>

    <p><strong>5. Pre-commit Hook Examples</strong></p>
    <ul>
        <li>• Run linters and tests</li>
        <li>• Check for secrets/API keys</li>
        <li>• Validate commit messages</li>
        <li>• Format code automatically</li>
    </ul>

    <p><strong>6. Server-Side Hooks</strong></p>
    <ul>
        <li>• <strong>pre-receive:</strong> Before accepting push</li>
        <li>• <strong>update:</strong> Per-branch update validation</li>
        <li>• <strong>post-receive:</strong> After successful push</li>
    </ul>
  `,
      commands: [
        { command: 'chmod +x .git/hooks/pre-commit', description: 'Make hook executable' },
        { command: 'ls .git/hooks/', description: 'List available hooks' }
      ]
    },
    'Submodules': {
      content: `
    <p><strong>1. What are Git Submodules?</strong></p>
    <ul>
        <li>• Git repositories embedded within other Git repositories</li>
        <li>• Maintain separate commit history</li>
        <li>• Reference specific commits of external projects</li>
        <li>• Useful for dependencies or shared components</li>
    </ul>

    <p><strong>2. Adding Submodules</strong></p>
    <pre><code>git submodule add https://github.com/user/library.git libs/library</code></pre>

    <p><strong>3. Cloning with Submodules</strong></p>
    <pre><code>git clone --recursive https://github.com/user/main-project.git
# or after cloning:
git submodule update --init --recursive</code></pre>

    <p><strong>4. Working with Submodules</strong></p>
    <ul>
        <li>• <code>git submodule status</code> - Check submodule status</li>
        <li>• <code>git submodule update</code> - Update to latest commit</li>
        <li>• <code>cd libs/library && git checkout v1.0</code> - Change submodule version</li>
        <li>• Commit submodule changes separately</li>
    </ul>

    <p><strong>5. Updating Submodules</strong></p>
    <pre><code># Update all submodules to latest
git submodule update --remote

# Update specific submodule
git submodule update --remote libs/library</code></pre>

    <p><strong>6. Best Practices</strong></p>
    <ul>
        <li>• Use specific tagged versions, not branches</li>
        <li>• Document submodule dependencies</li>
        <li>• Consider using package managers instead</li>
        <li>• Be careful with nested submodules</li>
    </ul>

    <p><strong>7. Removing Submodules</strong></p>
    <pre><code>git submodule deinit libs/library
git rm libs/library
git commit -m "Remove submodule"</code></pre>
  `,
      commands: [
        { command: 'git submodule add <url> <path>', description: 'Add submodule' },
        { command: 'git submodule update --init', description: 'Initialize submodules' },
        { command: 'git submodule status', description: 'Check submodule status' }
      ]
    },
    'Advanced branching': {
      content: `
    <p><strong>1. Branching Strategies</strong></p>
    <ul>
        <li>• <strong>Git Flow:</strong> Complex workflow with multiple branches</li>
        <li>• <strong>GitHub Flow:</strong> Simplified, deployment-focused</li>
        <li>• <strong>Trunk-based:</strong> Direct commits to main with feature flags</li>
        <li>• <strong>Release branching:</strong> Long-lived release branches</li>
    </ul>

    <p><strong>2. Git Flow Workflow</strong></p>
    <ul>
        <li>• <strong>main:</strong> Production-ready code</li>
        <li>• <strong>develop:</strong> Integration branch</li>
        <li>• <strong>feature/*:</strong> Feature development</li>
        <li>• <strong>release/*:</strong> Release preparation</li>
        <li>• <strong>hotfix/*:</strong> Production bug fixes</li>
    </ul>

    <p><strong>3. Advanced Branch Operations</strong></p>
    <ul>
        <li>• <strong>Cherry-pick:</strong> Apply specific commits to current branch</li>
        <li>• <strong>Revert:</strong> Create new commit that undoes changes</li>
        <li>• <strong>Reset:</strong> Move branch pointer to different commit</li>
        <li>• <strong>Reflog:</strong> View reference history</li>
    </ul>

    <p><strong>4. Cherry-picking</strong></p>
    <pre><code># Apply specific commit to current branch
git cherry-pick abc123

# Cherry-pick range of commits
git cherry-pick start-commit..end-commit</code></pre>

    <p><strong>5. Branch Tracking</strong></p>
    <ul>
        <li>• Track remote branches: <code>git checkout --track origin/feature</code></li>
        <li>• Set upstream: <code>git branch --set-upstream-to=origin/main</code></li>
        <li>• View tracking: <code>git branch -vv</code></li>
    </ul>

    <p><strong>6. Branch Cleanup</strong></p>
    <ul>
        <li>• Delete merged branches: <code>git branch --merged | grep -v master | xargs git branch -d</code></li>
        <li>• Prune remote branches: <code>git remote prune origin</code></li>
        <li>• Clean up stale references</li>
    </ul>
  `,
      commands: [
        { command: 'git cherry-pick <commit>', description: 'Apply specific commit' },
        { command: 'git reflog', description: 'View reference history' },
        { command: 'git branch -vv', description: 'View branch tracking info' }
      ]
    }
  },
  'collaboration': {
    'Git workflows': {
      content: `
    <p><strong>1. Popular Git Workflows</strong></p>
    <ul>
        <li>• <strong>Centralized Workflow:</strong> Single main branch, direct pushes</li>
        <li>• <strong>Feature Branch Workflow:</strong> Feature branches with pull requests</li>
        <li>• <strong>Git Flow:</strong> Multiple long-running branches</li>
        <li>• <strong>Forking Workflow:</strong> Each contributor has their own repository</li>
        <li>• <strong>Trunk-based Development:</strong> Frequent small commits to main</li>
    </ul>

    <p><strong>2. Feature Branch Workflow</strong></p>
    <ol>
        <li>Create feature branch: <code>git checkout -b feature/new-feature</code></li>
        <li>Make commits: <code>git add . && git commit -m "Add feature"</code></li>
        <li>Push branch: <code>git push origin feature/new-feature</code></li>
        <li>Create PR on GitHub</li>
        <li>Code review and merge</li>
        <li>Delete branch: <code>git branch -d feature/new-feature</code></li>
    </ol>

    <p><strong>3. Pull Request Best Practices</strong></p>
    <ul>
        <li>• Descriptive title and detailed description</li>
        <li>• Reference related issues</li>
        <li>• Small, focused changes</li>
        <li>• Up-to-date with base branch</li>
        <li>• Passing CI checks</li>
        <li>• Request specific reviewers</li>
    </ul>

    <p><strong>4. Code Review Guidelines</strong></p>
    <ul>
        <li>• Review code, not the person</li>
        <li>• Explain reasoning for suggestions</li>
        <li>• Use "Request changes" for blocking issues</li>
        <li>• Approve when requirements are met</li>
        <li>• Suggest improvements constructively</li>
    </ul>

    <p><strong>5. Branch Naming Conventions</strong></p>
    <ul>
        <li>• <code>feature/description</code> - New features</li>
        <li>• <code>bugfix/issue-description</code> - Bug fixes</li>
        <li>• <code>hotfix/critical-bug</code> - Urgent fixes</li>
        <li>• <code>refactor/component-name</code> - Code refactoring</li>
    </ul>
  `,
      commands: [
        { command: 'git checkout -b feature/name', description: 'Create feature branch' },
        { command: 'git pull --rebase origin main', description: 'Sync with main branch' }
      ]
    },
    'Code reviews': {
      content: `
    <p><strong>1. Code Review Process</strong></p>
    <ul>
        <li>• <strong>Automated Checks:</strong> CI/CD pipelines, linting, tests</li>
        <li>• <strong>Self Review:</strong> Author reviews their own code first</li>
        <li>• <strong>Peer Review:</strong> Team members review the changes</li>
        <li>• <strong>Approval:</strong> Required approvals before merge</li>
        <li>• <strong>Merge:</strong> Code is merged after all requirements met</li>
    </ul>

    <p><strong>2. Reviewer Responsibilities</strong></p>
    <ul>
        <li>• Check code correctness and functionality</li>
        <li>• Verify tests are included and passing</li>
        <li>• Ensure code follows team standards</li>
        <li>• Look for security vulnerabilities</li>
        <li>• Check performance implications</li>
        <li>• Verify documentation is updated</li>
    </ul>

    <p><strong>3. Author Responsibilities</strong></p>
    <ul>
        <li>• Write clear commit messages</li>
        <li>• Provide context in PR description</li>
        <li>• Address reviewer feedback promptly</li>
        <li>• Keep PRs small and focused</li>
        <li>• Test changes thoroughly</li>
        <li>• Update branch with latest changes</li>
    </ul>

    <p><strong>4. GitHub Review Features</strong></p>
    <ul>
        <li>• <strong>Comments:</strong> Line-specific feedback</li>
        <li>• <strong>Suggestions:</strong> Propose code changes directly</li>
        <li>• <strong>Review Status:</strong> Comment, Approve, Request changes</li>
        <li>• <strong>Review Threads:</strong> Organized discussions</li>
        <li>• <strong>Review Rules:</strong> Required reviewers for branches</li>
    </ul>

    <p><strong>5. Best Practices</strong></p>
    <ul>
        <li>• Review small PRs (200-400 lines max)</li>
        <li>• Use checklists for consistency</li>
        <li>• Focus on important issues first</li>
        <li>• Be respectful and constructive</li>
        <li>• Complete reviews within 24-48 hours</li>
        <li>• Follow up on requested changes</li>
    </ul>
  `,
      commands: [
        { command: 'git commit --amend', description: 'Fix commit message' },
        { command: 'git rebase -i HEAD~n', description: 'Clean up commit history' }
      ]
    },
    'Conflict resolution': {
      content: `
    <p><strong>1. Understanding Conflicts</strong></p>
    <ul>
        <li>• Conflicts occur when Git can't automatically merge changes</li>
        <li>• Both branches modified the same lines</li>
        <li>• Git marks conflict areas with special markers</li>
        <li>• Manual resolution required before commit</li>
    </ul>

    <p><strong>2. Conflict Markers</strong></p>
    <pre><code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD
Your changes
=======
Incoming changes
&gt;&gt;&gt;&gt;&gt;&gt;&gt; branch-name</code></pre>

    <p><strong>3. Resolution Steps</strong></p>
    <ol>
        <li>Identify conflicting files: <code>git status</code></li>
        <li>Edit files and remove conflict markers</li>
        <li>Choose which changes to keep or combine them</li>
        <li>Stage resolved files: <code>git add file.txt</code></li>
        <li>Complete merge: <code>git commit</code></li>
    </ol>

    <p><strong>4. Conflict Resolution Tools</strong></p>
    <ul>
        <li>• <code>git mergetool</code> - Launch configured merge tool</li>
        <li>• VS Code has built-in merge conflict resolver</li>
        <li>• Command line editing with search/replace</li>
        <li>• External tools: Meld, KDiff3, Beyond Compare</li>
    </ul>

    <p><strong>5. Prevention Strategies</strong></p>
    <ul>
        <li>• Keep branches short-lived</li>
        <li>• Pull frequently from main branch</li>
        <li>• Communicate with team about changes</li>
        <li>• Use feature flags for conflicting features</li>
        <li>• Break large changes into smaller PRs</li>
    </ul>

    <p><strong>6. Advanced Resolution</strong></p>
    <ul>
        <li>• <code>git merge --abort</code> - Cancel merge and return to pre-merge state</li>
        <li>• <code>git reset --hard HEAD</code> - Discard all changes (use carefully)</li>
        <li>• Cherry-pick specific commits instead of merging</li>
        <li>• Rebase instead of merge for cleaner history</li>
    </ul>
  `,
      commands: [
        { command: 'git status', description: 'Check conflict status' },
        { command: 'git mergetool', description: 'Use merge tool' },
        { command: 'git merge --abort', description: 'Cancel merge' }
      ]
    },
    'Team practices': {
      content: `
    <p><strong>1. Team Communication</strong></p>
    <ul>
        <li>• Clear coding standards and conventions</li>
        <li>• Regular standups and planning meetings</li>
        <li>• Documentation of processes and decisions</li>
        <li>• Open communication channels</li>
        <li>• Code of conduct and respectful interactions</li>
    </ul>

    <p><strong>2. Code Standards</strong></p>
    <ul>
        <li>• Consistent naming conventions</li>
        <li>• Code formatting rules (Prettier, ESLint)</li>
        <li>• Commit message conventions</li>
        <li>• Documentation requirements</li>
        <li>• Testing standards</li>
    </ul>

    <p><strong>3. Commit Guidelines</strong></p>
    <ul>
        <li>• <strong>Type:</strong> feat, fix, docs, style, refactor, test, chore</li>
        <li>• <strong>Scope:</strong> component or file affected</li>
        <li>• <strong>Description:</strong> Clear, concise explanation</li>
        <li>• Example: <code>feat(auth): add user login functionality</code></li>
    </ul>

    <p><strong>4. Branch Protection</strong></p>
    <ul>
        <li>• Require pull requests for merges</li>
        <li>• Require code reviews</li>
        <li>• Require status checks (CI)</li>
        <li>• Include administrators in restrictions</li>
        <li>• Restrict force pushes</li>
    </ul>

    <p><strong>5. Release Management</strong></p>
    <ul>
        <li>• Version numbering (Semantic versioning)</li>
        <li>• Release branches and tags</li>
        <li>• Changelog maintenance</li>
        <li>• Deployment automation</li>
        <li>• Rollback procedures</li>
    </ul>

    <p><strong>6. Continuous Integration</strong></p>
    <ul>
        <li>• Automated testing on every push</li>
        <li>• Code quality checks</li>
        <li>• Security scanning</li>
        <li>• Performance testing</li>
        <li>• Deployment to staging</li>
    </ul>
  `,
      commands: [
        { command: 'npm run lint', description: 'Check code style' },
        { command: 'npm test', description: 'Run test suite' }
      ]
    },
    'Open source contribution': {
      content: `
    <p><strong>1. Contributing to Open Source</strong></p>
    <ul>
        <li>• Find projects that interest you on GitHub</li>
        <li>• Start with small contributions (documentation, bug fixes)</li>
        <li>• Read contribution guidelines and code of conduct</li>
        <li>• Understand the project's workflow and standards</li>
        <li>• Build relationships with maintainers</li>
    </ul>

    <p><strong>2. Fork and Clone Workflow</strong></p>
    <ol>
        <li>Fork the repository on GitHub</li>
        <li>Clone your fork: <code>git clone https://github.com/your-username/repo.git</code></li>
        <li>Add upstream remote: <code>git remote add upstream https://github.com/original/repo.git</code></li>
        <li>Create feature branch: <code>git checkout -b feature-name</code></li>
        <li>Make changes and commit</li>
        <li>Push to your fork: <code>git push origin feature-name</code></li>
        <li>Create pull request on original repository</li>
    </ol>

    <p><strong>3. Staying Updated</strong></p>
    <pre><code># Sync with upstream
git fetch upstream
git checkout main
git merge upstream/main

# Update your fork
git push origin main</code></pre>

    <p><strong>4. Types of Contributions</strong></p>
    <ul>
        <li>• <strong>Code:</strong> Bug fixes, features, refactoring</li>
        <li>• <strong>Documentation:</strong> README, guides, comments</li>
        <li>• <strong>Tests:</strong> Unit tests, integration tests</li>
        <li>• <strong>Issues:</strong> Bug reports, feature requests</li>
        <li>• <strong>Reviews:</strong> Code reviews for other PRs</li>
        <li>• <strong>Design:</strong> UI/UX improvements</li>
    </ul>

    <p><strong>5. Best Practices</strong></p>
    <ul>
        <li>• Read existing issues before creating new ones</li>
        <li>• Follow the project's contribution guidelines</li>
        <li>• Keep PRs focused and well-documented</li>
        <li>• Be responsive to feedback</li>
        <li>• Test your changes thoroughly</li>
        <li>• Update documentation if needed</li>
    </ul>

    <p><strong>6. Getting Help</strong></p>
    <ul>
        <li>• Check project documentation and wiki</li>
        <li>• Search existing issues and discussions</li>
        <li>• Ask questions respectfully</li>
        <li>• Join community chats or forums</li>
        <li>• Attend virtual meetups or conferences</li>
    </ul>
  `,
      commands: [
        { command: 'git remote add upstream <url>', description: 'Add upstream remote' },
        { command: 'git fetch upstream', description: 'Fetch upstream changes' },
        { command: 'git merge upstream/main', description: 'Merge upstream changes' }
      ]
    }
  },
  'tools-config': {
    'Git configuration': {
      content: `
    <p><strong>1. Configuration Levels</strong></p>
    <ul>
        <li>• <strong>System:</strong> <code>/etc/gitconfig</code> - All users on system</li>
        <li>• <strong>Global:</strong> <code>~/.gitconfig</code> - Current user on system</li>
        <li>• <strong>Local:</strong> <code>.git/config</code> - Current repository</li>
        <li>• <strong>Worktree:</strong> <code>.git/config.worktree</code> - Current worktree</li>
    </ul>

    <p><strong>2. Basic Configuration</strong></p>
    <pre><code># Set user identity
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Set default editor
git config --global core.editor "code --wait"

# Set default branch name
git config --global init.defaultBranch main</code></pre>

    <p><strong>3. Aliases</strong></p>
    <pre><code># Short aliases
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status

# Complex aliases
git config --global alias.lg "log --oneline --graph --decorate"
git config --global alias.unstage "reset HEAD --"
git config --global alias.last "log -1 HEAD"</code></pre>

    <p><strong>4. Merge and Diff Tools</strong></p>
    <pre><code># Set merge tool
git config --global merge.tool vscode
git config --global mergetool.vscode.cmd "code --wait \$MERGED"

# Set diff tool
git config --global diff.tool vscode
git config --global difftool.vscode.cmd "code --wait --diff \$LOCAL \$REMOTE"</code></pre>

    <p><strong>5. Push and Pull Behavior</strong></p>
    <pre><code># Set default push behavior
git config --global push.default simple

# Set pull to rebase instead of merge
git config --global pull.rebase true

# Auto setup remote tracking
git config --global branch.autosetuprebase always</code></pre>

    <p><strong>6. Viewing Configuration</strong></p>
    <pre><code># View all config
git config --list

# View global config
git config --global --list

# View specific setting
git config user.name</code></pre>
  `,
      commands: [
        { command: 'git config --global user.name "Name"', description: 'Set global username' },
        { command: 'git config --global user.email "email"', description: 'Set global email' },
        { command: 'git config --global --list', description: 'View all global config' }
      ]
    },
    'SSH keys': {
      content: `
    <p><strong>1. Why Use SSH?</strong></p>
    <ul>
        <li>• More secure than HTTPS authentication</li>
        <li>• No need to enter username/password repeatedly</li>
        <li>• Required for some Git operations</li>
        <li>• Standard for server-to-server authentication</li>
    </ul>

    <p><strong>2. Generating SSH Keys</strong></p>
    <pre><code># Generate Ed25519 key (recommended)
ssh-keygen -t ed25519 -C "your.email@example.com"

# Or RSA (legacy)
ssh-keygen -t rsa -b 4096 -C "your.email@example.com"

# Press Enter for default location and empty passphrase</code></pre>

    <p><strong>3. Adding SSH Key to SSH Agent</strong></p>
    <pre><code># Start SSH agent
eval "$(ssh-agent -s)"

# Add key to agent
ssh-add ~/.ssh/id_ed25519

# For automatic loading (add to ~/.bashrc or ~/.zshrc)
echo 'eval "$(ssh-agent -s)"' >> ~/.bashrc
echo 'ssh-add ~/.ssh/id_ed25519' >> ~/.bashrc</code></pre>

    <p><strong>4. Adding SSH Key to GitHub</strong></p>
    <ol>
        <li>Copy public key: <code>cat ~/.ssh/id_ed25519.pub</code></li>
        <li>Go to GitHub Settings → SSH and GPG keys</li>
        <li>Click "New SSH key"</li>
        <li>Paste key and give it a title</li>
        <li>Click "Add SSH key"</li>
    </ol>

    <p><strong>5. Testing SSH Connection</strong></p>
    <pre><code># Test connection to GitHub
ssh -T git@github.com

# Should see: "Hi username! You've successfully authenticated..."</code></pre>

    <p><strong>6. Using SSH with Git</strong></p>
    <pre><code># Clone with SSH
git clone git@github.com:username/repo.git

# Change existing remote to SSH
git remote set-url origin git@github.com:username/repo.git</code></pre>

    <p><strong>7. SSH Config File</strong></p>
    <pre><code># ~/.ssh/config
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519</code></pre>

    <p><strong>8. Multiple SSH Keys</strong></p>
    <pre><code># Generate different keys for different accounts
ssh-keygen -t ed25519 -C "work@example.com" -f ~/.ssh/id_ed25519_work

# Add to SSH config
Host github-work
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_work</code></pre>
  `,
      commands: [
        { command: 'ssh-keygen -t ed25519 -C "email"', description: 'Generate SSH key' },
        { command: 'ssh-add ~/.ssh/id_ed25519', description: 'Add key to SSH agent' },
        { command: 'ssh -T git@github.com', description: 'Test GitHub connection' }
      ]
    },
    'GitHub CLI': {
      content: `
    <p><strong>1. What is GitHub CLI?</strong></p>
    <ul>
        <li>• Command-line tool for GitHub operations</li>
        <li>• Work with issues, pull requests, releases</li>
        <li>• Automate GitHub workflows</li>
        <li>• Available for Windows, macOS, Linux</li>
    </ul>

    <p><strong>2. Installation</strong></p>
    <pre><code># macOS with Homebrew
brew install gh

# Ubuntu/Debian
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh

# Windows with winget
winget install --id GitHub.cli</code></pre>

    <p><strong>3. Authentication</strong></p>
    <pre><code># Login to GitHub
gh auth login

# Choose authentication method (GitHub.com, SSH, token)
# Follow interactive prompts</code></pre>

    <p><strong>4. Repository Operations</strong></p>
    <pre><code># Clone repository
gh repo clone owner/repo

# Create new repository
gh repo create my-project --public

# View repository info
gh repo view owner/repo

# Fork repository
gh repo fork owner/repo</code></pre>

    <p><strong>5. Issue Management</strong></p>
    <pre><code># List issues
gh issue list

# Create issue
gh issue create --title "Bug title" --body "Description"

# View specific issue
gh issue view 123

# Close issue
gh issue close 123</code></pre>

    <p><strong>6. Pull Request Operations</strong></p>
    <pre><code># List PRs
gh pr list

# Create PR
gh pr create --title "Feature title" --body "Description"

# Checkout PR locally
gh pr checkout 123

# Merge PR
gh pr merge 123</code></pre>

    <p><strong>7. Advanced Features</strong></p>
    <ul>
        <li>• <code>gh workflow run</code> - Trigger GitHub Actions</li>
        <li>• <code>gh release create</code> - Create releases</li>
        <li>• <code>gh gist create</code> - Create gists</li>
        <li>• <code>gh alias set</code> - Create custom commands</li>
    </ul>
  `,
      commands: [
        { command: 'gh auth login', description: 'Authenticate with GitHub' },
        { command: 'gh repo clone owner/repo', description: 'Clone repository' },
        { command: 'gh pr create', description: 'Create pull request' }
      ]
    },
    'IDE integrations': {
      content: `
    <p><strong>1. VS Code Git Integration</strong></p>
    <ul>
        <li>• Built-in Git support with visual interface</li>
        <li>• Source control panel (Ctrl+Shift+G)</li>
        <li>• Diff viewer and merge conflict resolver</li>
        <li>• GitLens extension for advanced features</li>
        <li>• Integrated terminal for Git commands</li>
    </ul>

    <p><strong>2. VS Code Git Features</strong></p>
    <ul>
        <li>• Stage/unstage files with checkboxes</li>
        <li>• View diff inline or side-by-side</li>
        <li>• Commit with message input</li>
        <li>• Branch switching and creation</li>
        <li>• Push/pull with one click</li>
        <li>• Git history visualization</li>
    </ul>

    <p><strong>3. GitLens Extension</strong></p>
    <ul>
        <li>• Blame annotations in editor</li>
        <li>• File history and line history</li>
        <li>• Commit search and filtering</li>
        <li>• Branch comparison</li>
        <li>• Git commands in command palette</li>
    </ul>

    <p><strong>4. Other Popular IDEs</strong></p>
    <ul>
        <li>• <strong>IntelliJ IDEA:</strong> Built-in Git, advanced merge tools</li>
        <li>• <strong>WebStorm:</strong> Full Git integration, GitHub sync</li>
        <li>• <strong>Atom:</strong> GitHub package, Git integration</li>
        <li>• <strong>Sublime Text:</strong> GitGutter, Git package</li>
        <li>• <strong>Vim/Neovim:</strong> Fugitive plugin, extensive Git support</li>
    </ul>

    <p><strong>5. Git GUI Tools</strong></p>
    <ul>
        <li>• <strong>GitKraken:</strong> Cross-platform, intuitive interface</li>
        <li>• <strong>SourceTree:</strong> Atlassian tool, free for small teams</li>
        <li>• <strong>GitHub Desktop:</strong> Official GitHub client</li>
        <li>• <strong>TortoiseGit:</strong> Windows shell integration</li>
        <li>• <strong>SmartGit:</strong> Commercial tool with advanced features</li>
    </ul>

    <p><strong>6. Terminal Integration</strong></p>
    <ul>
        <li>• Zsh with git plugin (oh-my-zsh)</li>
        <li>• Fish shell with git integration</li>
        <li>• Bash with git completion</li>
        <li>• PowerShell with posh-git</li>
        <li>• Custom prompts showing git status</li>
    </ul>
  `,
      commands: [
        { command: 'code .', description: 'Open current directory in VS Code' },
        { command: 'git config --global core.editor "code --wait"', description: 'Set VS Code as default editor' }
      ]
    },
    'Productivity tips': {
      content: `
    <p><strong>1. Efficient Git Workflow</strong></p>
    <ul>
        <li>• Use aliases for common commands</li>
        <li>• Keep commits small and focused</li>
        <li>• Write meaningful commit messages</li>
        <li>• Use interactive rebase to clean history</li>
        <li>• Pull with rebase to avoid merge commits</li>
    </ul>

    <p><strong>2. Useful Aliases</strong></p>
    <pre><code># Add these to ~/.gitconfig
[alias]
    co = checkout
    ci = commit
    st = status
    br = branch
    lg = log --oneline --graph --decorate
    unstage = reset HEAD --
    last = log -1 HEAD
    hist = log --pretty=format:\"%h %ad | %s%d [%an]\" --graph --date=short</code></pre>

    <p><strong>3. Commit Message Conventions</strong></p>
    <ul>
        <li>• Use imperative mood: "Add feature" not "Added feature"</li>
        <li>• Keep first line under 50 characters</li>
        <li>• Add detailed description for complex changes</li>
        <li>• Reference issue numbers: "Fix #123"</li>
        <li>• Use conventional commits: "feat:", "fix:", "docs:"</li>
    </ul>

    <p><strong>4. Branch Management</strong></p>
    <ul>
        <li>• Use descriptive branch names</li>
        <li>• Delete merged branches regularly</li>
        <li>• Keep main branch clean and deployable</li>
        <li>• Use feature flags for incomplete work</li>
        <li>• Rebase feature branches before merging</li>
    </ul>

    <p><strong>5. Git Hooks for Productivity</strong></p>
    <pre><code>#!/bin/sh
# .git/hooks/pre-commit
npm run lint
npm run test
if [ $? -ne 0 ]; then
    echo "Pre-commit checks failed"
    exit 1
fi</code></pre>

    <p><strong>6. Keyboard Shortcuts</strong></p>
    <ul>
        <li>• VS Code: Ctrl+Shift+G (Source Control)</li>
        <li>• Terminal: Ctrl+R (reverse search)</li>
        <li>• Git log navigation: j/k for up/down</li>
        <li>• Vim: :Gstatus, :Gcommit, :Gpush</li>
    </ul>

    <p><strong>7. Automation Tools</strong></p>
    <ul>
        <li>• <strong>Husky:</strong> Git hooks management</li>
        <li>• <strong>Commitizen:</strong> Standardized commit messages</li>
        <li>• <strong>Git Flow:</strong> Branching workflow automation</li>
        <li>• <strong>Prettier:</strong> Code formatting</li>
        <li>• <strong>Lint-staged:</strong> Run linters on staged files</li>
    </ul>

    <p><strong>8. Learning Resources</strong></p>
    <ul>
        <li>• Pro Git book (free online)</li>
        <li>• Git documentation</li>
        <li>• GitHub Learning Lab</li>
        <li>• Interactive tutorials</li>
        <li>• Practice repositories</li>
    </ul>
  `,
      commands: [
        { command: 'git config --global alias.lg "log --oneline --graph"', description: 'Create useful alias' },
        { command: 'git commit -m "feat: add new feature"', description: 'Use conventional commit' }
      ]
    }
  }
}

export default function Documentation() {
  const [selectedSection, setSelectedSection] = useState<string>('getting-started');
  const [selectedChapter, setSelectedChapter] = useState<string>('What is Git?');

  const currentSection = documentationSections.find(s => s.id === selectedSection);
  const currentContent = chapterContent[selectedSection]?.[selectedChapter];

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold">
            Git & GitHub{" "}
            <span className="bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
              Documentation
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive guide to mastering Git and GitHub - from basics to advanced techniques
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Documentation</CardTitle>
                <CardDescription>Choose a section to learn</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[600px]">
                  <div className="space-y-1 p-4">
                    {documentationSections.map((section) => {
                      const Icon = section.icon;
                      const isActive = selectedSection === section.id;

                      return (
                        <div key={section.id}>
                          <Button
                            variant={isActive ? "secondary" : "ghost"}
                            className="w-full justify-start text-left h-auto p-3"
                            onClick={() => {
                              setSelectedSection(section.id);
                              setSelectedChapter(section.chapters[0]);
                            }}
                          >
                            <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
                            <div className="flex-1 text-left">
                              <div className="font-medium">{section.title}</div>
                              <div className="text-xs text-muted-foreground">
                                {section.chapters.length} chapters
                              </div>
                            </div>
                          </Button>

                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="ml-7 mt-1 space-y-1"
                            >
                              {section.chapters.map((chapter) => (
                                <Button
                                  key={chapter}
                                  variant={selectedChapter === chapter ? "default" : "ghost"}
                                  size="sm"
                                  className="w-full justify-start text-xs"
                                  onClick={() => setSelectedChapter(chapter)}
                                >
                                  <ChevronRight className="h-3 w-3 mr-2" />
                                  {chapter}
                                </Button>
                              ))}
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <Card className="min-h-[600px]">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  {currentSection && (
                    <>
                      <span>{currentSection.title}</span>
                      <ChevronRight className="h-4 w-4" />
                      <span>{selectedChapter}</span>
                    </>
                  )}
                </div>
                <CardTitle className="text-2xl">{selectedChapter}</CardTitle>
                {currentSection && (
                  <CardDescription className="flex items-center gap-2">
                    <currentSection.icon className="h-4 w-4" />
                    {currentSection.description}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                {currentContent ? (
                  <>
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: currentContent.content
                            .replace(/\n\n/g, '</p><p>')
                            .replace(/^/, '<p>')
                            .replace(/$/, '</p>')
                            .replace(/## (.*?)<\/p>/g, '<h2>$1</h2>')
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/`(.*?)`/g, '<code>$1</code>')
                        }}
                      />
                    </div>

                    {currentContent.commands && (
                      <>
                        <Separator />
                        <div>
                          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Terminal className="h-5 w-5" />
                            Common Commands
                          </h3>
                          <div className="space-y-3">
                            {currentContent.commands.map((cmd, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                              >
                                <div className="flex-1">
                                  <code className="text-sm font-mono bg-background px-2 py-1 rounded">
                                    {cmd.command}
                                  </code>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {cmd.description}
                                  </p>
                                </div>
                                <Button variant="ghost" size="sm">
                                  <Code className="h-4 w-4" />
                                </Button>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12 space-y-4">
                    <BookOpen className="h-16 w-16 mx-auto text-muted-foreground" />
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">Content Coming Soon</h3>
                      <p className="text-muted-foreground">
                        This chapter is being written. Check back soon for detailed content!
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Start Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto mt-12"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Quick Start Guide
              </CardTitle>
              <CardDescription>
                Essential Git commands to get you started immediately
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">First Time Setup</h4>
                  <div className="space-y-2 text-sm">
                    <code className="bg-muted px-2 py-1 rounded">git config --global user.name Your Name</code>
                    <code className="bg-muted px-2 py-1 rounded">git config --global user.email you@example.com</code>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Daily Workflow</h4>
                  <div className="space-y-2 text-sm">
                    <code className="bg-muted px-2 py-1 rounded">git add .</code>
                    <code className="bg-muted px-2 py-1 rounded">git commit -m message</code>
                    <code className="bg-muted px-2 py-1 rounded">git push origin main</code>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}