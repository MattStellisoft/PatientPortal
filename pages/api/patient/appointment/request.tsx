export default function handler(req, res) {
    const body = req.body
    if (!body.day || !body.month || !body.year) {
      // Sends a HTTP bad request error code
      return res.status(400).json({ data: 'First or last name not found' })
    }
  
    // Found the name.
    // Sends a HTTP success code
    return res.status(200).json({ data: `${body.first} ${body.last}` })
  }