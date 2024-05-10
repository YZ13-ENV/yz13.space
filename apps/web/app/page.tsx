"use server"
import { Footer } from '@/components/shared/footer';
import { get } from '@vercel/edge-config';
import dayjs from 'dayjs';
import { unstable_noStore } from 'next/cache';
import { Event } from './_components/entities/events/store/events-store';
import HomePage from './_components/pages/home';

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
      <HomePage />
      <div className='min-h-screen py-12 w-full'>
        {todayEvents.toString()}
        <div className="max-w-4xl container md-layout">

          <h1 className='text text-5xl text-foreground font-bold'>Heading h1</h1>
          <p className='text-base font-light'>There im gonna tell ya about today's event ;0</p>

          <ul>
            <li>List item #1</li>
            <li>List item #2</li>
          </ul>

          <h2>Heading 2</h2>
          <p>Another description</p>

        </div>
      </div>
      <Footer />
    </>
  )
}
export default page