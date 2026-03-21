const BASE = "http://localhost:8000"

export async function analyzeDocuments(resumeFile: File, jdFile: File) {
  const form = new FormData()
  form.append("resume", resumeFile)
  form.append("jd", jdFile)

  const res = await fetch(`${BASE}/analyze`, { method: "POST", body: form })
  if (!res.ok) throw new Error("Analysis failed")
  return res.json()
}
