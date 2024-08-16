const page = () => {
  return (
    <>
      <div className="max-w-2xl w-full mx-auto p-6">
        <div className="w-full aspect-video flex items-center justify-center">
          <h1 className="text-4xl font-bold">Условия пользования</h1>
        </div>
        <div className="w-full space-y-6">
          <div className="space-y-3 md-layout">
            <h2 className="text-3xl font-bold">1. Общие положения</h2>
            <ol>
              <li className="list-none">1.1 Использование данного сайта (далее - "Сайт") регулируется настоящими Условиями пользования.</li>
              <li className="list-none">1.2 Заходя на Сайт, вы соглашаетесь с данными Условиями пользования.</li>
            </ol>
          </div>
          <div className="space-y-3 md-layout">
            <h2 className="text-3xl font-bold">2. Регистрация и аккаунт</h2>
            <ol>
              <li className="list-none">2.1 Для доступа к некоторым функциям Сайта требуется регистрация.</li>
              <li className="list-none">2.2 При регистрации вы соглашаетесь предоставить точную и актуальную информацию о себе.</li>
              <li className="list-none">2.3 Вы несете ответственность за сохранение конфиденциальности вашего пароля и аккаунта.</li>
            </ol>
          </div>
          <div className="space-y-3 md-layout">
            <h2 className="text-3xl font-bold">3. Использование Сайта</h2>
            <ol>
              <li className="list-none">3.1 Вы обязуетесь использовать Сайт только в законных целях и в соответствии с настоящими Условиями пользования.</li>
              <li className="list-none">3.2 Запрещается размещение на Сайте материалов, нарушающих законы или права третьих лиц.</li>
            </ol>
          </div>
          <div className="space-y-3 md-layout">
            <h2 className="text-3xl font-bold">4. Конфиденциальность</h2>
            <ol>
              <li className="list-none">4.1 Мы уважаем вашу конфиденциальность и обязуемся защищать ваши персональные данные.</li>
              <li className="list-none">4.2 Пожалуйста, ознакомьтесь с нашей Политикой конфиденциальности для получения дополнительной информации.</li>
            </ol>
          </div>
          <div className="space-y-3 md-layout">
            <h2 className="text-3xl font-bold">5. Ограничение ответственности</h2>
            <ol>
              <li className="list-none">5.1 Мы не несем ответственности за любой ущерб, возникший в результате использования Сайта.</li>
              <li className="list-none">5.2 Мы не гарантируем бесперебойную работу Сайта и не несем ответственности за временную недоступность Сайта.</li>
            </ol>
          </div>
          <div className="space-y-3 md-layout">
            <h2 className="text-3xl font-bold">6. Изменения условий</h2>
            <ol>
              <li className="list-none">6.1 Мы оставляем за собой право изменять данные Условия пользования в любое время.</li>
              <li className="list-none">6.2 Изменения вступают в силу с момента их публикации на Сайте.</li>
            </ol>
          </div>
        </div>
      </div>
    </>
  )
}
export default page