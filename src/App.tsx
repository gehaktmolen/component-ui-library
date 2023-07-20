import './tailwind.scss';
import './App.css';
import { Button, ButtonOwnerState } from '../packages/components/Button';

function App() {
    return (
        <>
            <div className="container mx-auto px-4">
                <Button variant="plain" size="small">
                    Text
                </Button>
                <p>&nbsp;</p>
                <Button variant="outlined" color="danger" size="medium">
                    Outlined
                </Button>
                <p>&nbsp;</p>
                <Button variant="solid" color="secondary" size="large" prependIcon={<i>Icon</i>}>
                    Solid
                </Button>
                <p>&nbsp;</p>
                <Button variant="solid" color="primary">
                    Primary
                </Button>
                <p>&nbsp;</p>
                <Button variant="solid" disabled>
                    Disabled
                </Button>
                <p>&nbsp;</p>
                <Button
                    variant="solid"
                    href="#"
                    slotProps={{
                        root: (state: ButtonOwnerState) => ({
                            className: `px-8 text-amber-500 dark:text-white hover:text-cyan-100 ${
                                state.active ? 'bg-cyan-500' : 'bg-cyan-100'
                            }`
                        })
                    }}
                >
                    Custom
                </Button>
            </div>
        </>
    );
}

export default App;
