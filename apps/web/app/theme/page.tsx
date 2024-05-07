import { HomeHeader } from "@/components/entities/header"
import { Button } from "@repo/ui/button"

const page = () => {
  return (
    <>
      <HomeHeader className='fixed z-20 top-0 w-full h-fit p-6' />
      <div className="w-full h-screen py-36">
        <div className="container">
          <h1 className="text-5xl font-bold">YZ13 Design System</h1>
          <p>There i gonna develop my own design system with custom coloes</p>
          <div className="my-12 space-y-12">
            <div className="flex flex-wrap items-start gap-2">
              <Button variant="default">Button</Button>
              <Button variant="success">Button</Button>
              <Button variant="warning">Button</Button>
              <Button variant="error">Button</Button>
              <Button variant="ghost">Button</Button>
              <Button variant="link">Button</Button>
              <Button variant="outline">Button</Button>
              <Button variant="secondary">Button</Button>
            </div>
            <div className="flex flex-wrap items-start gap-2">
              <div className="flex flex-col gap-2">
                <div className="w-20 h-6 rounded-sm bg-accents-1" />
                <div className="w-20 h-6 rounded-sm bg-accents-2" />
                <div className="w-20 h-6 rounded-sm bg-accents-3" />
                <div className="w-20 h-6 rounded-sm bg-accents-4" />
                <div className="w-20 h-6 rounded-sm bg-accents-5" />
                <div className="w-20 h-6 rounded-sm bg-accents-6" />
                <div className="w-20 h-6 rounded-sm bg-accents-7" />
                <div className="w-20 h-6 rounded-sm bg-accents-8" />
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-20 h-6 rounded-sm bg-success" />
                <div className="w-20 h-6 rounded-sm bg-success-light" />
                <div className="w-20 h-6 rounded-sm bg-success-dark" />
                <div className="w-20 h-6 rounded-sm bg-error" />
                <div className="w-20 h-6 rounded-sm bg-error-light" />
                <div className="w-20 h-6 rounded-sm bg-error-dark" />
                <div className="w-20 h-6 rounded-sm bg-warning" />
                <div className="w-20 h-6 rounded-sm bg-warning-light" />
                <div className="w-20 h-6 rounded-sm bg-warning-dark" />
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-20 h-6 rounded-sm bg-highlight-alert" />
                <div className="w-20 h-6 rounded-sm bg-highlight-purple" />
                <div className="w-20 h-6 rounded-sm bg-highlight-cyan" />
                <div className="w-20 h-6 rounded-sm bg-highlight-violet" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default page
