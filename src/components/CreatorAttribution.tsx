import React from 'react';
import { User, Github, Linkedin, Mail, Award, Code } from 'lucide-react';

export function CreatorAttribution() {
  return (
    <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 rounded-2xl p-6 border border-white/10 shadow-xl text-white">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg mr-4">
            <Award className="h-6 w-6 text-white" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold text-white">Built By</h3>
            <p className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Sandeep Kumar Sahoo
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-6 mb-4">
          <div className="flex items-center space-x-2 text-blue-300">
            <Code className="h-4 w-4" />
            <span className="text-sm font-medium">Blockchain Engineer</span>
          </div>
          <div className="flex items-center space-x-2 text-green-300">
            <User className="h-4 w-4" />
            <span className="text-sm font-medium">XRPL Specialist</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-xs text-gray-300 mb-1">Protocol Standards</p>
            <p className="text-sm font-bold text-white">5+ XLS</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-xs text-gray-300 mb-1">Compliance Coverage</p>
            <p className="text-sm font-bold text-white">6 Jurisdictions</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-xs text-gray-300 mb-1">Architecture</p>
            <p className="text-sm font-bold text-white">Enterprise</p>
          </div>
        </div>
        
        <p className="text-xs text-gray-300 mb-4">
          Agentic, non-simplified implementation ensuring institutional-grade compliance and security
        </p>
        
        <div className="flex items-center justify-center space-x-4">
          <a
            href="https://github.com/sandeep-sahoo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm"
          >
            <Github className="h-4 w-4" />
            <span className="text-sm">GitHub</span>
          </a>
          <a
            href="https://linkedin.com/in/sandeep-sahoo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm"
          >
            <Linkedin className="h-4 w-4" />
            <span className="text-sm">LinkedIn</span>
          </a>
          <a
            href="mailto:sandeep@example.com"
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm"
          >
            <Mail className="h-4 w-4" />
            <span className="text-sm">Contact</span>
          </a>
        </div>
      </div>
    </div>
  );
}