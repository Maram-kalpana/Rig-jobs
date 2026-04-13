import React from "react";
import { Text } from "react-native";
import { JobCard } from "../components/JobCard";

export function JobsScreen({ jobs, onOpenJob, onApply, onSave, isApplied, isSaved }) {
  return (
    <>
      <Text style={{ fontSize: 30 / 2, fontWeight: "800", marginBottom: 10 }}>Browse Jobs</Text>
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onOpen={onOpenJob}
          onApply={onApply}
          onSave={onSave}
          applied={isApplied(job.id)}
          saved={isSaved(job.id)}
        />
      ))}
    </>
  );
}
