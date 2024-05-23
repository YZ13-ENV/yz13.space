// enter point in microservice

import { Button } from "@repo/ui/button";
import { BigFolder, Folder, FolderFront } from "@repo/ui/svg/folder";
import { BiDotsHorizontalRounded } from "react-icons/bi";

const Playground = () => {
  const ProjectFolder = () => {
    return (
      <div className="w-fit folder h-fit flex flex-col items-center justify-center relative">
        <BigFolder className="folder-back" />
        <div className="w-full absolute left-0 top-0 h-full pb-1 pt-4 px-1">
          <div className="w-full h-full flex gap-1 flex-col">
            <div className="flex flex-col bg-accents-2 p-1 rounded-lg gap-1 h-full w-full">
              <div className="w-full h-full border rounded-lg">
              </div>
              <div className="w-full flex items-end justify-between gap-2">
                <div className="flex px-1 pb-1 flex-col gap-1">
                  <span className="text-foreground">Folder name</span>
                  <span className="text-xs">a few items</span>
                </div>
                <div className="flex items-center mt-auto -space-x-3">
                  <div className="w-8 aspect-square bg-accents-1 rounded-full border border-accents-3" />
                  <div className="w-8 aspect-square bg-accents-1 rounded-full border border-accents-3" />
                  <div className="w-8 aspect-square bg-accents-1 rounded-full border border-accents-3" />
                </div>
              </div>
            </div>
            <div className="w-full h-6 flex items-center justify-end">
              <Button className="w-6 h-6" size="icon" variant="ghost"><BiDotsHorizontalRounded size={14} /></Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  const SimpleFolder = () => {
    return (
      <div className="w-fit folder h-fit flex flex-col items-center justify-center relative">
        <BigFolder className="folder-back" />
        <div className="w-full absolute left-0 top-0 h-full pb-1 pt-4 px-1">
          <div className="w-full h-full flex gap-1 flex-col">
            <div className="flex flex-col bg-accents-2 p-1 rounded-lg gap-1 h-full w-full">
              <div className="w-full h-full grid gap-1 grid-cols-3 grid-rows-1">
                <div className="w-full h-full rounded-lg border col-span-2"></div>
                <div className="grid grid-cols-1 grid-rows-2 gap-1">
                  <div className="w-full h-full rounded-lg border"></div>
                  <div className="w-full h-full rounded-lg border"></div>
                </div>
              </div>
              <div className="w-full flex items-end justify-between gap-2">
                <div className="flex px-1 pb-1 flex-col gap-1">
                  <span className="text-foreground">Folder name</span>
                  <span className="text-xs">a few items</span>
                </div>
                <div className="flex items-center mt-auto -space-x-3">
                  <div className="w-8 aspect-square bg-accents-1 rounded-full border border-accents-3" />
                  <div className="w-8 aspect-square bg-accents-1 rounded-full border border-accents-3" />
                  <div className="w-8 aspect-square bg-accents-1 rounded-full border border-accents-3" />
                </div>
              </div>
            </div>
            <div className="w-full h-6 flex items-center justify-end">
              <Button className="w-6 h-6" size="icon" variant="ghost"><BiDotsHorizontalRounded size={14} /></Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  const AnimatedFolder = () => {
    return (
      <div className="w-fit folder h-fit flex flex-col items-center justify-center relative">
        <Folder className="folder-back" />
        <div className="absolute folder-images bottom-24 w-full flex items-center justify-center gap-4">
          <div className="folder-image"></div>
          <div className="folder-image"></div>
          <div className="folder-image"></div>
          <div className="folder-image"></div>
        </div>
        <div className="absolute bottom-0">
          <div className="absolute w-full h-full flex flex-col justify-between py-2 px-3">
            <div className="flex flex-col gap-1">
              <span className="text-foreground">Folder name</span>
              <span className="text-xs">a few items</span>
            </div>
            <div className="w-full h-fit flex items-center justify-between">
              <div className="flex items-center mt-auto -space-x-3">
                <div className="w-8 aspect-square bg-accents-1 rounded-full border border-accents-3" />
                <div className="w-8 aspect-square bg-accents-1 rounded-full border border-accents-3" />
                <div className="w-8 aspect-square bg-accents-1 rounded-full border border-accents-3" />
              </div>
              <Button size="icon" variant="ghost"><BiDotsHorizontalRounded size={14} /></Button>
            </div>
          </div>
          <FolderFront className="folder-front" />
        </div>
      </div>
    )
  }
  return (
    <>
      <div className="w-full h-dvh flex flex-col">
        <header className="w-full h-16 shrink-0 flex border-b">
        </header>
        <div style={{ height: "calc(100% - 4rem)" }} className="w-full h-full flex">
          <div className="w-80 h-full border-r"></div>
          <div className="w-full h-full p-6 flex items-center gap-3 justify-center">
            <div className="grid h-full w-full grid-rows-3 grid-cols-6 gap-4">
              <AnimatedFolder />
              <AnimatedFolder />
              <AnimatedFolder />
              <AnimatedFolder />
              <AnimatedFolder />
              <AnimatedFolder />

              <ProjectFolder />
              <ProjectFolder />
              <ProjectFolder />
              <ProjectFolder />
              <ProjectFolder />
              <ProjectFolder />

              <SimpleFolder />
              <SimpleFolder />
              <SimpleFolder />
              <SimpleFolder />
              <SimpleFolder />
              <SimpleFolder />


            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Playground;

