import { Distance } from "../../core/modules/enum/models/Distance";

export const DistanceSeeding = async () => {
  const distances = [
    { value: "Linh hoạt", label: "Linh hoạt", order: 1, isActive: true },
    { value: "Có thể đi bộ", label: "Có thể đi bộ", order: 2, isActive: true },
    { value: "< 2km", label: "< 2km", order: 3, isActive: true },
    { value: "< 5km", label: "< 5km", order: 4, isActive: true },
  ];
  try {
    // Check if any data already exists
    const existingCount = await Distance.countDocuments();
    if (existingCount > 0) {
      console.log("Distances already seeded. Skipping...");
      return;
    }

    // Insert seed data
    await Distance.insertMany(distances);
    console.log("Distance data seeded successfully!");
  } catch (error) {
    console.error("Error seeding distance data:", error);
  }
};
