async function fetchData () {
    var data = setTimeout(() => {
        return [500, 600, 700];
    }, 30000);
    return data;
}

export default async function User() {
    const revenue = await fetchData();

    return (
        <main>
            {revenue.map((rev) => (
                <div>
                    {rev}
                </div>
            ))}
        </main>
    )
}