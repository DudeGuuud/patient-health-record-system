import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageTransition } from "@/components/page-transition"
import { FileUpload } from "@/components/file-upload"

interface RecordPageProps {
  params: {
    type: string
  }
}

export default function RecordPage({ params }: RecordPageProps) {
  const isInpatient = params.type === "inpatient"
  const color = isInpatient ? "blue" : "green"
  const colorClasses = {
    blue: "bg-blue-50 border-blue-100 text-blue-800",
    green: "bg-green-50 border-green-100 text-green-800",
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold text-gray-800">医疗记录管理系统</h1>
          <Button variant="ghost" asChild className="flex items-center gap-1">
            <Link href="/">
              <ChevronLeft className="h-4 w-4" />
              返回首页
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <PageTransition>
          <div className="mx-auto max-w-4xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">{isInpatient ? "上传住院病历" : "上传门诊病历"}</h1>
              <p className="mt-2 text-gray-500">
                {isInpatient
                  ? "上传详细的住院记录，包含完整的体征和治疗信息"
                  : "上传简洁的门诊记录，包含基本诊断和处方信息"}
              </p>
            </div>

            <div className="mb-10 overflow-hidden rounded-xl border bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
              <h3 className="mb-6 text-2xl font-medium text-gray-800">上传{isInpatient ? "住院" : "门诊"}病历文件</h3>
              <FileUpload recordType={params.type} />
            </div>

            <div className="rounded-xl border bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
              <h3 className="mb-4 text-xl font-medium text-gray-800">已上传的{isInpatient ? "住院" : "门诊"}病历</h3>
              <div className={`rounded-lg border p-4 ${colorClasses[color]}`}>
                <p className="text-sm">暂无{isInpatient ? "住院" : "门诊"}病历记录。请上传新的病历文件。</p>
              </div>
            </div>
          </div>
        </PageTransition>
      </div>
    </div>
  )
}
