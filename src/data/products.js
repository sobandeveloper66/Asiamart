export const MOCK_PRODUCTS = [
  {
    id: "hakata-ramen",
    name: "Premium Hakata Tonkotsu Ramen Kit",
    category: "Food",
    country: "Japan",
    description: "Experience the authentic taste of Fukuoka with our Premium Hakata Tonkotsu Ramen Kit. Specially curated and imported directly from Japan, this kit provides everything you need to create a restaurant-quality ramen bowl in the comfort of your home. The rich, creamy pork bone broth is slowly simmered to perfection, paired with ultra-thin artisanal noodles that hold the flavor beautifully.",
    images: [
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1591814468924-cafb57c28348?w=800&auto=format&fit=crop&q=80"
    ],
    price: 850,
    discount: 22,
    originalPrice: 1100,
    rating: 5,
    reviewsCount: 124,
    stock: 15,
    tags: ["AUTHENTIC PRODUCT", "Best Seller"],
    specifications: {
      "Origin": "Fukuoka, Japan",
      "Weight": "450g (2 Servings)",
      "Shelf Life": "6 Months",
      "Allergens": "Wheat, Soy, Pork"
    },
    boxContents: [
      "2x Servings of Hakata-style thin noodles",
      "2x Packets of concentrated Tonkotsu broth base",
      "Premium dried wood ear mushrooms (Kikurage)",
      "Authentic sesame oil and red ginger packets"
    ],
    trending: true,
    newArrival: false,
    flashDeal: false
  },
  {
    id: "japanese-matcha-tea",
    name: "Ceremonial Uji Matcha Green Tea",
    category: "Food",
    country: "Japan",
    description: "Stone-ground ceremonial grade matcha green tea from Uji, Kyoto. Cultivated using traditional shade-growing techniques, this bright green matcha offers a smooth, rich, and naturally sweet taste with no bitterness. Perfect for traditional tea ceremonies, matcha lattes, or premium baking.",
    images: [
      "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&auto=format&fit=crop&q=80"
    ],
    price: 1250,
    discount: 0,
    originalPrice: 1250,
    rating: 4.8,
    reviewsCount: 86,
    stock: 24,
    tags: ["BEST SELLER"],
    specifications: {
      "Origin": "Uji, Kyoto, Japan",
      "Weight": "30g",
      "Shelf Life": "12 Months",
      "Grade": "Ceremonial"
    },
    boxContents: [
      "1x Sealed tin of Ceremonial Uji Matcha (30g)"
    ],
    trending: true,
    newArrival: false,
    flashDeal: false
  },
  {
    id: "korean-mask-set",
    name: "Korean Hydrating Face Mask Set",
    category: "Beauty",
    country: "South Korea",
    description: "A curated set of premium hydrating sheet masks from top Korean skincare brands. Infused with hyaluronic acid, tea tree extract, and snail mucin, these masks deeply hydrate, soothe redness, and restore your skin's natural glass-like glow within 15 minutes.",
    images: [
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=80"
    ],
    price: 890,
    discount: 0,
    originalPrice: 890,
    rating: 4.7,
    reviewsCount: 95,
    stock: 40,
    tags: ["K-BEAUTY"],
    specifications: {
      "Origin": "Seoul, South Korea",
      "Weight": "10 Sheets x 25ml",
      "Shelf Life": "24 Months",
      "Skin Type": "All Skin Types"
    },
    boxContents: [
      "10x Premium Hydrating Sheet Masks (Assorted)"
    ],
    trending: true,
    newArrival: false,
    flashDeal: false
  },
  {
    id: "thai-chili-paste",
    name: "Authentic Thai Chili Paste (Nam Prik Pao)",
    category: "Food",
    country: "Thailand",
    description: "A rich, sweet, and savory chili paste made from roasted chilies, garlic, shallots, and shrimp paste. An essential seasoning for Tom Yum soup, stir-fries, or as a flavorful spread for toast and snacks.",
    images: [
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80"
    ],
    price: 350,
    discount: 0,
    originalPrice: 350,
    rating: 4.6,
    reviewsCount: 64,
    stock: 50,
    tags: ["SPICY"],
    specifications: {
      "Origin": "Bangkok, Thailand",
      "Weight": "250g",
      "Shelf Life": "18 Months",
      "Allergens": "Shrimp"
    },
    boxContents: [
      "1x Glass Jar of Thai Chili Paste (250g)"
    ],
    trending: true,
    newArrival: false,
    flashDeal: false
  },
  {
    id: "chinese-porcelain-bowl",
    name: "Classic Chinese Porcelain Bowl Set",
    category: "Home",
    country: "China",
    description: "Elegant, hand-painted ceramic bowls adorned with traditional blue and white patterns. Fired at high temperatures for exceptional durability, these bowls are ideal for serving rice, soup, or noodles, bringing a touch of Chinese heritage to your dining table.",
    images: [
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&auto=format&fit=crop&q=80"
    ],
    price: 1800,
    discount: 0,
    originalPrice: 1800,
    rating: 4.9,
    reviewsCount: 42,
    stock: 12,
    tags: ["HANDMADE"],
    specifications: {
      "Origin": "Jingdezhen, China",
      "Material": "Fine Porcelain",
      "Dimensions": "12cm x 6cm",
      "Care": "Microwave and Dishwasher Safe"
    },
    boxContents: [
      "4x Hand-painted Blue & White Porcelain Bowls"
    ],
    trending: true,
    newArrival: false,
    flashDeal: false
  },
  {
    id: "kitkat-strawberry",
    name: "Japanese KitKat Strawberry Uji",
    category: "Food",
    country: "Japan",
    description: "Imported Japanese KitKats featuring a crispy wafer covered in sweet strawberry-infused white chocolate, blended with real strawberry seeds and premium Uji green tea undertones. A unique and delicious sweet treat from Japan.",
    images: [
      "https://images.unsplash.com/photo-1581798459219-318e76aecc7b?w=800&auto=format&fit=crop&q=80"
    ],
    price: 350,
    discount: 0,
    originalPrice: 350,
    rating: 4.9,
    reviewsCount: 110,
    stock: 80,
    tags: ["NEW", "BEST SELLER"],
    specifications: {
      "Origin": "Tokyo, Japan",
      "Weight": "12 Mini Bars",
      "Shelf Life": "9 Months",
      "Allergens": "Milk, Soy, Wheat"
    },
    boxContents: [
      "1x Bag of Japanese Strawberry KitKat (12 pieces)"
    ],
    trending: false,
    newArrival: true,
    flashDeal: false
  },
  {
    id: "chatramue-thai-tea",
    name: "ChaTraMue Original Thai Tea Mix",
    category: "Food",
    country: "Thailand",
    description: "The gold standard of Thai tea since 1945. A blend of black tea, exotic spices, and sweet flavorings that creates the iconic orange, milky Thai iced tea. Enjoy it hot, cold, or sweetened with condensed milk for the ultimate refreshment.",
    images: [
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80"
    ],
    price: 650,
    discount: 0,
    originalPrice: 650,
    rating: 4.8,
    reviewsCount: 172,
    stock: 35,
    tags: ["NEW"],
    specifications: {
      "Origin": "Chiang Rai, Thailand",
      "Weight": "400g",
      "Shelf Life": "24 Months",
      "Type": "Loose Leaf Blend"
    },
    boxContents: [
      "1x Bag of ChaTraMue Thai Tea Mix (400g)"
    ],
    trending: false,
    newArrival: true,
    flashDeal: false
  },
  {
    id: "innisfree-mask-set",
    name: "Innisfree Daily Sheet Mask Set",
    category: "Beauty",
    country: "South Korea",
    description: "A nourishing bundle of 10 daily sheet masks formulated with natural extracts harvested from Jeju Island. Contains Green Tea for soothing hydration, Pomegranate for firming, and Aloe for cooling relief.",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80"
    ],
    price: 890,
    discount: 0,
    originalPrice: 890,
    rating: 4.5,
    reviewsCount: 55,
    stock: 60,
    tags: ["NEW"],
    specifications: {
      "Origin": "Jeju, South Korea",
      "Weight": "10 Sheets x 20ml",
      "Shelf Life": "24 Months",
      "Key Ingredients": "Jeju Green Tea, Aloe, Bamboo"
    },
    boxContents: [
      "10x Innisfree My Real Squeeze Sheet Masks"
    ],
    trending: false,
    newArrival: true,
    flashDeal: false
  },
  {
    id: "rk61-keyboard",
    name: "Royal Kludge RK61 Keyboard",
    category: "Electronics",
    country: "China",
    description: "A compact 60% mechanical gaming keyboard featuring hot-swappable switches, dual-mode wireless/wired connectivity, and stunning RGB backlighting. Specially tuned for a satisfying tactile typing experience.",
    images: [
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop&q=80"
    ],
    price: 3499,
    discount: 0,
    originalPrice: 3499,
    rating: 4.7,
    reviewsCount: 230,
    stock: 18,
    tags: ["NEW"],
    specifications: {
      "Origin": "Shenzhen, China",
      "Layout": "60% ANSI (61 Keys)",
      "Switches": "RK Brown (Tactile)",
      "Connectivity": "Bluetooth 5.0, 2.4G Wireless & USB-C"
    },
    boxContents: [
      "1x RK61 Mechanical Keyboard",
      "1x USB-C Cable",
      "1x Keycap/Switch Puller",
      "4x Replacement switches"
    ],
    trending: false,
    newArrival: true,
    flashDeal: false
  },
  {
    id: "samyang-ramen",
    name: "Samyang Buldak Ramen (5 Pack)",
    category: "Food",
    country: "South Korea",
    description: "The world-famous Korean spicy chicken fire noodles. This 5-pack of Samyang Buldak Ramen features chewy instant ramen noodles coated in an extremely hot, sweet, and savory gochujang chili sauce. Not for the faint of heart!",
    images: [
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80"
    ],
    price: 450,
    discount: 18,
    originalPrice: 550,
    rating: 4.8,
    reviewsCount: 312,
    stock: 45,
    tags: ["-18% Deal", "HOT"],
    specifications: {
      "Origin": "Seoul, South Korea",
      "Weight": "700g (5 x 140g)",
      "Shelf Life": "12 Months",
      "Spiciness Level": "SHU 4,400 (Very Hot)"
    },
    boxContents: [
      "5x Individually Wrapped Buldak Ramen Packets"
    ],
    trending: false,
    newArrival: false,
    flashDeal: true
  },
  {
    id: "uji-matcha-ceremonial",
    name: "Uji Matcha Ceremonial Grade (Tin)",
    category: "Food",
    country: "Japan",
    description: "Direct-import premium ceremonial green tea powder from Uji, Kyoto. Cultivated with traditional organic shade-farming methods, stone-ground, and packed at source to retain its vibrant color and fresh grassy sweet notes.",
    images: [
      "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&auto=format&fit=crop&q=80"
    ],
    price: 1200,
    discount: 17,
    originalPrice: 1450,
    rating: 4.9,
    reviewsCount: 145,
    stock: 22,
    tags: ["-17% Deal"],
    specifications: {
      "Origin": "Uji, Kyoto, Japan",
      "Weight": "40g",
      "Shelf Life": "12 Months",
      "Certification": "JAS Organic"
    },
    boxContents: [
      "1x Sealed 40g metal tin of Ceremonial Matcha"
    ],
    trending: false,
    newArrival: false,
    flashDeal: true
  },
  {
    id: "cosrx-snail-mucin",
    name: "COSRX Snail Mucin 96 Essence",
    category: "Beauty",
    country: "South Korea",
    description: "Formulated with 96.3% Snail Secretion Filtrate, this light-weight essence absorbs into the skin fast to nourish, repair, and plump skin with deep moisture. Improves skin elasticity, reduces dark spots, and delivers long-lasting hydration.",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80"
    ],
    price: 950,
    discount: 40,
    originalPrice: 1600,
    rating: 4.9,
    reviewsCount: 512,
    stock: 30,
    tags: ["-40% Deal", "BEST SELLER"],
    specifications: {
      "Origin": "Seoul, South Korea",
      "Volume": "100ml",
      "Shelf Life": "30 Months",
      "Key Ingredients": "96.3% Snail Secretion Filtrate, Sodium Hyaluronate"
    },
    boxContents: [
      "1x Pump Bottle of COSRX Snail Mucin Essence (100ml)"
    ],
    trending: false,
    newArrival: false,
    flashDeal: true
  },
  {
    id: "thai-sweet-chili",
    name: "Premium Thai Sweet Chili Sauce",
    category: "Food",
    country: "Thailand",
    description: "An authentic, gluten-free sweet chili dipping sauce made with sun-ripened red chilies and garlic. The perfect accompaniment for spring rolls, dim sum, fried chicken, or as a general marinade sauce.",
    images: [
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&auto=format&fit=crop&q=80"
    ],
    price: 280,
    discount: 20,
    originalPrice: 350,
    rating: 4.6,
    reviewsCount: 78,
    stock: 50,
    tags: ["-20% Deal"],
    specifications: {
      "Origin": "Chonburi, Thailand",
      "Weight": "300ml",
      "Shelf Life": "24 Months",
      "Dietary Specs": "Gluten-Free, Vegan"
    },
    boxContents: [
      "1x Bottle of Sweet Chili Sauce (300ml)"
    ],
    trending: false,
    newArrival: false,
    flashDeal: true
  },
  {
    id: "minimalist-tea-set",
    name: "Minimalist Kyusu Tea Set",
    category: "Lifestyle",
    country: "Japan",
    description: "A beautiful, premium tea set featuring a traditional matte black ceramic Kyusu teapot with a side handle and four matching tea cups. Its elegant design and high-quality heat retention bring zen simplicity to your daily brewing ritual.",
    images: [
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80"
    ],
    price: 2499,
    discount: 20,
    originalPrice: 3125,
    rating: 4.8,
    reviewsCount: 38,
    stock: 8,
    tags: ["20% OFF", "Japan Section"],
    specifications: {
      "Origin": "Tokoname, Japan",
      "Material": "Matte Glazed Clay",
      "Capacity": "Kyusu: 400ml, Cups: 100ml each",
      "Includes": "1 Teapot, 4 Cups"
    },
    boxContents: [
      "1x Kyusu Teapot with Side Handle",
      "4x Matching Ceramic Tea Cups"
    ],
    trending: false,
    newArrival: false,
    flashDeal: false
  },
  {
    id: "washi-paper-lantern",
    name: "Washi Paper Lantern",
    category: "Lifestyle",
    country: "Japan",
    description: "A traditional Japanese table lamp handcrafted using structural bamboo ribbing and organic translucent Washi paper. Emits a soft, warm, and atmospheric glow that is perfect for creates a calming ambiance in any bedroom or living space.",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80"
    ],
    price: 1250,
    discount: 0,
    originalPrice: 1250,
    rating: 4.7,
    reviewsCount: 29,
    stock: 14,
    tags: ["Japan Section"],
    specifications: {
      "Origin": "Gifu, Japan",
      "Material": "Washi Paper, Bamboo, Metal Stand",
      "Dimensions": "25cm Height, 15cm Diameter",
      "Power Source": "USB / Plug-In (Warm LED bulb included)"
    },
    boxContents: [
      "1x Handcrafted Washi Paper Shade",
      "1x Metal Stand Structure",
      "1x USB Power Cord with switch",
      "1x E12 Warm LED Bulb"
    ],
    trending: false,
    newArrival: false,
    flashDeal: false
  },
  {
    id: "bamboo-chopsticks-set",
    name: "Premium Bamboo Chopsticks Set",
    category: "Lifestyle",
    country: "Japan",
    description: "An elegant dining set consisting of five pairs of reusable chopsticks crafted from natural premium bamboo, complete with matching ceramic rests. Coated with food-grade natural lacquer for water resistance and durability.",
    images: [
      "https://images.unsplash.com/photo-1612222869049-d8ec83637a3c?w=800&auto=format&fit=crop&q=80"
    ],
    price: 850,
    discount: 0,
    originalPrice: 850,
    rating: 4.9,
    reviewsCount: 88,
    stock: 50,
    tags: ["Japan Section"],
    specifications: {
      "Origin": "Kyoto, Japan",
      "Material": "Natural Moso Bamboo, Ceramic rests",
      "Length": "22.5cm",
      "Includes": "5 Pairs of chopsticks, 5 Rests"
    },
    boxContents: [
      "5x Pairs of Bamboo Chopsticks",
      "5x Ceramic Chopstick Holders"
    ],
    trending: false,
    newArrival: false,
    flashDeal: false
  },
  {
    id: "xiaomi-powerbank",
    name: "Xiaomi 20000mAh Power Bank 3 Pro",
    category: "Mobile Accessories",
    country: "China",
    description: "High-capacity 20000mAh power bank featuring 45W two-way fast charging. Perfect for charging your smartphone, tablet, or even laptop on the go. Multiple safety protections ensure your devices charge safely.",
    images: [
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&auto=format&fit=crop&q=80"
    ],
    price: 2499,
    discount: 15,
    originalPrice: 2950,
    rating: 4.8,
    reviewsCount: 450,
    stock: 120,
    tags: ["China Section", "Best Seller"],
    specifications: {
      "Origin": "Beijing, China",
      "Capacity": "20000mAh",
      "Input/Output": "USB-C (45W Max), USB-A (18W Max)",
      "Battery Type": "Lithium Polymer"
    },
    boxContents: [
      "1x 20000mAh Power Bank",
      "1x USB-C to USB-C Cable",
      "1x User Manual"
    ],
    trending: true,
    newArrival: true,
    flashDeal: false
  },
  // --- TAIWAN (4 Authentic Products) ---
  {
    id: "taiwan-boba-tea-kit",
    name: "Taiwanese Brown Sugar Bubble Milk Tea Kit (DIY 6 Servings)",
    category: "Food & Beverages",
    country: "Taiwan",
    description: "Bring home the legendary flavor of Taipei's lively Shilin Night Market! This authentic Taiwanese DIY Bubble Tea Kit features slow-roasted Assam brown sugar tea leaves paired with vacuum-sealed, chewy Grade-A tapioca pearls from Taichung. Simple 5-minute boiling creates a velvety cafe-quality boba experience.",
    images: [
      "https://images.unsplash.com/photo-1558857563-b3773ee42d75?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1579954115563-e72bf1381629?w=800&auto=format&fit=crop&q=80"
    ],
    price: 950,
    discount: 21,
    originalPrice: 1200,
    rating: 4.9,
    reviewsCount: 218,
    stock: 45,
    tags: ["TAIWAN SPECIALTY", "Best Seller"],
    specifications: {
      "Origin": "Taichung & Taipei, Taiwan",
      "Weight": "650g (6 Total Servings)",
      "Shelf Life": "9 Months",
      "Allergens": "Milk Solids, Tea"
    },
    boxContents: [
      "6x Brown Sugar Assam Tea Syrup Sachets",
      "6x Quick-Cook Raw Tapioca Pearl Packs",
      "6x Wide Eco-friendly Boba Straws"
    ],
    trending: true,
    newArrival: false,
    flashDeal: true
  },
  {
    id: "taiwan-pineapple-cakes",
    name: "Chia Te Style Authentic Pineapple Cakes (Gift Box of 8)",
    category: "Snacks",
    country: "Taiwan",
    description: "Taiwan's #1 most revered national pastry! Each shortcake is baked to a flaky, golden buttery crust and generously filled with jammy slow-simmered native indigenous Taiwanese pineapples. Balanced perfectly between buttery sweet and refreshing tropical tartness.",
    images: [
      "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&auto=format&fit=crop&q=80"
    ],
    price: 1450,
    discount: 19,
    originalPrice: 1800,
    rating: 4.8,
    reviewsCount: 142,
    stock: 30,
    tags: ["GOURMET SNACK", "Gift Box"],
    specifications: {
      "Origin": "Taipei, Taiwan",
      "Weight": "400g (8 Individually Wrapped Cakes)",
      "Shelf Life": "60 Days (No Preservatives)",
      "Allergens": "Wheat, Egg, Dairy, Soy"
    },
    boxContents: [
      "1x Deluxe Gold Foil Box containing 8 Premium Pineapple Cakes"
    ],
    trending: true,
    newArrival: true,
    flashDeal: false
  },
  {
    id: "taiwan-alishan-oolong",
    name: "High-Mountain Alishan Supreme Oolong Tea (100g Tin)",
    category: "Tea & Beverages",
    country: "Taiwan",
    description: "Hand-harvested from the cool, misty high-altitude ridges of Mount Ali (Alishan) at over 1,800 meters. This award-winning lightly oxidized Oolong tea leaves unroll completely when steeped to release an intense floral Orchid fragrance, smooth golden liquor, and a lingering honey aftertaste.",
    images: [
      "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80"
    ],
    price: 1850,
    discount: 16,
    originalPrice: 2200,
    rating: 5.0,
    reviewsCount: 89,
    stock: 20,
    tags: ["PREMIUM TEA", "Alishan Heritage"],
    specifications: {
      "Origin": "Alishan (Mount Ali), Taiwan",
      "Weight": "100g Loose Whole Leaf",
      "Elevation": "1,800m",
      "Oxidation": "20% (Light Oolong)"
    },
    boxContents: [
      "1x Vacuum-sealed Airtight Metal Canister (100g Alishan Oolong)"
    ],
    trending: false,
    newArrival: true,
    flashDeal: false
  },
  {
    id: "taiwan-gongfu-tea-set",
    name: "Taiwanese Handcrafted Kiln Oolong Tea Set (5-Piece Ceramic)",
    category: "Home & Kitchen",
    country: "Taiwan",
    description: "An artisan Taiwanese Gongfu brewing teapot set crafted from high-fired mineral stoneware. Features a perfectly balanced precision pour teapot with internal stainless filter net and 4 traditional tasting cups designed to retain warmth and highlight tea bouquet aromatics.",
    images: [
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=800&auto=format&fit=crop&q=80"
    ],
    price: 2499,
    discount: 22,
    originalPrice: 3200,
    rating: 4.7,
    reviewsCount: 64,
    stock: 18,
    tags: ["HANDCRAFTED", "Kitchen Heritage"],
    specifications: {
      "Origin": "Yingge Ceramic Town, Taiwan",
      "Material": "Natural Kiln-fired Stoneware",
      "Capacity": "Teapot 220ml / Cups 45ml each",
      "Care": "Handwash recommended"
    },
    boxContents: [
      "1x Precision Kiln-fired Teapot with Lid",
      "4x Matching Traditional Tasting Cups",
      "1x Protective Padded Keepsake Wooden Box"
    ],
    trending: false,
    newArrival: false,
    flashDeal: false
  },

  // --- VIETNAM (4 Authentic Products) ---
  {
    id: "vietnamese-robusta-coffee-kit",
    name: "Trung Nguyen Legend Vietnamese Dark Robusta Coffee + Phin Brewer",
    category: "Food & Beverages",
    country: "Vietnam",
    description: "Experience authentic Hanoi-style Cafe Sua Da (Iced Sweet Condensed Milk Coffee) in India! Sourced from the volcanic soils of Buon Ma Thuot, this heritage dark roast Robusta bean grind delivers intense chocolate and butter aroma notes, paired with a genuine stainless steel Phin drip brewer.",
    images: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80"
    ],
    price: 799,
    discount: 27,
    originalPrice: 1100,
    rating: 4.9,
    reviewsCount: 380,
    stock: 60,
    tags: ["VIETNAM COFFEE", "Best Seller"],
    specifications: {
      "Origin": "Buon Ma Thuot, Vietnam",
      "Weight": "500g Ground Robusta Coffee + 1 Metal Filter",
      "Roast Level": "Dark French Roast (Traditional Style)",
      "Shelf Life": "18 Months"
    },
    boxContents: [
      "1x 500g Bag of Authentic Vietnamese Robusta Roast",
      "1x Food-Grade Stainless Steel Phin Drip Filter (4-piece)"
    ],
    trending: true,
    newArrival: false,
    flashDeal: true
  },
  {
    id: "vietnamese-pho-noodle-box",
    name: "Artisanal Pho Gia Truyen Meal & Spring Roll Rice Paper Box",
    category: "Food",
    country: "Vietnam",
    description: "Craft real street-style Vietnamese Pho noodle soup and crunchy fresh summer rolls! Contains traditional non-GMO sun-dried round rice paper sheets (Banh Trang), wide pho flat vermicelli noodles, and an authentic herb pouch (star anise, cinnamon sticks, cloves, cardamom).",
    images: [
      "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1543826173-70651703c5a4?w=800&auto=format&fit=crop&q=80"
    ],
    price: 650,
    discount: 19,
    originalPrice: 800,
    rating: 4.8,
    reviewsCount: 112,
    stock: 50,
    tags: ["STREET FOOD", "Authentic Recipe"],
    specifications: {
      "Origin": "Ho Chi Minh City, Vietnam",
      "Weight": "700g (4 Full Meal Servings)",
      "Shelf Life": "12 Months",
      "Dietary": "100% Gluten-Free & Vegan"
    },
    boxContents: [
      "1x Pack of Traditional Flat Rice Noodles (300g)",
      "1x Pack of Round Rice Paper Rolls (250g)",
      "2x Traditional Pho Herbal Broth Spice Pouches"
    ],
    trending: false,
    newArrival: true,
    flashDeal: false
  },
  {
    id: "vietnam-hoian-silk-lantern",
    name: "Handmade Hoi An Natural Bamboo & Brocade Silk Folding Lantern",
    category: "Home & Kitchen",
    country: "Vietnam",
    description: "Handcrafted by multi-generational heritage guild artisans in ancient Hoi An village. Built from resilient heat-treated natural Vietnamese bamboo ribs stretched with lustrous crimson and gold silk brocade fabric. Creates an ambient, zen illumination in dining rooms, patios, or lounges.",
    images: [
      "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1557053503-0c252e5c8093?w=800&auto=format&fit=crop&q=80"
    ],
    price: 1350,
    discount: 25,
    originalPrice: 1800,
    rating: 4.9,
    reviewsCount: 77,
    stock: 22,
    tags: ["HOI AN HERITAGE", "Handmade Decor"],
    specifications: {
      "Origin": "Hoi An Ancient Town, Vietnam",
      "Dimensions": "45cm Length x 35cm Diameter",
      "Material": "Treated Natural Bamboo Frame & Woven Silk Brocade",
      "Lighting Compatibility": "Fits standard LED E26/E27 ceiling pendant bulb cords"
    },
    boxContents: [
      "1x Foldable Hoi An Brocade Silk Lantern with Steel Expanding Hanger",
      "1x Decorative Lower Silk Tassel"
    ],
    trending: true,
    newArrival: true,
    flashDeal: false
  },
  {
    id: "vietnam-lotus-herbal-tea",
    name: "Vietnamese Royal White Lotus Flower Sleep Infusion Tea (50g)",
    category: "Tea & Beverages",
    country: "Vietnam",
    description: "Sourced from the serene highlands of Da Lat, this calming herbal relaxing tea features hand-picked organic white lotus flowers, tender green leaves, and sweet licorice root. Highly praised in traditional Vietnamese herbal medicine for calming nervous tension and inducing deep restful sleep.",
    images: [
      "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=800&auto=format&fit=crop&q=80"
    ],
    price: 699,
    discount: 22,
    originalPrice: 899,
    rating: 4.7,
    reviewsCount: 93,
    stock: 35,
    tags: ["HERBAL SLEEP TEA", "Da Lat Specialty"],
    specifications: {
      "Origin": "Da Lat Highlands, Vietnam",
      "Weight": "50g Dried Flower Blossoms",
      "Caffeine": "Caffeine-Free",
      "Shelf Life": "24 Months"
    },
    boxContents: [
      "1x Aroma-sealed Kraft Zip Pouch of Dried White Lotus Blossoms"
    ],
    trending: false,
    newArrival: false,
    flashDeal: false
  },

  // --- JAPAN (3 Additional Authentic Iconic Products) ---
  {
    id: "japan-seki-gyuto-knife",
    name: "Japanese VG-10 Damascus Gyuto Chef's Knife (Seki Artisan Build)",
    category: "Home & Kitchen",
    country: "Japan",
    description: "Hand-honed in Seki City—Japan's legendary 800-year-old sword smithing capital. Forged from 67-layer VG-10 high-carbon Damascus steel with an octagonal dark rosewood traditional handle. Ground to an acute 15-degree edge geometry for frictionless gliding through meats, vegetables, and fish.",
    images: [
      "https://images.unsplash.com/photo-1593005510509-d05b264f1c99?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1588644534433-28669e26210b?w=800&auto=format&fit=crop&q=80"
    ],
    price: 6999,
    discount: 18,
    originalPrice: 8500,
    rating: 5.0,
    reviewsCount: 156,
    stock: 12,
    tags: ["SEKI CUTLERY", "Master Craftsman"],
    specifications: {
      "Origin": "Seki City, Gifu, Japan",
      "Blade Material": "VG-10 Japanese High-Carbon Stainless Core with 67-Layer Damascus Cladding",
      "Blade Length": "210mm (8.2 inches)",
      "Handle Material": "Octagonal Rosewood with Buffalo Horn Ferrule"
    },
    boxContents: [
      "1x Authentic Seki City Gyuto Chef's Knife",
      "1x Traditional Wooden Saya (Blade Cover)",
      "1x Certificate of Seki Origin & Care Instructions"
    ],
    trending: true,
    newArrival: false,
    flashDeal: false
  },
  {
    id: "japan-studio-anc-earbuds",
    name: "Tokyo Acoustic Studio Pro Noise-Canceling Hi-Res Wireless Earbuds",
    category: "Electronics",
    country: "Japan",
    description: "Direct Japanese acoustic audio engineering at its finest. Equipped with custom titanium dynamic drivers, adaptive hybrid dual-microphone Active Noise Cancellation (-42dB), LDAC high-res audio codec transmission, and 30-hour playback endurance with rapid USB-C charging.",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=800&auto=format&fit=crop&q=80"
    ],
    price: 9999,
    discount: 28,
    originalPrice: 13999,
    rating: 4.8,
    reviewsCount: 420,
    stock: 25,
    tags: ["HI-RES AUDIO", "Japanese Tech"],
    specifications: {
      "Origin": "Tokyo, Japan Design",
      "Connectivity": "Bluetooth 5.3 with Multipoint Pairing",
      "Battery Life": "8 hours standalone / 30 hours with Aluminum Charging Case",
      "Water Resistance": "IPX5 Splash & Sweat Proof"
    },
    boxContents: [
      "1x Pair of Studio Pro ANC Earbuds",
      "1x Aluminum Charging Case",
      "4x Pairs of Medical Grade Silicone Ear Tips (XS/S/M/L)",
      "1x Braided USB-C Rapid Charging Cable"
    ],
    trending: false,
    newArrival: true,
    flashDeal: true
  },
  {
    id: "japan-senka-cleanser",
    name: "Senka Perfect Whip Micro Amino Acid Facial Foam (Twin Pack)",
    category: "Beauty",
    country: "Japan",
    description: "Japan's uninterrupted #1 best-selling face cleansing foam for 12 consecutive years! Generates an ultra-rich micro-density marshmallow foam infused with naturally harvested Japanese White Silk Essence and double Hyaluronic Acid to gently sweep away impurities without stripping precious skin hydration.",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80"
    ],
    price: 649,
    discount: 19,
    originalPrice: 800,
    rating: 4.9,
    reviewsCount: 610,
    stock: 75,
    tags: ["J-BEAUTY", "#1 in Japan"],
    specifications: {
      "Origin": "Osaka, Japan",
      "Weight": "2x 120g (Twin Pack)",
      "Key Active Ingredients": "Sericin White Silk Cocoon Essence, Double Hyaluronic Acid, Collagen",
      "Skin Type": "Normal, Combination, Sensitive"
    },
    boxContents: [
      "2x Full-size Senka Perfect Whip Cleanser Tubes (120g each)"
    ],
    trending: true,
    newArrival: false,
    flashDeal: false
  },

  // --- SOUTH KOREA (3 Additional Authentic Iconic Products) ---
  {
    id: "korea-dolsot-stone-bowl",
    name: "Korean Granite Stone Dolsot Bowl with Scorching Wooden Trivet",
    category: "Home & Kitchen",
    country: "South Korea",
    description: "Recreate sizzling, restaurant-quality Seoul diner dining right at home! Crafted from ultra-dense thermal mineral granite stone that withstands stovetop open flame and oven baking, keeping Kimchi Jjigae soups bubbling hot and yielding coveted golden crispy rice crusts for Dolsot Bibimbap.",
    images: [
      "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&auto=format&fit=crop&q=80"
    ],
    price: 1899,
    discount: 24,
    originalPrice: 2499,
    rating: 4.9,
    reviewsCount: 188,
    stock: 20,
    tags: ["KOREAN COOKWARE", "Authentic Dining"],
    specifications: {
      "Origin": "Incheon, South Korea",
      "Material": "100% Carved Natural Granite Stone + Heat-resistant Pine Wood Trivet",
      "Capacity": "1,000ml (Medium Family Single Serving)",
      "Compatibility": "Gas Stovetop, Oven, Ceramic Hob safe"
    },
    boxContents: [
      "1x Natural Granite Dolsot Stone Bowl (1L)",
      "1x Thick Protective Natural Pine Wood Serving Trivet"
    ],
    trending: false,
    newArrival: true,
    flashDeal: false
  },
  {
    id: "korea-cosrx-mucin-essence",
    name: "COSRX Advanced Snail 96 Mucin Power Repairing Essence (100ml)",
    category: "Beauty",
    country: "South Korea",
    description: "The legendary global K-Beauty glass skin essential! Formulated with 96.3% cruelty-free Snail Secretion Filtrate and Sodium Hyaluronate to deeply regenerate damaged skin barriers, soothe inflammation, fade acne dark marks, and bestow radiant dewiness with zero sticky after-feel.",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80"
    ],
    price: 1150,
    discount: 21,
    originalPrice: 1450,
    rating: 5.0,
    reviewsCount: 920,
    stock: 80,
    tags: ["VIRAL K-BEAUTY", "Holy Grail"],
    specifications: {
      "Origin": "Seoul, South Korea",
      "Volume": "100ml",
      "Active Concentration": "96.3% Snail Mucin Extract",
      "Formulation": "Fragrance-free, Hypoallergenic, Cruelty-free"
    },
    boxContents: [
      "1x Sealed Glass Bottle of COSRX Advanced Snail 96 Mucin Power Essence"
    ],
    trending: true,
    newArrival: false,
    flashDeal: true
  },
  {
    id: "korea-hotteok-snack-mix",
    name: "Authentic Korean Hotteok Sweet Brown Sugar Pancake Mix Pack",
    category: "Snacks",
    country: "South Korea",
    description: "Bring winter vibes from Myeongdong street food stalls into your kitchen! Simple just-add-water yeasted dough flour mix that pans fries into irresistible golden crispy pastries bursting with a rich molten lava center of sweet brown sugar, roasted peanuts, and spicy Korean cinnamon.",
    images: [
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop&q=80"
    ],
    price: 550,
    discount: 27,
    originalPrice: 750,
    rating: 4.8,
    reviewsCount: 235,
    stock: 55,
    tags: ["KOREAN STREET FOOD", "Quick DIY Snack"],
    specifications: {
      "Origin": "Busan, South Korea",
      "Weight": "400g (Yields 8 Large Hotteok Pancakes)",
      "Preparation Time": "15 Minutes",
      "Allergens": "Wheat, Peanuts, Soy"
    },
    boxContents: [
      "1x Glutinous Rice Dough Flour Mix",
      "1x Cinnamon Peanut Brown Sugar Filling Packet",
      "1x Instant Dry Yeast Sache"
    ],
    trending: true,
    newArrival: true,
    flashDeal: false
  },

  // --- CHINA (2 Additional Authentic Iconic Products) ---
  {
    id: "china-yixing-zisha-teapot",
    name: "Authentic Yixing Zisha Purple Clay Gongfu Teapot (Xi Shi Form)",
    category: "Home & Kitchen",
    country: "China",
    description: "Crafted from authentic high-porosity Zisha (purple ore clay) excavated exclusively in Yixing, Jiangsu. Celebrated by tea masters worldwide because the raw unglazed clay naturally absorbs aromatic tea oils over years of use, imparting unrivaled body and sweetness to Oolong, Pu-erh, and Black teas.",
    images: [
      "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=800&auto=format&fit=crop&q=80"
    ],
    price: 3499,
    discount: 22,
    originalPrice: 4500,
    rating: 4.9,
    reviewsCount: 68,
    stock: 14,
    tags: ["YIXING HERITAGE", "Tea Ceremony"],
    specifications: {
      "Origin": "Yixing City, Jiangsu Province, China",
      "Clay Type": "Genuine Zi Ni (Purple Mud Zisha Clay)",
      "Capacity": "200ml (Classic Xi Shi Globular Profile)",
      "Spout Filter": "14-Hole Diamond Ball Mesh"
    },
    boxContents: [
      "1x Handcrafted Yixing Zisha Teapot with Lid",
      "1x Collector's Silk Brocade Storage Wrap",
      "1x Certificate of Clay Authenticity"
    ],
    trending: false,
    newArrival: true,
    flashDeal: false
  },
  {
    id: "china-mijia-ionic-hair dryer",
    name: "Xiaomi Mijia Smart High-Speed Brushless Ionic Super Jet Hair Dryer",
    category: "Electronics",
    country: "China",
    description: "Cutting-edge smart digital personal care tech. Features an aerospace-grade 110,000 RPM high-speed digital motor producing 62 m/s typhoon airspeed that safely dries hair in under 3 minutes without thermal damage, while firing 50M negative ions to eradicate static frizz.",
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80"
    ],
    price: 4999,
    discount: 29,
    originalPrice: 6999,
    rating: 4.8,
    reviewsCount: 190,
    stock: 30,
    tags: ["SMART ELECTRONICS", "High Speed Tech"],
    specifications: {
      "Origin": "Shenzhen, China",
      "Motor Speed": "110,000 RPM Brushless Motor (62m/s Airflow)",
      "Temperature Controls": "Smart NTC Thermostat (100 times/sec monitoring)",
      "Power Rating": "1600W (Indian standard plugin rated)"
    },
    boxContents: [
      "1x High-Speed Brushless Ionic Hair Dryer",
      "1x 360-Degree Magnetic Concentrator Nozzle",
      "1x User Manual & Indian Warranty Card"
    ],
    trending: true,
    newArrival: false,
    flashDeal: true
  },

  // --- THAILAND (2 Additional Authentic Iconic Products) ---
  {
    id: "thai-herbal-compress-ball",
    name: "Traditional Thai Organic Herbal Massage Compress Poultice Box",
    category: "Massage & Spa",
    country: "Thailand",
    description: "Sourced directly from therapeutic massage treatment centers in Chiang Mai. Includes three tight linen balls tightly bundled with organic Thai therapeutic root herbs including Plai ginger, Turmeric, Kaffir Lime, Camphor, and Lemongrass. Steam gently to relieve arthritis joints and muscular soreness.",
    images: [
      "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80"
    ],
    price: 999,
    discount: 26,
    originalPrice: 1350,
    rating: 4.9,
    reviewsCount: 145,
    stock: 42,
    tags: ["THAI SPA HERITAGE", "Natural Pain Relief"],
    specifications: {
      "Origin": "Chiang Mai, Thailand",
      "Weight": "3x 150g Large Poultice Balls",
      "Ingredients": "100% Organic Dried Thai Plai, Turmeric, Camphor, Tamarind Leaves",
      "Reusability": "Each ball can be steamed and chilled for up to 5 therapeutic uses"
    },
    boxContents: [
      "3x Sealed Vacuum Packs of Traditional Herbal Compress Balls",
      "1x Illustrated Thai Spa Massage Protocol Guide"
    ],
    trending: false,
    newArrival: true,
    flashDeal: false
  },
  {
    id: "thai-tomyum-soup-pack",
    name: "Bangkok Royal Tom Yum Kung Authentic Herbal Soup Master Kit",
    category: "Food",
    country: "Thailand",
    description: "The absolute authentic aromatic sour, fiery, and herbaceous Bangkok broth master pack! Includes sun-dried whole lemongrass stalks, wild kaffir lime leaf slices, aromatic galangal slices, fiery Thai chili paste (Nam Prik Pao), and instant rich coconut cream powder.",
    images: [
      "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&auto=format&fit=crop&q=80"
    ],
    price: 599,
    discount: 25,
    originalPrice: 799,
    rating: 4.8,
    reviewsCount: 276,
    stock: 65,
    tags: ["AUTHENTIC THAI FOOD", "Quick Gourmet"],
    specifications: {
      "Origin": "Bangkok, Thailand",
      "Weight": "350g (Makes 1.5 Liters of Soup / 5 Servings)",
      "Shelf Life": "12 Months",
      "Spiciness Level": "Medium-Hot (Adjustable Chili Paste)"
    },
    boxContents: [
      "1x Vacuum Pack of Dried Lemongrass, Galangal & Kaffir Lime Leaves",
      "2x Concentrated Nam Prik Pao Chili Paste Pouches",
      "1x Rich Coconut Cream Powder Sachet"
    ],
    trending: true,
    newArrival: false,
    flashDeal: false
  },
  {
    id: "thai-massage-oil",
    name: "Authentic Thai Lemongrass Massage Oil",
    category: "Massage & Spa",
    country: "Thailand",
    description: "Premium therapeutic massage oil infused with authentic Thai lemongrass and sweet almond oil. Designed to relieve muscle tension, improve circulation, and provide a deeply relaxing aromatherapy experience reminiscent of a traditional Thai spa.",
    images: [
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&auto=format&fit=crop&q=80"
    ],
    price: 950,
    discount: 10,
    originalPrice: 1050,
    rating: 4.9,
    reviewsCount: 312,
    stock: 85,
    tags: ["Thailand Section", "Aromatherapy"],
    specifications: {
      "Origin": "Chiang Mai, Thailand",
      "Volume": "250ml",
      "Key Ingredients": "Lemongrass Essential Oil, Sweet Almond Oil, Jojoba Oil",
      "Skin Type": "All Skin Types"
    },
    boxContents: [
      "1x 250ml Lemongrass Massage Oil Bottle"
    ],
    trending: true,
    newArrival: true,
    flashDeal: false
  }
];

export const COUNTRIES = ["China", "Japan", "Thailand", "South Korea", "Taiwan", "Vietnam"];
export const CATEGORIES = ["Food", "Food & Beverages", "Snacks", "Tea & Beverages", "Beauty", "Home & Kitchen", "Electronics", "Lifestyle", "Mobile Accessories", "Massage & Spa"];
