(function ($) {

    "use strict";

    var Gateway = React.createClass({
        statics: {
            getJSON: function (url, cbok, cbfail) {
                $.ajax({
                    url: url,
                    dataType: 'json',
                    cache: false,
                    success: cbok,
                    error: cbfail
                });
            }
        },
        render: function () {}
    });

    var CitySelect = React.createClass({
        _listeners: [],
        loadCities: function () {
            Gateway.getJSON(this.props.source,
                function (data) {
                    if (this.isMounted()) {
                        this.setState({data: data.city});
                    }
                }.bind(this),
                function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            );
        },
        getInitialState: function () {
            return {data: []};
        },
        componentDidMount: function () {
            this.loadCities();
        },
        addChangeListener: function (listener) {
            this._listeners.push(listener);
            console.log('listener added', listener);
        },
        removeChangeListener: function (listener) {
            this._listeners = this._listeners.filter(function (l) {
                return listener !== l;
            });
            console.log('listener removed', listener);
        },
        notifyChange: function (data) {
            this._listeners.forEach(function (listener) {
                listener.notify(data);
            })
        },
        changeHandler: function (e) {
            e.preventDefault();
            var cityId = e.target.value;
            console.log('city changed:', cityId);
            this.notifyChange(cityId);
        },
        render: function () {
            var cityOptions = this.state.data.map(function (city) {
                return (
                    <option key={city.id} value={city.id}>{city.name}</option>
                );
            });
            return (
                <select className="simple-select city-chooser" onChange={this.changeHandler}>
                    {cityOptions}
                </select>
            );
        }
    });

    function ReactShowTemplate (sourceUrl, setDataFunction, renderFunction) {
        this._sourceUrlTemplate = sourceUrl;
        this.getInitialState = function () {
                return {
                    data: []
                };
        };
        this.loadShows = function (cityId) {
            var url = this._sourceUrlTemplate.replace('[cityId]', cityId);
            Gateway.getJSON(url, setDataFunction.bind(this),
                function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            );
        };
        this.notify = function (data) {
            this.loadShows(data);
            console.log('subject sent:', data);
        };
        this.componentDidMount = function () {
            citySelectComponent.addChangeListener(this);
        };
        this.componentWillUnmount = function () {
            citySelectComponent.removeChangeListener(this);
        };
        this.render = renderFunction;
        this.componentDidUpdate = function () {
            initCarousel();
        }
    }

    var ShowActual = React.createClass(
        new ReactShowTemplate("api/cities/[cityId]/shows/actual",
            function setDataCB (data) {
                if (this.isMounted()) {
                    this.setState({data: data.shows.show});
                }
            },
            function render () {
                var shows = this.state.data.map(function (show) {
                    return (
                        <div className="film-box" key={show.id}>
                            <div className="img-holder">
                                <a href="main-page.html#">
                                    <img src={show.posterUrl} alt="image description"/>
                                </a>
                            </div>
                            <div className="sub-info">
                                <a href="main-page.html#" className="film-title">
                                    <span>{show.name}</span>
                                </a>
                                <ul className="technologies-list">
                                    <li>4DX</li>
                                    <li>3D</li>
                                    <li>Imax</li>
                                    <li>2D</li>
                                </ul>
                                <a className="btn-buy" href="main-page.html#">
                                    <span>Купить билеты</span>
                                </a>
                            </div>
                        </div>
                    )
                });
                return (
                    <span>{shows}</span>
                );
            }
        )
    );

    var ShowSoon = React.createClass(
        new ReactShowTemplate("api/cities/[cityId]/shows/soon",
            function setDataCB (data) {
                if (this.isMounted()) {
                    this.setState({data: data['shows-soon'].show});
                }
            },
            function render () {
                var shows = this.state.data.map(function (show) {
                    var releaseDate = new Date(show.releaseDate);
                    var releaseDateString = 'c ' + releaseDate.toLocaleDateString();
                    return (
                        <div className="film-box" key={show.id}>
                            <div className="img-holder">
                                <a href="main-page.html#">
                                    <img src={show.posterUrl} alt="image description"/>
                                </a>
                            </div>
                            <div className="sub-info">
                                <a href="main-page.html#" className="film-title">
                                    <span>{show.name}</span>
                                </a>
                                <span className="date">{releaseDateString}</span>
                            </div>
                        </div>
                    )
                });
                return (
                    <span>{shows}</span>
                );
            }
        )
    );

    function weekLastDate (dateObj) {
        return new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate() + (7 - dateObj.getDay()), 23, 59);
    }

    var ShowPremiere = React.createClass(
        new ReactShowTemplate("api/cities/[cityId]/shows/soon",
            function setDataCB (data) {
                if (this.isMounted()) {
                    this.setState({data: data['shows-soon'].show});
                }
            },
            function render () {
                var sundayDate, currentWeek, showsThisWeek, shows;
                sundayDate = weekLastDate(new Date());
                currentWeek = new Date().getDay();
                showsThisWeek = this.state.data.filter(function (show) {
                    var showDate = new Date(show.releaseDate);
                    return (showDate <= sundayDate) && (showDate.getDay() == currentWeek);
                });
                shows = showsThisWeek.map(function (show) {
                    return (
                        <div className="slide" key={show.id}>
                            <div className="film-box">
                                <div className="img-holder">
                                    <a href="main-page.html#">
                                        <img src={show.posterUrl} alt="image description"/>
                                    </a>
                                </div>
                                <div className="sub-info">
                                    <ul className="technologies-list">
                                        <li>4DX</li>
                                        <li>3d</li>
                                        <li>Imax</li>
                                        <li>2D</li>
                                    </ul>
                                    <a className="btn-buy" href="main-page.html#">
                                        <span>Купить билеты</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    )
                });
                return (
                    <span>{shows}</span>
                );
            }
        )
    );

    var SHOW_HOT_COUNT = 6;

    var ShowHot = React.createClass(
        new ReactShowTemplate("api/cities/[cityId]/shows/actual",
            function setDataCB (data) {
                if (this.isMounted()) {
                    this.setState({data: data.shows.show.slice(0, SHOW_HOT_COUNT)});
                }
            },
            function render () {
                var shows = this.state.data.map(function (show) {
                    return (
                        <div className="slide"  key={show.id}>
                            <div className="film-box">
                                <div className="img-holder">
                                    <a href="main-page.html#"><img src={show.posterUrl} alt="image description"/>
                                    </a>
                                </div>
                                <div className="sub-info">
                                    <ul className="technologies-list">
                                        <li>4DX</li>
                                        <li>3d</li>
                                        <li>Imax</li>
                                        <li>2D</li>
                                    </ul>
                                    <a className="btn-buy" href="main-page.html#">
                                        <span>Купить билеты</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    )
                });
                return (
                    <span>{shows}</span>
                );
            }
        )
    );

    var citySelectComponent = React.render(
        <CitySelect source="api/cities/all" />,
        document.getElementById('react-city-select')
    );

    React.render(
        <ShowPremiere />,
        document.getElementById('show-premiere')
    );

    React.render(
        <ShowHot />,
        document.getElementById('show-hot')
    );

    React.render(
        <ShowActual />,
        document.getElementById('show-actual')
    );

    React.render(
        <ShowSoon />,
        document.getElementById('show-soon')
    );


})(jQuery);
