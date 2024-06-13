import Desktop from "./desktop"
import Mobile from "./mobile"
import { Wrapper } from "./wrapper"

const layout = () => {
  return (
    <Wrapper
      desktop={<Desktop />}
      mobile={<Mobile />}
    />
  )
}
export default layout