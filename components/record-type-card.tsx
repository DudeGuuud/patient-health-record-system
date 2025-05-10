"use client"

import Link from "next/link"
import { Building2, Stethoscope } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface RecordTypeCardProps {
  title: string
  description: string
  icon: "hospital" | "stethoscope"
  recordType: "inpatient" | "outpatient"
  color: "blue" | "green"
}

export function RecordTypeCard({ title, description, icon, recordType, color }: RecordTypeCardProps) {
  const colorClasses = {
    blue: {
      icon: "text-blue-500",
      gradient: "from-blue-50 to-blue-100",
      shadow: "shadow-blue-200",
      button: "bg-blue-500 hover:bg-blue-600 shadow-md hover:shadow-blue-200",
    },
    green: {
      icon: "text-green-500",
      gradient: "from-green-50 to-green-100",
      shadow: "shadow-green-200",
      button: "bg-green-500 hover:bg-green-600 shadow-md hover:shadow-green-200",
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
    >
      <Card
        className={`overflow-hidden border-none bg-gradient-to-br ${colorClasses[color].gradient} shadow-lg transition-all duration-300 hover:shadow-xl`}
      >
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <motion.div
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className={`rounded-full bg-white p-3 ${colorClasses[color].shadow}`}
          >
            {icon === "hospital" ? (
              <Building2 className={`h-8 w-8 ${colorClasses[color].icon}`} />
            ) : (
              <Stethoscope className={`h-8 w-8 ${colorClasses[color].icon}`} />
            )}
          </motion.div>
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription className="text-sm opacity-80">{description}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            {recordType === "inpatient"
              ? "住院病历包含详细的患者信息、诊断、治疗方案和体征记录。大部分常规体征可以使用标准模板。"
              : "门诊病历数量较多但信息量较少，主要记录基本诊断和处方信息。"}
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild className={`w-full ${colorClasses[color].button}`}>
            <Link href={`/records/${recordType}`}>查看{recordType === "inpatient" ? "住院" : "门诊"}病历</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
