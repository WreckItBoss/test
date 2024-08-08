import React, { useEffect, useState } from 'react';
import { ButtonUnit } from './ButtonUnit';
import { SouhyoUnit } from './SouhyoUnit';
import { ScoreUnit } from './ScoreUnit';
import { RecommendUnit } from './RecommendUnit';

import { ScoreModal } from './ScoreModal';
import { useModalContext } from '@/context/modal.context';
import { shelterRepository } from '@/libs/repository/firebase';
import { useAuthContext } from '@/context/auth.context';
import { missingAmount } from '@/libs/services/scoreMethods';
import { Item } from '@/types/firestore/item.types';

const ScorePage: React.FC = () => {
  const { modalData } = useModalContext();
  const { uid } = useAuthContext();
  const [score, setScore] = useState(0);
  const [missingData, setItemAmout] = useState<Item | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const shelterDatum = await shelterRepository.list([['uid', '==', uid]]);
      const shelterData = shelterDatum[0];
      const score = shelterData.score;
      setScore(score);

      console.log('楽天のデータ');
      const missingData = await missingAmount('vExEQ6c65QTg3RjC1fKz');
      if (missingData) {
        console.log(missingData);
        setItemAmout(missingData);
      } else {
        console.error('Missing amount data not found.');
        setItemAmout(null);
      }

      // 評価値の計算
      // console.log("ここから");
      // const data = await getItems({ shelterId:'vExEQ6c65QTg3RjC1fKz' }) ;
      // console.log(data);
      // const ideal = await getIdealAmount({ shelterId: 'vExEQ6c65QTg3RjC1fKz' });
      // console.log(ideal);
      // const calculatescore = calculateScore('vExEQ6c65QTg3RjC1fKz' );
      // console.log(calculatescore);
      // 評価値の計算
    };

    fetchData();
  }, [uid]);

  return (
    <div>
      {modalData.isModalActive && <ScoreModal />}
      <ScoreUnit scoreNum={score} />
      <SouhyoUnit missingData={missingData} />
      <RecommendUnit />
      <ButtonUnit linkTo='/form' linkText='管理者はこちら' />
    </div>
  );
};

export default ScorePage;
