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
import {
  Search,
  ExternalLink,
  TrendingDown,
} from "lucide-react";
import { toast } from "sonner";

// 🔥 FETCH ALL PAGINATED GITHUB DATA
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
      // Get all following users
      const followingList = await fetchAllPages(
        `https://api.github.com/users/${username.trim()}/following`
      );

      // Get all followers
      const followersList = await fetchAllPages(
        `https://api.github.com/users/${username.trim()}/followers`
      );

      const followersSet = new Set(
        followersList.map((u: GitHubUser) => u.login)
      );

      // CORE LOGIC → You follow them but they don't follow you back
      let notFollowing = followingList.filter(
        (u: GitHubUser) => !followersSet.has(u.login)
      );

      // Show only first 30 results
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
          className="max-w-md mx-auto mb-12"
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
                            flex items-center justify-between p-4 rounded-xl
                            border transition

                            /* 🌙 Dark Mode */
                            dark:bg-[#0f0f0f] dark:border-white/5 dark:hover:bg-[#181818]

                            /* ☀ Light Mode */
                            bg-white border-gray-200 hover:bg-gray-100
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

                          {/* RIGHT */}
                          <div className="flex items-center gap-3">
                            <Badge
                              className="
                                px-3 py-1 text-xs rounded-md

                                /* Light */
                                bg-gray-200 text-black

                                /* Dark */
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

                                /* Light */
                                hover:bg-gray-200

                                /* Dark */
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

      </div>
    </div>
  );
}
