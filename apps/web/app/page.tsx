"use server"
import { unstable_noStore } from 'next/cache';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
const HomePage = dynamic(() => import('./_components/pages/home'));

const page = async () => {
  unstable_noStore()
  // const events: Readonly<Event[]> = await get("events") || []
  // const now = dayjs()
  // const now_key = now.format("YYYY-MM-DD")
  // const todayEvents = events.filter(event => {
  //   const event_date = dayjs(event.created_at)
  //   const event_key = event_date.format("YYYY-MM-DD")
  //   return event_key === now_key
  // })
  return (
    <>
      <Suspense>
        <HomePage />
      </Suspense>
      {/* {
        process.env.NODE_ENV === "development" &&
        !!todayEvents.length &&
        <>
          <div className='min-h-screen w-full'>
            <div className="w-full container">
              <div className="max-w-4xl mx-auto w-full p-12 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-36 h-9 rounded-full bg-secondary" />
                  <div className="w-48 h-5 rounded-full bg-secondary" />
                </div>
                <div className="w-full h-16 flex items-center gap-4">
                  <div className="h-full flex items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-accents-1 border" />
                    <div className="flex flex-col justify-center h-full">
                      <span className="font-mediums">Author</span>
                      <span className="text-sm text-secondary">Position</span>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-3 w-full">
                  <h1 className="text-5xl font-bold">Event</h1>
                  <p className="text-lg text-secondary">Description for event</p>
                </div>
                <div className="w-full space-y-6">
                  <div className="w-full md-layout">
                    <h1>Heading h1</h1>
                    <p>Event text</p>
                    <ul>
                      <li>list item</li>
                      <li>also list item</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      } */}
    </>
  )
}
export default page