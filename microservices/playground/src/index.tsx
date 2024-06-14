import { Desktop } from "./real-time/desktop"
import Mobile from "./real-time/mobile"
import { Wrapper } from "./real-time/wrapper"

const Playground = () => {
  return (
    <Wrapper
      desktop={<Desktop />}
      mobile={<Mobile />}
    />
  )
}
export { Playground }
