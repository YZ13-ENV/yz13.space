import { user as user_api } from '@/api/user'
import { cn } from '@repo/ui/cn'
import Image from "next/image"
import Link from "next/link"
import { BiLogoGithub, BiLogoTelegram } from "react-icons/bi"
import { CardContainer } from "../extra/3d-card"
import { HoverBorderGradient } from "../extra/hover-border-gradient"

const Card = async () => {
  const user = await user_api.get()
  const github_link = "https://github.com/yz13-env"
  const UserAvatar = ({ className = "" }: { className?: string }) => {
    if (user) return <Image priority src={user.avatar_url} className={cn('rounded-full', className)} width={96} height={96} alt='user-avatar' />
    return <div className={cn("w-24 aspect-square rounded-full bg-muted", className)} />
  }
  return (
    <CardContainer
      containerClassName='p-0'
      className="inter-var group">
      <HoverBorderGradient
        className="w-full h-fit max-w-xs p-0 rounded-2xl mx-auto group bg-primary-foreground"
      >
        <div className='w-full flex flex-col gap-2 p-6'>
          <div className='w-full flex items-center justify-between gap-4'>
            <UserAvatar className='z-10' />
            <div className='w-24 aspect-square rounded-lg grid grid-cols-2 grid-rows-2 items-center place-items-center'>
              <Link
                target='_blank'
                href="https://frame.darkmaterial.space/YZCEO"
                className="rounded-lg hover:bg-muted w-full h-full flex items-center justify-center"
              >
                <Image src="frame-dark.svg" width={24} height={24} alt='frame-logo' />
              </Link>
              <Link
                target='_blank'
                href={github_link}
                className="rounded-lg hover:bg-muted w-full h-full flex items-center justify-center"
              >
                <BiLogoGithub size={24} />
              </Link>
              <Link
                target='_blank'
                href='https://t.me/YZTHECEO'
                className="rounded-lg hover:bg-muted w-full h-full flex items-center justify-center"
              >
                <BiLogoTelegram size={24} />
              </Link>
            </div>
          </div>
          <div className='flex flex-col mt-2 justify-center items-start'>
            <span className="text-2xl text-accent-foreground font-bold">{user?.name}</span>
            <span className="text-sm text-muted-foreground">Fullstack-developer</span>
            <span className='mt-2 text-start text-sm text-muted-foreground'>{user?.bio}</span>
          </div>
        </div>
        <div className='w-full h-36'>
          {/* <span className='text-[14rem] absolute font-bold text-primary-foreground'>YZ</span> */}
        </div>
      </HoverBorderGradient>
    </CardContainer>
  )
}
export { Card }
