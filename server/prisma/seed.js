import prisma from "../src/config/prisma.js";

const images = [];

const imageCategories = [
  { subject: "FIGURE", gender: "MALE", clothing: "CLOTHED" },
  { subject: "FIGURE", gender: "MALE", clothing: "NUDE" },
  { subject: "FIGURE", gender: "FEMALE", clothing: "CLOTHED" },
  { subject: "FIGURE", gender: "FEMALE", clothing: "NUDE" },
  { subject: "FACE", gender: "MALE", clothing: "CLOTHED" },
  { subject: "FACE", gender: "MALE", clothing: "NUDE" },
  { subject: "FACE", gender: "FEMALE", clothing: "CLOTHED" },
  { subject: "FACE", gender: "FEMALE", clothing: "NUDE" },
  { subject: "HANDS", gender: "MALE", clothing: "CLOTHED" },
  { subject: "HANDS", gender: "MALE", clothing: "NUDE" },
  { subject: "HANDS", gender: "FEMALE", clothing: "CLOTHED" },
  { subject: "HANDS", gender: "FEMALE", clothing: "NUDE" },
];

imageCategories.forEach(({ subject, gender, clothing }) => {
  for (let i = 1; i <= 5; i++) {
    images.push({
      imageSubject: subject,
      imageGender: gender,
      imageClothing: clothing,
      imageUrl: `https://source.unsplash.com/random/800x600?${subject.toLowerCase()},${gender.toLowerCase()},${clothing.toLowerCase()}`,
    });
  }
});

async function main() {
  console.log("Seeding images...");
  await prisma.image.createMany({
    data: images,
    skipDuplicates: true,
  });
  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
