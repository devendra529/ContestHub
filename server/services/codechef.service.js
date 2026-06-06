const axios = require("axios")

const fetchCodechefContests = async () => {

  // try 1 — CodeChef official API
  try {
    console.log("Fetching CodeChef contests...")

    const response = await axios.get(
      "https://www.codechef.com/api/list/contests/all",
      {
        timeout: 15000,
        params : {
          sort_by      : "START",
          sorting_order: "asc",
          offset       : 0,
          mode         : "all",
        },
        headers: {
          "User-Agent"      : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
          "Accept"          : "application/json",
          "Accept-Language" : "en-US,en;q=0.9",
          "Referer"         : "https://www.codechef.com/contests",
          "Origin"          : "https://www.codechef.com",
        },
      }
    )

    const data = response.data

    if (!data || typeof data !== "object") {
      throw new Error("Invalid CodeChef response")
    }

    const now         = new Date()
    const allContests = [
      ...(data.future_contests  || []),
      ...(data.present_contests || []),
      ...(data.past_contests    || []).slice(0, 10),
    ]

    if (allContests.length === 0) {
      throw new Error("CodeChef returned 0 contests")
    }

    const contests = allContests.map((c) => {
      const startTime = new Date(
        c.contest_start_date_iso ||
        c.contest_start_date     ||
        c.start_date
      )
      const endTime = new Date(
        c.contest_end_date_iso ||
        c.contest_end_date     ||
        c.end_date
      )
      const duration = Math.floor((endTime - startTime) / 1000)

      let status = "upcoming"
      if (now >= startTime && now <= endTime) status = "live"
      if (now > endTime)                      status = "past"

      return {
        externalId: c.contest_code  || String(c.code),
        platform  : "codechef",
        name      : c.contest_name  || c.name,
        startTime,
        endTime,
        duration,
        url       : `https://www.codechef.com/${c.contest_code || c.code}`,
        status,
      }
    })

    console.log(`CodeChef: ${contests.length} contests fetched`)
    return contests

  } catch (error) {
    console.error("CodeChef API failed:", error.message)

    // try 2 — Kontests fallback
    try {
      console.log("Trying CodeChef via Kontests fallback...")

      const res = await axios.get(
        "https://kontests.net/api/v1/code_chef",
        {
          timeout: 10000,
          headers: {
            "User-Agent": "Mozilla/5.0",
          },
        }
      )

      if (!Array.isArray(res.data) || res.data.length === 0) {
        throw new Error("Kontests returned empty")
      }

      const now = new Date()

      const contests = res.data.map((c) => {
        const startTime = new Date(c.start_time)
        const endTime   = new Date(c.end_time)
        const duration  = Math.floor((endTime - startTime) / 1000)

        let status = "upcoming"
        if (now >= startTime && now <= endTime) status = "live"
        if (now > endTime)                      status = "past"

        return {
          externalId: c.name.replace(/\s+/g, "-").toLowerCase(),
          platform  : "codechef",
          name      : c.name,
          startTime,
          endTime,
          duration,
          url       : c.url,
          status,
        }
      })

      console.log(`CodeChef fallback: ${contests.length} contests`)
      return contests

    } catch (fallbackError) {
      console.error("CodeChef fallback failed:", fallbackError.message)

      // try 3 — CLIST if key exists
      if (process.env.CLIST_API_KEY) {
        try {
          console.log("Trying CodeChef via CLIST...")

          const clistRes = await axios.get(
            "https://clist.by/api/v4/contest/",
            {
              timeout: 10000,
              params : {
                resource    : "codechef.com",
                order_by    : "start",
                limit       : 20,
                format_time : true,
              },
              headers: {
                Authorization: `ApiKey ${process.env.CLIST_API_KEY}`,
              },
            }
          )

          const data = clistRes.data?.objects

          if (!Array.isArray(data)) return []

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

          console.log(`CodeChef CLIST: ${contests.length} contests`)
          return contests

        } catch (clistError) {
          console.error("CodeChef CLIST failed:", clistError.message)
          return []
        }
      }

      return []
    }
  }
}

module.exports = fetchCodechefContests