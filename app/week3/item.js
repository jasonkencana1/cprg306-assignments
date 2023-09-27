


export default function Item({name, quantity, category}) {
    return (
        <section>
            <h3>Name : {name}</h3>
            <p>Quantity : {quantity}</p>
            <p>Category : {category}</p>
        </section>
    );

}