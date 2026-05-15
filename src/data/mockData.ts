export const stats = {
  revenue: { value: "Rp 4,82 M", change: "+12,4%", up: true },
  orders: { value: "328", change: "+8,2%", up: true },
  materials: { value: "1.247", change: "+24 item", up: true },
  properties: { value: "86", change: "3 baru", up: true },
  lowStock: { value: "14", change: "perlu restock", up: false },
  pendingLeads: { value: "47", change: "+6 hari ini", up: true },
};

export const salesTrend = [
  { bulan: "Jan", material: 420, properti: 890 },
  { bulan: "Feb", material: 510, properti: 720 },
  { bulan: "Mar", material: 680, properti: 1100 },
  { bulan: "Apr", material: 590, properti: 950 },
  { bulan: "Mei", material: 740, properti: 1280 },
  { bulan: "Jun", material: 820, properti: 1450 },
];

export const categoryBreakdown = [
  { name: "Semen & Mortar", value: 28, color: "#4a7350" },
  { name: "Besi & Baja", value: 22, color: "#6d9470" },
  { name: "Keramik & Lantai", value: 18, color: "#9bb89d" },
  { name: "Cat & Finishing", value: 14, color: "#c17f3a" },
  { name: "Pipa & Plumbing", value: 10, color: "#a66a2f" },
  { name: "Lainnya", value: 8, color: "#5c6760" },
];

export const recentOrders = [
  {
    id: "ORD-2847",
    customer: "PT Mitra Konstruksi",
    type: "Material",
    items: "Semen 200 sak, Besi 12Ø",
    total: "Rp 48,5 jt",
    status: "Dikirim",
    date: "15 Mei 2026",
  },
  {
    id: "ORD-2846",
    customer: "Budi Santoso",
    type: "Properti",
    items: "Rumah Type 45 — Cluster Harmoni",
    total: "Rp 385 jt",
    status: "Negosiasi",
    date: "15 Mei 2026",
  },
  {
    id: "ORD-2845",
    customer: "CV Abadi Bangun",
    type: "Material",
    items: "Keramik 60x60, Pipa PVC",
    total: "Rp 22,1 jt",
    status: "Diproses",
    date: "14 Mei 2026",
  },
  {
    id: "ORD-2844",
    customer: "Siti Rahayu",
    type: "Properti",
    items: "Tanah Kavling 120 m² — Serpong",
    total: "Rp 720 jt",
    status: "Selesai",
    date: "14 Mei 2026",
  },
  {
    id: "ORD-2843",
    customer: "Andi Pratama",
    type: "Material",
    items: "Cat Dulux 20 kaleng",
    total: "Rp 8,4 jt",
    status: "Selesai",
    date: "13 Mei 2026",
  },
];

export const lowStockItems = [
  { name: "Semen Gresik 40kg", sku: "SMG-40", stock: 42, min: 100, unit: "sak" },
  { name: "Besi Beton 12mm", sku: "BB-12", stock: 18, min: 50, unit: "batang" },
  { name: "Keramik Roman 60x60", sku: "KR-6060", stock: 85, min: 200, unit: "dus" },
  { name: "Pipa PVC 4\"", sku: "PP-4", stock: 31, min: 80, unit: "batang" },
];

export const propertyListings = [
  {
    title: "Rumah 2 Lantai — BSD City",
    type: "Rumah",
    price: "Rp 2,4 M",
    status: "Tersedia",
    views: 342,
    leads: 12,
  },
  {
    title: "Apartemen Studio — Sudirman",
    type: "Apartemen",
    price: "Rp 680 jt",
    status: "Tersedia",
    views: 518,
    leads: 28,
  },
  {
    title: "Tanah Komersial — Cikarang",
    type: "Tanah",
    price: "Rp 1,1 M",
    status: "Reserved",
    views: 156,
    leads: 5,
  },
  {
    title: "Ruko 3 Lantai — Bekasi",
    type: "Ruko",
    price: "Rp 3,8 M",
    status: "Terjual",
    views: 891,
    leads: 34,
  },
];

export const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { id: "material", label: "Material Bangunan", icon: "Package" },
  { id: "properti", label: "Properti", icon: "Building2" },
  { id: "pesanan", label: "Pesanan", icon: "ShoppingCart" },
  { id: "pelanggan", label: "Pelanggan", icon: "Users" },
  { id: "laporan", label: "Laporan", icon: "BarChart3" },
  { id: "pengaturan", label: "Pengaturan", icon: "Settings" },
] as const;
