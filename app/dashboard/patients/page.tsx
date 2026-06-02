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
import { Search, Plus, MoreHorizontal, Eye, Edit, Trash2, Phone, Mail } from "lucide-react"
import { mockPatients } from "@/lib/mock-data"

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<typeof mockPatients[0] | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)

  const filteredPatients = mockPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700"
      case "Critical":
        return "bg-red-100 text-red-700"
      case "Discharged":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-primary/10 text-primary"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Patients</h1>
          <p className="text-muted-foreground">Manage and view patient records</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Patient
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
              <DialogDescription>Enter the patient&apos;s information below.</DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Age</label>
                  <Input type="number" placeholder="25" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Gender</label>
                  <Input placeholder="Male / Female" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input placeholder="+1 234-567-8900" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="patient@email.com" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium">Condition</label>
                  <Input placeholder="Primary condition or reason for visit" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline">Cancel</Button>
                <Button type="submit">Save Patient</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card className="border-border/50">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search patients by name, ID, or condition..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Patients Table */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>All Patients</CardTitle>
          <CardDescription>A list of all registered patients in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Patient ID</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Name</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Age/Gender</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Condition</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Last Visit</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="border-b border-border/50 transition-colors hover:bg-muted/50">
                    <td className="py-4 text-sm font-medium text-primary">{patient.id}</td>
                    <td className="py-4">
                      <div>
                        <p className="font-medium text-foreground">{patient.name}</p>
                        <p className="text-xs text-muted-foreground">{patient.email}</p>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-foreground">
                      {patient.age} / {patient.gender}
                    </td>
                    <td className="py-4 text-sm text-foreground">{patient.condition}</td>
                    <td className="py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(patient.status)}`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-muted-foreground">{patient.lastVisit}</td>
                    <td className="py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => { setSelectedPatient(patient); setIsViewOpen(true); }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Patient Detail Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Patient Details</DialogTitle>
            <DialogDescription>Complete information for {selectedPatient?.name}</DialogDescription>
          </DialogHeader>
          {selectedPatient && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-2xl font-bold text-primary">
                    {selectedPatient.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedPatient.name}</h3>
                  <p className="text-sm text-muted-foreground">Patient ID: {selectedPatient.id}</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground">Age / Gender</p>
                  <p className="font-medium">{selectedPatient.age} years / {selectedPatient.gender}</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground">Status</p>
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(selectedPatient.status)}`}>
                    {selectedPatient.status}
                  </span>
                </div>
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground">Condition</p>
                  <p className="font-medium">{selectedPatient.condition}</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground">Last Visit</p>
                  <p className="font-medium">{selectedPatient.lastVisit}</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Contact Information</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {selectedPatient.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {selectedPatient.email}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
