import {Supplier} from "./supplier";


export interface Delivery {
  id?: number;
  receiptNumber: string;
  lotNumber: string;
  fournisseur:string;
  deliveryDate: string; // ISO string representing the Instant
  status: string;       // You can also define an enum for OliveLotStatus if desired
  globalLotNumber: string;
  oliveQuantity: number;
  oilQuantity: number;
  region: string | null;
  oliveVariety: string | null;
  storageUnit: string;
  supplier: Supplier | null;
  unitPrice: number;
  price: number;
  paidAmount: number;
  unpaidAmount: number;
  qualityControlResults: string[]; // Updated to an array of QualityControlResultDto
}
