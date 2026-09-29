import dotenv from "dotenv";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import connectDB from "./utils/db.js";
import imagekit from "./utils/ImagekitIO.js";
import { Property } from "./Models/propertyModel.js";

dotenv.config();

const seedDirectory = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../Frontend/public/assets",
);

const demoProperties = [
  {
    propertyName: "Sunny Beach Cottage",
    description: "A bright and comfortable cottage close to the beach.",
    propertyType: "House",
    roomType: "Entire Home",
    extraInfo: "Check-in after 2pm. No smoking indoors.",
    maximumGuest: 4,
    price: 4500,
    address: { area: "Juhu", city: "Mumbai", state: "Maharashtra", pincode: 400049 },
  },
  {
    propertyName: "Mountain View Villa",
    description: "A peaceful villa with mountain views and generous living space.",
    propertyType: "Guest House",
    roomType: "Entire Home",
    extraInfo: "Quiet hours after 10pm.",
    maximumGuest: 6,
    price: 7800,
    address: { area: "Mall Road", city: "Manali", state: "Himachal Pradesh", pincode: 175131 },
  },
  {
    propertyName: "Cozy City Apartment",
    description: "A convenient city apartment for short and comfortable stays.",
    propertyType: "Flat",
    roomType: "Room",
    extraInfo: "No parties.",
    maximumGuest: 3,
    price: 3200,
    address: { area: "Koramangala", city: "Bengaluru", state: "Karnataka", pincode: 560034 },
  },
  {
    propertyName: "Goan Palm Retreat",
    description: "A relaxed retreat near the beaches, cafes, and sunset spots of Goa.",
    propertyType: "Guest House",
    roomType: "Entire Home",
    extraInfo: "Pool hours are 7am to 9pm.",
    maximumGuest: 4,
    price: 4200,
    address: { area: "Calangute", city: "Goa", state: "Goa", pincode: 403516 },
  },
  {
    propertyName: "Pink City Haveli",
    description: "A characterful stay close to Jaipur's historic markets and forts.",
    propertyType: "House",
    roomType: "Room",
    extraInfo: "Breakfast available on request.",
    maximumGuest: 3,
    price: 2800,
    address: { area: "Bani Park", city: "Jaipur", state: "Rajasthan", pincode: 302016 },
  },
  {
    propertyName: "Old Delhi Courtyard Home",
    description: "A central base for food walks, markets, and historic Delhi landmarks.",
    propertyType: "Flat",
    roomType: "Entire Home",
    extraInfo: "Please keep noise low after 10pm.",
    maximumGuest: 5,
    price: 3600,
    address: { area: "Chandni Chowk", city: "Delhi", state: "Delhi", pincode: 110006 },
  },
  {
    propertyName: "Hyderabad Heritage Stay",
    description: "A comfortable city stay near Hyderabad's food and heritage districts.",
    propertyType: "Flat",
    roomType: "Room",
    extraInfo: "Dedicated workspace included.",
    maximumGuest: 2,
    price: 2400,
    address: { area: "Banjara Hills", city: "Hyderabad", state: "Telangana", pincode: 500034 },
  },
  {
    propertyName: "Kochi Backwater Bungalow",
    description: "A calm bungalow for exploring Kochi's waterfront and art neighborhoods.",
    propertyType: "House",
    roomType: "Entire Home",
    extraInfo: "Airport pickup can be arranged.",
    maximumGuest: 4,
    price: 3900,
    address: { area: "Fort Kochi", city: "Kochi", state: "Kerala", pincode: 682001 },
  },
  {
    propertyName: "Rishikesh Riverside Cabin",
    description: "A quiet riverside cabin near yoga, rafting, and forest trails.",
    propertyType: "Guest House",
    roomType: "Entire Home",
    extraInfo: "Rafting arrangements available locally.",
    maximumGuest: 4,
    price: 3000,
    address: { area: "Tapovan", city: "Rishikesh", state: "Uttarakhand", pincode: 249192 },
  },
  {
    propertyName: "Udaipur Lakeview House",
    description: "A warm stay with easy access to lakes, palaces, and old-city walks.",
    propertyType: "House",
    roomType: "Room",
    extraInfo: "Rooftop breakfast available.",
    maximumGuest: 3,
    price: 3400,
    address: { area: "Lake Pichola", city: "Udaipur", state: "Rajasthan", pincode: 313001 },
  },
  {
    propertyName: "Pune Garden Apartment",
    description: "A modern apartment close to cafes, parks, and Pune's tech district.",
    propertyType: "Flat",
    roomType: "Entire Home",
    extraInfo: "Work-friendly desk and fast Wi-Fi.",
    maximumGuest: 4,
    price: 2900,
    address: { area: "Koregaon Park", city: "Pune", state: "Maharashtra", pincode: 411001 },
  },
  {
    propertyName: "Chennai Marina Stay",
    description: "A practical coastal stay near Marina Beach and local food spots.",
    propertyType: "Flat",
    roomType: "Room",
    extraInfo: "Early check-in subject to availability.",
    maximumGuest: 2,
    price: 2200,
    address: { area: "Mylapore", city: "Chennai", state: "Tamil Nadu", pincode: 600004 },
  },
  {
    propertyName: "Kolkata Heritage Loft",
    description: "A design-led loft for exploring Kolkata's food and cultural landmarks.",
    propertyType: "Flat",
    roomType: "Entire Home",
    extraInfo: "Located above a quiet residential lane.",
    maximumGuest: 3,
    price: 2600,
    address: { area: "Park Street", city: "Kolkata", state: "West Bengal", pincode: 700016 },
  },
  {
    propertyName: "Shimla Cedar Cottage",
    description: "A cozy mountain cottage with cool weather and pine-lined walks nearby.",
    propertyType: "House",
    roomType: "Entire Home",
    extraInfo: "Road access may be limited during heavy snowfall.",
    maximumGuest: 4,
    price: 4100,
    address: { area: "Chotta Shimla", city: "Shimla", state: "Himachal Pradesh", pincode: 171002 },
  },
  {
    propertyName: "Varanasi Ghat House",
    description: "A welcoming home base near Varanasi's ghats, temples, and food lanes.",
    propertyType: "Guest House",
    roomType: "Room",
    extraInfo: "Please respect local quiet hours.",
    maximumGuest: 3,
    price: 2500,
    address: { area: "Assi Ghat", city: "Varanasi", state: "Uttar Pradesh", pincode: 221005 },
  },
  {
    propertyName: "Amritsar Courtyard Stay",
    description: "A comfortable courtyard stay close to the Golden Temple and local markets.",
    propertyType: "House",
    roomType: "Entire Home",
    extraInfo: "Vegetarian breakfast available.",
    maximumGuest: 5,
    price: 2700,
    address: { area: "Heritage Street", city: "Amritsar", state: "Punjab", pincode: 143001 },
  },
  {
    propertyName: "Mysuru Palace Apartment",
    description: "A calm apartment for exploring palaces, gardens, and Mysuru's food scene.",
    propertyType: "Flat",
    roomType: "Entire Home",
    extraInfo: "Secure parking included.",
    maximumGuest: 4,
    price: 2300,
    address: { area: "Vijayanagar", city: "Mysuru", state: "Karnataka", pincode: 570017 },
  },
  {
    propertyName: "Ahmedabad Old City Loft",
    description: "A bright loft near historic pols, markets, and Ahmedabad's food trails.",
    propertyType: "Flat",
    roomType: "Room",
    extraInfo: "Self check-in available.",
    maximumGuest: 2,
    price: 2100,
    address: { area: "Manek Chowk", city: "Ahmedabad", state: "Gujarat", pincode: 380001 },
  },
  {
    propertyName: "Andaman Coral Retreat",
    description: "A breezy island retreat for beaches, snorkeling, and slow mornings.",
    propertyType: "Guest House",
    roomType: "Entire Home",
    extraInfo: "Ferry transfers should be booked in advance.",
    maximumGuest: 4,
    price: 5200,
    address: { area: "Havelock Island", city: "Port Blair", state: "Andaman and Nicobar Islands", pincode: 744101 },
  },
];

const uploadSeedImages = async () => {
  const imageNames = [
    "image1.jpeg",
    "image2.jpeg",
    "image3.jpeg",
    "image4.jpeg",
    "image5.jpeg",
    "image6.jpeg",
    "image7.jpeg",
    "image8.jpeg",
    "property2.webp",
    "property3.webp",
    "property4.webp",
    "property5.webp",
    "property6.webp",
    "property7.webp",
  ];

  return Promise.all(
    imageNames.map(async (imageName) => {
      const file = await fs.readFile(path.join(seedDirectory, imageName));
      const result = await imagekit.upload({
        file: file.toString("base64"),
        fileName: `homelyhub_seed_${imageName}`,
        folder: "homelyhub/seed-properties",
        useUniqueFileName: false,
      });

      return { url: result.url, public_id: result.fileId };
    }),
  );
};

const seed = async () => {
  await connectDB();

  const existingDemo = await Property.find({
    propertyName: { $in: demoProperties.map(({ propertyName }) => propertyName) },
  }).select("propertyName seedVersion");
  const existingNames = new Set(existingDemo.map(({ propertyName }) => propertyName));
  const propertiesToCreate = demoProperties.filter(
    ({ propertyName }) => !existingNames.has(propertyName),
  );
  const needsImageRefresh = existingDemo.some(({ seedVersion }) => seedVersion !== 6);

  if (propertiesToCreate.length === 0 && !needsImageRefresh) {
    console.log("Demo properties already exist; nothing to seed.");
    return;
  }

  const images = await uploadSeedImages();
  const amenitySets = [
    [
      { name: "Wifi", icon: "wifi" },
      { name: "Kitchen", icon: "kitchen" },
      { name: "Free Parking", icon: "garage_home" },
      { name: "Ac", icon: "air" },
      { name: "Pool", icon: "pool" },
    ],
    [
      { name: "Wifi", icon: "wifi" },
      { name: "Washing Machine", icon: "local_laundry_service" },
      { name: "Tv", icon: "tv" },
      { name: "Kitchen", icon: "kitchen" },
    ],
    [
      { name: "Wifi", icon: "wifi" },
      { name: "Free Parking", icon: "garage_home" },
      { name: "Ac", icon: "air" },
      { name: "Kitchen", icon: "kitchen" },
    ],
  ];

  const amenitiesFor = (propertyName) => {
    const propertyIndex = demoProperties.findIndex(
      ({ propertyName: name }) => name === propertyName,
    );
    return amenitySets[propertyIndex % amenitySets.length];
  };

  const imageSetFor = (propertyName) => {
    const propertyIndex = demoProperties.findIndex(
      ({ propertyName: name }) => name === propertyName,
    );
    const start = propertyIndex % images.length;
    const step = [1, 3, 5, 9, 11, 13][propertyIndex % 6];

    const imageSet = Array.from(
      { length: 6 },
      (_, offset) => images[(start + offset * step) % images.length],
    );

    if (propertyIndex < images.length) {
      return imageSet;
    }

    const coverTransforms = [
      "w-900,h-600,fo-auto",
      "w-900,h-600,fo-left",
      "w-900,h-600,fo-right",
      "w-900,h-600,fo-top",
      "w-900,h-600,fo-bottom",
    ];
    const transform = coverTransforms[(propertyIndex - images.length) % coverTransforms.length];

    imageSet[0] = {
      ...imageSet[0],
      url: imageSet[0].url.replace(
        "/homelyhub/seed-properties/",
        `/tr:${transform}/homelyhub/seed-properties/`,
      ),
    };

    return imageSet;
  };

  const saveProperty = (property, propertyImages) =>
    Property.create({
      ...property,
      amenities: amenitiesFor(property.propertyName),
      images: propertyImages,
      seedVersion: 6,
    });

  await Promise.all(
    propertiesToCreate.map((property, index) =>
      saveProperty(property, imageSetFor(property.propertyName)),
    ),
  );

  if (needsImageRefresh) {
    await Promise.all(
      existingDemo.map(({ propertyName }, index) =>
        Property.updateOne(
          { propertyName },
          {
            $set: {
              seedVersion: 6,
              amenities: amenitiesFor(propertyName),
              images: imageSetFor(propertyName),
            },
          },
        ),
      ),
    );
  }

  console.log(`Seeded ${propertiesToCreate.length} new properties and refreshed ${needsImageRefresh ? existingDemo.length : 0} existing properties.`);
};

seed()
  .catch((error) => {
    console.error("Demo seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    const mongoose = await import("mongoose");
    await mongoose.default.disconnect();
  });
