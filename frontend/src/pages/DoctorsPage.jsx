import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getDoctors } from "../api/doctorApi";

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

    const [doctors, setDoctors] = useState([]);
    
    const [loading, setLoading] = useState(true);

    // -----------------------------
    // Filter Logic
    // -----------------------------


    useEffect(() => {

    console.log("useEffect Started");

    const loadDoctors = async () => {

        console.log("Calling API");

        try {

            const response = await getDoctors();

const mappedDoctors = response.map((doctor) => ({

    id: doctor.id,

    name: doctor.name,

    image:
        doctor.profile_picture ||
        "/images/default-doctor.png",

    specialization:
        doctor.specialty,

    experience:
        doctor.experience,

    consultationFee:
        doctor.consultation_fee,

    reviews:
        doctor.review_count,

    rating:
        doctor.rating,

    hospital:
        doctor.clinic_name,

    area:
        doctor.city,

    location:
        doctor.city,

    distance:
        doctor.city,

    consultationMode:
        doctor.consultation_mode || "Offline",

    availability:
        doctor.available_days?.length
            ? doctor.available_days.join(", ")
            : "Unavailable",

    languages:
        doctor.languages || [],

    qualification:
        doctor.qualification || "",

    about:
        doctor.bio || "",

    availableSlots:
        doctor.available_slots || [],

    raw: doctor,

}));

setDoctors(mappedDoctors);

            console.log("Response:", response);

        } catch (error) {

            console.error(error);

        } finally {

            console.log("Finished");

            setLoading(false);

        }

    };

    loadDoctors();

}, []);

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

}, [doctors, search, filters]);

    if (loading) {

        return (

            <div className="flex justify-center py-20">

                Loading doctors...

            </div>

        );

    }


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