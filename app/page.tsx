import { WalletConnect } from "@/components/wallet-connect"
import { RecordTypeCard } from "@/components/record-type-card"
import { PageTransition } from "@/components/page-transition"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold text-gray-800">医疗记录管理系统</h1>
          <WalletConnect />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <PageTransition>
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center text-3xl font-semibold text-gray-800">请选择病历类型</h2>
            <p className="mb-10 text-center text-gray-600">请先选择您要上传的病历类型，然后在下一步中上传相关文件</p>

            <div className="grid gap-8 md:grid-cols-2">
              <RecordTypeCard
                title="住院病历"
                description="详细的住院记录，包含完整的体征和治疗信息"
                icon="hospital"
                recordType="inpatient"
                color="blue"
              />

              <RecordTypeCard
                title="门诊病历"
                description="简洁的门诊记录，包含基本诊断和处方信息"
                icon="stethoscope"
                recordType="outpatient"
                color="green"
              />
            </div>
          </div>
        </PageTransition>
      </main>
    </div>
  )
}
