'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ChangePasswordPage() {
  const router = useRouter()
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (next !== confirm) { setError('New passwords do not match'); return }
    if (next.length < 8) { setError('Password must be at least 8 characters'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: current, newPassword: next }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Failed to change password'); return }
      router.push('/admin')
      router.refresh()
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 rounded-lg bg-[#002BFF] flex items-center justify-center">
            <span className="text-white font-bold">B</span>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Buildera</p>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>
        </div>
        <h1 className="text-xl font-semibold text-gray-900 mb-1">Set a new password</h1>
        <p className="text-sm text-gray-500 mb-6">Your account requires a password change before continuing.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {(['Current password', 'New password', 'Confirm new password'] as const).map((lbl, i) => (
            <div key={lbl}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{lbl}</label>
              <input
                type="password"
                required
                minLength={i > 0 ? 8 : undefined}
                value={i === 0 ? current : i === 1 ? next : confirm}
                onChange={e => (i === 0 ? setCurrent : i === 1 ? setNext : setConfirm)(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002BFF]"
                placeholder="••••••••"
              />
            </div>
          ))}
          {error && <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-[#002BFF] hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-60"
          >
            {loading ? 'Saving…' : 'Set new password'}
          </button>
        </form>
      </div>
    </div>
  )
}
