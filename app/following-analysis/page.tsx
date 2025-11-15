"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, ExternalLink, TrendingDown } from "lucide-react";
import { toast } from "sonner";

async function fetchAllPages(url: string) {
  let results: any[] = [];
  let page = 1;

  while (true) {
    const res = await fetch(`${url}?per_page=100&page=${page}`);
    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) break;

    results = [...results, ...data];
    page++;
  }

  return results;
}

interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name?: string;
  followers: number;
}

export default function FollowingAnalysis() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [notFollowingBack, setNotFollowingBack] = useState<GitHubUser[]>([]);
  const [stats, setStats] = useState({
    following: 0,
    followers: 0,
    notFollowingBack: 0,
  });

  const analyzeFollowing = async () => {
    if (!username.trim()) return toast.error("Please enter a username!");

    setLoading(true);
    setNotFollowingBack([]);

    try {
      const followingList = await fetchAllPages(
        `https://api.github.com/users/${username.trim()}/following`
      );

      const followersList = await fetchAllPages(
        `https://api.github.com/users/${username.trim()}/followers`
      );

      const followersSet = new Set(
        followersList.map((u: GitHubUser) => u.login)
      );

      let notFollowing = followingList.filter(
        (u: GitHubUser) => !followersSet.has(u.login)
      );

      notFollowing = notFollowing.slice(0, 30);

      setNotFollowingBack(notFollowing);

      setStats({
        following: followingList.length,
        followers: followersList.length,
        notFollowingBack: notFollowing.length,
      });

      toast.success("Analysis completed!");
    } catch (error) {
      toast.error("Failed to fetch GitHub data");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">

        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-3 mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold">
            Following{" "}
            <span className="bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
              Analysis
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Check who doesn’t follow you back on GitHub
          </p>
        </motion.div>

        {/* INPUT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-md mx-auto mb-10"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              analyzeFollowing();
            }}
            className="flex gap-2"
          >
            <Input
              placeholder="Enter GitHub username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
            <Button disabled={loading}>
              {loading ? (
                <div className="animate-spin h-4 w-4 border-b-2 border-white rounded-full"></div>
              ) : (
                <Search className="w-4 h-4" />
              )}
            </Button>
          </form>
        </motion.div>

        {/* STATS CARDS */}
        {!loading && stats.following > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">

            {/* FOLLOWING */}
            <div className="p-6 rounded-xl border border-border/50 bg-white dark:bg-[#0f0f0f] dark:border-white/10 text-center hover:border-primary/20 transition">
              <div className="flex flex-col items-center gap-2">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2"
                  viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 20a6 6 0 00-12 0" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <div className="text-3xl font-bold">{stats.following}</div>
                <p className="text-muted-foreground">Following</p>
              </div>
            </div>

            {/* FOLLOWERS */}
            <div className="p-6 rounded-xl border border-border/50 bg-white dark:bg-[#0f0f0f] dark:border-white/10 text-center hover:border-primary/20 transition">
              <div className="flex flex-col items-center gap-2">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="2"
                  viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20a5 5 0 00-10 0M12 12a5 5 0 100-10 5 5 0 000 10z" />
                </svg>
                <div className="text-3xl font-bold">{stats.followers}</div>
                <p className="text-muted-foreground">Followers</p>
              </div>
            </div>

            {/* NOT FOLLOWING BACK */}
            <div className="p-6 rounded-xl border border-border/50 bg-white dark:bg-[#0f0f0f] dark:border-white/10 text-center hover:border-primary/20 transition">
              <div className="flex flex-col items-center gap-2">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" strokeWidth="2"
                  viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-3xl font-bold">{stats.notFollowingBack}</div>
                <p className="text-muted-foreground">Not Following Back</p>
              </div>
            </div>

          </div>
        )}

        {/* RESULTS */}
        <AnimatePresence mode="wait">
          {!loading && stats.notFollowingBack > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <TrendingDown className="h-5 w-5 text-red-500" />
                    Users Not Following You Back
                    <Badge variant="secondary">{stats.notFollowingBack}</Badge>
                  </CardTitle>
                  <CardDescription>
                    Showing top {stats.notFollowingBack} users
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <ScrollArea className="h-[450px] pr-3">
                    <div className="space-y-4">

                      {notFollowingBack.map((user, index) => (
                        <motion.div
                          key={user.login}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.03 }}
                          
                          className="
                            flex items-center justify-between p-4 rounded-lg
                            border border-border/50 bg-white
                            hover:border-primary/20 transition-colors

                            dark:bg-[#0f0f0f]
                            dark:border-white/10
                            dark:hover:bg-[#181818]
                            dark:text-white
                          "
                        >
                          
                          {/* LEFT */}
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={user.avatar_url} />
                              <AvatarFallback>
                                {user.login.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>

                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">
                                {user.name || user.login}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-neutral-400">
                                @{user.login}
                              </div>
                            </div>
                          </div>

                          {/* RIGHT SIDE */}
                          <div className="flex items-center gap-3">
                            <Badge
                              className="
                                px-3 py-1 text-xs rounded-md
                                bg-gray-200 text-black
                                dark:bg-white/10 dark:text-white
                              "
                            >
                              followers
                            </Badge>

                            <a
                              href={user.html_url}
                              target="_blank"
                              className="
                                p-2 rounded-md transition
                                hover:bg-gray-200
                                dark:hover:bg-white/10
                              "
                            >
                              <ExternalLink className="w-4 h-4 text-black dark:text-white" />
                            </a>
                          </div>

                        </motion.div>
                      ))}

                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/*  HOW TO USE SECTION  */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto mt-16"
        >
          <Card className="border border-border/50 dark:border-white/10">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                How to Use This Tool
              </CardTitle>
              <CardDescription>
                Understand how this Following Analysis tool works step-by-step
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">

              {/* Step 1 */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Enter Your GitHub Username</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Type your GitHub username in the search box and click the search button.
                    The tool will fetch your followers & following list.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Automatic Data Analysis</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    The algorithm compares both lists and finds users who don’t follow you back.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-lg">View Detailed Results</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    You will see user profiles, follower counts, and direct profile links.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Visit Profiles Instantly</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Tap any profile to open them on GitHub directly.
                  </p>
                </div>
              </div>

              {/* Notes */}
              <div className="border-t border-border/50 dark:border-white/10 pt-4">
                <h3 className="font-semibold mb-2">Notes</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Only public GitHub data is used</li>
                  <li>• No login required</li>
                  <li>• Safe & read-only API access</li>
                  <li>• Results update instantly after every search</li>
                </ul>
              </div>

            </CardContent>
          </Card>
        </motion.div>

      </div>
    </div>
  );
}
