const RestaurantsList = () => {
    const [list, setList] = React.useState([]);
    React.useEffect(() => {
        // fetch data
        const dataFetch = async () => {
            const data = await (
                await fetch("http://localhost:3000/restaurant/")).json();
            // set state when the data received
            setList(data);
        };

        dataFetch();
    }, []);

    return (
        <div className='restaurants-list'>
            {/* <Restaurant name={list[0].name} spec={list[0].spec} slots={list[0].slots} /> */}
        </div>
    );
}