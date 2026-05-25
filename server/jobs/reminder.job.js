// server/jobs/reminder.job.js

const cron               = require("node-cron");
const Bookmark           = require("../models/Bookmark.model");
const User               = require("../models/User.model");
const { transporter }    = require("../config/nodemailer");

const startReminderJob = () => {

  // runs every hour at minute 0
  // cron syntax: "0 * * * *"
  // ┌──── minute (0)
  // │ ┌── hour   (every hour)
  // │ │ ┌─ day of month (every day)
  // │ │ │ ┌ month (every month)
  // │ │ │ │ ┌ day of week (every day)
  // 0 * * * *

  cron.schedule("0 * * * *", async () => {
    console.log("Running contest reminder job...");

    try {
      const now         = new Date();
      const in30Minutes = new Date(now.getTime() + 30 * 60 * 1000);
      const in35Minutes = new Date(now.getTime() + 35 * 60 * 1000);

      // find bookmarks where the contest starts in ~30 minutes
      // we use a 5 minute window (30-35 mins) to avoid
      // sending reminders multiple times
      const upcomingBookmarks = await Bookmark.find({
        startTime: {
          $gte: in30Minutes,
          $lte: in35Minutes,
        },
      });

      if (upcomingBookmarks.length === 0) {
        console.log("No contests starting soon — no reminders to send");
        return;
      }

      console.log(`Sending reminders for ${upcomingBookmarks.length} bookmarks`);

      for (const bookmark of upcomingBookmarks) {
        try {
          // get the user who saved this bookmark
          const user = await User.findById(bookmark.userId);

          // skip if user doesn't exist or turned off notifications
          if (!user || !user.emailNotifications) continue;

          const startTimeFormatted = bookmark.startTime
            ? bookmark.startTime.toUTCString()
            : "Soon";

          await transporter.sendMail({
            from   : `"ContestHub" <${process.env.EMAIL_USER}>`,
            to     : user.email,
            subject: ` Reminder: ${bookmark.contestName} starts in 30 minutes!`,
            html   : `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #6366f1;">ContestHub Reminder</h2>
                <p>Hey ${user.name},</p>
                <p>
                  Your bookmarked contest is starting soon!
                </p>
                <div style="background: #1e293b; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #e2e8f0; margin: 0 0 8px 0;">${bookmark.contestName}</h3>
                  <p style="color: #94a3b8; margin: 4px 0;">
                    Platform: <strong style="color: #6366f1; text-transform: capitalize;">
                      ${bookmark.platform}
                    </strong>
                  </p>
                  <p style="color: #94a3b8; margin: 4px 0;">
                    Starts at: <strong style="color: #e2e8f0;">${startTimeFormatted}</strong>
                  </p>
                </div>
                
                  href="${bookmark.url}"
                  style="
                    background: #6366f1;
                    color: white;
                    padding: 12px 24px;
                    border-radius: 6px;
                    text-decoration: none;
                    display: inline-block;
                  "
                >
                  Go to Contest →
                </a>
                <p style="color: #94a3b8; margin-top: 24px; font-size: 12px;">
                  You're receiving this because you bookmarked this contest on ContestHub.
                  <br/>
                  To stop reminders, update your preferences in your profile.
                </p>
              </div>
            `,
          });

          console.log(`Reminder sent to ${user.email} for ${bookmark.contestName}`);

        } catch (emailError) {
          // if one email fails, continue with the rest
          console.error(`Failed to send reminder to user ${bookmark.userId}:`, emailError.message);
        }
      }

    } catch (error) {
      console.error("Reminder job failed:", error.message);
    }
  });

  console.log(" Reminder cron job scheduled (runs every hour)");
};

module.exports = startReminderJob;