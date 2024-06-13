import { registered_services } from "@/app/(services)/_components/registered-services"
import { LeftSide } from "@/app/_components/left"
import { RightSide } from "@/app/_components/right"
import { RightContentContainer } from "@/app/_components/right-content-container"
import { SplitViewContainer } from "@/app/_components/split-view-container"
import Link from "next/link"
import { redirect } from "next/navigation"
import { BiHomeAlt2, BiLeftArrowAlt } from "react-icons/bi"

type Props = {
  params: {
    id: string,
    slug?: string[]
  }
}
const page = ({ params }: Props) => {
  const service_id = params.id
  const route = params.slug ? "/" + params.slug.join("/") : "/"
  const service = registered_services.find(service => service.service_id === service_id)
  const service_route = service?.routes.find(service => service.route === route)
  const empty_route = !service_route
  const asPage = service_route?.as ? service_route?.as : "widget"
  if (!service) return redirect("/services")
  if (asPage) return service_route?.entry
  return (
    <SplitViewContainer>
      <LeftSide>
        <div className="lg:max-w-sm max-w-xl w-full space-y-5 p-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-semibold">{service?.title}</h2>
            {
              service?.description &&
              <p className="text-secondary">{service.description}</p>
            }
          </div>
          <div className="w-full">
            <ul>
              <li className="h-9 px-2 hover:bg-accents-1 hover:text-foreground text-secondary rounded-lg transition-colors">
                <Link href="/" className="h-full flex text-inherit items-center gap-2">
                  <BiHomeAlt2 />
                  <span className="text-inherit text-sm">Home</span>
                </Link>
              </li>
              {
                service?.routes.map(
                  route => <li className="h-9 px-2 hover:bg-accents-1 hover:text-foreground text-secondary rounded-lg transition-colors" key={route.route}>
                    <Link href={`/service/${service_id}${route.route}`} className="h-full flex text-inherit items-center gap-2">
                      {route.icon && route.icon({ size: 14, className: "text-inherit" })}
                      <span className="text-inherit text-sm">{route.title}</span>
                    </Link>
                  </li>
                )
              }
            </ul>
          </div>
        </div>
      </LeftSide>
      <RightSide>
        <RightContentContainer>
          {
            empty_route
              ? <div className="w-full h-full flex items-center justify-center aspect-square">
                <span className="gap-2 inline-flex text-base items-center">
                  <BiLeftArrowAlt size={18} className="lg:rotate-0 rotate-90" />
                  Select route
                </span>
              </div>
              : <>
                <header className="flex items-center justify-start gap-4">
                  <Link href="/services" className="inline-flex items-center text-secondary gap-1">
                    <BiLeftArrowAlt size={16} className="text-inherit" />
                    <span className="text-sm text-inherit">Back</span>
                  </Link>
                </header>
                <h2 className="text-4xl font-semibold">{service_route?.title}</h2>
                {service_route?.entry}
              </>
          }
        </RightContentContainer>
      </RightSide>
    </SplitViewContainer>
  )
}
export default page