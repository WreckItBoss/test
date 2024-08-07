import { FIRESTORE_COLLECTION_NAME } from '@/constants/firestore';

import { createRepository as createCollectionRepository } from '../firebase/factory/collection';
import { parseShelter } from '@/types/firestore/shelter.types';
import { parseUser } from '@/types/firestore/user.types';

export const shelterRepository = createCollectionRepository({
  path: FIRESTORE_COLLECTION_NAME.SHELTER,
  parseT: parseShelter,
});
export const userRepository = createCollectionRepository({
  path: FIRESTORE_COLLECTION_NAME.USER,
  parseT: parseUser,
});
