// server/services/codechef.service.js

const axios = require("axios")

const fetchCodechefContests = async () => {
  try {
    console.log("Fetching CodeChef contests...")

    // CodeChef public contests API — no key needed
    const response = await axios.get(
      "https://www.codechef.com/api/list/contests/all",
      {
        timeout: 15000,
        params : {
          sort_by   : "START",
          sorting_order: "asc",
          offset    : 0,
          mode      : "all",
        },
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      }
    )

    const data = response.data

    if (!data) {
      console.error("CodeChef unexpected response")
      return []
    }

    const now      = new Date()
    const allContests = [
      ...(data.future_contests  || []),
      ...(data.present_contests || []),
      ...(data.past_contests    || []).slice(0, 5),
    ]

    const contests = allContests.map((c) => {
      const startTime = new Date(c.contest_start_date_iso || c.contest_start_date)
      const endTime   = new Date(c.contest_end_date_iso   || c.contest_end_date)
      const duration  = Math.floor((endTime - startTime) / 1000)

      let status = "upcoming"
      if (now >= startTime && now <= endTime) status = "live"
      if (now > endTime)                      status = "past"

      return {
        externalId: c.contest_code,
        platform  : "codechef",
        name      : c.contest_name,
        startTime,
        endTime,
        duration,
        url       : `https://www.codechef.com/${c.contest_code}`,
        status,
      }
    })

    console.log(`CodeChef: ${contests.length} contests fetched`)
    return contests

  } catch (error) {
    console.error("CodeChef fetch failed:", error.message)
    return []
  }
}

module.exports = fetchCodechefContests