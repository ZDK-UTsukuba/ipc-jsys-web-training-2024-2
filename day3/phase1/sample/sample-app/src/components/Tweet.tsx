type Props = {
    name: string;
    text: string;
}

export default function Tweet(props: Props) {
    return (
        <div>
            <h3>{props.name}</h3>
            <p>{props.text}</p>
        </div>
    );
}