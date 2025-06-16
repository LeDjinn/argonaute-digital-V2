"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"

type FormData = {
  name: string
  email: string
  company: string
  service: string
}

export default function PriceForm({ onSubmit }: { onSubmit: (data: FormData) => void }) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    service: "AI Solutions",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleServiceChange = (value: string) => {
    setFormData((prev) => ({ ...prev, service: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
            className="bg-black/20 border-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            required
            className="bg-black/20 border-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Your company name"
            required
            className="bg-black/20 border-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="service">Service</Label>
          <Select value={formData.service} onValueChange={handleServiceChange}>
            <SelectTrigger className="bg-black/20 border-none">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AI Solutions">AI Solutions</SelectItem>
              <SelectItem value="Cloud Services">Cloud Services</SelectItem>
              <SelectItem value="Data Analytics">Data Analytics</SelectItem>
              <SelectItem value="Custom Development">Custom Development</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 border-none">
          Get Price Quote
        </Button>
      </form>
    </motion.div>
  )
}
