// Mock data for Kenko Hospital Management System

export const mockPatients = [
  { id: "P001", name: "Sarah Johnson", age: 34, gender: "Female", phone: "+1 234-567-8901", email: "sarah.j@email.com", status: "Active", lastVisit: "2024-01-15", condition: "Hypertension" },
  { id: "P002", name: "Michael Chen", age: 45, gender: "Male", phone: "+1 234-567-8902", email: "m.chen@email.com", status: "Active", lastVisit: "2024-01-14", condition: "Diabetes Type 2" },
  { id: "P003", name: "Emily Davis", age: 28, gender: "Female", phone: "+1 234-567-8903", email: "emily.d@email.com", status: "Discharged", lastVisit: "2024-01-10", condition: "Fracture" },
  { id: "P004", name: "James Wilson", age: 62, gender: "Male", phone: "+1 234-567-8904", email: "j.wilson@email.com", status: "Critical", lastVisit: "2024-01-15", condition: "Cardiac Arrest" },
  { id: "P005", name: "Lisa Anderson", age: 39, gender: "Female", phone: "+1 234-567-8905", email: "l.anderson@email.com", status: "Active", lastVisit: "2024-01-13", condition: "Asthma" },
  { id: "P006", name: "Robert Taylor", age: 51, gender: "Male", phone: "+1 234-567-8906", email: "r.taylor@email.com", status: "Active", lastVisit: "2024-01-12", condition: "Arthritis" },
  { id: "P007", name: "Amanda Martinez", age: 29, gender: "Female", phone: "+1 234-567-8907", email: "a.martinez@email.com", status: "Discharged", lastVisit: "2024-01-08", condition: "Pregnancy" },
  { id: "P008", name: "David Brown", age: 55, gender: "Male", phone: "+1 234-567-8908", email: "d.brown@email.com", status: "Active", lastVisit: "2024-01-11", condition: "COPD" },
]

export const mockDoctors = [
  { id: "D001", name: "Dr. Elizabeth Harper", specialty: "Cardiology", phone: "+1 234-567-1001", email: "e.harper@kenko.com", status: "Available", patients: 45, rating: 4.9, image: "/placeholder.svg" },
  { id: "D002", name: "Dr. William Foster", specialty: "Neurology", phone: "+1 234-567-1002", email: "w.foster@kenko.com", status: "In Surgery", patients: 38, rating: 4.8, image: "/placeholder.svg" },
  { id: "D003", name: "Dr. Rachel Kim", specialty: "Pediatrics", phone: "+1 234-567-1003", email: "r.kim@kenko.com", status: "Available", patients: 62, rating: 4.9, image: "/placeholder.svg" },
  { id: "D004", name: "Dr. Marcus Johnson", specialty: "Orthopedics", phone: "+1 234-567-1004", email: "m.johnson@kenko.com", status: "On Leave", patients: 41, rating: 4.7, image: "/placeholder.svg" },
  { id: "D005", name: "Dr. Sofia Rodriguez", specialty: "Dermatology", phone: "+1 234-567-1005", email: "s.rodriguez@kenko.com", status: "Available", patients: 55, rating: 4.8, image: "/placeholder.svg" },
  { id: "D006", name: "Dr. Alexander Patel", specialty: "General Medicine", phone: "+1 234-567-1006", email: "a.patel@kenko.com", status: "Available", patients: 78, rating: 4.6, image: "/placeholder.svg" },
]

export const mockAppointments = [
  { id: "A001", patientName: "Sarah Johnson", doctorName: "Dr. Elizabeth Harper", date: "2024-01-16", time: "09:00", type: "Follow-up", status: "Confirmed", department: "Cardiology" },
  { id: "A002", patientName: "Michael Chen", doctorName: "Dr. Alexander Patel", date: "2024-01-16", time: "10:30", type: "Consultation", status: "Confirmed", department: "General Medicine" },
  { id: "A003", patientName: "Emily Davis", doctorName: "Dr. Marcus Johnson", date: "2024-01-16", time: "11:00", type: "Check-up", status: "Pending", department: "Orthopedics" },
  { id: "A004", patientName: "James Wilson", doctorName: "Dr. Elizabeth Harper", date: "2024-01-16", time: "14:00", type: "Emergency", status: "In Progress", department: "Cardiology" },
  { id: "A005", patientName: "Lisa Anderson", doctorName: "Dr. Rachel Kim", date: "2024-01-17", time: "09:30", type: "Consultation", status: "Confirmed", department: "Pediatrics" },
  { id: "A006", patientName: "Robert Taylor", doctorName: "Dr. Sofia Rodriguez", date: "2024-01-17", time: "11:00", type: "Follow-up", status: "Confirmed", department: "Dermatology" },
  { id: "A007", patientName: "Amanda Martinez", doctorName: "Dr. William Foster", date: "2024-01-17", time: "15:00", type: "Consultation", status: "Pending", department: "Neurology" },
  { id: "A008", patientName: "David Brown", doctorName: "Dr. Alexander Patel", date: "2024-01-18", time: "10:00", type: "Check-up", status: "Confirmed", department: "General Medicine" },
]

export const mockInvoices = [
  { id: "INV001", patientName: "Sarah Johnson", date: "2024-01-15", amount: 450.00, status: "Paid", items: ["Consultation", "Blood Test", "ECG"] },
  { id: "INV002", patientName: "Michael Chen", date: "2024-01-14", amount: 320.00, status: "Paid", items: ["Consultation", "Blood Sugar Test"] },
  { id: "INV003", patientName: "Emily Davis", date: "2024-01-10", amount: 1250.00, status: "Pending", items: ["X-Ray", "Casting", "Medication"] },
  { id: "INV004", patientName: "James Wilson", date: "2024-01-15", amount: 3500.00, status: "Partial", items: ["Emergency Care", "ICU", "Surgery"] },
  { id: "INV005", patientName: "Lisa Anderson", date: "2024-01-13", amount: 180.00, status: "Paid", items: ["Consultation", "Inhaler"] },
  { id: "INV006", patientName: "Robert Taylor", date: "2024-01-12", amount: 275.00, status: "Overdue", items: ["Consultation", "Physical Therapy"] },
]

export const mockMedicines = [
  { id: "M001", name: "Amoxicillin 500mg", category: "Antibiotics", stock: 500, unit: "Tablets", price: 0.45, supplier: "PharmaCorp", expiry: "2025-06-15", status: "In Stock" },
  { id: "M002", name: "Metformin 850mg", category: "Diabetes", stock: 350, unit: "Tablets", price: 0.35, supplier: "MediSupply", expiry: "2025-08-20", status: "In Stock" },
  { id: "M003", name: "Lisinopril 10mg", category: "Cardiovascular", stock: 45, unit: "Tablets", price: 0.55, supplier: "PharmaCorp", expiry: "2025-04-10", status: "Low Stock" },
  { id: "M004", name: "Salbutamol Inhaler", category: "Respiratory", stock: 80, unit: "Units", price: 12.50, supplier: "HealthFirst", expiry: "2025-09-30", status: "In Stock" },
  { id: "M005", name: "Ibuprofen 400mg", category: "Pain Relief", stock: 0, unit: "Tablets", price: 0.25, supplier: "MediSupply", expiry: "2025-07-15", status: "Out of Stock" },
  { id: "M006", name: "Omeprazole 20mg", category: "Gastrointestinal", stock: 220, unit: "Capsules", price: 0.40, supplier: "PharmaCorp", expiry: "2025-05-25", status: "In Stock" },
  { id: "M007", name: "Cetirizine 10mg", category: "Antihistamines", stock: 180, unit: "Tablets", price: 0.30, supplier: "HealthFirst", expiry: "2025-10-10", status: "In Stock" },
  { id: "M008", name: "Amlodipine 5mg", category: "Cardiovascular", stock: 25, unit: "Tablets", price: 0.48, supplier: "MediSupply", expiry: "2025-03-20", status: "Low Stock" },
]

export const dashboardStats = {
  totalPatients: 1248,
  todayAppointments: 42,
  availableDoctors: 18,
  monthlyRevenue: 125600,
  patientGrowth: 12.5,
  appointmentGrowth: 8.3,
  revenueGrowth: 15.2,
}

export const patientTrends = [
  { month: "Jul", patients: 980, appointments: 420 },
  { month: "Aug", patients: 1020, appointments: 455 },
  { month: "Sep", patients: 1085, appointments: 490 },
  { month: "Oct", patients: 1120, appointments: 510 },
  { month: "Nov", patients: 1180, appointments: 535 },
  { month: "Dec", patients: 1248, appointments: 560 },
]

export const departmentStats = [
  { name: "Cardiology", patients: 245, color: "var(--chart-1)" },
  { name: "Neurology", patients: 180, color: "var(--chart-2)" },
  { name: "Pediatrics", patients: 320, color: "var(--chart-3)" },
  { name: "Orthopedics", patients: 198, color: "var(--chart-4)" },
  { name: "General", patients: 305, color: "var(--chart-5)" },
]

export const recentActivity = [
  { id: 1, action: "New patient registered", patient: "Amanda White", time: "5 mins ago", type: "patient" },
  { id: 2, action: "Appointment completed", patient: "John Smith", time: "15 mins ago", type: "appointment" },
  { id: 3, action: "Invoice paid", patient: "Sarah Johnson", time: "30 mins ago", type: "billing" },
  { id: 4, action: "Lab results uploaded", patient: "Michael Chen", time: "1 hour ago", type: "lab" },
  { id: 5, action: "Prescription issued", patient: "Emily Davis", time: "2 hours ago", type: "prescription" },
]
