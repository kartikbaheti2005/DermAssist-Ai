frontend/
│
├── public/
│   ├── favicon.ico
│   ├── logo.png
│   └── manifest.json
│
├── src/
│
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   ├── illustrations/
│   │   └── animations/
│   │
│   ├── components/
│   │
│   │   ├── common/
|   |   |        (exist)
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── LoadingSpinner.jsx
|   |   |   |-- Badge.jsx
│   │   │   ├── SectionHeader.jsx
|   |   |   |   (can be made if needed):*
│   │   │   ├── SearchBar.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── Toast.jsx
│   │   │   └── ConfirmDialog.jsx
│   │
│   │   ├── layout/
│   │   │   ├── DashboardLayout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Breadcrumb.jsx
│   │   │   └── MobileBottomNav.jsx
│   │   │   └── Notification.jsx
│   │   │   └── PageContainer.jsx
│   │   │   └── UserMenu.jsx

|   |   |   |  
│   │   │   ├── BottomNavigation.jsx*
│   │   │   └── PageHeader.jsx*
|   |   |   |
│   │
│   │   ├── routes/
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── DoctorRoute.jsx
│   │   │   └── AdminRoute.jsx
│   │
│   │   ├── health/
│   │   │   ├── BMIcard.jsx
│   │   │   ├── EmptyHealthState.jsx
│   │   │   ├── HealthHistory.jsx
│   │   │   ├── HealthIdentityCard.jsx
│   │   │   ├── HealthProfileWizard.jsx
│   │   │   ├── HealthRecordCard.jsx
│   │   │   ├── HealthSummary.jsx
│   │   │   ├── VitalStatsCard.jsx
│   │   │   │
│   │   │   └── steps/
│   │   │       ├── PersonalStep.jsx
│   │   │       ├── PhysicalStep.jsx
│   │   │       ├── MedicalStep.jsx
│   │   │       ├── LifestyleStep.jsx
│   │   │       └── ReviewStep.jsx
│   │
│   │   ├── lesion/
│   │   │   ├── ImageUploader.jsx
│   │   │   ├── PredictionCard.jsx
│   │   │   ├── ConfidenceChart.jsx
│   │   │   ├── RiskIndicator.jsx
│   │   │   ├── RecommendationCard.jsx
│   │   │   ├── ScanHistory.jsx
│   │   │   └── ScanSummary.jsx
│   │
│   │   ├── doctors/
│   │   │   ├── DoctorCard.jsx
│   │   │   ├── DoctorDrawer.jsx
│   │   │   ├── DoctorFilters.jsx
│   │   │   ├── EmptyDoctorsState.jsx
│   │   │   └── RatingStars.jsx
│   │
│   │   ├── appointments/
│   │   │   ├── AppointmentForm.jsx
│   │   │   ├── AppointmentList.jsx
│   │   │   ├── AppointmentStatusBadge.jsx
                
                (does not exist)
│   │   │   ├── AppointmentCard.jsx
│   │   │   ├── AppointmentFilters.jsx
│   │   │   ├── AppointmentTimeline.jsx
│   │   │   ├── AppointmentSummary.jsx
│   │   │   ├── EmptyAppointmentState.jsx
│   │   │   └── AppointmentSuccessModal.jsx
│   │
│   │   ├── reports/
│   │   │   ├── ReportCard.jsx
│   │   │   ├── ReportPreview.jsx
│   │   │   ├── ReportFilters.jsx
│   │   │   ├── DownloadButton.jsx
│   │   │   └── EmptyReportsState.jsx
│   │
│   │   ├── queue/
│   │   │   ├── QueueCard.jsx
│   │   │   ├── QueueTimeline.jsx
│   │   │   ├── QueueStatus.jsx
│   │   │   └── QueueSummary.jsx
│   │
│   │   ├── chatbot/
│   │   │   ├── ChatWindow.jsx
│   │   │   ├── ChatSidebar.jsx
│   │   │   ├── ChatMessage.jsx
│   │   │   ├── ChatInput.jsx
│   │   │   ├── SuggestedQuestions.jsx
│   │   │   └── TypingIndicator.jsx
│   │
│   │   ├── outbreak/
│   │   │   ├── AlertCard.jsx
│   │   │   ├── HeatMap.jsx
│   │   │   ├── RegionSelector.jsx
│   │   │   ├── TrendChart.jsx
│   │   │   └── PreventiveTips.jsx
│   │
│   │   ├── dashboard/
│   │   │   ├── StatsCard.jsx
│   │   │   ├── ActivityTimeline.jsx
│   │   │   ├── AIInsightCard.jsx
│   │   │   ├── AIKnowledgeHub.jsx
│   │   │   ├── AppointmentCard.jsx
│   │   │   ├── HealthCard.jsx
│   │   │   ├── HealthScore.jsx
│   │   │   ├── QuickActions.jsx
│   │   │   └── WelcomeBanner.jsx
│   │
│   │   ├── doctor/
│   │   │   ├── DoctorCard.jsx
│   │   │   ├── DoctorDrawer.jsx
│   │   │   ├── DoctorFilter.jsx
│   │   │   ├── EmptyDoctorState.jsx
│   │   │   ├── RatingStars.jsx
│   │
│   │   └── admin/
│   │       ├── UserStatistics.jsx
│   │       ├── DoctorManagement.jsx
│   │       ├── ReportsAnalytics.jsx
│   │       ├── SystemHealth.jsx
│   │       └── AdminOverview.jsx
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── NotificationContext.jsx
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useDoctors.js
│   │   ├── useAppointments.js
│   │   ├── useHealth.js
│   │   └── usePrediction.js
│   │
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── doctorService.js
│   │   ├── appointmentService.js
│   │   ├── healthService.js
│   │   ├── reportService.js
│   │   ├── predictionService.js
│   │   ├── chatbotService.js
│   │   └── outbreakService.js
│   │
│   ├── utils/
│   │   ├── healthProfileData.js
│   │   ├── constants.js
│   │   ├── formatters.js
│   │   ├── validators.js
│   │   ├── dateUtils.js
│   │   ├── storage.js
│   │   └── helpers.js
│   │
│   ├── data/
│   │   ├── doctors.js
│   │   ├── appointments.js
│   │   ├── reports.js
│   │   ├── outbreaks.js
│   │   └── dashboard.js
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── HealthRecordsPage.jsx
│   │   ├── LesionTrackerPage.jsx
│   │   ├── DoctorsPage.jsx
│   │   ├── AppointmentPage.jsx
│   │   ├── QueuePage.jsx
│   │   ├── ReportsPage.jsx
│   │   ├── OutbreakPage.jsx
│   │   ├── ChatbotPage.jsx
│   │   ├── DoctorDashboard.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── SettingsPage.jsx
│   │   ├── ProfilePage.jsx
│   │   └── NotFoundPage.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── vite-env.d.ts
│
├── package.json
├── package-lock.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md