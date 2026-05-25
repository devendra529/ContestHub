const axios = require("axios")

const fetchCodechefContests = async () => {
  try {
    console.log("Fetching CodeChef contests...")

    const response = await axios.get(
      "https://clist.by/api/v4/contest/",
      {
        timeout: 15000,
        params: {
          resource    : "codechef.com",
          order_by    : "start",
          limit       : 10,
          format_time : true,
        },
        headers: {
          Authorization: `ApiKey ${process.env.CLIST_API_KEY}`,
        },
      }
    )

    const data = response.data?.objects

    if (!Array.isArray(data)) {
      console.error("CodeChef unexpected response:", response.data)
      return []
    }

    const now = new Date()

    const contests = data.map((c) => {
      const startTime = new Date(c.start)
      const endTime   = new Date(c.end)
      const duration  = Math.floor((endTime - startTime) / 1000)

      let status = "upcoming"
      if (now >= startTime && now <= endTime) status = "live"
      if (now > endTime)                      status = "past"

      return {
        externalId: String(c.id),
        platform  : "codechef",
        name      : c.event,
        startTime,
        endTime,
        duration,
        url       : c.href,
        status,
      }
    })

    console.log(`CodeChef: ${contests.length} contests fetched`)
    return contests

  } catch (error) {
    console.error("CodeChef fetch failed:", error.message)
    if (error.response) {
      console.error("Response status:", error.response.status)
      console.error("Response data:",   error.response.data)
    }
    return []
  }
}

module.exports = fetchCodechefContests