import Desktop from "./@desktop/page"
import Mobile from "./@mobile/page"
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