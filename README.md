# 📊 Dynamic Data Table Manager

A dynamic, interactive, and customizable data table management system built using **Next.js 14**, **Redux Toolkit**, **Material UI (MUI)**, and **TypeScript**. Designed to replicate real-world table management functionality such as column control, search, sort, CSV import/export, inline editing, and more. Built as part of a frontend interview task to showcase production-level React skills and clean state handling with Redux.

---

## 🚀 Features

### 🧩 Core Functionalities

- **Dynamic Table View**
  - Displays default columns: `Name`, `Email`, `Age`, `Role`
  - Column sorting with ASC/DESC toggle
  - Global search across all fields
  - Client-side pagination (10 rows per page)

- **Column Management**
  - "Manage Columns" modal to:
    - Show/hide any column with checkboxes
    - Dynamically add new fields like `Department`, `Location`
  - Preferences stored using `localStorage` or `Redux Persist`

- **CSV Import/Export**
  - **Import CSV**:
    - Upload and parse CSV using `PapaParse`
    - Show validation errors for incorrect formats
  - **Export CSV**:
    - Export current visible columns to a `.csv` file
    - Uses `FileSaver.js` and `Blob` to download file

---

### 🎁 Bonus Features (Implemented)

- 🔄 Inline row editing with double-click
  - Validates inputs (e.g., Age must be a number)
  - "Save All" and "Cancel All" buttons for batch updates

- 🗑 Row Actions
  - Edit & Delete actions with confirmation prompts

- 🌗 Theme Toggle
  - Light/Dark mode supported via MUI theming

- 🧭 Column Reordering
  - Drag-and-drop support for rearranging column order

- 📱 Fully Responsive
  - Mobile-friendly table layout with adaptive UI

---

## 🛠 Tech Stack

- **Next.js 14 (App Router)**
- **React 18**
- **Redux Toolkit** – State Management
- **Material UI v5+** – Component Library
- **TypeScript** – Static Typing
- **React Hook Form** – Form handling
- **PapaParse** – CSV parsing
- **FileSaver.js / Blob** – CSV export
- **localStorage / Redux Persist** – Preference storage

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/sumit-616/dynamic-data-table-manager.git
cd dynamic-data-table-manager
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app live.

---

## 📦 Build for Production

To build and run the production version:

```bash
npm run build
npm start
```

---

## 🧪 Testing

Currently not implemented. You can extend the project using:
- **Jest** for unit testing
- **React Testing Library** for component testing

---

## 🔗 Repository & Live Demo

- **GitHub Repository:** [https://github.com/sumit-616/dynamic-data-table-manager](https://github.com/sumit-616/dynamic-data-table-manager)
- **Live Preview:** [https://dynamic-data-table.netlify.app/](https://dynamic-data-table.netlify.app/)


---

## 🙋‍♂️ About the Developer

**Sumit Kumar**  
Frontend Developer | React.js • Next.js • TypeScript • JavaScript • Tailwind  
🔗 [GitHub](https://github.com/sumit-616)  
🔗 [LinkedIn](https://www.linkedin.com/in/sumit012/)
