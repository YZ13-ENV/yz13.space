import * as Grid from "@/components/grid"
import { cookies } from "next/headers"
import { createClient } from "yz13/supabase/server"

const page = async () => {
  const cks = cookies()
  const sp = createClient(cks)
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Grid.Grid className="w-96 h-64" columns={3} rows={2}>
        <Grid.Cell key={"1-1"} column={1} row={1}>1</Grid.Cell>
        <Grid.Cell key={"2-1"} column={2} row={1}>2</Grid.Cell>
      </Grid.Grid>
    </div>
  )
}
export default page