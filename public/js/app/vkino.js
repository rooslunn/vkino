(function ($) {

    "use strict";

    var Gateway = React.createClass({displayName: "Gateway",
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

    var CitySelect = React.createClass({displayName: "CitySelect",
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
                    React.createElement("option", {key: city.id, value: city.id}, city.name)
                );
            });
            return (
                React.createElement("select", {className: "simple-select city-chooser", onChange: this.changeHandler}, 
                    cityOptions
                )
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
                        React.createElement("div", {className: "film-box", key: show.id}, 
                            React.createElement("div", {className: "img-holder"}, 
                                React.createElement("a", {href: "main-page.html#"}, 
                                    React.createElement("img", {src: show.posterUrl, alt: "image description"})
                                )
                            ), 
                            React.createElement("div", {className: "sub-info"}, 
                                React.createElement("a", {href: "main-page.html#", className: "film-title"}, 
                                    React.createElement("span", null, show.name)
                                ), 
                                React.createElement("ul", {className: "technologies-list"}, 
                                    React.createElement("li", null, "4DX"), 
                                    React.createElement("li", null, "3D"), 
                                    React.createElement("li", null, "Imax"), 
                                    React.createElement("li", null, "2D")
                                ), 
                                React.createElement("a", {className: "btn-buy", href: "main-page.html#"}, 
                                    React.createElement("span", null, "Купить билеты")
                                )
                            )
                        )
                    )
                });
                return (
                    React.createElement("span", null, shows)
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
                        React.createElement("div", {className: "film-box", key: show.id}, 
                            React.createElement("div", {className: "img-holder"}, 
                                React.createElement("a", {href: "main-page.html#"}, 
                                    React.createElement("img", {src: show.posterUrl, alt: "image description"})
                                )
                            ), 
                            React.createElement("div", {className: "sub-info"}, 
                                React.createElement("a", {href: "main-page.html#", className: "film-title"}, 
                                    React.createElement("span", null, show.name)
                                ), 
                                React.createElement("span", {className: "date"}, releaseDateString)
                            )
                        )
                    )
                });
                return (
                    React.createElement("span", null, shows)
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
                        React.createElement("div", {className: "slide", key: show.id}, 
                            React.createElement("div", {className: "film-box"}, 
                                React.createElement("div", {className: "img-holder"}, 
                                    React.createElement("a", {href: "main-page.html#"}, 
                                        React.createElement("img", {src: show.posterUrl, alt: "image description"})
                                    )
                                ), 
                                React.createElement("div", {className: "sub-info"}, 
                                    React.createElement("ul", {className: "technologies-list"}, 
                                        React.createElement("li", null, "4DX"), 
                                        React.createElement("li", null, "3d"), 
                                        React.createElement("li", null, "Imax"), 
                                        React.createElement("li", null, "2D")
                                    ), 
                                    React.createElement("a", {className: "btn-buy", href: "main-page.html#"}, 
                                        React.createElement("span", null, "Купить билеты")
                                    )
                                )
                            )
                        )
                    )
                });
                return (
                    React.createElement("span", null, shows)
                );
            }
        )
    );


    var citySelectComponent = React.render(
        React.createElement(CitySelect, {source: "api/cities/all"}),
        document.getElementById('react-city-select')
    );

    React.render(
        React.createElement(ShowActual, null),
        document.getElementById('show-actual')
    );

    React.render(
        React.createElement(ShowSoon, null),
        document.getElementById('show-soon')
    );

    React.render(
        React.createElement(ShowPremiere, null),
        document.getElementById('show-premiere')
    );

})(jQuery);
