import { Item } from '@/types/firestore/item.types';
import { itemsRepository, shelterRepository } from '../repository/firebase';

// Gets # of Megaphone
export const getItems = async ({
  shelterId,
}: {
  shelterId: string;
}): Promise<Item | undefined> => {
  const items = await itemsRepository({ shelterId }).get();
  return items;
};

// Gets Shelter capacity
export const getShelterCapacity = async ({
  shelterId,
}: {
  shelterId: string;
}): Promise<number | undefined> => {
  const shelter = await shelterRepository.get({ id: shelterId });
  return shelter?.capacity;
};

// Gets Ideal Amount
export const getIdealAmount = async ({
  shelterId,
}: {
  shelterId: string;
}): Promise<Item | undefined> => {
  let factor = 1;

  const capacity = await getShelterCapacity({ shelterId });
  if (capacity !== undefined) {
    factor = capacity;
  }

  const idealAmount: Item = {
    // 一日過ごすのに必要な物資量？
    food: 4 * factor,
    water: 2 * factor,
    blanket: 1 * factor,
    phone: 0.04 * factor, //1 per 25 ppl
    flashlight: 0.25 * factor, //1 per 4 ppl
    television: 0.02 * factor, //1 per 50ppl
    fan: 0.25 * factor, //1 per 4 ppl
    generator: 0.05 * factor, // 1 per 20 ppl
    tent: 0.02 * factor, //1 per 50 ppl
    heatPack: 2 * factor,
    megaphone: 0.05 * factor, //1 per 20 ppl
  };

  return idealAmount;
};

export const missingAmount = async (
  shelterId: string,
): Promise<Item | undefined> => {
  const totalItem = await getItems({ shelterId });
  if (totalItem === undefined) {
    return undefined;
  }
  const idealItem = await getIdealAmount({ shelterId });
  if (idealItem === undefined) {
    return undefined;
  }

  const missingAmount: Item = {
    food: 0,
    water: 0,
    blanket: 0,
    phone: 0,
    flashlight: 0,
    television: 0,
    fan: 0,
    generator: 0,
    tent: 0,
    heatPack: 0,
    megaphone: 0,
  };

  if (idealItem.food - totalItem.food > 0)
    missingAmount.food = Math.ceil(idealItem.food - totalItem.food);
  if (idealItem.water - totalItem.water > 0)
    missingAmount.water = Math.ceil(idealItem.water - totalItem.water);
  if (idealItem.blanket - totalItem.blanket > 0)
    missingAmount.blanket = Math.ceil(idealItem.blanket - totalItem.blanket);
  if (idealItem.phone - totalItem.phone > 0)
    missingAmount.phone = Math.ceil(idealItem.phone - totalItem.phone);
  if (idealItem.flashlight - totalItem.flashlight > 0)
    missingAmount.flashlight = Math.ceil(
      idealItem.flashlight - totalItem.flashlight,
    );
  if (idealItem.television - totalItem.television > 0)
    missingAmount.television = Math.ceil(
      idealItem.television - totalItem.television,
    );
  if (idealItem.fan - totalItem.fan > 0)
    missingAmount.fan = Math.ceil(idealItem.fan - totalItem.fan);
  if (idealItem.generator - totalItem.generator > 0)
    missingAmount.generator = Math.ceil(
      idealItem.generator - totalItem.generator,
    );
  if (idealItem.tent - totalItem.tent > 0)
    missingAmount.tent = Math.ceil(idealItem.tent - totalItem.tent);
  if (idealItem.heatPack - totalItem.heatPack > 0)
    missingAmount.heatPack = Math.ceil(idealItem.heatPack - totalItem.heatPack);
  if (idealItem.megaphone - totalItem.megaphone > 0)
    missingAmount.megaphone = Math.ceil(
      idealItem.megaphone - totalItem.megaphone,
    );

  return missingAmount;
};

const itemWeights = {
  food: 1.5,
  water: 2,
  blanket: 1.5,
  phone: 0.5,
  flashlight: 0.8,
  television: 0.3,
  fan: 0.5,
  generator: 1,
  tent: 0.7,
  heatPack: 1,
  megaphone: 0.4,
};

export const calculateScore = async (shelterId: string): Promise<number> => {
  const totalItem = await getItems({ shelterId });
  if (totalItem === undefined) {
    return 0;
  }
  const idealItem = await getIdealAmount({ shelterId });
  if (idealItem === undefined) {
    return 0;
  }

  let totalMissing = 0;
  let totalIdeal = 0;

  const items = Object.keys(idealItem) as (keyof Item)[];
  for (const item of items) {
    totalMissing +=
      Math.max(0, idealItem[item] - totalItem[item]) * (itemWeights[item] || 1);
    totalIdeal += idealItem[item] * (itemWeights[item] || 1);
  }

  const missingRatio = totalMissing / totalIdeal;
  const score = 5 - missingRatio * 5;

  return Math.max(0, Math.min(5, parseFloat(score.toFixed(1))));
};
