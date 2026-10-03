import React from 'react';
import { Users, UserPlus, GitBranch, Activity, MapPin, Link as LinkIcon, Calendar, TrendingUp } from 'lucide-react';

export function MockProfileCard() {
  return (
    <div className="w-full bg-background rounded-xl border border-border p-4 flex flex-col gap-3 text-left font-sans relative z-20 overflow-hidden">
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
            <img src="https://github.com/codewithdhruba.png" alt="Avatar" className="w-full h-full object-cover rounded-full" onError={(e) => { e.currentTarget.style.display = 'none' }} />
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
        <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-border bg-background/60 backdrop-blur-md">
          <Users className="w-6 h-6 text-blue-500 mb-2" />
          <span className="text-2xl font-bold text-foreground mb-1">2,378</span>
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

      {/* Bottom Insights Card */}
      <div className="p-4 rounded-xl border border-border bg-background/60 backdrop-blur-md flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-500" />
          <h3 className="text-lg font-bold text-foreground">Profile Insights</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Account Status</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded-full bg-muted border border-border text-[11px] text-foreground font-medium">Active Profile</span>
              <span className="px-2.5 py-1 rounded-full bg-muted border border-border text-[11px] text-foreground font-medium">Popular Developer</span>
              <span className="px-2.5 py-1 rounded-full bg-muted border border-border text-[11px] text-foreground font-medium">Prolific Contributor</span>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Profile Metrics</h4>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <p>Follower to Following Ratio: <span className="text-foreground">2.54</span></p>
              <p>Repos per Year: <span className="text-foreground">23</span></p>
              <p>Last Updated: <span className="text-foreground">October 2, 2026</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
