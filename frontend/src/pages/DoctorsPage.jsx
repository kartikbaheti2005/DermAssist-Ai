import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { doctors } from "../data/doctors";

import DoctorCard from "../components/doctors/DoctorCard";
import DoctorDrawer from "../components/doctors/DoctorDrawer";
import DoctorFilters from "../components/doctors/DoctorFilters";
import EmptyDoctorsState from "../components/doctors/EmptyDoctorsState";

const DoctorsPage = () => {
    const navigate = useNavigate();
    // -----------------------------
    // Search
    // -----------------------------

    const [search, setSearch] = useState("");

    // -----------------------------
    // Filters
    // -----------------------------

    const [filters, setFilters] = useState({
        experience: "",
        rating: "",
        mode: "",
    });

    // -----------------------------
    // Selected Doctor
    // -----------------------------

    const [selectedDoctor, setSelectedDoctor] = useState(null);

    // -----------------------------
    // Drawer
    // -----------------------------

    const [drawerOpen, setDrawerOpen] = useState(false);

    // -----------------------------
    // Filter Logic
    // -----------------------------

    const filteredDoctors = useMemo(() => {

        return doctors.filter((doctor) => {

            const matchesSearch =

                doctor.name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||

                doctor.hospital
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||

                doctor.area
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||

                doctor.location
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesExperience =

                !filters.experience ||

                doctor.experience >= Number(filters.experience);

            const matchesRating =

                !filters.rating ||

                doctor.rating >= Number(filters.rating);

            const matchesMode =

                !filters.mode ||

                doctor.consultationMode === filters.mode;

            return (

                matchesSearch &&
                matchesExperience &&
                matchesRating &&
                matchesMode

            );

        });

    }, [search, filters]);

    return (

       <div className="space-y-6">

           {/* ===========================
               Page Header
           =========================== */}

           <div className="-mt-2">

               <h1 className="text-3xl font-bold text-slate-800">
                   Find a Dermatologist
               </h1>

               <p className="mt-2 text-slate-500">
                   Browse experienced dermatologists near you and book a consultation.
               </p>

           </div>

           {/* ===========================
               Filters
           =========================== */}

           <DoctorFilters

               search={search}
               setSearch={setSearch}

               filters={filters}
               setFilters={setFilters}

               onReset={() => {

                   setSearch("");

                   setFilters({
                       experience: "",
                       rating: "",
                       mode: "",
                   });

               }}

           />

           {/* ===========================
               Results
           =========================== */}

           <div className="flex items-center justify-between">

               <h2 className="text-lg font-semibold text-slate-800">
                   Available Dermatologists
               </h2>

               <span className="text-sm text-slate-500">
                   {filteredDoctors.length} Doctor(s) Found
               </span>

           </div>

           {/* ===========================
                   Doctors Grid
               =========================== */}
               
               {filteredDoctors.length === 0 ? (
               
                   <EmptyDoctorsState
               
                       onReset={() => {
                       
                           setSearch("");
                       
                           setFilters({
                               experience: "",
                               rating: "",
                               mode: "",
                           });
                       
                       }}
                   
                   />
                   
               ) : (
               
                   <div
                       className="
                           grid
                           grid-cols-1
                           gap-5
                           sm:grid-cols-2
                           lg:grid-cols-3
                           xl:grid-cols-4
                       "
                   >
                   
                       {filteredDoctors.map((doctor) => (
                       
                           <DoctorCard
                       
                               key={doctor.id}
                       
                               doctor={doctor}
                       
                               onSelect={(selected) => {
                               
                                   setSelectedDoctor(selected);
                               
                                   setDrawerOpen(true);
                               
                               }}
                           
                           />
                           
                       ))}
               
                   </div>
               
               )}
               
               {/* ===========================
                   Doctor Drawer
               =========================== */}
               
               <DoctorDrawer
               
                   doctor={selectedDoctor}
               
                   open={drawerOpen}
               
                   onClose={() => setDrawerOpen(false)}
               
                   onBook={(doctor) => {
                   
                       navigate("/appointments/book", {
                            state: {
                                doctor,
                            },
                        });
                   
                       // Sprint 3.10
                       // navigate("/appointments")
                   
                   }}
               
               />

       </div>

)   ;

};

export default DoctorsPage;