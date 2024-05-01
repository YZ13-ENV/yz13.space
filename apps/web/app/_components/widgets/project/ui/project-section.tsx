import { getProjectBlocks } from "@/api/projects"
import { HoverBorderGradient } from "@/components/extra/hover-border-gradient"
import { isImage, isVideo } from "@/const/formats"
import { Block, Project } from "@/types"
import { Button } from "@repo/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@repo/ui/carousel"
import { cn } from "@repo/ui/cn"
import Image from "next/image"
import Link from "next/link"
import { BiRightArrowAlt } from "react-icons/bi"
import { MdOpenInNew } from "react-icons/md"
import { ProjectStack } from "./project-stack"
import { ProjectTags } from "./project-tags"

type Props = {
  project: Project
  reverse?: boolean
}
const ProjectSection = async ({ project, reverse = false }: Props) => {
  const id = project.id
  const projectBlocks = await getProjectBlocks(parseInt(id))
  const blocks: Block[] = projectBlocks.data ? projectBlocks.data : []
  const onlyMediaBlocks = blocks.filter(block => block.type === "image" || block.type === "video")
  const InfoSection = () => {
    return (
      <div className='xl:w-1/2 w-full shrink-0 flex flex-col justify-between gap-6'>
        <div className='w-full'>
          <div className='w-full space-y-2'>
            <h1 className='lg:text-5xl text-3xl font-semibold text-muted-foreground'>P. {project.name}.</h1>
            <p className='lg:text-5xl text-3xl line-clamp-3 font-semibold'>{project.description}</p>
          </div>
          <ProjectStack stack={project.stack || []} max={4} />
          <ProjectTags project_id={String(project.id)} tags={project.tags} />
        </div>
        <div className="flex items-center gap-2">
          <Button
            asChild
            size="lg"
            variant="secondary"
            className='w-fit mt-auto hover:ring hover:ring-primary gap-2 transition-all'
          >
            <Link href={project.link}>
              <span>Visit site</span>
              <MdOpenInNew size={18} />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className='w-fit mt-auto hover:ring hover:ring-primary gap-2 transition-all'
          >
            <Link href={`/${project.id}`}>
              <span>View project</span><BiRightArrowAlt size={18} />
            </Link>
          </Button>
        </div>
      </div>
    )
  }
  const MediaSection = () => {
    return (
      <div className='xl:w-1/2 w-full xl:h-full h-1/2 shrink-0'>
        <HoverBorderGradient
          as="div"
          containerClassName='w-full p-0 h-full aspect-[4/3]'
          className="w-full p-0 overflow-hidden h-full relative flex items-center justify-center"
        >
          <Carousel className="h-full">
            <CarouselContent>
              {
                project.thumbnail &&
                <CarouselItem>
                  {
                    project.thumbnail &&
                    isVideo(project.thumbnail) &&
                    <video
                      src={project.thumbnail}
                      className="w-full z-10 rounded-xl h-full"
                      autoPlay
                      muted
                      loop
                      controls={false}
                    />
                  }
                  {
                    project.thumbnail &&
                    isImage(project.thumbnail) &&
                    <Image src={project.thumbnail} className="!relative aspect-[4/3] h-full w-full object-cover" fill alt="thumbnail" />
                  }
                </CarouselItem>
              }
              {
                onlyMediaBlocks.map(
                  block => <Image key={block.value} src={block.value}
                    className="!relative aspect-[4/3] h-full w-full object-cover" fill alt="thumbnail" />
                )
              }
            </CarouselContent>
            {
              project.thumbnail && onlyMediaBlocks.length !== 0 &&
              <>
                <CarouselPrevious className="z-20 hidden group-hover:flex left-4" />
                <CarouselNext className="z-20 hidden group-hover:flex right-4" />
              </>
            }
          </Carousel>
        </HoverBorderGradient>
      </div>
    )
  }
  return (
    <div key={project.id} className="relative group w-full h-fit md:py-12 sm:py-6 md:px-12 sm:px-6 py-6 px-0 first:border-t border-b hover:bg-muted/20 transition-colors">
      <div className={cn(
        'container mx-auto flex  justify-between w-full h-full gap-6',
        reverse ? "xl:flex-row-reverse flex-col" : "xl:flex-row flex-col"
      )}>
        <InfoSection />
        <MediaSection />
      </div>
    </div>
  )
}
export { ProjectSection }
