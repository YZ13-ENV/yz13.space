const CalendarEvents = () => {
  return (
    <div className="w-full p-4 border rounded-xl flex items-start gap-2">
      <div className="w-9 shrink-0 items-center justify-start flex flex-col">
        <span className="uppercase">FRI</span>
        <span className="text-2xl font-medium">13</span>
      </div>
      <div className="w-full">
        <ul className="space-y-1">
          <li className="w-full rounded-lg border bg-accents-1 h-fit p-2">
            <div className="w-full flex flex-col">
              <span className="text-sm text-foreground font-medium">Wake up</span>
              <span className="text-xs">7 am</span>
            </div>
          </li>
          <li className="w-full rounded-lg border bg-accents-1 h-fit p-2">
            <div className="w-full flex flex-col">
              <span className="text-sm text-foreground font-medium">Drink coffee and start planning work</span>
              <span className="text-xs">7:30-9:00 am</span>
            </div>
          </li>
          <li className="w-full rounded-lg border bg-accents-1 h-fit p-2">
            <div className="w-full flex flex-col">
              <span className="text-sm text-foreground font-medium">Stark working</span>
              <span className="text-xs">9:00-11:00 am</span>
            </div>
          </li>
          <li className="w-full rounded-lg border bg-accents-1 h-fit p-2">
            <div className="w-full flex flex-col">
              <span className="text-sm text-foreground font-medium">+ 4 events</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
export { CalendarEvents }
