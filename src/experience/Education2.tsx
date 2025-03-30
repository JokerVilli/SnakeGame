export const Education2 = () => {
  return (
    <>
      <div className="text-element title">
        <span className="bolder">Начало пути:</span> от верстальщика до
        специалиста по веб-коммуникациям{" "}
      </div>
      <div className="text-element subtitle">
        <span className="bolder">Компания:</span> Loyalty Partners Vostok
      </div>
      <div className="text-element subtitle">
        <span className="bolder">Время работы:</span> Декабрь 2011 — Июль 2013
      </div>
      <div className="text-element content">
        <span className="bolder">Основные задачи:</span>
        <ul>
          <li>вёрстка email-писем</li>
          <li>подготовка и запуск массовых email-рассылок компании</li>
        </ul>
      </div>
      <div className="text-element content">
        <span className="bolder">Дополнительно:</span>
        <ul>
          <li>написал админку для аккаунт-менеджеров на PHP</li>
          <li>подкручивал функицонал на корпоративном сайте в Joomla</li>
        </ul>
      </div>
      <div className="text-element content">
        <span className="bolder">Стек:</span> HTML, CSS, Javascript, PHP, MySQL
      </div>
      <div className="text-element thought">
        “Я ещё застал ту пору, когда в моде был jQuery, вся вёрстка была
        табличной, а про React говорили только маргиналы..”
      </div>
      <div
        className="square-left mend"
        style={{ backgroundImage: 'url("../public/html.jpg")' }}
      ></div>
      <div
        className="square-right flusk"
        style={{ backgroundImage: 'url("../public/malina.jpg")' }}
      ></div>
    </>
  );
};
