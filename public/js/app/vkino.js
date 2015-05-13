2
var CitySelect = React.createClass({displayName: "CitySelect",
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
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        this.loadCities();
    },
    render: function () {
        var cityOptions = this.state.data.map(function (city) {
            return (
                React.createElement("option", {value: city.id}, city.name)
            );
        });
        return (
            React.createElement("select", {className: "simple-select city-chooser"}, 
                cityOptions
            )
        );
    }
});

React.render(
    React.createElement(CitySelect, {source: "api/cities/all"}),
    document.getElementById('react-city-select')
);