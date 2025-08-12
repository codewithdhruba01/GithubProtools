"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  GitFork, 
  Star, 
  Calendar,
  TrendingUp,
  TrendingDown,
  Equal,
  Search,
  ArrowRightLeft,
  Award,
  Activity
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

interface ComparisonResult {
  metric: string;
  user1Value: number;
  user2Value: number;
  winner: 'user1' | 'user2' | 'tie';
  icon: React.ElementType;
  suggestion?: string;
}

export default function ProfileCompare() {
  const [username1, setUsername1] = useState('');
  const [username2, setUsername2] = useState('');
  const [user1Data, setUser1Data] = useState<GitHubUser | null>(null);
  const [user2Data, setUser2Data] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [comparisonResults, setComparisonResults] = useState<ComparisonResult[]>([]);

  const fetchUserData = async (username: string): Promise<GitHubUser> => {
    const response = await fetch(`https://api.github.com/users/${username.trim()}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`User "${username}" not found`);
      }
      throw new Error(`Failed to fetch data for ${username}`);
    }
    return response.json();
  };

  const compareProfiles = async () => {
    if (!username1.trim() || !username2.trim()) {
      toast.error('Please enter both GitHub usernames');
      return;
    }

    if (username1.trim() === username2.trim()) {
      toast.error('Please enter different usernames to compare');
      return;
    }

    setLoading(true);

    try {
      const [user1, user2] = await Promise.all([
        fetchUserData(username1),
        fetchUserData(username2)
      ]);

      setUser1Data(user1);
      setUser2Data(user2);

      const results: ComparisonResult[] = [
        {
          metric: 'Followers',
          user1Value: user1.followers,
          user2Value: user2.followers,
          winner: user1.followers > user2.followers ? 'user1' : user2.followers > user1.followers ? 'user2' : 'tie',
          icon: Users,
          suggestion: user1.followers < user2.followers ? 'Consider engaging more with the community to gain followers' : undefined
        },
        {
          metric: 'Following',
          user1Value: user1.following,
          user2Value: user2.following,
          winner: user1.following > user2.following ? 'user1' : user2.following > user1.following ? 'user2' : 'tie',
          icon: Users
        },
        {
          metric: 'Public Repositories',
          user1Value: user1.public_repos,
          user2Value: user2.public_repos,
          winner: user1.public_repos > user2.public_repos ? 'user1' : user2.public_repos > user1.public_repos ? 'user2' : 'tie',
          icon: GitFork,
          suggestion: user1.public_repos < user2.public_repos ? 'Consider creating more public repositories to showcase your work' : undefined
        },
        {
          metric: 'Account Age (days)',
          user1Value: Math.floor((Date.now() - new Date(user1.created_at).getTime()) / (1000 * 60 * 60 * 24)),
          user2Value: Math.floor((Date.now() - new Date(user2.created_at).getTime()) / (1000 * 60 * 60 * 24)),
          winner: Math.floor((Date.now() - new Date(user1.created_at).getTime()) / (1000 * 60 * 60 * 24)) > Math.floor((Date.now() - new Date(user2.created_at).getTime()) / (1000 * 60 * 60 * 24)) ? 'user1' : Math.floor((Date.now() - new Date(user2.created_at).getTime()) / (1000 * 60 * 60 * 24)) > Math.floor((Date.now() - new Date(user1.created_at).getTime()) / (1000 * 60 * 60 * 24)) ? 'user2' : 'tie',
          icon: Calendar
        }
      ];

      setComparisonResults(results);
      toast.success('Comparison completed successfully!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      toast.error(errorMessage);
      setUser1Data(null);
      setUser2Data(null);
      setComparisonResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    compareProfiles();
  };

  const getWinnerIcon = (winner: 'user1' | 'user2' | 'tie') => {
    switch (winner) {
      case 'user1':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'user2':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Equal className="h-4 w-4 text-yellow-500" />;
    }
  };

  const calculateOverallScore = (userData: GitHubUser): number => {
    if (!userData) return 0;
    
    const followerScore = Math.min(userData.followers / 10, 50); // Max 50 points
    const repoScore = Math.min(userData.public_repos * 2, 30); // Max 30 points
    const followingRatio = userData.following > 0 ? userData.followers / userData.following : 0;
    const ratioScore = Math.min(followingRatio * 5, 20); // Max 20 points
    
    return Math.round(followerScore + repoScore + ratioScore);
  };

  const user1Score = user1Data ? calculateOverallScore(user1Data) : 0;
  const user2Score = user2Data ? calculateOverallScore(user2Data) : 0;

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
            Profile{" "}
            <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              Compare
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Compare GitHub profiles and get insights on areas for improvement
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-2">
              <Input
                type="text"
                placeholder="First GitHub username..."
                value={username1}
                onChange={(e) => setUsername1(e.target.value)}
                className="flex-1"
                disabled={loading}
              />
              <div className="flex items-center justify-center">
                <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                type="text"
                placeholder="Second GitHub username..."
                value={username2}
                onChange={(e) => setUsername2(e.target.value)}
                className="flex-1"
                disabled={loading}
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              ) : (
                <Search className="h-4 w-4 mr-2" />
              )}
              Compare Profiles
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                {[...Array(2)].map((_, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <Skeleton className="h-16 w-16 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-6 w-32" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[...Array(4)].map((_, j) => (
                          <div key={j} className="flex justify-between">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-12" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {user1Data && user2Data && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Overall Score Comparison */}
              <Card className="max-w-4xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-center flex items-center justify-center gap-2">
                    <Award className="h-5 w-5" />
                    Overall Profile Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-center space-y-4">
                      <Avatar className="h-16 w-16 mx-auto">
                        <AvatarImage src={user1Data.avatar_url} alt={user1Data.name} />
                        <AvatarFallback>{user1Data.login.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{user1Data.name || user1Data.login}</div>
                        <div className="text-sm text-muted-foreground">@{user1Data.login}</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-3xl font-bold text-primary">{user1Score}/100</div>
                        <Progress value={user1Score} className="w-full" />
                      </div>
                    </div>

                    <div className="text-center space-y-4">
                      <Avatar className="h-16 w-16 mx-auto">
                        <AvatarImage src={user2Data.avatar_url} alt={user2Data.name} />
                        <AvatarFallback>{user2Data.login.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{user2Data.name || user2Data.login}</div>
                        <div className="text-sm text-muted-foreground">@{user2Data.login}</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-3xl font-bold text-primary">{user2Score}/100</div>
                        <Progress value={user2Score} className="w-full" />
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-6">
                    {user1Score > user2Score ? (
                      <Badge variant="default" className="text-base px-4 py-2">
                        🏆 {user1Data.name || user1Data.login} wins with {user1Score - user2Score} points ahead!
                      </Badge>
                    ) : user2Score > user1Score ? (
                      <Badge variant="default" className="text-base px-4 py-2">
                        🏆 {user2Data.name || user2Data.login} wins with {user2Score - user1Score} points ahead!
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-base px-4 py-2">
                        🤝 Its a tie! Both profiles are equally strong
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                {/* User 1 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className={`h-full ${user1Score > user2Score ? 'ring-2 ring-green-500' : ''}`}>
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={user1Data.avatar_url} alt={user1Data.name} />
                          <AvatarFallback>{user1Data.login.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{user1Data.name || user1Data.login}</CardTitle>
                          <CardDescription>@{user1Data.login}</CardDescription>
                          {user1Data.bio && (
                            <p className="text-sm text-muted-foreground mt-1">{user1Data.bio}</p>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {comparisonResults.map((result, index) => {
                        const Icon = result.icon;
                        const isWinner = result.winner === 'user1';
                        return (
                          <div key={result.metric} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{result.metric}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`font-semibold ${isWinner ? 'text-green-600' : ''}`}>
                                {result.user1Value.toLocaleString()}
                              </span>
                              {getWinnerIcon(result.winner)}
                            </div>
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* User 2 */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className={`h-full ${user2Score > user1Score ? 'ring-2 ring-green-500' : ''}`}>
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={user2Data.avatar_url} alt={user2Data.name} />
                          <AvatarFallback>{user2Data.login.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{user2Data.name || user2Data.login}</CardTitle>
                          <CardDescription>@{user2Data.login}</CardDescription>
                          {user2Data.bio && (
                            <p className="text-sm text-muted-foreground mt-1">{user2Data.bio}</p>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {comparisonResults.map((result, index) => {
                        const Icon = result.icon;
                        const isWinner = result.winner === 'user2';
                        return (
                          <div key={result.metric} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{result.metric}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {getWinnerIcon(result.winner === 'user2' ? 'user1' : result.winner === 'user1' ? 'user2' : 'tie')}
                              <span className={`font-semibold ${isWinner ? 'text-green-600' : ''}`}>
                                {result.user2Value.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Improvement Suggestions */}
              <Card className="max-w-4xl mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Improvement Suggestions
                  </CardTitle>
                  <CardDescription>
                    Areas where each profile could be enhanced
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={user1Data.avatar_url} alt={user1Data.name} />
                          <AvatarFallback>{user1Data.login.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        {user1Data.name || user1Data.login}
                      </h4>
                      <ul className="space-y-2 text-sm">
                        {comparisonResults
                          .filter(result => result.winner === 'user2' && result.suggestion)
                          .map((result, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                              {result.suggestion}
                            </li>
                          ))}
                        {comparisonResults.filter(result => result.winner === 'user2' && result.suggestion).length === 0 && (
                          <li className="text-muted-foreground">Great profile! Keep up the good work.</li>
                        )}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={user2Data.avatar_url} alt={user2Data.name} />
                          <AvatarFallback>{user2Data.login.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        {user2Data.name || user2Data.login}
                      </h4>
                      <ul className="space-y-2 text-sm">
                        {comparisonResults
                          .filter(result => result.winner === 'user1' && result.suggestion)
                          .map((result, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                              {result.suggestion}
                            </li>
                          ))}
                        {comparisonResults.filter(result => result.winner === 'user1' && result.suggestion).length === 0 && (
                          <li className="text-muted-foreground">Great profile! Keep up the good work.</li>
                        )}
                      </ul>
                    </div>
                  </div>
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
              <CardTitle>How to Use Profile Compare</CardTitle>
              <CardDescription>
                Get the most out of the GitHub profile comparison tool
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center space-y-2">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto font-bold">1</div>
                  <h4 className="font-semibold">Enter Usernames</h4>
                  <p className="text-sm text-muted-foreground">Type two different GitHub usernames to compare</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto font-bold">2</div>
                  <h4 className="font-semibold">View Comparison</h4>
                  <p className="text-sm text-muted-foreground">See detailed metrics and overall scores</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto font-bold">3</div>
                  <h4 className="font-semibold">Get Insights</h4>
                  <p className="text-sm text-muted-foreground">Receive personalized improvement suggestions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}