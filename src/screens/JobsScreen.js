import React, { useState, useMemo } from "react";
import { FlatList, StyleSheet, Text, TextInput, useWindowDimensions, View } from "react-native";
import { JobCard } from "../components/JobCard";
import { colors } from "../theme";

export function JobsScreen({ jobs, onOpenJob, onApply, onSave, isApplied, isSaved }) {
  const { width } = useWindowDimensions();
  const horizontalPad = 16;
  const numCols = width >= 600 ? 2 : 1;
  const gap = 14;
  const inner = width - horizontalPad * 2;
  const tileW = numCols === 1 ? inner : (inner - gap) / 2;

  const [searchText, setSearchText] = useState("");

  const filteredJobs = useMemo(() => {
    if (!searchText.trim()) return jobs;
    const q = searchText.toLowerCase();
    return jobs.filter(
      (job) =>
        job.title?.toLowerCase().includes(q) ||
        job.company?.toLowerCase().includes(q) ||
        job.location?.toLowerCase().includes(q) ||
        job.skills?.some((s) => s.toLowerCase().includes(q))
    );
  }, [jobs, searchText]);

  return (
    <FlatList
      data={filteredJobs}
      keyExtractor={(item) => item.id}
      numColumns={numCols}
      key={`cols-${numCols}`}
      style={styles.list}
      contentContainerStyle={[styles.listContent, { paddingHorizontal: horizontalPad }]}
      columnWrapperStyle={numCols === 2 ? [styles.rowWrap, { marginBottom: gap }] : undefined}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      ListHeaderComponent={
        <View>
          <View style={styles.header}>
            <Text style={styles.title}>Browse Jobs</Text>
            <Text style={styles.subtitle}>Explore open roles and apply in one tap</Text>
          </View>
          <View style={styles.searchBox}>
            <TextInput
              placeholder="Search jobs by title, company, location or skill..."
              placeholderTextColor="#94A3B8"
              style={styles.searchInput}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>
      }
      renderItem={({ item }) => (
        <View style={{ width: tileW, marginBottom: numCols === 1 ? gap : 0 }}>
          <JobCard
            job={item}
            onOpen={onOpenJob}
            onApply={onApply}
            onSave={onSave}
            applied={isApplied(item.id)}
            saved={isSaved(item.id)}
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1, minWidth: 0 },
  listContent: { paddingTop: 8, paddingBottom: 32 },
  header: { marginBottom: 12 },
  title: { color: colors.textPrimary, fontSize: 26, fontWeight: "800", letterSpacing: -0.3 },
  subtitle: { color: colors.textSecondary, fontSize: 15, marginTop: 6, lineHeight: 22 },
  rowWrap: { justifyContent: "space-between" },
  searchBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 16,
  },
  searchInput: { height: 44, fontSize: 14 },
});
