const LoginForm = () => {
    const [phone, setPhone] = React.useState('');
    const [password, setPassword] = React.useState('');
    return (
        <div className='login-form'>
            <div className='user_phone'>
                <input
                    onChange={e => setPhone(e.target.value)}
                    value={phone}
                    type='tel'
                    name='user_phone'
                    placeholder='Введите телефон' />
            </div>
            <div className='user_password'>
                <input
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    type='password'
                    name='user_password'
                    placeholder='Введите пароль' />
            </div>
            <div className='btn'>
                <input type='submit' value='Авторизоваться' onClick={() => login(phone, password)} />
            </div>
        </div>
    );
}

async function login(phone, password) {
    let user = {
        phone: phone,
        password: password
    }
    const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    });
    let result = await response.json();

    if (result.token) {
        connectSocketIO(result.token);
        localStorage.setItem('token', result.token);
    }
}

function connectSocketIO(token) {
    const socket = io("http://localhost:3000", { autoConnect: false });
    socket.auth = { token };
    socket.connect();

    // Subscribe on notification
    socket.on('notify', (notifyMessage) => showNotify(notifyMessage));
}

function showNotify(notifyMessage) {
    console.dir(notifyMessage);
}