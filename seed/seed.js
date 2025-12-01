// require('dotenv').config();
// const mongoose = require('mongoose');
//
// // boot your existing DB connection
// require('../connections/connection');
//
// // modals
//
// async function seedUsers(name) {
//     try {
//         startSeeding(name)
//         const payload = [
//             {
//                 name: "Hamza",
//                 email: "codesmashers404@gmail.com",
//                 phone: "0",
//                 picture: "https://res.cloudinary.com/dyhw94ngc/image/upload/v1752352074/21104_adut1e.png",
//                 country: "Pakistan",
//                 role: 0,
//                 type: "admin"
//             },
//             {
//                 name: "Zainab",
//                 email: "zainabrajpoot.027@gmail.com",
//                 phone: "0",
//                 picture: "https://res.cloudinary.com/dyhw94ngc/image/upload/v1752352074/21104_adut1e.png",
//                 country: "Pakistan",
//                 role: 0,
//                 type: "admin"
//             },
//         ];
//
//         for (const data of payload) {
//             const exists = await User.findOne({email: data.email});
//             if (!exists) {
//                 await User.create(data);
//                 console.log(`✅ Created ${name}: ${data.email}`);
//             } else {
//                 console.log(`⚡ Skipped (already exists): ${data.email}`);
//             }
//         }
//         finishSeeding(name)
//     } catch (e) {
//         console.error('Seeding failed:', e);
//     }
// }
//
// async function seedProductCategory(name) {
//     try {
//         startSeeding(name)
//         const payload = [
//             {
//                 name: "social-media-bundles"
//             },
//         ];
//
//         for (const data of payload) {
//             const exists = await ProductCategory.findOne({name: data.name});
//             if (!exists) {
//                 await ProductCategory.create(data);
//                 console.log(`✅ Created ${name}: ${data.name}`);
//             } else {
//                 console.log(`⚡ Skipped (already exists): ${data.name}`);
//             }
//         }
//         finishSeeding(name)
//     } catch (e) {
//         console.error('Seeding failed:', e);
//     }
// }
//
// async function seedProductSubCategory(name) {
//     try {
//         startSeeding(name)
//         const socialMediaBundlesCate = await ProductCategory.findOne({name: "social-media-bundles"});
//         const payload = [
//             // social media bundles data
//             {
//                 parentCategoryId: socialMediaBundlesCate?._id,
//                 parentCategoryName: socialMediaBundlesCate?.name,
//                 name: "AI"
//             },
//             {
//                 parentCategoryId: socialMediaBundlesCate?._id,
//                 parentCategoryName: socialMediaBundlesCate?.name,
//                 name: "GYM (Health & Fitness)"
//             },
//             {
//                 parentCategoryId: socialMediaBundlesCate?._id,
//                 parentCategoryName: socialMediaBundlesCate?.name,
//                 name: "Business"
//             },
//             {
//                 parentCategoryId: socialMediaBundlesCate?._id,
//                 parentCategoryName: socialMediaBundlesCate?.name,
//                 name: "Comedy"
//             },
//             {
//                 parentCategoryId: socialMediaBundlesCate?._id,
//                 parentCategoryName: socialMediaBundlesCate?.name,
//                 name: "Motivation"
//             },
//             {
//                 parentCategoryId: socialMediaBundlesCate?._id,
//                 parentCategoryName: socialMediaBundlesCate?.name,
//                 name: "Sigma Male"
//             },
//             {
//                 parentCategoryId: socialMediaBundlesCate?._id,
//                 parentCategoryName: socialMediaBundlesCate?.name,
//                 name: "Cricket"
//             },
//             {
//                 parentCategoryId: socialMediaBundlesCate?._id,
//                 parentCategoryName: socialMediaBundlesCate?.name,
//                 name: "Nature"
//             },
//             {
//                 parentCategoryId: socialMediaBundlesCate?._id,
//                 parentCategoryName: socialMediaBundlesCate?.name,
//                 name: "Islamic"
//             },
//             {
//                 parentCategoryId: socialMediaBundlesCate?._id,
//                 parentCategoryName: socialMediaBundlesCate?.name,
//                 name: "Space & Universe"
//             },
//             {
//                 parentCategoryId: socialMediaBundlesCate?._id,
//                 parentCategoryName: socialMediaBundlesCate?.name,
//                 name: "Art & Craft"
//             },
//             {
//                 parentCategoryId: socialMediaBundlesCate?._id,
//                 parentCategoryName: socialMediaBundlesCate?.name,
//                 name: "Cartoon"
//             },
//             {
//                 parentCategoryId: socialMediaBundlesCate?._id,
//                 parentCategoryName: socialMediaBundlesCate?.name,
//                 name: "Anime"
//             },
//             {
//                 parentCategoryId: socialMediaBundlesCate?._id,
//                 parentCategoryName: socialMediaBundlesCate?.name,
//                 name: "Satisfaction"
//             },
//             {
//                 parentCategoryId: socialMediaBundlesCate?._id,
//                 parentCategoryName: socialMediaBundlesCate?.name,
//                 name: "Scenery"
//             },
//             {
//                 parentCategoryId: socialMediaBundlesCate?._id,
//                 parentCategoryName: socialMediaBundlesCate?.name,
//                 name: "Shows & Movie Clips"
//             },
//             {
//                 parentCategoryId: socialMediaBundlesCate?._id,
//                 parentCategoryName: socialMediaBundlesCate?.name,
//                 name: "Cars"
//             },
//         ];
//
//         for (const data of payload) {
//             const exists = await ProductSubCategory.findOne({name: data.name});
//             if (!exists) {
//                 await ProductSubCategory.create(data);
//                 console.log(`✅ Created ${name}: ${data.name}`);
//             } else {
//                 console.log(`⚡ Skipped (already exists): ${data.name}`);
//             }
//         }
//         finishSeeding(name)
//     } catch (e) {
//         console.error('Seeding failed:', e);
//     }
// }
//
// async function seedDigitalProductsSocialMediaProducts(name) {
//     try {
//         startSeeding(name)
//         const payload = await generateDigitalProductsSocialMediaBundleData()
//
//         for (const data of payload) {
//             const exists = await Products.findOne({name: data.name});
//             if (!exists) {
//                 const newProduct = new Products(data);
//                 newProduct.discount = getDiscountPercentage(data?.price, data?.originalPrice);
//                 await newProduct.save();
//                 console.log(`✅ Created ${name}: ${data.name}`);
//             } else {
//                 console.log(`⚡ Skipped (already exists): ${data.name}`);
//             }
//         }
//         finishSeeding(name)
//     } catch (e) {
//         console.error('Seeding failed:', e);
//     }
// }
//
// async function seedProductPricing(name) {
//     try {
//         startSeeding(name)
//         const payload = [
//             // ai-lead-analyzer
//             {
//                 businessType: BUSINESS_TYPES.aiLeadAnalyzer,
//                 name: "Free",
//                 plan: "free",
//                 price: 0,
//                 featured: false,
//             },
//             {
//                 businessType: BUSINESS_TYPES.aiLeadAnalyzer,
//                 name: "Professional",
//                 plan: "professional",
//                 price: 8,
//                 featured: true,
//             },
//             {
//                 businessType: BUSINESS_TYPES.aiLeadAnalyzer,
//                 name: "Enterprise",
//                 plan: "enterprise",
//                 price: 14,
//                 featured: false,
//                 isComingSoon: true,
//             },
//             // ai-mailr
//             {
//                 businessType: BUSINESS_TYPES.aiMailr,
//                 name: "Free",
//                 plan: "free",
//                 price: 0,
//                 featured: false,
//             },
//             {
//                 businessType: BUSINESS_TYPES.aiMailr,
//                 name: "Professional",
//                 plan: "professional",
//                 price: 19,
//                 featured: true,
//             },
//             {
//                 businessType: BUSINESS_TYPES.aiMailr,
//                 name: "Enterprise",
//                 plan: "enterprise",
//                 price: 49,
//                 featured: false,
//                 isComingSoon: false,
//             },
//             // job-portal
//             {
//                 businessType: BUSINESS_TYPES.jobPortal,
//                 name: "Free",
//                 plan: "free",
//                 price: 0,
//                 featured: false,
//             },
//             {
//                 businessType: BUSINESS_TYPES.jobPortal,
//                 name: "Professional",
//                 plan: "professional",
//                 price: 14,
//                 featured: true,
//             },
//         ];
//
//         for (const data of payload) {
//             const exists = await ProductPricing.findOne({name: data.name, businessType: data.businessType});
//             if (!exists) {
//                 await ProductPricing.create(data);
//                 console.log(`✅ Created ${name}: ${data.name}`);
//             } else {
//                 console.log(`⚡ Skipped (already exists): ${data.name}`);
//             }
//         }
//         finishSeeding(name)
//     } catch (e) {
//         console.error('Seeding failed:', e);
//     }
// }
//
// async function seedProductOffers(name) {
//     try {
//         startSeeding(name)
//         const payload = [
//             {
//                 businessType: "leads",
//                 badge: "Featured",
//                 name: "United States Leads",
//                 desc: "Accelerate your outreach with our comprehensive United States Leads Bundle. Featuring high-quality, up-to-date leads ideal for email campaigns, sales funnels, or B2B marketing. Drive results with data that converts.",
//                 price: 300,
//                 originalPrice: 430,
//                 highlights: "Verified & Up-to-Date, Nationwide Coverage, All 52 states included, Email & Phone Ready, 13190+ records.",
//                 expireIn: Date.now() + 3 * 24 * 60 * 60 * 1000,
//                 discount: 30,
//                 imageUrl: "https://res.cloudinary.com/dyhw94ngc/image/upload/v1754765687/us_auzhj1.jpg",
//             },
//             {
//                 businessType: "leads",
//                 badge: "Popular",
//                 name: "UAE Leads",
//                 desc: "Accelerate your outreach with our comprehensive United Arab Emirates Leads Bundle. Featuring high-quality, up-to-date leads ideal for email campaigns, sales funnels, or B2B marketing. Drive results with data that converts.",
//                 price: 60,
//                 originalPrice: 75,
//                 highlights: "Verified & Up-to-Date, Nationwide Coverage, All 8 states included, Website, Phone and Email Ready, 7277+ records.",
//                 expireIn: Date.now() + 3 * 24 * 60 * 60 * 1000,
//                 discount: 20,
//                 imageUrl: "https://res.cloudinary.com/dyhw94ngc/image/upload/v1754765689/dubai_q2zewd.jpg",
//             },
//             {
//                 businessType: "leads",
//                 badge: "Popular",
//                 name: "United Kingdom Leads",
//                 desc: "Unlock business opportunities across the UK with our premium leads bundle. Designed for marketers, sales teams, and agencies ready to scale fast with high-intent, verified contacts.",
//                 price: 300,
//                 originalPrice: 430,
//                 highlights: "Verified & Up-to-Date, Nationwide Coverage, All12 states included, Website, Phone and Email Ready, 10799+ records.",
//                 expireIn: Date.now() + 3 * 24 * 60 * 60 * 1000,
//                 discount: 30,
//                 imageUrl: "https://res.cloudinary.com/dyhw94ngc/image/upload/v1754765690/uk_qzvbup.jpg",
//             },
//         ];
//
//         for (const data of payload) {
//             const exists = await ProductOffer.findOne({name: data.name});
//             if (!exists) {
//                 await ProductOffer.create(data);
//                 console.log(`✅ Created ${name}: ${data.name}`);
//             } else {
//                 console.log(`⚡ Skipped (already exists): ${data.name}`);
//             }
//         }
//         finishSeeding(name)
//     } catch (e) {
//         console.error('Seeding failed:', e);
//     }
// }
//
// function startSeeding(name= ""){
//     name?console.log(`---------------- ${name} Seeding Started ----------------`):console.log(`-------- ${name} Seeding Started --------`)
//     !name && console.log("")
// }
//
// function finishSeeding(name=""){
//     !name && console.log("")
//     name?console.log(`---------------- 🎉 ${name} Seeding finished! ----------------`):console.log(`-------- 🎉 ${name} Seeding finished! --------`)
//     name && console.log("")
// }
//
// async function run() {
//     try {
//         startSeeding()
//         await seedUsers('Users');
//         await seedProductCategory('Product Categories');
//         await seedProductSubCategory('Product Sub Categories');
//         await seedDigitalProductsSocialMediaProducts('Digital Products - Social Media Bundle - Products');
//         await seedProductPricing('Product Pricing');
//         await seedProductOffers('Product Offers');
//         finishSeeding()
//     } catch (err) {
//         console.error('Seeding failed:', err);
//     } finally {
//         await mongoose.disconnect()
//     }
// }
//
// run();