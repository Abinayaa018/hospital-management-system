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
import { Search, Plus, MoreHorizontal, Eye, Download, DollarSign, TrendingUp, Receipt, CreditCard } from "lucide-react"
import { mockInvoices } from "@/lib/mock-data"

export default function BillingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedInvoice, setSelectedInvoice] = useState<typeof mockInvoices[0] | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)

  const filteredInvoices = mockInvoices.filter(
    (invoice) =>
      invoice.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700"
      case "Pending":
        return "bg-yellow-100 text-yellow-700"
      case "Partial":
        return "bg-blue-100 text-blue-700"
      case "Overdue":
        return "bg-red-100 text-red-700"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const totalRevenue = mockInvoices.reduce((sum, inv) => sum + inv.amount, 0)
  const paidAmount = mockInvoices.filter(inv => inv.status === "Paid").reduce((sum, inv) => sum + inv.amount, 0)
  const pendingAmount = mockInvoices.filter(inv => inv.status !== "Paid").reduce((sum, inv) => sum + inv.amount, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Billing</h1>
          <p className="text-muted-foreground">Manage invoices and payments</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Invoice</DialogTitle>
              <DialogDescription>Generate a new invoice for a patient.</DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Patient Name</label>
                  <Input placeholder="Select patient" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Services</label>
                  <Input placeholder="Enter services (comma separated)" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Amount ($)</label>
                  <Input type="number" placeholder="0.00" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline">Cancel</Button>
                <Button type="submit">Create Invoice</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="mt-1 text-2xl font-bold text-foreground">${totalRevenue.toLocaleString()}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Collected</p>
                <p className="mt-1 text-2xl font-bold text-green-600">${paidAmount.toLocaleString()}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="mt-1 text-2xl font-bold text-yellow-600">${pendingAmount.toLocaleString()}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100">
                <Receipt className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="border-border/50">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search invoices by patient name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
          <CardDescription>A list of all billing records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Invoice ID</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Patient</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Date</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-border/50 transition-colors hover:bg-muted/50">
                    <td className="py-4 text-sm font-medium text-primary">{invoice.id}</td>
                    <td className="py-4 text-sm font-medium text-foreground">{invoice.patientName}</td>
                    <td className="py-4 text-sm text-muted-foreground">{invoice.date}</td>
                    <td className="py-4 text-sm font-semibold text-foreground">${invoice.amount.toFixed(2)}</td>
                    <td className="py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(invoice.status)}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => { setSelectedInvoice(invoice); setIsViewOpen(true); }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CreditCard className="mr-2 h-4 w-4" />
                            Record Payment
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

      {/* Invoice Detail Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invoice Details</DialogTitle>
            <DialogDescription>Invoice {selectedInvoice?.id}</DialogDescription>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
                <div>
                  <p className="text-sm text-muted-foreground">Patient</p>
                  <p className="font-semibold">{selectedInvoice.patientName}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(selectedInvoice.status)}`}>
                  {selectedInvoice.status}
                </span>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-muted-foreground">Services</p>
                <ul className="space-y-2">
                  {selectedInvoice.items.map((item, index) => (
                    <li key={index} className="flex items-center justify-between rounded-lg border border-border/50 p-3">
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-4">
                <span className="text-lg font-semibold">Total Amount</span>
                <span className="text-2xl font-bold text-primary">${selectedInvoice.amount.toFixed(2)}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Button className="flex-1 gap-2">
                  <CreditCard className="h-4 w-4" />
                  Pay Now
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
