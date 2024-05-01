import { Repo } from "@/types/repo"
import { User } from "@/types/user"

export const user = {
  get: async(): Promise<User | null> => {
    try {
      const url = 'https://api.github.com/users/yz13-env'
      const res = await fetch(url, { method: "GET" })
      if (res.ok) return await res.json()
      return null
    } catch(e) {
      process.env.NODE_ENV === 'development' && console.log(e)
      return null
    }
  },
  repos: {
    get: async(): Promise<Repo[] | []> => {
      try {
        const url = 'https://api.github.com/users/yz13-env/repos'
        const res = await fetch(url, { method: "GET" })
        if (res.ok) return await res.json()
        return []
      } catch(e) {
        process.env.NODE_ENV === 'development' && console.log(e)
        return []
      }
    }
  }
}