import React, { useState, useEffect } from 'react';
import { Users, UserPlus, GitBranch, Activity, MapPin, Link as LinkIcon, Calendar, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const chartData = [
  { name: 'Jan', desktop: 185, mobile: 80 },
  { name: 'Feb', desktop: 305, mobile: 200 },
  { name: 'Mar', desktop: 235, mobile: 120 },
  { name: 'Apr', desktop: 275, mobile: 190 },
  { name: 'May', desktop: 210, mobile: 130 },
  { name: 'Jun', desktop: 315, mobile: 240 },
];

const smallChartData = [
  { day: 'M', commits: 12 },
  { day: 'T', commits: 19 },
  { day: 'W', commits: 15 },
  { day: 'T', commits: 25 },
  { day: 'F', commits: 22 },
  { day: 'S', commits: 8 },
  { day: 'S', commits: 14 },
];

export function MockProfileCard() {
  const [followers, setFollowers] = useState(2378);
  const [isHoveringChart, setIsHoveringChart] = useState(false);

  useEffect(() => {
    if (!isHoveringChart) return;
    
    // Simulate real-time follower changes
    const interval = setInterval(() => {
      setFollowers(prev => {
        // Mostly increase by 1-3, sometimes decrease by 1 to make it look realistic
        const change = Math.floor(Math.random() * 5) - 1; 
        return prev + change;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [isHoveringChart]);

  return (
    <div className="w-full max-w-3xl mx-auto bg-background rounded-xl border border-border p-4 flex flex-col gap-3 text-left font-sans relative z-20 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-40 dark:opacity-20 bg-cover bg-center"
        style={{ backgroundImage: 'url(/assets/mock_cover.webp)' }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col gap-3">
        {/* Top Profile Card */}
        <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-border bg-background/60 backdrop-blur-md">
        <div className="flex-shrink-0">
          <div className="w-20 h-20 rounded-full bg-[#ffe082] p-0 flex items-center justify-center overflow-hidden border-2 border-background">
            <img src="/assets/avater.png" alt="Avatar" className="w-full h-full object-cover rounded-full" onError={(e) => { e.currentTarget.style.display = 'none' }} />
          </div>
        </div>
        <div className="flex flex-col flex-1 text-foreground">
          <h2 className="text-xl font-bold mb-1">Dhrubaraj Pati</h2>
          <p className="text-muted-foreground text-sm mb-2">@codewithdhruba01</p>
          <p className="text-sm mb-3 leading-relaxed">
            Full-stack dev (React . Node . Postgres) Building scalable, high-performance web applications.<br />
            Open to SDE-1 roles.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> india</div>
            <div className="flex items-center gap-1"><LinkIcon className="w-3.5 h-3.5" /> Website</div>
            <div className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Joined September 26, 2023</div>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Followers */}
        <div className={`flex flex-col items-center justify-center p-4 rounded-xl border border-border bg-background/60 backdrop-blur-sm transition-colors duration-300 ${isHoveringChart ? 'border-blue-500/50 bg-blue-500/5' : ''}`}>
          <Users className="w-6 h-6 text-blue-500 mb-2" />
          <span className={`text-2xl font-bold mb-1 transition-colors duration-300 ${isHoveringChart ? 'text-blue-400' : 'text-foreground'}`}>
            {followers.toLocaleString()}
          </span>
          <span className="text-xs text-muted-foreground">Followers</span>
        </div>
        {/* Following */}
        <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-border bg-background/60 backdrop-blur-md">
          <UserPlus className="w-6 h-6 text-green-500 mb-2" />
          <span className="text-2xl font-bold text-foreground mb-1">137</span>
          <span className="text-xs text-muted-foreground">Following</span>
        </div>
        {/* Public Repos */}
        <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-border bg-background/60 backdrop-blur-md">
          <GitBranch className="w-6 h-6 text-purple-500 mb-2" />
          <span className="text-2xl font-bold text-foreground mb-1">70</span>
          <span className="text-xs text-muted-foreground">Public Repos</span>
        </div>
        {/* Account Age */}
        <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-border bg-background/60 backdrop-blur-md">
          <Activity className="w-6 h-6 text-orange-500 mb-2" />
          <span className="text-2xl font-bold text-foreground mb-1">3 years</span>
          <span className="text-xs text-muted-foreground">Account Age</span>
        </div>
      </div>

      {/* Bottom Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Profile Insights Chart */}
        <div className="md:col-span-2 p-4 rounded-xl border border-border bg-[#1a1b1e]/80 backdrop-blur-md flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <h3 className="text-lg font-bold text-white">Profile Insights</h3>
            {isHoveringChart && (
              <span className="ml-auto flex items-center gap-1.5 text-xs font-medium text-green-400 animate-pulse bg-green-500/10 px-2 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Live Updates
              </span>
            )}
          </div>
          <div 
            className="h-[220px] w-full cursor-crosshair"
            onMouseEnter={() => setIsHoveringChart(true)}
            onMouseLeave={() => setIsHoveringChart(false)}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="desktopGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6495ED" stopOpacity={1} />
                    <stop offset="100%" stopColor="#1E3A8A" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} ticks={[0, 80, 160, 240, 320]} />
                <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{backgroundColor: '#111', borderColor: '#333', color: '#fff'}} />
                <Bar dataKey="desktop" name="Desktop" fill="url(#desktopGrad)" radius={[2, 2, 0, 0]} barSize={22} />
                <Bar dataKey="mobile" name="Mobile" fill="#3b82f6" radius={[2, 2, 0, 0]} barSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column: Metrics & Small Graph */}
        <div className="flex flex-col gap-4">
          {/* Profile Metrics Card */}
          <div className="p-4 rounded-xl border border-border bg-[#1a1b1e]/80 backdrop-blur-sm flex flex-col h-fit">
            <h4 className="text-base font-semibold text-white mb-4">Profile Metrics</h4>
            <div className="space-y-3 text-sm text-zinc-400">
              <p className="flex items-center gap-2 border-b border-white/5 pb-2">
                <span>Follower Ratio:</span> <span className="text-white font-medium">2.54</span>
              </p>
              <p className="flex items-center gap-2 border-b border-white/5 pb-2">
                <span>Repos per Year:</span> <span className="text-white font-medium">23</span>
              </p>
              <p className="flex items-center gap-2">
                <span>Last Updated:</span> <span className="text-white font-medium">Oct 2, 2026</span>
              </p>
            </div>
          </div>
          
          {/* Small Graph Card */}
          <div className="p-3.5 rounded-xl border border-border bg-[#1a1b1e]/80 backdrop-blur-sm flex flex-col h-fit">
            <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-500" /> Commits Activity
            </h4>
            <div className="h-[70px] w-full mt-1">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={smallChartData}>
                  <Tooltip 
                    cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} 
                    contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff', fontSize: '12px' }} 
                  />
                  <Line type="monotone" dataKey="commits" stroke="#a855f7" strokeWidth={2} dot={{ r: 3, fill: '#a855f7' }} activeDot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
