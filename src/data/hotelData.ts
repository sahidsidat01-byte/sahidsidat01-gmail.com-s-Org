import { Room, Dish, GalleryPhoto } from '../types';

export const ROOMS_DATA: Room[] = [
  {
    id: 'presidential-suite',
    name: 'The Presidential Rose Suite',
    category: 'penthouse',
    price: 22000,
    originalPrice: 26000,
    sizeSqFt: 850,
    rating: 4.98,
    reviewsCount: 86,
    badge: 'Most Luxurious',
    badgeType: 'primary',
    freeCancellation: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-et3JtSDCvZ_vib_7JE4AY7EjjGS-G1JhxQbmvaFa9yE9QRbebmYLGFUiZDVo-MlnQvYMHWzCklpEE_IrKVXw_peoOcggg2FPLIMY2iTX2ugbQ9hg2kD266bYg3Jp3RrOYxHrGUaV23Yqcjq-3McAjUOEEc0MUce7YpVC4jvx2KsQytDe34GQWfLhqqWYWh_AbsO9PQFZscWsQKhwYfogX67-RquzZD34aTGBHOiUtBSiSHGhKA95',
    description: 'Panoramic mountain & garden vista, bespoke imperial decor, dual king bedrooms, and an expansive private balcony with an outdoor heated plunge pool.',
    bedType: '2 King Beds',
    view: 'Mountain & Rose Garden',
    maxGuests: 4,
    amenities: [
      { name: 'Private Plunge Pool', icon: 'pool' },
      { name: '2 King Beds', icon: 'bed' },
      { name: 'Mountain Panorama', icon: 'landscape' },
      { name: '24h Butler', icon: 'room_service' },
      { name: 'Steam Sauna', icon: 'hot_tub' },
      { name: 'Evening Cocktails', icon: 'wine_bar' }
    ]
  },
  {
    id: 'executive-deluxe',
    name: 'Executive Garden Deluxe',
    category: 'deluxe',
    price: 9200,
    originalPrice: 11000,
    sizeSqFt: 480,
    rating: 4.86,
    reviewsCount: 142,
    badge: 'Garden View',
    badgeType: 'secondary',
    freeCancellation: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfRN62bINs6cuFTeSYsWASoIVWRh0NIfwi0gmmbQkcZrXK7a4w3OjPm3vxef7W6Q0hHo5ROjYsKfox1h2DawdufpRNmAYgi3NwDsA-a8-WZ2ay7aPYWlkgXzh53sWj7vdluTuSa2P6gA3h2nSKsp_pGPlnMigz7KvK9OXxGnu72o3PXfcwuhjbu1oqxpWzLn2uZv9e95PSdqchzSijKvXE-FO8oUsmRZU7v_q5Bk1ICsBirM5mPfhz',
    description: 'Private sun-drenched veranda directly overlooking the heritage rose nursery, featuring spa-grade rain shower and artisanal morning breakfast.',
    bedType: 'King Bed',
    view: 'Heritage Rose Nursery',
    maxGuests: 2,
    amenities: [
      { name: 'Private Balcony', icon: 'balcony' },
      { name: 'King Bed', icon: 'king_bed' },
      { name: 'Rain Shower', icon: 'shower' },
      { name: 'Buffet Breakfast', icon: 'free_breakfast' },
      { name: 'Nespresso Bar', icon: 'coffee' },
      { name: 'High Speed Wi-Fi', icon: 'wifi' }
    ]
  },
  {
    id: 'heritage-royal-club',
    name: 'Heritage Royal Club',
    category: 'executive',
    price: 12500,
    originalPrice: 14500,
    sizeSqFt: 600,
    rating: 4.93,
    reviewsCount: 98,
    badge: 'Club Privileges',
    badgeType: 'tertiary',
    freeCancellation: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAD1Qzuzgu8icir9ClshEAODAyO9fosAo57Mws_6d4DuCjP6qh_C6v-6txozAh_iHVjlMxqB7MqZg0AoNAAI1p8ZhFNxygfgyZxDOymQ6BE1niBMQRJycAdHhiFW9jR1-oqqrYsy-1L5D6h8rFYnDIecvv1QsoGufcqtpfixAvrFk-cjToNF0ceNdLb0kFlsq5tJwqO9x6zqneBr-PaTe2Du3McksNdGh9BBNhnH4llI1uS1St25ZbF',
    description: 'Colonial grandeur elevated by bespoke personalized butler service, deep soaking bathtub, and exclusive evening tea service in the Member\'s Lounge.',
    bedType: 'King Canopy Bed',
    view: 'Inner Courtyard Fountain',
    maxGuests: 3,
    amenities: [
      { name: 'Butler Service', icon: 'concierge' },
      { name: 'Soaking Tub', icon: 'bathtub' },
      { name: 'Evening High Tea', icon: 'local_cafe' },
      { name: 'Lounge Access', icon: 'wine_bar' },
      { name: 'Valet Parking', icon: 'local_parking' }
    ]
  },
  {
    id: 'superior-comfort',
    name: 'Superior Comfort Room',
    category: 'deluxe',
    price: 6400,
    originalPrice: 7800,
    sizeSqFt: 350,
    rating: 4.74,
    reviewsCount: 210,
    badge: 'Great Value',
    badgeType: 'neutral',
    freeCancellation: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6TS8kpFQhYuB7cJm0-35WI-ZBmCcQ0oFofQqRG81vm23M6L3VTOBHtAv7Z3xEc4KLJ7drPTghe0jorNlNwfQAKWmm2Zbv8Fpaa1XymnLW5Th7hvsSmjsnoxZaE-PKS81b05gjRU5olErvvQYAY9NyalivJmdKYUIfbr_AsEw0tn2LPxOJVH166gW0JFJjwWuPTNfaMgsYgzVC3QgZy3MC9kr0GG9qtOrCjnL0p8W254f_bjqwSOMZ',
    description: 'An intimate, tranquil sanctuary thoughtfully configured with an ergonomic workspace, high-speed Wi-Fi, and a bean-to-cup espresso setup.',
    bedType: 'Queen Bed',
    view: 'Botanical Grounds',
    maxGuests: 2,
    amenities: [
      { name: 'Queen Bed', icon: 'single_bed' },
      { name: 'Work Desk', icon: 'desk' },
      { name: '1 Gbps Wi-Fi', icon: 'wifi' },
      { name: 'Espresso Machine', icon: 'coffee_maker' },
      { name: 'Botanical Toiletries', icon: 'spa' }
    ]
  },
  {
    id: 'royal-rose-villa',
    name: 'The Heritage Garden Villa',
    category: 'villas',
    price: 18500,
    originalPrice: 21000,
    sizeSqFt: 720,
    rating: 4.95,
    reviewsCount: 64,
    badge: 'Private Pavilion',
    badgeType: 'primary',
    freeCancellation: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaHTf4VzUBPJQlnxuq1dOrb8vDZSTkaFQ8I7SelAN6Uf9Q-s_2MUgzIayIcAsORBVa3v1ZT1mBcVEU3s2OB2CJFw9TqtzgTRcChKPmNQE7r3WC1cA2hykYPfhfMLsHUoyiWYPDB5tmIVfBS61h5bgM819NsUzGLS8SgGYqNeYtPlL6F2J9gK0YIpoxmWYldIwrtSjzQyxW8hrs1gfaeecYfvVfOqiAvHkWAyqPMGsRBc7il1GoF4sg',
    description: 'Standalone heritage stone pavilion enclosed within secluded private rose arbors, open-air marble courtyard, and private outdoor gazebo dining.',
    bedType: 'California King Bed',
    view: 'Private Rose Garden Pavilion',
    maxGuests: 3,
    amenities: [
      { name: 'Private Courtyard', icon: 'yard' },
      { name: 'Gazebo Dining', icon: 'outdoor_grill' },
      { name: 'Outdoor Rain Shower', icon: 'shower' },
      { name: 'Chauffeur On Call', icon: 'directions_car' }
    ]
  }
];

export const DISHES_DATA: Dish[] = [
  {
    id: 'dish-1',
    name: 'Royal Saffron Dum Biryani',
    category: 'royal-mains',
    type: 'non-veg',
    price: 750,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRWjOaoTEx1VXx36F5TZroXOD9-vK3vyJ9uVh3u84vGA0LtMlhytPC1xiP_1l3L_yEjEs-GuEEKPy0YYkZ51-0TF7n78T3Ra1OcopgBzS3IfyZMYJkhacq9b8_n9qgMyXmmZHyxaFYFXSVDt_ckVDrZLXbvXSF_LRoBZ7Pdvj5YSoQw0HSQdQpTxg-PKHALo1Jylg_tGXS4I-Exk9wOZ_e-vx-VDapeo2hu-8Gk4boAU3XfKCrXC19',
    description: 'Slow-cooked fragrant Basmati, tender spiced spring lamb, infused with royal Kashmiri saffron aroma and sealed with pastry dough.',
    isRecommended: true,
    tags: ['Served with Burani Raita', 'Serves 1-2', 'Awadhi Special'],
    pairingSuggestion: 'Vintage Syrah or Spiced Rose Chai'
  },
  {
    id: 'dish-2',
    name: 'Paneer Tikka Angara',
    category: 'starters',
    type: 'veg',
    price: 580,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWxEcNxJC0Sl3lrZiXt6NJ5ZdxOtUYlC-NR98X4o9p3aR6WuZx9eNL2UjWmmXJ5D_ekKDpFYREnQBkC330ChXGmNKFunshyezBvW61mh47Yz707vPH618wf5tSez3qHznh879kaFvOH-OQkIXVuVKfoPg-hwsfzXtBo7HXBKN3Jn5JOnzI0tnQQCvK4tRxCndNiLwfk_BwueUPKqZO00Qb4CdJMRge_48BHnHfE3xeWLihgSlmEI41',
    description: 'Farm-fresh cottage cheese cubes smoked in charcoal clay oven, infused with Mathania pickled chili spices and roasted cumin.',
    isRecommended: true,
    tags: ['Mint Laccha Salad', 'Gluten-Free', 'Clay Smoked'],
    pairingSuggestion: 'Cold-pressed Guava Panna'
  },
  {
    id: 'dish-3',
    name: 'Wild Mushroom & Truffle Sotto',
    category: 'continental',
    type: 'veg',
    price: 720,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5JzRoI-FxRJd53C4ODK-VRPz7loBTCF6YTQ54qf6IQ8kDmTToSuXUsNI08qVAWjIul_AzL7cw4IgQbaPUUuFqr2XuFAkYr5e4lTgUWiu1cYpIjYP6htB1dxCYgS9LUsoHOOyV7jMJmJrYAJ1x0iNqjuU0WPc8eJQNZXWaLvQydbkUp1ouK-GrF0SCu7dKWoajQVrO9HIBsZcI0Fe2ckfPVXnN1Q-xggm5jmBTHtdWD-iuPTpMsO-k',
    description: 'Velvety slow-stirred Arborio rice, infused with forest porcini mushrooms, cold-pressed black truffle oil, and 24-month aged Parmigiano Reggiano.',
    isRecommended: true,
    tags: ['Artisan Cheese', 'Vegetarian Delight', 'Italian Classic'],
    pairingSuggestion: 'Crisp Pinot Grigio'
  },
  {
    id: 'dish-4',
    name: 'Grilled Atlantic Salmon',
    category: 'continental',
    type: 'non-veg',
    price: 980,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDg3KuijASYGZENhV_AnYrQyS8ZogR2DB6EbxuO33JLXbR1W86Ktjba7c0uKpsLbmmcOV7ahKMXnkgdIl5ZQULN3FJw1XojU0z10zO7sZeo2zilUzhk7CrNMmHKF80v_qLKUbizxZB1dYfUxNa7mrrl1OvJGBqDpklJltAnkC4pXXQV8Cg-fN1mxhueMBR27yMaoybyHus612OzwKXDLCzda6O4wQXKbOWXpJA_d2Qas3hXrown8eMw',
    description: 'Pan-seared Atlantic salmon fillet bathed in velvety lemon-thyme herb butter, paired with butter-glazed asparagus spears and garlic crushed baby potatoes.',
    isRecommended: false,
    tags: ['Omega-3 Rich', 'Herb Glazed', 'Chef Selection'],
    pairingSuggestion: 'Sauvignon Blanc'
  },
  {
    id: 'dish-5',
    name: 'Rose Petal Panna Cotta',
    category: 'desserts',
    type: 'veg',
    price: 420,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASLJUYdaIsGFPsgerhLV8_4Rl1b-N9h32UzX4eTvk5wV-jw4zI4qOp1PU50IpHYaCehhBYh9LGlg3G6Y4Vhl8wmhr0wyhSL2ZHIEyKLCK13MZ9s5PWs5pQJZhTglubcMb4PpWtEpD9lstzs8p09Q-46HiCrdWYEICF7J3uOx6aVI1JIg4yHocX56jM8Gmt5ycl2vizLs9JZkVb8qL-YyVr1fjIulMdsJnPDHPg2TRclDoJixOZNu8Z',
    description: 'Infused with estate-grown organic Damask rose petal reduction, organic vanilla bean cream, crowned with roasted Iranian pistachio praline.',
    isRecommended: true,
    tags: ['House Icon', 'Contains Nuts', 'Eggless'],
    pairingSuggestion: 'Dessert Wine or Kahwa'
  },
  {
    id: 'dish-6',
    name: 'Smoked Royal Cardamom Old Fashioned',
    category: 'mocktails',
    type: 'veg',
    price: 340,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8Jj-9tFUch3kKrbY8D1VvgF1mj6WEzKg033nOQvv0mwiNQ3If1G4uRhIP5IUNUpAKIfi0Aj2UJIH844r_LRMQhYhrsOOOkbGKqu-sUj3Ce_Y_vWBthY-Y6brZwvmDDW_-tk86okQDyN8Cq6lJ0aKpn7IJGK87O64bjmYSBHNO0mVJ2Y-Ax25sYTsEKkAI-Iag1yc_pFVHN94noN-jpAOyNN1csb-dwQhZ1b-w-yFB900uHZleP0Zq',
    description: 'Zero-proof oak and smoked cinnamon elixir, cold-extracted green cardamom, bitter orange zest, presented under an aroma smoke cloche.',
    isRecommended: true,
    tags: ['Non-Alcoholic', 'Tableside Smoke Cloche', 'Artisan Mixology'],
    pairingSuggestion: 'Signature Beverage'
  },
  {
    id: 'dish-7',
    name: 'Slow-Simmered Dal Bukhara',
    category: 'royal-mains',
    type: 'veg',
    price: 590,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5ZR8ttm-ShhAduZ8ITyTjAq0tEJ9IiLwcrxAZlaaBu0xbV6oyW7zOf2kBRPWnti8ba0GPP9THJmnjOU4HOx7XCdFlVr-uWnDc_wDflzmOToOQpfHeJVFQW7hf_2OFtmiU8Pwp-AKPnsUIW6GUKuY2c5dHsFX-aRwRHRZVlRTei7hjobLNkV580KSNdP_ODUJqc4bzBHJfyAD0Fj-oDccXR512srI9fDc7KX9fSpz9ctUjuWDaVtyG',
    description: 'Black lentils slow-cooked overnight for 18 hours with churned country butter, vine-ripened plum tomatoes, and toasted Kashmiri spices.',
    isRecommended: true,
    tags: ['18 Hours Slow Cooked', 'Pure Ghee', 'Heritage Recipe'],
    pairingSuggestion: 'Tandoori Garlic Naan'
  },
  {
    id: 'dish-8',
    name: 'Tandoori Garlic Butter Naan',
    category: 'breads',
    type: 'veg',
    price: 180,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvf2EykBBfjASmLE9cx8_cf3BKQVEFypeSSIjYjNjb5hx-D_Pm3vQpW5rp1pd5DdZeoPbkzQZCLlBtGs8iI0Ut_Y2L516qGS8LsUznw0FotpQFlxxbYW0l7DAWbMu0h9WK3gvbQuWrjjnPLZ0CpibU_q0BENgCHl_f5NJVNS9Nc8b1rz2mognPV_Jk_7LujFMKrD5xTw3gpeJUSLqkWeSWshhCpVIv6HQQTGp3KHHJ1NfJ2xsmApJu',
    description: 'Hand-stretched dough baked on clay tandoor walls, brushed with pure clarified butter and roasted garlic slivers, finished with fresh coriander.',
    isRecommended: false,
    tags: ['Clay Tandoor', 'Hand Stretched', 'Freshly Baked']
  }
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: 'Grand Heritage Facade',
    category: 'architecture',
    categoryLabel: 'Heritage Architecture',
    location: 'Main Court • Rose Garden',
    description: 'Illuminated by hand-beaten brass lanterns at dusk against an indigo Jaipur sky.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHwLSbHX1rX2aqb3TOOUF2TVpm6hmqL0fno3d2uGlLDP7eNMuLRfzw2jQvhzH--rtvq2Lk02-qYxVF78yxOuAqu6NrWjqshQtoYMg6TR0eC1ixibqW02q8v7B5jRe3I5NG-tqICoCMWB6dYG9pBgrwv1WRKDG9zofdCm796N1xVDD0SbSW6dR1BA2Ho0nuYYUCOJF1Uq1t2QTzL1Jy6bdDOSujLLgclR6MX53v8UXLwA-WUh3HzlVv',
    timeOfDay: 'Dusk'
  },
  {
    id: 'gal-2',
    title: 'Sunlit Royal Master Bedroom',
    category: 'suites',
    categoryLabel: 'Grand Suites',
    location: 'Maharaja Wing • Floor 2',
    description: 'Sun-drenched carved four-poster suite with private panoramic terrace overlooking blooming gardens.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBB8WBIYN1Ew0viuoBq0z1TX9ZA9gaQClQGsW-DN8Iu3-rN8wZ1lYzYqoTy0jhttNT6wNbA8PcE9GscpN5OWH1lg5lYZfNN0-KaocMLe56bEuA8GMJgqW0_pOPLvjmDCWEjfPnbzUouq1c99RTQDN5cGFK30DFiomUS-FACGE6T08tmBtY6j2FUwq6m4Q1fHa3UJcMXe3U7s8wjpf3ZpBsXo7OeHuupnoniZAXt9e-YZnqVPhAKP7mP',
    timeOfDay: 'Morning'
  },
  {
    id: 'gal-3',
    title: 'Signature Saffron Biryani',
    category: 'dining',
    categoryLabel: 'Gourmet Dining',
    location: 'Rosewood Bistro',
    description: 'Artisanal saffron basmati rice biryani presented in an authentic hand-hammered antique copper degh pot.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCW6H3ZeLeGvUNo2wXxMAqnDG4nboit-a8wqrbQszQ-XKmTCoO8mAbaMWCJ0_3Kj-pljQTMNKPqD-iA8LKi5a8k9rg01of2G_AbYS4oTmMsIOZaeUzJtgHxrhDcLYIqhkoLP26loObKS1bj2l3MSlYpzr_N_ivYR7I-h49nHsaHMbPav8IMso65q7Tv4yqLJ-Gy5iPbux-NCM6MBie4-mqb5mA09mdnXAsRn4wimmm4o1WGVP8Z-S5_'
  },
  {
    id: 'gal-4',
    title: 'Marble Soaking Tub',
    category: 'suites',
    categoryLabel: 'Grand Suites',
    location: 'Royal Suite Ensuite',
    description: 'White Makrana marble bath accented with freshly gathered fragrant garden rose petals.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWagHllyr9KK7hJsDNzYigec6tdRN-0WrRl-MtpFfXgtVs8a-lbal9AMb-ec6C0BekgFnKIUyXoHQORCjKfTangLBhndjHnlFhWC-syZ1jPYICa8drYNZT8aOzYNCRWA-BMjX9Tvw1vLRVQal1efJjtkyJNJLpX4KubOV404BoZcNo2wNRhorJw7kNSwQUgQ8Pr2FRJGlTv2PUuqp33hUkT9rmO6yMXN-hMt79r0ym3w0JtwiTN4fQ'
  },
  {
    id: 'gal-5',
    title: 'Azure Reflection Pool',
    category: 'pool',
    categoryLabel: 'Lush Courtyards & Pool',
    location: 'Zenana Garden Pavilions',
    description: 'Crystal clear azure luxury swimming pool bordered by vintage terracotta urns overflowing with blooming crimson roses.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJBJ3arUPdJuaT2Crl0PnbrNKdaqzDshy3e-4pz3bcCV2ac5tUYOJrpOYwLCyBTHNqWFw_Sm4pPU-evE9nUx4V-uLWxzyocBna6nj-2p3YjdsalkvM0syjk0F3CxOJ4d042drPb_CK6eMyF0eEdjmy_8bBCEnoZetuMmdeuEBrtWMKciOy2xTDiyPSQ2mSDx9n9pi_dp_4M1WUHIM7FYzSbqdN88fqbY-UZ40Pn2WEqeTZEZvQ5aRi'
  },
  {
    id: 'gal-6',
    title: 'Candlelit Courtyard Feast',
    category: 'dining',
    categoryLabel: 'Gourmet Dining',
    location: 'Central Baradari Courtyard',
    description: 'Intimate candlelit luxury dinner table arrangement under a silk-canopied courtyard with warm ambient taper candles.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCcBfaR-wLUwmm9XE-6KaG6LnZyMmfVepts4vlUmiS9LwsbZQ-lAFdMP9PVEq7OCcIGl3ynX324maxIgrAc2syaLl2k4KftVN5vy-ya4L8_WoI5m4eWNsce7INWRQhgsBxhN8CgEBTTSQyLxg3ZLcSGGGBQAAHygdHZPir013VB1IMkGZrZAA_5pQHidgS_ai2qsfLLji0Q7g6iL9ZTuAmGm28IsitqhESg7clmheU68otODzwaBla'
  },
  {
    id: 'gal-7',
    title: 'Sommelier Wine Tasting',
    category: 'dining',
    categoryLabel: 'Gourmet Dining',
    location: 'Cellar Vault 1892',
    description: 'Boutique underground stone wine cellar featuring arched racks filled with vintage wine bottles and oak barrel tasting tables.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtD4j1_Y1mSbhTeEMW6h7cfGEGpIkNZSZmW1RBhjP_Ox3zm5izzagDsBIovlW611yWsQmy9CIw8_UnonOlIQDv0yn_WC3ZP3yqP9oI4ze8W10udC7jaSotS9C-5lQ2rpWdgHEWwcsXUqo4O-BABaqgaRCU9IWMw1lBO8THyeQElTrG_cen3jzsMYz-taJWXhtWg8jR-YN4Ayke9FkedcumvvTSNTmzMOHkXwdzImqCNsSXzSjM7Nzv'
  },
  {
    id: 'gal-8',
    title: 'Royal Welcome Aarti',
    category: 'events',
    categoryLabel: 'Heritage Events',
    location: 'Grand Portico Arrival',
    description: 'Traditional Rajasthani royal welcome ceremony at grand hotel entrance with marigold and rose garlands.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrg8BMoKmrZj5w70Joodva4j7RP952XnLn4yVfWCHhSR3ON66J2ON3u5dPbq2EH4PVIFFxH5sqkDJjnGBT-f094sbaORryP3mC5ClvYZTgtbC1GaUqRxQR0G_fS6u0EsK7eiG_y_VettK7NIeCLEzTiXWypwXy8doKgYMi_4PisoPNcEe2MjTGXPzniYw1XB817eJLUD-EjiyR-tlrECnVhxhUQeWDNFH955VVBgMddCQxt1V0rEhP'
  }
];

export const HISTORICAL_QUOTES = [
  {
    text: "Here time slows its gallop to a stroll among the petals. There is no serenity quite like an evening at Rose Garden.",
    author: "Sir Evelyn Croft, Royal Envoy",
    date: "Oct 1942"
  },
  {
    text: "The roasted saffron flatbread and fresh rose preserves awakened senses I had forgotten in Paris. A triumph of grace.",
    author: "Madame Delphine Laroche, Author",
    date: "Spring 1968"
  },
  {
    text: "To wake surrounded by morning dew and songbirds in the Jasmine suite is to understand the true luxury of silence.",
    author: "Arjun Singhania, Patron",
    date: "Winter 2011"
  }
];

export const INITIAL_BOOKINGS = [
  {
    id: 'RG-88349',
    guestName: 'Aarav Kapoor',
    initials: 'AK',
    suite: 'Exec Garden Deluxe',
    dates: 'Oct 14 – Oct 17 (3 Nights)',
    amount: 31768,
    status: 'Confirmed'
  },
  {
    id: 'RG-88312',
    guestName: 'Meera Nair',
    initials: 'MN',
    suite: 'Presidential Suite',
    dates: 'Suite 401 • Oct 12 – Oct 16',
    amount: 66000,
    status: 'Checked-in'
  },
  {
    id: 'RG-88365',
    guestName: 'Vikram Malhotra',
    initials: 'VM',
    suite: 'Heritage Club',
    dates: 'Oct 15 – Oct 18 (3 Nights)',
    amount: 25000,
    status: 'Confirmed'
  }
];
