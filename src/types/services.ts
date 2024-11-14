/* Services types */
export type Service = {
  id: string
  name: string
  description: string
  type: 'REST' | string
  published: boolean
  configured: boolean
  versions: Version[]
  metrics: Metrics
}

type Version = {
  id: string
  name: string
  description: string
  developer: Developer
  updated_at: string
}

type Developer = {
  id: string
  name: string
  email: string
  avatar: string
}

export type Metrics = {
  latency: number
  uptime: number
  requests: number
  errors: number
}
