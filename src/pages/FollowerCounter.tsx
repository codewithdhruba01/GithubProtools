

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Users, 
  UserPlus, 
  GitFork, 
  Star, 
  MapPin, 
  Link as LinkIcon,
  Calendar,
  TrendingUp,
  Activity,
  Search,
  ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  location: string;
  blog: string;
  followers: number;
  following: number;
  public_repos: number;
  created_at: string;
  updated_at: string;
}

export default function FollowerCounter() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUserData = async () => {
    if (!username.trim()) {
      toast.error('Please enter a GitHub username');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`https://api.github.com/users/${username.trim()}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('User not found');
        }
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      setUserData(data);
      toast.success('User data loaded successfully!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUserData();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const stats = userData ? [
    { icon: Users, label: "Followers", value: userData.followers.toLocaleString(), color: "text-blue-500" },
    { icon: UserPlus, label: "Following", value: userData.following.toLocaleString(), color: "text-green-500" },
    { icon: GitFork, label: "Public Repos", value: userData.public_repos.toLocaleString(), color: "text-purple-500" },
    { icon: Activity, label: "Account Age", value: `${Math.floor((Date.now() - new Date(userData.created_at).getTime()) / (1000 * 60 * 60 * 24 * 365))} years`, color: "text-orange-500" }
  ] : [];

  return (
    <div className="min-h-screen pt-20 pb-12 bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl leading-tight font-medium text-foreground tracking-tight mb-6">
            GitHub Follower Counter
          </h1>
          <p className="text-base text-foreground/60 leading-relaxed mb-8 max-w-md mx-auto">
            Track your GitHub followers in real-time and get detailed insights about your profile
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-lg mx-auto mb-12"
        >
          <form onSubmit={handleSubmit} className="relative flex items-center w-full">
            <input
              type="text"
              placeholder="Enter GitHub Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#1a1b1e]/80 border border-border/50 text-foreground placeholder:text-muted-foreground px-6 h-14 rounded-full outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none focus:border-border/50 transition-all pr-16"
              disabled={loading}
            />
            <button 
              type="submit" 
              disabled={loading} 
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-b from-white to-gray-300 text-black flex items-center justify-center shadow-sm hover:opacity-90 transition-opacity"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black border-t-transparent" />
              ) : (
                <ArrowRight className="h-5 w-5" strokeWidth={2} />
              )}
            </button>
          </form>
        </motion.div>

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <Card className="max-w-4xl mx-auto">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-20 w-20 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-48" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="text-center space-y-2">
                        <Skeleton className="h-8 w-8 mx-auto" />
                        <Skeleton className="h-6 w-16 mx-auto" />
                        <Skeleton className="h-4 w-20 mx-auto" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {userData && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Profile Card */}
              <Card className="max-w-4xl mx-auto">
                <CardHeader>
                  <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      src={userData.avatar_url}
                      alt={userData.name}
                      className="w-24 h-24 rounded-full border-4 border-primary/20"
                    />
                    <div className="text-center md:text-left flex-1">
                      <CardTitle className="text-2xl">{userData.name || userData.login}</CardTitle>
                      <CardDescription className="text-base">@{userData.login}</CardDescription>
                      {userData.bio && (
                        <p className="mt-2 text-muted-foreground">{userData.bio}</p>
                      )}
                      <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-sm text-muted-foreground">
                        {userData.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {userData.location}
                          </div>
                        )}
                        {userData.blog && (
                          <div className="flex items-center gap-1">
                            <LinkIcon className="h-4 w-4" />
                            <a href={userData.blog} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                              Website
                            </a>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Joined {formatDate(userData.created_at)}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <Card className="text-center hover:shadow-lg transition-all duration-300">
                        <CardContent className="pt-6">
                          <Icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                          <div className="text-2xl font-bold">{stat.value}</div>
                          <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              {/* Additional Info */}
              <Card className="max-w-4xl mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-[#029121]" />
                    Profile Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Account Status</h4>
                      <div className="space-y-2">
                        <Badge variant="secondary">
                          Active Profile
                        </Badge>
                        {userData.followers > 100 && (
                          <Badge variant="secondary">
                            Popular Developer
                          </Badge>
                        )}
                        {userData.public_repos > 50 && (
                          <Badge variant="secondary">
                            Prolific Contributor
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Profile Metrics</h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div>Follower to Following Ratio: {userData.following > 0 ? (userData.followers / userData.following).toFixed(2) : 'N/A'}</div>
                        <div>Repos per Year: {Math.floor(userData.public_repos / Math.max(1, Math.floor((Date.now() - new Date(userData.created_at).getTime()) / (1000 * 60 * 60 * 24 * 365))))}</div>
                        <div>Last Updated: {formatDate(userData.updated_at)}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Usage Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto mt-20 border-t border-b border-border py-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <div className="flex flex-col text-left">
              <span className="text-sm font-medium text-muted-foreground mb-5">01</span>
              <h3 className="text-[15px] font-bold text-foreground mb-2">Enter Username</h3>
              <p className="text-muted-foreground leading-relaxed text-[13px] pr-4">
                Type any GitHub username in the search box to begin tracking.
              </p>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-medium text-muted-foreground mb-5">02</span>
              <h3 className="text-[15px] font-bold text-foreground mb-2">View Analytics</h3>
              <p className="text-muted-foreground leading-relaxed text-[13px] pr-4">
                Get real-time follower count and deep insights into their profile.
              </p>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-medium text-muted-foreground mb-5">03</span>
              <h3 className="text-[15px] font-bold text-foreground mb-2">Track Progress</h3>
              <p className="text-muted-foreground leading-relaxed text-[13px] pr-4">
                Monitor growth and engagement metrics over time effectively.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}