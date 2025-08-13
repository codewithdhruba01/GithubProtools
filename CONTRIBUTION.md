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

### Getting Help
- **Documentation**: Check our comprehensive docs
- **FAQ**: Common questions and answers
- **Issues**: Report bugs on GitHub
- **Discussions**: Community discussions and feature requests

### Contributors
Also contribute this project

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
