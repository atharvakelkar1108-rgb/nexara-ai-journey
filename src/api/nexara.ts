const BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function parseApiError(body: string, status: number): string {
  try {
    const parsed = JSON.parse(body) as { detail?: string }
    if (parsed.detail) return parsed.detail
  } catch {
    // Response was not JSON — fall through to raw body.
  }
  return body || `Analysis failed (${status})`
}

export async function analyzeDocuments(resumeFile: File, jdFile: File) {
  const form = new FormData()
  form.append("resume", resumeFile)
  form.append("jd", jdFile)

  let res: Response
  try {
    res = await fetch(`${BASE}/analyze`, { method: "POST", body: form })
  } catch {
    throw new Error(
      `Could not reach the backend at ${BASE}. If you are using the live site, the API may be down or blocked by CORS. For local development, run the backend on port 8000.`
    )
  }

  if (!res.ok) {
    const body = await res.text()
    throw new Error(parseApiError(body, res.status))
  }
  return res.json()
}
