import { TeamMember } from "@/types/user"
import Image from "next/image"
import Link from "next/link"
import { BiChevronRight, BiLink } from "react-icons/bi"
type Props = {
  member: TeamMember
}
const MemberCard = ({ member }: Props) => {
  return (
    <div className="w-full p-4 space-y-3 border h-fit bg-card rounded-xl">
      <div className="relative w-full overflow-hidden aspect-square bg-accents-2 rounded-xl">
        {
          member.avatar_url &&
          <Image src={member.avatar_url} fill alt={member.username} />
        }
      </div>
      <div className="w-full space-y-1.5">
        <section className="flex items-center justify-between w-full gap-2">
          <h3 className="text-lg">{member.name}</h3>
          <span className="text-sm text-secondary">@{member.username}</span>
        </section>
        <div className="flex items-center justify-between w-full gap-2">
          <span className="text-sm text-secondary">{member.position}</span>
          <span className="text-sm text-secondary">{member.place && member.place}</span>
        </div>
      </div>
      <ul className="w-full overflow-hidden border divide-y rounded-xl bg-card">
        {
          member.link.map(link =>
            <li key={link.label + "-" + link.link} className="m-0">
              <Link
                target="_blank"
                href={link.link}
                className="inline-flex items-center justify-between w-full h-10 px-3 text-sm transition-colors hover:bg-accents-1"
              >
                <span className="inline-flex items-center gap-2">
                  <BiLink />
                  <span>{link.label}</span>
                </span>
                <BiChevronRight size={18} />
              </Link>
            </li>
          )
        }
      </ul>
    </div>
  )
}
export { MemberCard }
