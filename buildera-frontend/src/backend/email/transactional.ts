import nodemailer from 'nodemailer'
import { queryOne } from '@/db/pool'

interface Setting { value: string | null }

async function getSmtpConfig() {
  const [host, port, user, pass, from] = await Promise.all([
    queryOne<Setting>('SELECT value FROM site_settings WHERE `key` = ?', ['smtp_host']),
    queryOne<Setting>('SELECT value FROM site_settings WHERE `key` = ?', ['smtp_port']),
    queryOne<Setting>('SELECT value FROM site_settings WHERE `key` = ?', ['smtp_user']),
    queryOne<Setting>('SELECT value FROM site_settings WHERE `key` = ?', ['smtp_pass']),
    queryOne<Setting>('SELECT value FROM site_settings WHERE `key` = ?', ['smtp_from']),
  ])
  return {
    host: host?.value || process.env.SMTP_HOST || '',
    port: Number(port?.value || process.env.SMTP_PORT || 587),
    user: user?.value || process.env.SMTP_USER || '',
    pass: pass?.value || process.env.SMTP_PASS || '',
    from: from?.value || process.env.SMTP_FROM || 'no-reply@buildera.co',
  }
}

export async function sendEmail(opts: {
  to: string
  subject: string
  html: string
}): Promise<void> {
  const config = await getSmtpConfig()
  if (!config.host) {
    console.warn('[email] SMTP not configured — skipping send')
    return
  }
  const transport = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: { user: config.user, pass: config.pass },
  })
  await transport.sendMail({ from: config.from, to: opts.to, subject: opts.subject, html: opts.html })
}

export async function sendMeetingConfirmation(to: string, name: string, meetingLink: string, adminNotes?: string) {
  await sendEmail({
    to,
    subject: 'Your meeting with Buildera is confirmed',
    html: `
      <h2>Hi ${name},</h2>
      <p>Your meeting with the Buildera team has been approved.</p>
      ${meetingLink ? `<p><a href="${meetingLink}">Join your meeting</a></p>` : ''}
      ${adminNotes ? `<p><strong>Notes:</strong> ${adminNotes}</p>` : ''}
      <p>Looking forward to speaking with you.</p>
      <p>— The Buildera Team</p>
    `,
  })
}
