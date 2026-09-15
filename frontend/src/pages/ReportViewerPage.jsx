import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { 
  getPredictionDetails,
  getRecommendations,
} from "../api/predictionApi";
import { getCurrentProfile } from "../api/userApi";

import ReportHeader from "../components/reports/reportViewer/ReportHeader";
import PatientInfoCard from "../components/reports/reportViewer/PatientInfoCard";
import PredictionSummary from "../components/reports/reportViewer/PredictionSummary";
import SkinScanSection from "../components/reports/reportViewer/SkinScanSection";
import AIAnalysisSection from "../components/reports/reportViewer/AIAnalysisSection";
import RecommendationSection from "../components/reports/reportViewer/RecommendationSection";
import HealthHistorySection from "../components/reports/reportViewer/HealthHistorySection";
import ReportTimeline from "../components/reports/reportViewer/ReportTimeline";
import ReportActions from "../components/reports/reportViewer/ReportActions";
import ReportDisclaimer from "../components/reports/reportViewer/ReportDisclaimer";

const ReportViewerPage = () => {

    const { reportId:id } = useParams();

    const [report, setReport] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadReport();

    }, [id]);

    const loadReport = async () => {

        try {

            const response = await getPredictionDetails(id);

            const recommendation = await getRecommendations(id);
            
            const user = await getCurrentProfile();

            const prediction = response.prediction ?? response;

            setReport({
            
                id: prediction.id,
            
                disease: prediction.predicted_label,
            
                confidence: prediction.confidence_score,
            
                risk: prediction.risk_level,
            
                createdAt: prediction.created_at,
            
                model: prediction.model_version,
            
                processingTime: prediction.processing_time_ms,
            
                stage: prediction.stage_used,

                heatmap: prediction.heatmap_overlay_path,
            
                doctor: {
                
                    name: "DermAssist AI",
                
                    specialization:
                        "AI Dermatology Copilot",
                
                },
              
                aiSummary: prediction.predicted_label ===
                    "Model Not Connected"
              
                        ? "AI model integration will be available in Phase 6."
              
                        : `The AI predicts ${prediction.predicted_label}.`,
              
                // -------- NEW --------
              
                imageId: prediction.image.id,
              
                imagePath: prediction.image.image_path,
              
                imageName: prediction.image.image_name,
              
                bodyPart: prediction.image.body_part,
              
                lesionId: prediction.image.lesion_id,
              
                uploadedAt: prediction.image.uploaded_at,
              
                followup: prediction.image.is_followup,
              
                imageFormat: prediction.image.image_format,
              
                imageSize: prediction.image.image_size_kb,

                recommendation: recommendation,
                
                patient: {

                    name: user.full_name,
                                
                    username: user.username,
                                
                    email: user.email,
                                
                    phone: user.phone_number,
                                
                    gender: user.gender,
                                
                    dob: user.date_of_birth,
                                
                    bloodGroup: user.blood_group,
                                
                    height: user.height_cm,
                                
                    weight: user.weight_kg,
                                
                    allergies: user.allergies,
                                
                    medicalHistory: user.medical_history,
                                
                    profilePicture: user.profile_picture,
                                
                },
            });

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

    return (

        <div className="p-10 text-center">

            Loading report...

        </div>

    );

}

if (!report) {

    return (

        <div className="p-10 text-center">

            Report not found.

        </div>

    );

}
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <ReportHeader report={report}/>

      <PatientInfoCard report={report}/>

      <PredictionSummary report={report}/>

      <SkinScanSection report={report}/>

      <AIAnalysisSection report={report}/>

      <RecommendationSection report={report}/>

      <HealthHistorySection report={report}/>

      <ReportTimeline report={report}/>

      <ReportActions report={report}/>

      <ReportDisclaimer />
    </div>
  );
};

export default ReportViewerPage;