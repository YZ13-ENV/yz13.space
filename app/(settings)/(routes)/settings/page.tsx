"use client"
import { Footer } from "@/app/(threads)/_components/footer"
import { LeftSide } from "@/app/_components/left"
import { RightSide } from "@/app/_components/right"
import { RightContentContainer } from "@/app/_components/right-content-container"
import { SplitViewContainer } from "@/app/_components/split-view-container"
import { Visitor } from "@yz13/api/db/types"
import { getVisitor, updateVisitor } from "@yz13/api/db/visitor"
import { useLocalStorageState } from "ahooks"
import Link from "next/link"
import { useEffect, useState } from "react"
import { BiLeftArrowAlt } from "react-icons/bi"
import { EditNameSection } from "../../_components/edit-name"

const page = () => {
  const [sid] = useLocalStorageState<string | null>("anon-sid", { defaultValue: null })
  const [visitor, setVisitor] = useState<Visitor | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const handleSave = (newValue: string) => {
    if (visitor) {

      setLoading(true)
      updateVisitor({ username: newValue }, visitor.uid)
        .then(res => {
          console.log(res)
          const data = res.data
          setVisitor(data)
        })
        .finally(() => setLoading(false))
    }
  }
  useEffect(() => {
    if (sid) getVisitor(sid)
      .then(res => {
        const data = res.data
        setVisitor(data)
      })
  }, [sid])
  return (
    <SplitViewContainer>
      <LeftSide>
        <div className="flex items-center justify-center w-full h-full">
          <div className="lg:max-w-sm max-w-xl w-full space-y-5 p-6">
            <div className="space-y-2">
              <h2 className="text-4xl font-semibold">Settings</h2>
              <p className="text-secondary">Just settings :)</p>
            </div>
            <Link href="/" className="inline-flex hover:bg-accents-1 rounded-lg gap-2 items-center h-9 px-3 transition-colors">
              <BiLeftArrowAlt size={16} />
              <span className="text-sm">Go back</span>
            </Link>
          </div>
        </div>
      </LeftSide>
      <RightSide>
        <RightContentContainer>
          <EditNameSection
            disabled={!visitor || loading}
            value={visitor?.username}
            onSave={handleSave}
          />
          <Footer className="pb-6 pt-12 w-full" />
        </RightContentContainer>
      </RightSide>
    </SplitViewContainer>
  )
}
export default page