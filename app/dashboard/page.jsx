'use client'
import { Card, Button } from 'react-daisyui';

const Dashboard = () => {
    return (  
        <main className="p-5">
            <div className="grid grid-cols-1 md:grid md:grid-cols-3 md:gap-8">
                <Card>
                    <Card.Body>
                        <Card.Title tag="h2">Curriculum vitae</Card.Title>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <Card.Actions className="justify-end">
                        </Card.Actions>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title tag="h2">Resume</Card.Title>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <Card.Actions className="justify-end">
                        </Card.Actions>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title tag="h2">Cover letter</Card.Title>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <Card.Actions className="justify-end">
                        </Card.Actions>
                    </Card.Body>
                </Card>
            </div>
            <div className='mt-10'>
                <h6>Statistics</h6>
            </div>

        </main>
    );
}
 
export default Dashboard;