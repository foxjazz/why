export interface PriceTypes { totalCount_str: string; items: Array<items>; }
export interface items {
    volume_str: string; buy: boolean; issued: string; price: number; volumeEntered: number;
    minVolume: number; volume: number; range: string; href: string; duration_str: string; location: location; duration: number;
    minVolume_str: string; volumeEntered_str: string; type: type; id: number; id_str: string;
}
export interface location { id_str: string; href: string; id: number; name: string; }
export interface type { id_str: string; href: string; id: number; name: string; }

export class PriceData {price: number; volumeEntered: number; minVolumne: number; volume: number;
     range: string; location: string; type: string; duration: number; issued: string; }
export interface PriceBand {region: string; itemname: string; pricedata: Array<PriceData>; }
