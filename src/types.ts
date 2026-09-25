export type MainCategory = 'plants_gardening' | 'electronics' | 'project_kits';

export type PlantSubcategory =
  | 'indoor_plants'
  | 'outdoor_plants'
  | 'flowering_plants'
  | 'succulents'
  | 'herbs'
  | 'vegetable_plants'
  | 'fruit_plants'
  | 'air_purifying_plants'
  | 'plant_seeds'
  | 'pots_planters'
  | 'soil_fertilizers'
  | 'gardening_tools'
  | 'smart_gardening';

export type ElectronicsSubcategory =
  | 'microcontrollers'
  | 'sensors_iot'
  | 'actuators_motors'
  | 'diy_kits'
  | 'tools_power';

export type Subcategory = PlantSubcategory | ElectronicsSubcategory;

export type SunlightLevel = 'Low' | 'Medium' | 'Bright' | 'Direct Sunlight';
export type MaintenanceLevel = 'Very Low' | 'Low' | 'Medium' | 'High';
export type PlantLocation = 'Bedroom' | 'Living Room' | 'Balcony' | 'Office' | 'Outdoor Garden';
export type DifficultyLevel = 'Easy' | 'Moderate' | 'Advanced';
export type IndoorOutdoorType = 'Indoor' | 'Outdoor' | 'Both';

export interface PlantCareInfo {
  sunlight: string;
  water: string;
  soil: string;
  temperature: string;
  pruning: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  mainCategory: MainCategory;
  subcategory: Subcategory;
  price: number;
  originalPrice?: number;
  image: string;
  gallery?: string[];
  shortDescription: string;
  description: string;
  inStock: boolean;
  stockQuantity: number;
  estimatedDelivery: string;
  availableNearby: boolean;
  rating: number;
  ratingCount: number;
  tags?: string[];
  isPopular?: boolean;

  // Plant specific attributes
  size?: string;
  potIncluded?: boolean;
  potInformation?: string;
  sunlightRequirement?: SunlightLevel;
  waterRequirement?: string;
  soilType?: string;
  difficulty?: DifficultyLevel;
  indoorOutdoor?: IndoorOutdoorType;
  petSafety?: string;
  locations?: PlantLocation[];
  maintenanceLevel?: MaintenanceLevel;
  careInstructions?: PlantCareInfo;

  // Smart Gardening / Kit specific attributes
  isSmartGardening?: boolean;
  includesKitComponents?: string[];

  // Bundle specific attributes
  isBundle?: boolean;
  bundleSavings?: number;
  bundleItems?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  deliveryTimeSlot: string;
  paymentMethod: 'upi' | 'card' | 'cod';
  status: 'Order Placed' | 'Packing at Dark Store' | 'Rider Out for Delivery' | 'Delivered';
  createdAt: string;
}

export interface PlantQuizAnswers {
  location: PlantLocation | null;
  sunlight: SunlightLevel | null;
  maintenance: MaintenanceLevel | null;
}
