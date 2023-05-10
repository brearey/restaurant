class App extends React.Component {
    render() {
        return (
            <div className='app'>
                <RestaurantsList />
                <LoginForm />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));