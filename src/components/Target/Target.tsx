import s from '../Target/target.module.scss';
import Image from '../../../node_modules/next/image';

const Target = () => {
  return (
    <>
      <div className={s.container}>
        <div className={s.target_main}>
          <div className={s.target_main_card}>
            <Image fill src='/delivery.webp' alt='Benefits' />
            <p>
              Бесплатная <br /> доставка
            </p>
          </div>
          <div className={s.target_main_card}>
            <Image fill src='/bonus.webp' alt='Benefits' />
            <p>
              Бонусы за <br /> покупку
            </p>
          </div>
          <div className={s.target_main_card}>
            <Image fill src='/return.webp' alt='Benefits' />
            <p>
              Гарантированный <br /> возврат и обмен
            </p>
          </div>
          <div className={s.target_main_card}>
            <Image fill src='/checklist.webp' alt='Benefits' />
            <p>
              Сертификаты на <br /> все товары
            </p>
          </div>
          <div className={s.target_main_card}>
            <Image fill src='/agreement.webp' alt='Benefits' />
            <p>
              Сервисное <br /> обслуживание
            </p>
          </div>
          <div className={s.target_main_card}>
            <Image fill src='/help.webp' alt='Benefits' />
            <p>
              Техническая <br /> поддержка <br /> 24/7
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Target;
