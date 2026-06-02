"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Plus, Star, Phone, Mail, Users, Stethoscope } from "lucide-react"
import { mockDoctors } from "@/lib/mock-data"

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDoctor, setSelectedDoctor] = useState<typeof mockDoctors[0] | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)

  const filteredDoctors = mockDoctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-700"
      case "In Surgery":
        return "bg-red-100 text-red-700"
      case "On Leave":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-primary/10 text-primary"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Doctors</h1>
          <p className="text-muted-foreground">Manage doctor profiles and schedules</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Doctor
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Doctor</DialogTitle>
              <DialogDescription>Enter the doctor&apos;s information below.</DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input placeholder="Dr. John Smith" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Specialty</label>
                  <Input placeholder="Cardiology" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input placeholder="+1 234-567-8900" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="doctor@kenko.com" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline">Cancel</Button>
                <Button type="submit">Save Doctor</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card className="border-border/50">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search doctors by name or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Doctors Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDoctors.map((doctor) => (
          <Card
            key={doctor.id}
            className="border-border/50 transition-all hover:border-primary/30 hover:shadow-md cursor-pointer"
            onClick={() => { setSelectedDoctor(doctor); setIsViewOpen(true); }}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="bg-primary/10 text-lg text-primary">
                    {doctor.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{doctor.name}</h3>
                      <p className="text-sm text-primary">{doctor.specialty}</p>
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(doctor.status)}`}>
                      {doctor.status}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{doctor.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{doctor.patients} patients</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Doctor Detail Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Doctor Profile</DialogTitle>
            <DialogDescription>Complete information for {selectedDoctor?.name}</DialogDescription>
          </DialogHeader>
          {selectedDoctor && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="bg-primary/10 text-2xl text-primary">
                    {selectedDoctor.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedDoctor.name}</h3>
                  <p className="text-primary">{selectedDoctor.specialty}</p>
                  <span className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(selectedDoctor.status)}`}>
                    {selectedDoctor.status}
                  </span>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Rating</p>
                    <p className="font-semibold">{selectedDoctor.rating} / 5.0</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Patients</p>
                    <p className="font-semibold">{selectedDoctor.patients}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Stethoscope className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Department</p>
                    <p className="font-semibold">{selectedDoctor.specialty}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-sm font-bold text-primary">{selectedDoctor.id}</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Doctor ID</p>
                    <p className="font-semibold">{selectedDoctor.id}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Contact Information</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {selectedDoctor.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {selectedDoctor.email}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
