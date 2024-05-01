import { Project } from "@/types"

type Props = {
  project_id: string
  tags?: Project["tags"]
}
const ProjectTags = ({ project_id, tags = [] }: Props) => {
  return <div className="w-full flex flex-row items-start flex-wrap gap-1">
    {
      tags.map(
        tag => <span
          className="px-2 py-0.5 text-sm bg-muted text-muted-foreground rounded-full"
          key={project_id + "-" + tag}
        >
          {tag}
        </span>
      )
    }
  </div>
}
export { ProjectTags }
