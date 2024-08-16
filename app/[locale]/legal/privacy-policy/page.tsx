const page = () => {
  return (
    <>
      <div className="max-w-2xl w-full mx-auto p-6">
        <div className="w-full aspect-video flex items-center justify-center">
          <h1 className="text-4xl font-bold">Политика конфиденциальности</h1>
        </div>
        <div className="w-full space-y-6">
          <div className="space-y-3 md-layout">
            <h2 className="text-3xl font-bold">Введение</h2>
            <p className="text-base">
              Настоящая Политика конфиденциальности описывает, как сайт собирает, использует и защищает информацию, полученную от пользователей, которые регистрируются и авторизуются на сайте.
            </p>
          </div>
          <div className="space-y-3 md-layout">
            <h2 className="text-3xl font-bold">Сбор информации</h2>
            <p className="text-base">
              Мы можем собирать следующую информацию:
            </p>
            <ul>
              <li className="list-inside">Имя и фамилия</li>
              <li className="list-inside">Адрес электронной почты</li>
              <li className="list-inside">Логин и пароль</li>
              <li className="list-inside">Любая другая информация, которую вы добровольно предоставите нам</li>
            </ul>
          </div>
          <div className="space-y-3 md-layout">
            <h2 className="text-3xl font-bold">Использование информации</h2>
            <p className="text-base">
              Собранная информация может быть использована для:
            </p>
            <ul>
              <li className="list-inside">Обеспечения доступа к сайту и его функциям</li>
              <li className="list-inside">Улучшения работы сайта</li>
              <li className="list-inside">Персонализации пользовательского опыта</li>
              <li className="list-inside">Отправки уведомлений и обновлений</li>
            </ul>
          </div>
          <div className="space-y-3 md-layout">
            <h2 className="text-3xl font-bold">Защита информации</h2>
            <p className="text-base">
              Мы принимаем необходимые меры для защиты вашей личной информации от несанкционированного доступа, изменения, раскрытия или уничтожения.
            </p>
          </div>
          <div className="space-y-3 md-layout">
            <h2 className="text-3xl font-bold">Раскрытие информации третьим лицам</h2>
            <p className="text-base">
              Мы не передаем вашу личную информацию третьим лицам, за исключением случаев, предусмотренных законом или когда это необходимо для выполнения наших обязательств перед вами.
            </p>
          </div>
          <div className="space-y-3 md-layout">
            <h2 className="text-3xl font-bold">Изменения в Политике конфиденциальности</h2>
            <p className="text-base">
              Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности. Изменения вступают в силу с момента их публикации на сайте.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
export default page