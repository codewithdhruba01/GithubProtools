# GitHub Tools Pro

A comprehensive suite of GitHub tools for developers, built with Next.js and modern web technologies. Analyze followers, design stunning profiles, compare statistics, and master Git with our comprehensive documentation.

## 🚀 Features

### GitHub Analytics
- **Follower Counter**: Real-time GitHub follower tracking with detailed insights
- **Following Analysis**: Discover who you're following that doesn't follow back
- **Profile Comparison**: Compare GitHub profiles side-by-side with improvement suggestions

### Profile Tools
- **README Designer**: Create stunning GitHub profile READMEs with:
  - Skills icons and technology badges
  - Social media links and contact information
  - GitHub statistics and contribution widgets
  - Live preview and downloadable markdown files

### Learning Resources
- **Comprehensive Documentation**: Complete Git and GitHub learning resources
- **Chapter-wise Organization**: From basics to advanced techniques
- **Interactive Examples**: Practical code examples and commands
- **FAQ Section**: Answers to common questions

### User Experience
- **Modern Design**: Beautiful, responsive interface with smooth animations
- **Dark/Light Mode**: Complete theme system with system preference detection
- **Mobile Optimized**: Perfect experience across all devices
- **Fast Performance**: Optimized for speed and reliability

## 🛠️ Technology Stack

### Frontend
- **Next.js 13**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Modern component library
- **Framer Motion**: Smooth animations and transitions

### APIs & Services
- **GitHub API**: Real-time data fetching
- **Vercel**: Deployment and hosting
- **Static Export**: Optimized for performance

### Development Tools
- **ESLint**: Code linting and quality
- **Prettier**: Code formatting
- **Git**: Version control
- **VS Code**: Recommended development environment

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https: https://github.com/codewithdhruba01/GithubProtools.git
   cd GithubProtools
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Static Export

```bash
# Generate static files
npm run build

# Files will be in the 'out' directory
```

## Usage Guide

### Follower Counter
1. Navigate to the Follower Counter page
2. Enter any GitHub username
3. View real-time follower statistics and profile insights
4. Analyze follower-to-following ratios and account metrics

### README Designer
1. Go to the README Designer page
2. Fill in your profile information (name, title, bio, etc.)
3. Select your skills from the available technology icons
4. Configure social media links and contact information
5. Enable GitHub statistics widgets and trophies
6. Preview your README in real-time
7. Download the generated markdown file
8. Upload to a repository with your GitHub username

### Following Analysis
1. Visit the Following Analysis page
2. Enter your GitHub username
3. View users you follow who don't follow back
4. See detailed statistics and user profiles
5. Make informed decisions about your network

### Profile Compare
1. Access the Profile Compare page
2. Enter two GitHub usernames to compare
3. View detailed comparison metrics
4. Get personalized improvement suggestions
5. Understand relative profile strengths

### Documentation
1. Browse the comprehensive Git/GitHub documentation
2. Navigate through chapters organized by skill level
3. Follow along with practical examples
4. Use the search functionality to find specific topics


## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for local development:

```env
# Optional: GitHub Personal Access Token for higher rate limits
GITHUB_TOKEN=your_github_token_here

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

### Customization

#### Theme Configuration
Modify `tailwind.config.ts` to customize colors, fonts, and spacing:

```typescript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
      },
    },
  },
}
```

## 🔒 Privacy & Security

### Data Handling
- **No Data Storage**: All data is fetched in real-time from GitHub's public API
- **Client-Side Processing**: All analysis happens in your browser
- **No Tracking**: Minimal analytics, no personal data collection
- **Secure Connections**: HTTPS everywhere

### API Usage
- **Public Data Only**: Only accesses publicly available GitHub information
- **Rate Limiting**: Respects GitHub API rate limits
- **No Authentication Required**: Works without GitHub login
- **Transparent**: All API calls are visible in browser developer tools

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Getting Started
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add tests for new functionality
- Update documentation as needed
- Ensure all tests pass before submitting

### Types of Contributions
- **Bug Fixes**: Report and fix issues
- **Feature Requests**: Suggest new functionality
- **Documentation**: Improve guides and examples
- **Design**: UI/UX improvements
- **Performance**: Optimization improvements

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

### Open Source Libraries
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide React](https://lucide.dev/) - Icon library

### Inspiration
- GitHub's own tools and interfaces
- Modern web design trends
- Developer community feedback
- Open source project best practices

### Contributors
Also contribute this project

## 📞 Support

### Getting Help
- **Documentation**: Check our comprehensive docs
- **FAQ**: Common questions and answers
- **Issues**: Report bugs on GitHub
- **Discussions**: Community discussions and feature requests

---

<div align="center">

**Built with ❤️ by Dhrubaraj Pati for developers**

[Website](https://codewithdhruba.netlify.app/) • [GitHub](https://github.com/codewithdhruba01) • [Twitter](https://x.com/codewithdhruba)

</div>
