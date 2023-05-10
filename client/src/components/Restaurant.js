const Restaurant = (props) => {
    const [name, setName] = React.useState(props.name);
    const [spec, setSpec] = React.useState(props.spec);
    const [slots, setSlots] = React.useState(props.slots);

    const listSlots = slots.map((slot) =>
        <li key={slot.slot_start}>
            Начало: {slot.slot_start}, конец: {slot.slot_end}, занят: {slot.isBooked.toString()}
        </li>
    );

    return (
        <div className='restaurant'>
            <h3>{name}</h3>
            <p>{spec}</p>
            <ul>
                {listSlots}
            </ul>
        </div>
    );
}