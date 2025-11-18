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

// FETCH PAGINATED DATA
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
    <div className="min-h-screen pt-20 pb-12 relative">
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

        {/* 🔥 FULL SCREEN LOADER */}
        {loading && (
          <div className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-50">
            <div className="h-12 w-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
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
                          "
                        >
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={user.avatar_url} />
                              <AvatarFallback>
                                {user.login.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>

                            <div>
                              <div className="font-medium dark:text-white">
                                {user.name || user.login}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                @{user.login}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <Badge className="px-3 py-1 text-xs dark:bg-white/10">
                              followers
                            </Badge>

                            <a
                              href={user.html_url}
                              target="_blank"
                              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-white/10"
                            >
                              <ExternalLink className="w-4 h-4 dark:text-white" />
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
