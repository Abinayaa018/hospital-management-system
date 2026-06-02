"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Calendar, Clock, User, Stethoscope, CheckCircle, XCircle } from "lucide-react"
import { mockAppointments } from "@/lib/mock-data"

export default function AppointmentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("All")

  const filteredAppointments = mockAppointments.filter((apt) => {
    const matchesSearch =
      apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.department.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "All" || apt.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700"
      case "Pending":
        return "bg-yellow-100 text-yellow-700"
      case "In Progress":
        return "bg-primary/10 text-primary"
      case "Completed":
        return "bg-gray-100 text-gray-700"
      case "Cancelled":
        return "bg-red-100 text-red-700"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Emergency":
        return "bg-red-500"
      case "Follow-up":
        return "bg-primary"
      case "Consultation":
        return "bg-blue-500"
      case "Check-up":
        return "bg-green-500"
      default:
        return "bg-muted-foreground"
    }
  }

  const statusFilters = ["All", "Confirmed", "Pending", "In Progress", "Completed", "Cancelled"]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Appointments</h1>
          <p className="text-muted-foreground">Schedule and manage patient appointments</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Schedule New Appointment</DialogTitle>
              <DialogDescription>Fill in the appointment details below.</DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Patient Name</label>
                  <Input placeholder="Select patient" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Doctor</label>
                  <Input placeholder="Select doctor" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time</label>
                  <Input type="time" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium">Appointment Type</label>
                  <Input placeholder="Consultation, Follow-up, etc." />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline">Cancel</Button>
                <Button type="submit">Schedule</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card className="border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by patient, doctor, or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {statusFilters.map((status) => (
                <Button
                  key={status}
                  variant={filterStatus === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus(status)}
                  className="whitespace-nowrap"
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointments List */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>All Appointments</CardTitle>
          <CardDescription>
            {filteredAppointments.length} appointment{filteredAppointments.length !== 1 ? "s" : ""} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAppointments.map((apt) => (
              <div
                key={apt.id}
                className="flex flex-col gap-4 rounded-lg border border-border/50 p-4 transition-colors hover:bg-muted/30 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-4">
                  <div className={`mt-1 h-3 w-3 rounded-full ${getTypeColor(apt.type)}`} />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{apt.patientName}</h3>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(apt.status)}`}>
                        {apt.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Stethoscope className="h-4 w-4" />
                        {apt.doctorName}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {apt.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {apt.time}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="rounded bg-muted px-2 py-0.5 text-xs">{apt.type}</span>
                      <span className="text-muted-foreground">{apt.department}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <CheckCircle className="h-4 w-4" />
                    <span className="hidden sm:inline">Confirm</span>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1 text-destructive hover:text-destructive">
                    <XCircle className="h-4 w-4" />
                    <span className="hidden sm:inline">Cancel</span>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        View Patient
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Stethoscope className="mr-2 h-4 w-4" />
                        View Doctor
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Calendar className="mr-2 h-4 w-4" />
                        Reschedule
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
