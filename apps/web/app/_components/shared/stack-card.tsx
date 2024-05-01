import StackIcon from "tech-stack-icons"
export const GridItem = ({ icon, description, name = "Не указано" }: { icon?: string, name?: string, description?: string }) => {
  return (
    <div className='flex items-center w-full gap-2 cursor-pointer h-14'>
      {
        icon
          ? <div className='relative h-full p-1 overflow-hidden shrink-0 aspect-square'>
            <StackIcon name={icon} className='w-full h-full' />
          </div>
          : <div className='h-full border aspect-square bg-muted-foreground rounded-xl' />
      }
      <div className='flex flex-col justify-center w-full h-full'>
        <span className='text-lg font-semibold'>{name}</span>
        {
          description &&
          <span className='text-sm text-muted-foreground'>{description}</span>
        }
      </div>
    </div>
  )
}