import { Purpose } from "../../core/modules/enum/models/Purpose";

export const PurposeSeeding = async () => {
  const purposes = [
    { value: "Linh hoạt", label: "Linh hoạt", order: 1, isActive: true },
    { value: "Sống ảo", label: "Sống ảo", order: 2, isActive: true },
    { value: "Làm việc", label: "Làm việc", order: 3, isActive: true },
    { value: "Hẹn hò", label: "Hẹn hò", order: 4, isActive: true },
    
  ];
  try {
    // Check if any data already exists
    const existingCount = await Purpose.countDocuments();
    if (existingCount > 0) {
      console.log("Prices already seeded. Skipping...");
      return;
    }

    // Insert seed data
    await Purpose.insertMany(purposes);
    console.log("Price data seeded successfully!");
  } catch (error) {
    console.error("Error seeding price data:", error);
  }
};
