import { CSSProperties } from "react";

import { Group, Metric, MetricsByGroup, Review } from "@types";
import { State } from "store/types";

const NO_GROUP = "No group"

export function sortMetricsByGroup(groups: Group[], metrics: Metric[]): MetricsByGroup[] {
  return [
    ...groups
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((group) => ({
        groupName: group.name,
        metrics: metrics.filter((metric) => metric.groupId === group.id),
      })),
    {
      groupName: NO_GROUP,
      metrics: metrics.filter((metric) => !metric.groupId),
    }
  ]
}

export function sortByUpdateDateDesc(a: Review, b: Review) {
  return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
}

export function getRatingColors(rating: number): CSSProperties {
  switch (rating) {
    case 1:
      return {
        backgroundColor: "#fda4af", // rose-300
        color: "#be123c", // rose-700
        borderColor: "#be123c" // rose-700
      };
    case 2:
      return {
        backgroundColor: "#f9a8d4", // pink-300
        color: "#be185d", // pink-700
        borderColor: "#be185d" // pink-700
      };
    case 3:
      return {
        backgroundColor: "#c4b5fd", // violet-300
        color: "#6d28d9", // violet-700
        borderColor: "#6d28d9" // violet-700
      };
    case 4:
      return {
        backgroundColor: "#fdba74", // orange-300
        color: "#c2410c", // orange-700
        borderColor: "#c2410c" // orange-700
      };
    case 5:
      return {
        backgroundColor: "#fde047", // yellow-300
        color: "#a16207", // yellow-700
        borderColor: "#a16207" // yellow-700
      };
    case 6:
      return {
        backgroundColor: "#93c5fd", // blue-300
        color: "#1d4ed8", // blue-700
        borderColor: "#1d4ed8" // blue-700
      };
    case 7:
      return {
        backgroundColor: "#67e8f9", // cyan-300
        color: "#0e7490", // cyan-700
        borderColor: "#0e7490" // cyan-700
      };
    case 8:
      return {
        backgroundColor: "#bef264", // lime-300
        color: "#4d7c0f", // lime-700
        borderColor: "#4d7c0f" // lime-700
      };
    case 9:
      return {
        backgroundColor: "#86efac", // green-300
        color: "#15803d", // green-700
        borderColor: "#15803d" // green-700
      };
    case 10:
      return {
        backgroundColor: "#6ee7b7", // emerald-300
        color: "#047857", // emerald-700
        borderColor: "#047857" // emerald-700
      };
    default:
      return {};
  }
}

export function buildBlob(data: Pick<State, "groups" | "metrics" | "reviews">) {
  const blob = new Blob(
    [JSON.stringify(data, null, 2)],
    { type: "application/json" }
  );

  const URL = window.URL || window.webkitURL;
  return URL.createObjectURL(blob);
}
