import express from 'express'
import type { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { serviceById, response } from './data'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false,
}))

// Data route
app.route('/api/:entity').get((req: Request, res: Response) => {
  const { entity } = req.params
  const data: Record<string, any>[] = response[entity]

  if (!data) {
    return res.status(404).send('Not found')
  }

  // Get the request query string object
  const query: string = String(req.query.q || '').trim().toLowerCase()

  // Determine if the property includes the filter string
  const itemContainsFilter = (str: string) => (String(str || '').toLowerCase().includes(query) || false)

  let filteredData: Record<string, any>[]

  if (!query) {
    filteredData = data
  } else {
    // Filter the response data if a filter query string is present
    filteredData = data.filter((responseData: Record<string, any>) => {
      for (const property in responseData) {
        // Only allow searching when the object property is typeof `string`
        // If string is found, return true
        if (responseData[property] && typeof responseData[property] === 'string' && itemContainsFilter(responseData[property])) {
          return true
        }
      }
      return false
    })
  }
  return res.status(200).send(filteredData)
})

app.get('/api/service/:id', (req, res) => {
  const { id } = req.params
  const service = serviceById(id)
  // Check if service exists
  if (service) {
    res.status(200).json(service)
  } else {
    res.status(404).json({ message: 'Service not found' })
  }
})

// Catch-all
app.route('*').get((req: Request, res: Response) => {
  res.status(404).send('Not found')
})

export default app
