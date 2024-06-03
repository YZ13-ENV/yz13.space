import dayjs from "dayjs"

const Change_3_05_2024 = () => {
  const date = dayjs("2024-05-03")
  return (
    <div className="w-full relative h-fit">
      <div className="w-fit h-full lg:absolute lg:mb-0 mb-4 lg:-left-40">
        <time className="sticky top-4 inline-block text-sm shrink-0">{date.format("MMMM D YYYY")}</time>
      </div>
      <section className="w-full md-layout relative">
        <div className="w-full aspect-video bg-accents-1 border rounded-xl"></div>
        <h2 className="text-2xl font-bold">Introducing changelog</h2>
        <p>I wanna start write some changelogs, to have ability to track changes.</p>
        <p>Other changes:</p>
        <ul>
          <li>Page ranking</li>
          <li>Fixed css styles</li>
        </ul>
      </section>
    </div>
  )
}
export { Change_3_05_2024 }
