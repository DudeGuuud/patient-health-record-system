"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X, FileText, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"

interface FileUploadProps {
  recordType: string
}

export function FileUpload({ recordType }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [uploadComplete, setUploadComplete] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList)
    setFiles((prev) => [...prev, ...newFiles])
    setUploadComplete(false)
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
    setUploadComplete(false)
  }

  const uploadFiles = () => {
    if (files.length === 0) return

    setUploading(true)
    setProgress(0)
    setUploadComplete(false)

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploading(false)
          setUploadComplete(true)
          return 100
        }
        return prev + 5
      })
    }, 200)
  }

  const isInpatient = recordType === "inpatient"
  const color = isInpatient ? "blue" : "green"
  const colorClasses = {
    blue: {
      border: "border-blue-300",
      bg: "bg-blue-50",
      text: "text-blue-500",
      hover: "hover:border-blue-400 hover:bg-blue-50",
      button: "from-blue-500 to-blue-600",
      shadow: "hover:shadow-blue-200",
    },
    green: {
      border: "border-green-300",
      bg: "bg-green-50",
      text: "text-green-500",
      hover: "hover:border-green-400 hover:bg-green-50",
      button: "from-green-500 to-green-600",
      shadow: "hover:shadow-green-200",
    },
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0.8 }}
        animate={{
          opacity: 1,
          boxShadow: isDragging
            ? `0 0 0 3px rgba(${isInpatient ? "59, 130, 246" : "34, 197, 94"}, 0.5), 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)`
            : "0 0 0 0 rgba(59, 130, 246, 0), 0 0 0 0 rgba(0, 0, 0, 0), 0 0 0 0 rgba(0, 0, 0, 0)",
        }}
        transition={{ duration: 0.3 }}
        className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all ${
          isDragging
            ? `${colorClasses[color].border} ${colorClasses[color].bg}`
            : `border-gray-300 ${colorClasses[color].hover}`
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <motion.div
          animate={{
            y: isDragging ? -10 : 0,
            scale: isDragging ? 1.1 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Upload className={`mb-4 h-12 w-12 ${isDragging ? colorClasses[color].text : "text-gray-400"}`} />
        </motion.div>
        <p className="mb-2 text-base font-medium">将文件拖放到此处，或</p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className={`${colorClasses[color].border} bg-white shadow-sm transition-all duration-300 hover:shadow-md`}
          >
            选择文件
          </Button>
        </motion.div>
        <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileChange} />
      </motion.div>

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-3 overflow-hidden"
          >
            <h4 className="font-medium">已选择的文件</h4>
            <ul className="space-y-2">
              {files.map((file, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="flex items-center justify-between rounded-lg border bg-white p-3 shadow-sm transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className={`rounded-full ${colorClasses[color].bg} p-2`}>
                      <FileText className={`h-5 w-5 ${colorClasses[color].text}`} />
                    </div>
                    <span className="text-sm font-medium">{file.name}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeFile(index)}
                    className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </motion.button>
                </motion.li>
              ))}
            </ul>

            {uploading ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                <Progress value={progress} className="h-2 w-full" color={color} />
                <p className="text-sm text-gray-500">上传中... {progress}%</p>
              </motion.div>
            ) : uploadComplete ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-lg ${isInpatient ? "bg-blue-50 text-blue-700" : "bg-green-50 text-green-700"} p-3`}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>文件上传成功！</span>
                </div>
              </motion.div>
            ) : (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={uploadFiles}
                  className={`mt-2 w-full bg-gradient-to-r ${colorClasses[color].button} shadow-md transition-all duration-300 ${colorClasses[color].shadow}`}
                >
                  上传文件
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
