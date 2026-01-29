function Message() {
    const name = "Alex";
    if (!name) {
        return <h1>No Name Provided</h1>;
    }
    return <h1>My name is {name}</h1>;
}

export default Message; 