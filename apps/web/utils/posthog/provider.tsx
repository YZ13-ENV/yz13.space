'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { ReactNode } from 'react'
import { POSTHOG_HOST, POSTHOG_KEY } from './const'



if (typeof window !== 'undefined') {
  posthog.init(
    POSTHOG_KEY || "",
    {
      api_host: POSTHOG_HOST,
    }
  )
}
export function CSPostHogProvider({ children }: { children?: ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}