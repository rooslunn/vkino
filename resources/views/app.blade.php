<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Title</title>

    <link media="all" rel="stylesheet" href="{{ asset('/css/all.css') }}">
    <link media="all" rel="stylesheet" href="{{ asset('/css/jcf.css') }}">

    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,400italic,600&subset=latin,cyrillic' rel='stylesheet' type='text/css'>

</head>
<body>
    <div id="wrapper">
        <header id="header">
            <div class="header-holder">
                <h1 class="logo"><a href="main-page.html#">Vkino</a></h1>
                <nav id="nav">
                    <ul>
                        <li><a href="main-page.html#">Афиша</a></li>
                        <li><a href="main-page.html#">Кинотеатры</a></li>
                    </ul>
                </nav>
                <form class="search" action="main-page.html#">
                    <fieldset>
                        <input type="text" placeholder="Поиск">
                        <input type="submit" value="Найти">
                    </fieldset>
                </form>
                <div class="head-links">
                    <div class="user-panel">
                        <a href="main-page.html#" class="title">Мои билеты</a>
                        <a href="main-page.html#" class="opener">
                            <span class="avatar"><img src="images/avatar-placeholder.png" alt="ваше фото"/></span>
                        </a>
                        <ul class="links">
                            <li><a href="main-page.html#">Заказы</a></li>
                            <li><a href="main-page.html#">Лист ожидания</a></li>
                            <li><a href="main-page.html#">Избранное</a></li>
                            <li><a href="main-page.html#">Профиль</a></li>
                            <li><a href="main-page.html#">Выйти</a></li>
                        </ul>
                    </div>
                    <ul class="lang-switcher">
                        <li class="active"><a href="main-page.html#">UA</a></li>
                        <li><a href="main-page.html#">RU</a></li>
                    </ul>
                </div>
            </div>
        </header>
        <div id="content">
            @yield('content')
            <div class="main-slider">
                <form class="search-form custom-form" action="main-page.html#"> <!--При добавлении класса .focus будет появлятся список совпадений поиска-->
                    <fieldset>

                        <span id="react-city-select">
                            <select class="simple-select city-chooser">
                            </select>
                        </span>

                        <!--Включение класса на drop-search проявит drop-search-->
                        <div class="drop-search">
                            <input type="text" placeholder="Поиск по названию фильма или кинотеатра">
                            <ul class="search-result-list">
                                <li>
                                    <a href="main-page.html#">
                                        <strong class="title">Пирамида</strong>
                                        <strong class="sub-title">/ фильм</strong>
                                    </a>
                                </li>
                                <li>
                                    <a href="main-page.html#">
                                        <strong class="title">Пирамида</strong>
                                        <strong class="sub-title">/ кинотеатр</strong>
                                    </a>
                                </li>
                                <li>
                                    <a href="main-page.html#">
                                        <strong class="title">Пираньи 3D</strong>
                                        <strong class="sub-title">/ фильм</strong>
                                    </a>
                                </li>
                                <li>
                                    <a href="main-page.html#">
                                        <strong class="title">Пираты Карибского моря: Мертвецы не рассказывают сказки</strong>
                                        <strong class="sub-title">/ фильм</strong>
                                    </a>
                                </li>
                                <li>
                                    <a href="main-page.html#">
                                        <strong class="title">Пират</strong>
                                        <strong class="sub-title">/ кинотеатр</strong>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <input type="submit" value="Найти">
                        <span class="choose-city">Выберите свой город <a class="close-hint" href="main-page.html#">закрыть</a></span>
                    </fieldset>
                </form>
                <ul class="applications-list">
                    <li class="ios"><a href="main-page.html#">apple</a></li>
                    <li class="android"><a href="main-page.html#">android</a></li>
                </ul>
                <div class="main-slideshow">
                    <div class="slideset">
                        <div class="slide">
                            <img src="{{ asset('/images/img-15.jpg') }}" alt="image description"/>
                            <div class="text-holder">
                                <h1>Крупнейший сервис on-line продажи билетов в кино в Украине</h1>
                                <p>Покупая у нас билеты, вы экономите время простоя в кассе</br>и дополнительно <mark>получаете скидку</mark> на каждом билете!</p>
                                <span class="use-search">Воспользуйтесь поиском</br>для быстрого подбора фильма или поиска кинотеатра</span>
                            </div>
                        </div>
                        <div class="slide">
                            <img src="{{ asset('/images/img-17.jpg') }}" alt="image description"/>
                            <div class="film-info">
                                <div class="film-info-holder">
                                    <div class="link-wrap"><a href="main-page.html#" class="title">Пираты Карибского моря: Мертвецы не рассказывают сказки</a></div>
                                    <a class="btn-buy" href="main-page.html#">Купить билеты</a>
                                </div>
                            </div>
                        </div>
                        <div class="slide">
                            <img src="{{ asset('/images/img-16.jpg') }}" alt="image description"/>
                            <div class="film-info">
                                <div class="film-info-holder">
                                    <div class="link-wrap"><a href="main-page.html#" class="title">Пингвины Мадагаскара</a></div>
                                    <a class="btn-buy" href="main-page.html#">Купить билеты</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="pagination-holder"></div>
                </div>
            </div>
            <section class="premiere-movies">
                <div class="content-holder">
                    <h2>Сейчас в прокате
                        <div class="city-switcher custom-form">
                            <a class="opener" href="main-page.html#">Житомир</a>
                            <div class="drop">
                                <ul class="city-slide jcf-scrollable">
                                    <li><a href="main-page.html#">Ивано-Франковск</a></li>
                                    <li><a href="main-page.html#">Киев</a></li>
                                    <li><a href="main-page.html#">Кривой Рог</a></li>
                                    <li><a href="main-page.html#">Луцк</a></li>
                                    <li><a href="main-page.html#">Львов</a></li>
                                    <li><a href="main-page.html#">Николаев</a></li>
                                    <li><a href="main-page.html#">Одесса</a></li>
                                    <li><a href="main-page.html#">Ровно</a></li>
                                    <li><a href="main-page.html#">Севастополь</a></li>
                                    <li><a href="main-page.html#">Сумы</a></li>
                                    <li><a href="main-page.html#">Харьков</a></li>
                                    <li><a href="main-page.html#">Ялта</a></li>
                                </ul>
                            </div>
                        </div>
                    </h2>
                    <div class="carousel-holder">
                        <div class="carousel-block">
                            <h3>Премьеры недели</h3>
                            <div class="carousel">
                                <div class="mask">
                                    <div id="show-premiere" class="slideset">
                                    </div>
                                </div>
                                <a class="btn-prev" href="main-page.html#">Previous</a>
                                <a class="btn-next" href="main-page.html#">Next</a>
                                <div class="pagination-holder"></div>
                            </div>
                        </div>
                        <div class="carousel-block">
                            <h3>Самое популярное</h3>
                            <div class="carousel">
                                <div class="mask">
                                    <div  id="show-hot" class="slideset">
                                        <div class="slide">
                                            <div class="film-box">
                                                <div class="img-holder"><a href="main-page.html#"><img src="images/img-03.jpg" alt="image description"/></a></div>
                                                <div class="sub-info">
                                                    <ul class="technologies-list">
                                                        <li>4DX</li>
                                                        <li>3d</li>
                                                        <li>Imax</li>
                                                        <li>2D</li>
                                                    </ul>
                                                    <a class="btn-buy" href="main-page.html#"><span>Купить билеты</span></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="slide">
                                            <div class="film-box">
                                                <div class="img-holder"><a href="main-page.html#"><img src="images/img-04.jpg" alt="image description"/></a></div>
                                                <div class="sub-info">
                                                    <ul class="technologies-list">
                                                        <li>Imax</li>
                                                        <li>2D</li>
                                                    </ul>
                                                    <a class="btn-buy" href="main-page.html#"><span>Купить билеты</span></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <a class="btn-prev" href="main-page.html#">Previous</a>
                                <a class="btn-next" href="main-page.html#">Next</a>
                                <div class="pagination-holder"></div>
                            </div>
                        </div>
                    </div>

                    {{--Now screening--}}
                    <div class="film-box-holder">
                        <span id="show-actual"></span>
                    </div>
                    <div class="show-all-holder">
                        <a class="btn-show" href="main-page.html#"><span>Показать все (36)</span></a>
                    </div>

                </div>
            </section>
            <section class="premiere-movies soon">
                <div class="content-holder">
                    {{--Screening soon--}}
                    <h2 class="color-white">Скоро на экранах</h2>
                    <div class="film-box-holder">
                        <span id="show-soon"></span>
                    </div>
                    <div class="show-all-holder">
                        <a class="btn-show" href="main-page.html#"><span>Показать все</span></a>
                    </div>
                </div>
            </section>
            <section class="promo-section">
                <div class="content-holder">
                    <div class="special-offer">
                        <h3>Акция</h3>
                        <p>Покупая билеты в кино <strong>онлайн</strong>, вы получаете <strong>скидку 5</strong>%</p>
                        <div class="btn-holder">
                            <a class="btn-help" href="main-page.html#">Как купить билет?</a>
                            <span class="description">( пошаговая инструкция )</span>
                        </div>
                    </div>
                    <a href="main-page.html#" class="banner"><img src="images/img-14.jpg" alt="image description"/></a>
                </div>
            </section>
        </div>
        <footer id="footer">
            <div class="footer-holder">
                <div class="footer-info">
                    <div class="footer-block">
                        <h3>Мобильные приложения</h3>
                        <ul class="applications-list">
                            <li class="ios"><a href="main-page.html#">apple</a></li>
                            <li class="android"><a href="main-page.html#">android</a></li>
                        </ul>
                    </div>
                    <div class="footer-block add">
                        <h3>Полезная информация</h3>
                        <div class="foot-links-holder">
                            <ul class="foot-links">
                                <li><a href="main-page.html#">Вопрос-ответ</a></li>
                                <li><a href="main-page.html#">Как купить билет?</a></li>
                                <li><a href="main-page.html#">Правила покупки и возврата билетов</a></li>
                            </ul>
                            <ul class="foot-links">
                                <li><a href="main-page.html#">Служба поддержки</a></li>
                                <li><a href="main-page.html#">О проекте</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="footer-block">
                        <h3>Партнерская программа</h3>
                        <ul class="foot-links">
                            <li><a href="main-page.html#">Партнерская программа</a></li>
                            <li><a href="main-page.html#">Наши партнеры</a></li>
                            <li><a href="main-page.html#">Реклама </a></li>
                        </ul>
                    </div>
                </div>
                <div class="copy-info">
                    <p>&copy; 2011–{{ date('Y') }}   Сервис онлайн покупки билетов в кинотеатры Украины Vkino.com.ua </p>
                    <p>&copy; 2011–{{ date('Y') }} <a href="main-page.html#">СейлСофт</a></p>
                </div>
            </div>
        </footer>
    </div>

    @if (env('APP_ENV') === 'production')
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react-with-addons.min.js"></script>
    @else
        <script type="text/javascript" src="{{ asset('/js/jquery-2.1.4.js') }}"></script>
        <script type="text/javascript" src="{{ asset('/js/react-with-addons.js') }}"></script>
    @endif

    <script type="text/javascript" src="{{ asset('/js/jquery.main.js') }}"></script>
    <script type="text/javascript" src="{{ asset('/js/app/vkino.js') }}"></script>

    <script>
        $(function() {
            var hint = $('.choose-city');
            hint.find('.close-chooser').click(function(e) {
                e.preventDefault();
                hint.fadeOut(300);
            });
        })
    </script>

</body>
</html>