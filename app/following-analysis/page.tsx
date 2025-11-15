"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Users, 
  UserMinus, 
  Search, 
  ExternalLink,
  TrendingDown,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name?: string;
  bio?: string;
  followers: number;
  following: number;
  public_repos: number;
}

export default function FollowingAnalysis() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [notFollowingBack, setNotFollowingBack] = useState<GitHubUser[]>([]);
  const [stats, setStats] = useState({
    following: 0,
    followers: 0,
    notFollowingBack: 0
  });

  const analyzeFollowing = async () => {
    if (!username.trim()) {
      toast.error('Please enter a GitHub username');
      return;
    }

    setLoading(true);
    setNotFollowingBack([]);

    try {
      // Get user info
      const userResponse = await fetch(`https://api.github.com/users/${username.trim()}`);
      if (!userResponse.ok) {
        throw new Error('User not found');
      }
      const userData = await userResponse.json();

      // Get following list (limited to first 100 for demo)
      const followingResponse = await fetch(`https://api.github.com/users/${username.trim()}/following?per_page=100`);
      if (!followingResponse.ok) {
        throw new Error('Failed to fetch following list');
      }
      const followingList = await followingResponse.json();

      // Get followers list (limited to first 100 for demo)
      const followersResponse = await fetch(`https://api.github.com/users/${username.trim()}/followers?per_page=100`);
      if (!followersResponse.ok) {
        throw new Error('Failed to fetch followers list');
      }
      const followersList = await followersResponse.json();

      // Create a set of follower usernames for quick lookup
      const followersSet = new Set(followersList.map((user: GitHubUser) => user.login));

      // Find users not following back
      const notFollowingBackList = followingList.filter((user: GitHubUser) => !followersSet.has(user.login));

      setNotFollowingBack(notFollowingBackList);
      setStats({
        following: followingList.length,
        followers: followersList.length,
        notFollowingBack: notFollowingBackList.length
      });

      toast.success('Analysis completed successfully!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    analyzeFollowing();
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
          <h1 className="text-4xl md:text-5xl font-bold font-sans">
            Following{" "}
            <span className="bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
              Analysis
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover who you're following that doesn't follow you back on GitHub
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-md mx-auto mb-12"
        >
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter GitHub username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="flex-1"
              disabled={loading}
            />
            <Button type="submit" disabled={loading} className="px-6">
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {[...Array(3)].map((_, i) => (
                  <Card key={i}>
                    <CardContent className="pt-6">
                      <div className="text-center space-y-2">
                        <Skeleton className="h-8 w-8 mx-auto" />
                        <Skeleton className="h-6 w-16 mx-auto" />
                        <Skeleton className="h-4 w-20 mx-auto" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Card className="max-w-4xl mx-auto">
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-48" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {!loading && stats.following > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="text-center hover:shadow-lg transition-all duration-300">
                    <CardContent className="pt-6">
                      <Users className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                      <div className="text-2xl font-bold">{stats.following}</div>
                      <div className="text-sm text-muted-foreground">Following</div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="text-center hover:shadow-lg transition-all duration-300">
                    <CardContent className="pt-6">
                      <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                      <div className="text-2xl font-bold">{stats.followers}</div>
                      <div className="text-sm text-muted-foreground">Followers</div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="text-center hover:shadow-lg transition-all duration-300">
                    <CardContent className="pt-6">
                      <UserMinus className="h-8 w-8 mx-auto mb-2 text-red-500" />
                      <div className="text-2xl font-bold">{stats.notFollowingBack}</div>
                      <div className="text-sm text-muted-foreground">Not Following Back</div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Results */}
              <Card className="max-w-4xl mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-red-500" />
                    Users Not Following You Back
                    <Badge variant="secondary">{notFollowingBack.length}</Badge>
                  </CardTitle>
                  <CardDescription>
                    {notFollowingBack.length > 0 
                      ? `Found ${notFollowingBack.length} users who don't follow you back`
                      : "Great! Everyone you follow also follows you back"
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {notFollowingBack.length > 0 ? (
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-3">
                        {notFollowingBack.map((user, index) => (
                          <motion.div
                            key={user.login}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:border-primary/20 transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src={user.avatar_url} alt={user.login} />
                                <AvatarFallback>{user.login.charAt(0).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{user.name || user.login}</div>
                                <div className="text-sm text-muted-foreground">@{user.login}</div>
                                {user.bio && (
                                  <div className="text-xs text-muted-foreground mt-1 max-w-xs truncate">
                                    {user.bio}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">
                                {user.followers} followers
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                asChild
                              >
                                <a
                                  href={user.html_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </ScrollArea>
                  ) : (
                    <div className="text-center py-12 space-y-4">
                      <CheckCircle className="h-16 w-16 mx-auto text-green-500" />
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Perfect Mutual Following!</h3>
                        <p className="text-muted-foreground">
                          Everyone you follow also follows you back. You have great engagement!
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto mt-12"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-sans font-bold">
                <AlertCircle className="h-5 w-5" />
                How It Works
              </CardTitle>
              <CardDescription>
                Understanding the following analysis tool
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center space-y-2">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto font-bold">1</div>
                  <h4 className="font-semibold">Fetch Data</h4>
                  <p className="text-sm text-muted-foreground">We get your following and followers lists from GitHub API</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto font-bold">2</div>
                  <h4 className="font-semibold">Compare Lists</h4>
                  <p className="text-sm text-muted-foreground">Compare who you follow vs who follows you back</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto font-bold">3</div>
                  <h4 className="font-semibold">Show Results</h4>
                  <p className="text-sm text-muted-foreground">Display users who don't follow you back with their profiles</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Important Notes
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Analysis is limited to the first 100 users in each list for performance</li>
                  <li>• Results are based on public GitHub data only</li>
                  <li>• Private profiles may not show complete information</li>
                  <li>• Tool respects GitHub API rate limits</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}