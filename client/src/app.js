class App extends React.Component {
    render() {
        return (
            <div className='app'>
                <LoginForm />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));