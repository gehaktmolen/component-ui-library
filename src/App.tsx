
import './App.css'
import {Button, ButtonOwnerState} from '../packages/components/Button'

function App() {

    return (
        <>
            <div className="container mx-auto px-4">
                <Button variant="text" size="small">Text</Button>
                <p>&nbsp;</p>
                <Button variant="outlined" size="medium">Outlined</Button>
                <p>&nbsp;</p>
                <Button variant="contained" size="large">Contained</Button>
                <p>&nbsp;</p>
                <Button variant="contained" color="secondary">Primary</Button>
                <p>&nbsp;</p>
                <Button variant="contained" disabled>Disabled</Button>
                <p>&nbsp;</p>
                <Button
                    variant="contained"
                    href="#"
                    slotProps={{
                        root: (state: ButtonOwnerState) => ({
                            className: `px-8 text-emerald-500 hover:text-cyan-100 ${
                                state.active ? 'bg-cyan-500' : 'bg-cyan-100'
                            }`,
                        }),
                    }}
                >Custom</Button>
            </div>
        </>
    )
}

export default App
