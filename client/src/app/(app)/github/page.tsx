import GitHubIntegration from '@/app/components/github/GitHubIntegration'
import React from 'react'

const GitHubPage = () => {
  return (
    <main className="relative min-h-screen flex flex-col justify-center bg-white/70 dark:bg-black/70 overflow-hidden px-3 sm:px-6 py-6">
      <div className="pointer-events-none absolute -left-32 -top-32 size-96 rounded-full bg-foreground/[0.035] blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-1/3 size-[28rem] rounded-full bg-foreground/[0.025] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-1/3 size-[30rem] rounded-full bg-foreground/[0.02] blur-3xl" />
    
      <div className="relative">
        <GitHubIntegration/>
      </div>
    </main>
  )
}

export default GitHubPage
