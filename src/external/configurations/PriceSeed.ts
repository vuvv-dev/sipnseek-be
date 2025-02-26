import { Price } from "../../core/modules/enum/models/Price";

export const PriceSeeding = async () => {
  const prices = [
    { value: "Linh hoạt", label: "Linh hoạt", order: 1, isActive: true },
    { value: "< 50K", label: "< 50K", order: 2, isActive: true },
    { value: "50 - 70K", label: "50 - 70K", order: 3, isActive: true },
    { value: "70K", label: "70K", order: 4, isActive: false },
  ];

  try {
    // Check if any data already exists
    const existingCount = await Price.countDocuments();
    if (existingCount > 0) {
      console.log("Prices already seeded. Skipping...");
      return;
    }

    // Insert seed data
    await Price.insertMany(prices);
    console.log("Price data seeded successfully!");
  } catch (error) {
    console.error("Error seeding price data:", error);
  }
};
