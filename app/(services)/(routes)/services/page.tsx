import { LeftSide } from "@/app/_components/left"
import { RightSide } from "@/app/_components/right"
import { RightContentContainer } from "@/app/_components/right-content-container"
import { SplitViewContainer } from "@/app/_components/split-view-container"
import { cn } from "@/packages/ui/lib/utils"
import Link from "next/link"
import { BiLeftArrowAlt } from "react-icons/bi"
import { MdOutlineRoute } from "react-icons/md"
import { registered_services } from "../../_components/registered-services"

const page = () => {
  return (
    <SplitViewContainer>
      <LeftSide>
        <div className="lg:max-w-sm max-w-xl w-full space-y-5 p-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-semibold">All services</h2>
            <p className="text-secondary">List of all available services</p>
          </div>
          <Link href="/" className="inline-flex hover:bg-accents-1 rounded-lg gap-2 items-center h-9 px-3 transition-colors">
            <BiLeftArrowAlt size={16} />
            <span className="text-sm">Go back</span>
          </Link>
        </div>
      </LeftSide>
      <RightSide>
        <RightContentContainer>
          <ul className="space-y-4">
            {
              registered_services.map(service => {
                const isSingleRoute = service.routes.length === 1
                const isExternal = service.isExternal ? service.isExternal : false
                return (
                  <li key={service.service_id}>
                    <section className="w-full border p-4 rounded-xl space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h2 className="text-2xl font-bold">{service.title}</h2>
                          {
                            isExternal &&
                            <span className="text-xs text-accents-5">(External service)</span>
                          }
                        </div>
                        {
                          service.description &&
                          <p className="text-secondary">{service.description}</p>
                        }
                      </div>
                      <div className={cn(
                        "w-full grid auto-rows-auto gap-3",
                        isSingleRoute ? "grid-cols-1" : "md:grid-cols-3 grid-cols-2"
                      )}>
                        {
                          service.routes.map(
                            route =>
                              <Link
                                href={`/service/${service.service_id}${route.route}`}
                                key={service.service_id + "-" + route.route}
                                className="w-full h-fit hover:bg-accents-1 hover:border-foreground transition-colors p-3 rounded-lg border flex flex-col gap-2"
                              >
                                {
                                  route.icon
                                    ? route.icon({ size: 18 })
                                    : <MdOutlineRoute size={18} />
                                }
                                <span className="line-clamp-1 text-sm">{route.title}</span>
                              </Link>
                          )
                        }
                      </div>
                    </section>
                  </li>
                )
              })
            }
          </ul>
        </RightContentContainer>
      </RightSide>
    </SplitViewContainer>
  )
}
export default page