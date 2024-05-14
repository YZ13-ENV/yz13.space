"use server"
import { Footer } from '@/components/shared/footer';
import { getMDXData } from '@/utils/mdx';
import dayjs from 'dayjs';
import { unstable_noStore } from 'next/cache';
import path from 'path';
import HomePage from './_components/pages/home';
import { EmbedEventPost } from './event/[id]/embed';

const page = async () => {
  unstable_noStore()
  const events = getMDXData(path.join(process.cwd(), 'app', 'event', 'events'))
  const now = dayjs()
  const now_key = now.format("YYYY-MM-DD")
  const todayEvents = events.filter(event => {
    const event_date = dayjs(event.metadata.created_at)
    const event_key = event_date.format("YYYY-MM-DD")
    return event_key === now_key
  })
  return (
    <>
      <HomePage />
      {
        !!todayEvents.length &&
        <>
          {
            todayEvents.map(event =>
              <EmbedEventPost id={event.slug} />
            )
          }
          <Footer />
        </>
      }
    </>
  )
}
export default page