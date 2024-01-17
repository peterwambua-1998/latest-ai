
async function takeTime() {
    setTimeout(()=> {
        console.log('peter');
    }, 3000)
}

const UserM = async () => {
    let takeTimeVar = await takeTime();

    return (  
        <main>
            <p>peter</p>
        </main>
    );
}
 
export default UserM;