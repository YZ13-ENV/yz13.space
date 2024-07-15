

const ExperienceListSkeleton = () => {
  return (
    <div className="w-full h-full space-y-3">
      <span className="w-1/3 h-7 inline-block rounded-md bg-yz-neutral-300 animate-pulse"></span>
      <ul className="w-full flex flex-col gap-3">
        <li className="w-full h-9">
          <button className="flex items-center w-full h-full">
            <span className="xl:text-base w-full inline-flex space-x-2 shrink-0">
              <span className="animate-pulse w-24 inline-block h-5 rounded-md bg-yz-neutral-300" />
              <span className="animate-pulse w-full inline-block h-5 rounded-md bg-yz-neutral-300" />
            </span>
          </button>
        </li>
        <li className="w-full h-9">
          <button className="flex items-center w-full h-full">
            <span className="xl:text-base w-full inline-flex space-x-2 shrink-0">
              <span className="animate-pulse w-24 inline-block h-5 rounded-md bg-yz-neutral-300" />
              <span className="animate-pulse w-full inline-block h-5 rounded-md bg-yz-neutral-300" />
            </span>
          </button>
        </li>
        <li className="w-full h-9">
          <button className="flex items-center w-full h-full">
            <span className="xl:text-base w-full inline-flex space-x-2 shrink-0">
              <span className="animate-pulse w-24 inline-block h-5 rounded-md bg-yz-neutral-300" />
              <span className="animate-pulse w-full inline-block h-5 rounded-md bg-yz-neutral-300" />
            </span>
          </button>
        </li>
      </ul>
    </div>
  )
}
export { ExperienceListSkeleton }
