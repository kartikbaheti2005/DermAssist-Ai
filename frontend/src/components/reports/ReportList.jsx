import EmptyReportsState from "./EmptyReportsState";
import ReportCard from "./ReportCard";

const ReportList = ({
  reports,
  onSelect,
}) => {
  if (!reports?.length) {
    return <EmptyReportsState />;
  }

  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <ReportCard
          key={report.id}
          report={report}
          onClick={onSelect}
        />
      ))}
    </div>
  );
};

export default ReportList;