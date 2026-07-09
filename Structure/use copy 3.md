Browser
        │
        ▼
     main.jsx
        │
        ▼
      App.jsx
        │
        ▼
ProtectedRoute / DoctorRoute / AdminRoute
        │
        ▼
 DashboardLayout
        │
 ┌──────┴─────────────────────────────┐
 │                                    │
 ▼                                    ▼
Sidebar                           Navbar
 │                                    │
 └──────────────┬─────────────────────┘
                ▼
             Pages
                │
                ▼
          Components
                │
                ▼
      Services / API / Utils
                │
                ▼
          FastAPI Backend
                │
                ▼
         PostgreSQL + AI Model