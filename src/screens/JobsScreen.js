import React from "react";
import { FlatList, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { JobCard } from "../components/JobCard";
import { colors } from "../theme";

export function JobsScreen({ jobs, onOpenJob, onApply, onSave, isApplied, isSaved }) {
  const { width } = useWindowDimensions();
  const horizontalPad = 16;
  const numCols = width >= 600 ? 2 : 1;
  const gap = 14;
  const inner = width - horizontalPad * 2;
  const tileW = numCols === 1 ? inner : (inner - gap) / 2;

  return (
    <FlatList
      data={jobs}
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
        <View style={styles.header}>
          <Text style={styles.title}>Browse Jobs</Text>
          <Text style={styles.subtitle}>Explore open roles and apply in one tap</Text>
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
  header: { marginBottom: 18 },
  title: { color: colors.textPrimary, fontSize: 26, fontWeight: "800", letterSpacing: -0.3 },
  subtitle: { color: colors.textSecondary, fontSize: 15, marginTop: 6, lineHeight: 22 },
  rowWrap: { justifyContent: "space-between" },
});
