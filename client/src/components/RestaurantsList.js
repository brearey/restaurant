const RestaurantsList = async () => {
    const [list, setList] = useState('');

    const response = await fetch('http://localhost:3000/restaurant', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    });
    let restaurants = await response.json();
    console.log(restaurants);
    setList(
        restaurants.map((rest) => {
            <Restaurant name={rest.name} spec={rest.spec} slots={rest.slots} />
        })
    );
    return (
        <div className='restaurants-list'>
            {list}
        </div>
    );
}

async function getRestaurantsList() {
    const response = await fetch('http://localhost:3000/restaurant', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    });
    let result = await response.json();
    return result;
}