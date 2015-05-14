
var CitySelect = React.createClass({
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

var FilmBoxHolder = React.createClass({
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
});

var citySelectComponent = React.render(
    <CitySelect source="api/cities/all" />,
    document.getElementById('react-city-select')
);

React.render(
    <FilmBoxHolder />,
    document.querySelector('.film-box-holder')
);
