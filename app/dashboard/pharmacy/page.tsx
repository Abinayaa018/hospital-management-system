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
import { Search, Plus, MoreHorizontal, Edit, Package, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { mockMedicines } from "@/lib/mock-data"

export default function PharmacyPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("All")

  const categories = ["All", ...Array.from(new Set(mockMedicines.map(m => m.category)))]

  const filteredMedicines = mockMedicines.filter((medicine) => {
    const matchesSearch =
      medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === "All" || medicine.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-700"
      case "Low Stock":
        return "bg-yellow-100 text-yellow-700"
      case "Out of Stock":
        return "bg-red-100 text-red-700"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "In Stock":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Low Stock":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "Out of Stock":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const inStockCount = mockMedicines.filter(m => m.status === "In Stock").length
  const lowStockCount = mockMedicines.filter(m => m.status === "Low Stock").length
  const outOfStockCount = mockMedicines.filter(m => m.status === "Out of Stock").length

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pharmacy</h1>
          <p className="text-muted-foreground">Manage medicine inventory and stock</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Medicine
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Medicine</DialogTitle>
              <DialogDescription>Enter the medicine details below.</DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium">Medicine Name</label>
                  <Input placeholder="Amoxicillin 500mg" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Input placeholder="Antibiotics" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Stock Quantity</label>
                  <Input type="number" placeholder="100" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price ($)</label>
                  <Input type="number" step="0.01" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Expiry Date</label>
                  <Input type="date" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium">Supplier</label>
                  <Input placeholder="PharmaCorp" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline">Cancel</Button>
                <Button type="submit">Add Medicine</Button>
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
                <p className="text-sm font-medium text-muted-foreground">In Stock</p>
                <p className="mt-1 text-2xl font-bold text-green-600">{inStockCount}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Low Stock</p>
                <p className="mt-1 text-2xl font-bold text-yellow-600">{lowStockCount}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Out of Stock</p>
                <p className="mt-1 text-2xl font-bold text-red-600">{outOfStockCount}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search medicines by name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={filterCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medicines Table */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Inventory</CardTitle>
          <CardDescription>Complete list of medicines in stock</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 text-sm font-medium text-muted-foreground">ID</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Medicine</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Category</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Stock</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Price</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Expiry</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMedicines.map((medicine) => (
                  <tr key={medicine.id} className="border-b border-border/50 transition-colors hover:bg-muted/50">
                    <td className="py-4 text-sm font-medium text-primary">{medicine.id}</td>
                    <td className="py-4">
                      <div>
                        <p className="font-medium text-foreground">{medicine.name}</p>
                        <p className="text-xs text-muted-foreground">{medicine.supplier}</p>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="rounded bg-muted px-2 py-1 text-xs">{medicine.category}</span>
                    </td>
                    <td className="py-4 text-sm text-foreground">
                      {medicine.stock} {medicine.unit}
                    </td>
                    <td className="py-4 text-sm font-medium text-foreground">${medicine.price.toFixed(2)}</td>
                    <td className="py-4 text-sm text-muted-foreground">{medicine.expiry}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(medicine.status)}
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(medicine.status)}`}>
                          {medicine.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Package className="mr-2 h-4 w-4" />
                            Update Stock
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
    </div>
  )
}
