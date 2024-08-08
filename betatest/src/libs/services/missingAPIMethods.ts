import { Item } from '@/types/firestore/item.types';
import { missingAmount } from './scoreMethods';

type ItemDictionary = {
  [key: string]: { name: string; genreId: number };
};

const itemDictionary: ItemDictionary = {
  food: { name: "非常食品", genreId: 100227 },
  water: { name: "水", genreId: 201351 },
  blanket: { name: "毛布", genreId: 215566 },
  phone: { name: "電話", genreId: 565004 },
  flashlight: { name: "懐中電灯", genreId: 101070 },
  television: { name: "テレビ", genreId: 211742 },
  fan: { name: "扇風機", genreId: 562637 },
  generator: { name: "発電機", genreId: 101070 },
  tent: { name: "テント", genreId: 101070 },
  heatPack: { name: "カイロ", genreId: 551176 },
  megaphone: { name: "メガホン", genreId: 112998 },
};


const appId = '1097554411296396228'; // Application ID
const reqUrl = 'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601';

export const foodAPI = async (keyword: string = '非常食品', genreId: number = 100227): Promise<any> => {
  try {
    const response = await fetch(`${reqUrl}?applicationId=${appId}&format=json&keyword=${keyword}&genreId=${genreId}&hits=5`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Response was not ok', response.status, response.statusText);
      return undefined;
    }
  } catch (error) {
    console.error('Fetch failed', error);
    return undefined;
  }
};

//Get Water from Rakuten
export const waterAPI = async (keyword: string = '水', genreId: number = 201351): Promise<any> => {
  try {
    const response = await fetch(`${reqUrl}?applicationId=${appId}&format=json&keyword=${keyword}&genreId=${genreId}&hits=5`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Response was not ok', response.status, response.statusText);
      return undefined;
    }
  } catch (error) {
    console.error('Fetch failed', error);
    return undefined;
  }
};

//Get blanket from Rakuten
export const blanketAPI = async (keyword: string = '毛布', genreId: number = 215566): Promise<any> => {
  try {
    const response = await fetch(`${reqUrl}?applicationId=${appId}&format=json&keyword=${keyword}&genreId=${genreId}&hits=5`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Response was not ok', response.status, response.statusText);
      return undefined;
    }
  } catch (error) {
    console.error('Fetch failed', error);
    return undefined;
  }
};

//Get phone from Rakuten
export const phoneAPI = async (keyword: string = '電話', genreId: number = 565004): Promise<any> => {
  try {
    const response = await fetch(`${reqUrl}?applicationId=${appId}&format=json&keyword=${keyword}&genreId=${genreId}&hits=5`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Response was not ok', response.status, response.statusText);
      return undefined;
    }
  } catch (error) {
    console.error('Fetch failed', error);
    return undefined;
  }
};

//Get tv from Rakuten
export const televisionAPI = async (keyword: string = 'テレビ', genreId: number = 211742): Promise<any> => {
  try {
    const response = await fetch(`${reqUrl}?applicationId=${appId}&format=json&keyword=${keyword}&genreId=${genreId}&hits=5`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Response was not ok', response.status, response.statusText);
      return undefined;
    }
  } catch (error) {
    console.error('Fetch failed', error);
    return undefined;
  }
};

//Get fan from Rakuten
export const fanAPI = async (keyword: string = '扇風機', genreId: number = 562637): Promise<any> => {
  try {
    const response = await fetch(`${reqUrl}?applicationId=${appId}&format=json&keyword=${keyword}&genreId=${genreId}&hits=5`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Response was not ok', response.status, response.statusText);
      return undefined;
    }
  } catch (error) {
    console.error('Fetch failed', error);
    return undefined;
  }
};

//Get generator from Rakuten
export const generatorAPI = async (keyword: string = '発電機', genreId: number = 101070): Promise<any> => {
  try {
    const response = await fetch(`${reqUrl}?applicationId=${appId}&format=json&keyword=${keyword}&genreId=${genreId}&hits=5`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Response was not ok', response.status, response.statusText);
      return undefined;
    }
  } catch (error) {
    console.error('Fetch failed', error);
    return undefined;
  }
};

//Get tents from Rakuten
export const tentAPI = async (keyword: string = 'テント', genreId: number = 101070): Promise<any> => {
  try {
    const response = await fetch(`${reqUrl}?applicationId=${appId}&format=json&keyword=${keyword}&genreId=${genreId}&hits=5`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Response was not ok', response.status, response.statusText);
      return undefined;
    }
  } catch (error) {
    console.error('Fetch failed', error);
    return undefined;
  }
};

//Get heat packs from Rakuten
export const heatPackAPI = async (keyword: string = 'カイロ', genreId: number = 551176): Promise<any> => {
  try {
    const response = await fetch(`${reqUrl}?applicationId=${appId}&format=json&keyword=${keyword}&genreId=${genreId}&hits=5`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Response was not ok', response.status, response.statusText);
      return undefined;
    }
  } catch (error) {
    console.error('Fetch failed', error);
    return undefined;
  }
};

//Get megaphones from Rakuten
export const megaphoneAPI = async (keyword: string = 'メガホン', genreId: number = 112998): Promise<any> => {
  try {
    const response = await fetch(`${reqUrl}?applicationId=${appId}&format=json&keyword=${keyword}&genreId=${genreId}&hits=5`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Response was not ok', response.status, response.statusText);
      return undefined;
    }
  } catch (error) {
    console.error('Fetch failed', error);
    return undefined;
  }
};
