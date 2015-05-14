
var CitySelect = React.createClass({displayName: "CitySelect",
    _listeners: [],
    loadCities: function () {
        $.ajax({
            url: this.props.source,
            dataType: 'json',
            cache: false,
            success: function (data) {
                if (this.isMounted()) {
                    this.setState({data: data.city});
                }
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
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

var ShowActual = React.createClass({displayName: "ShowActual",
    _sourceUrlTemplate: "api/cities/[cityId]/shows/actual",
    getInitialState: function () {
        return {
            data: []
        };
    },
    loadShows: function (cityId) {
        $.ajax({
            url: this._sourceUrlTemplate.replace('[cityId]', cityId),
            dataType: 'json',
            cache: false,
            success: function (data) {
                if (this.isMounted()) {
                    this.setState({data: data.shows.show});
                }
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    notify: function (data) {
        this.loadShows(data);
        console.log('subject sent:', data);
    },
    componentDidMount: function () {
        citySelectComponent.addChangeListener(this);
    },
    componentWillUnmount: function () {
        citySelectComponent.removeChangeListener(this);
    },
    render: function () {
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
});

var citySelectComponent = React.render(
    React.createElement(CitySelect, {source: "api/cities/all"}),
    document.getElementById('react-city-select')
);

React.render(
    React.createElement(ShowActual, null),
    document.getElementById('show-actual')
);
