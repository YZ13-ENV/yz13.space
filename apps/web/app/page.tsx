"use server"
import { Footer } from '@/components/shared/footer';
import { get } from '@vercel/edge-config';
import dayjs from 'dayjs';
import { unstable_noStore } from 'next/cache';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Event } from './_components/entities/events/store/events-store';
import { EmbedEventPost } from './event/[id]/embed';
const HomePage = dynamic(() => import('./_components/pages/home'));

const page = async () => {
  unstable_noStore()
  const events: Readonly<Event[]> = await get("events") || []
  const now = dayjs()
  const now_key = now.format("YYYY-MM-DD")
  const todayEvents = events.filter(event => {
    const event_date = dayjs(event.created_at)
    const event_key = event_date.format("YYYY-MM-DD")
    return event_key === now_key
  })
  return (
    <>
      <Suspense>
        <HomePage />
      </Suspense>
      {
        !!todayEvents.length &&
        <>
          {
            todayEvents.map(event =>
              <EmbedEventPost id={event.event_id} />
            )
          }
          <Footer />
        </>
      }
    </>
  )
}
export default page