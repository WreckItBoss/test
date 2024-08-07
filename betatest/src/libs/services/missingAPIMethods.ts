import { missingAmount } from './scoreMethods';

type ItemDictionary = {
  [key: string]: { name: string; genreId: number };
};

const itemDictionary: ItemDictionary = {
  food: { name: "非常食品", genreId: 100227 },
  water: { name: "水", genreId: 5533 },
  blanket: { name: "毛布", genreId: 5534 },
  phone: { name: "電話", genreId: 5535 },
  flashlight: { name: "懐中電灯", genreId: 5536 },
  television: { name: "テレビ", genreId: 5537 },
  fan: { name: "扇風機", genreId: 5538 },
  generator: { name: "発電機", genreId: 5539 },
  tent: { name: "テント", genreId: 5540 },
  heatPack: { name: "ヒートパック", genreId: 5541 },
  megaphone: { name: "メガホン", genreId: 5542 },
};

export const missingAPIMethods = async (shelterId: string): Promise<{ itemName: string; name: string; genreId: number; missingAmount: number }[] | undefined> => {
  const missingItems = await missingAmount(shelterId);
  if (!missingItems) {
    return undefined;
  }

  const results: { itemName: string; name: string; genreId: number; missingAmount: number }[] = [];

  for (const [item, amount] of Object.entries(missingItems)) {
    if (item in itemDictionary) {
      results.push({
        itemName: item,
        name: itemDictionary[item].name,
        genreId: itemDictionary[item].genreId,
        missingAmount: amount,
      });
    }
  }

  return results;
};

