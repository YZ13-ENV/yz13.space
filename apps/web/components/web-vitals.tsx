"use client"

import { id } from '@/const/app'
import { Vitals } from '@yz13/api/db/types'
import { pushWebVitals } from '@yz13/api/db/web-vitals'
import dayjs from 'dayjs'
import { usePathname } from 'next/navigation'
import { useReportWebVitals } from 'next/web-vitals'

export function WebVitals() {
  const pathname = usePathname()
  useReportWebVitals((metric) => {
    const prepared: Vitals = {
      path: pathname,
      app_id: id,
      delta: metric.delta,
      id: metric.id,
      name: metric.name,
      navigation_type: metric.navigationType,
      rating: metric.rating,
      value: metric.value,
      created_at: dayjs().toISOString()
    }
    // console.log(metric)
    pushWebVitals(prepared)
  })
  return <></>
}