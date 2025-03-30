export const Education4 = () => {
  return (
    <>
      <div className="text-element title">
        <span className="bolder">CRM захватывает финтех:</span> разработка на
        службе инвестиций
      </div>
      <div className="text-element subtitle">
        <span className="bolder">Компания:</span> Брокерский дом «Открытие»
      </div>
      <div className="text-element subtitle">
        <span className="bolder">Время работы:</span> Декабрь 2016 — Январь 2019
      </div>
      <div className="text-element content">
        <span className="bolder">Основные задачи:</span>
        <ul>
          <li>изучение модуля Finance CRM Siebel</li>
          <li>
            разработка новой функциональности для операционных задач бизнеса,
            призванных упростить и ускорить взаимодействие с клиентом
          </li>
          <li>
            взаимодействие Siebel CRM c другими сервисами компании в рамках
            интеграционной шины (ESB)
          </li>
        </ul>
      </div>
      <div className="text-element content">
        <span className="bolder">Дополнительно:</span>
        <ul>
          <li>связал Siebel CRM с IP-телефонией Avaya</li>
          <li>
            для себя: создал расширение в Google Chrome, которое вместо меня
            мониторило свободные билеты на выбранное направление на сайте RZD
          </li>
        </ul>
      </div>
      <div className="text-element content">
        <span className="bolder">Стек:</span> Siebel Finance, Siebel Tools, Javascript
      </div>
      <div className="text-element thought">
        “Крупный участник на рынке финтех показал мне, как по-хорошему должны
        быть выстроены процессы в IT.. Да, я про Agile”
      </div>
      <div
        className="square-left mend"
        style={{ backgroundImage: 'url("../public/esb2.jpg")' }}  
      ></div>
      <div
        className="square-right flusk"
        style={{ backgroundImage: 'url("../public/broker.jpg")' }}
      ></div>
    </>
  );
};
