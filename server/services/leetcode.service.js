// server/services/leetcode.service.js

const axios = require("axios")

const fetchLeetcodeContests = async () => {
  try {
    console.log("Fetching LeetCode contests...")

    // LeetCode has a public GraphQL API — no key needed
    const response = await axios.post(
      "https://leetcode.com/graphql",
      {
        query: `
          {
            allContests {
              title
              titleSlug
              startTime
              duration
            }
          }
        `,
      },
      {
        timeout: 15000,
        headers: {
          "Content-Type": "application/json",
          "Referer"     : "https://leetcode.com",
        },
      }
    )

    const allContests = response.data?.data?.allContests

    if (!Array.isArray(allContests)) {
      console.error("LeetCode GraphQL unexpected response")
      return []
    }

    const now        = new Date()
    const sevenDays  = 7 * 24 * 60 * 60 * 1000

    const contests = allContests
      .filter((c) => {
        const startMs = c.startTime * 1000
        const endMs   = startMs + c.duration * 1000
        return endMs > now.getTime() - sevenDays
      })
      .map((c) => {
        const startTime = new Date(c.startTime * 1000)
        const endTime   = new Date((c.startTime + c.duration) * 1000)

        let status = "upcoming"
        if (now >= startTime && now <= endTime) status = "live"
        if (now > endTime)                      status = "past"

        return {
          externalId: c.titleSlug,
          platform  : "leetcode",
          name      : c.title,
          startTime,
          endTime,
          duration  : c.duration,
          url       : `https://leetcode.com/contest/${c.titleSlug}`,
          status,
        }
      })

    console.log(`LeetCode: ${contests.length} contests fetched`)
    return contests

  } catch (error) {
    console.error("LeetCode fetch failed:", error.message)
    return []
  }
}

module.exports = fetchLeetcodeContests